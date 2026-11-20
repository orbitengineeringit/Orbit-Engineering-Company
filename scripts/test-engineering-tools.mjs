import assert from 'node:assert/strict';
import { calculatePipeFlow, calculatePumpEnergy } from '../src/utils/engineeringCalculations.js';

// Numerical regression cases use independently calculated reference values.
// Run with: node scripts/test-engineering-tools.mjs
const checks = [];
const check = (name, run) => checks.push({ name, run });
const near = (actual, expected, label, tolerance = 1e-10) => {
  assert.ok(Number.isFinite(actual), `${label} must be finite; received ${actual}`);
  assert.ok(
    Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)),
    `${label}: expected ${expected}, received ${actual}`
  );
};
const pumpDuty = Object.freeze({
  flow: 100, head: 30, pumpEfficiency: 70, motorEfficiency: 90,
  hours: 8, days: 30, tariff: 8
});

check('MLD converts to the same 1,000 m³ daily volume', () => {
  const result = calculatePipeFlow({ flow: 1, unit: 'mld', diameter: 200 });
  near(result.m3h * 24, 1000, 'daily volume in m³');
  near(result.m3h, 41.666666666666664, 'm³/h');
  near(result.ls, 11.574074074074074, 'L/s');
  near(result.lmin, 694.4444444444445, 'L/min');
  near(result.mld, 1, 'MLD round-trip');
});

check('one litre per second in a 50 mm bore has known area and velocity', () => {
  const result = calculatePipeFlow({ flow: 1, unit: 'ls', diameter: 50 });
  near(result.area, 0.001963495408493621, 'pipe area in m²');
  near(result.velocity, 0.5092958178940651, 'velocity in m/s');
  near(result.m3h, 3.6, 'm³/h');
  near(result.lmin, 60, 'L/min');
  near(result.mld, 0.0864, 'MLD');
});

check('equivalent flow units produce the same hydraulic result', () => {
  const equivalents = [['ls', 1], ['m3h', 3.6], ['lmin', 60], ['mld', 0.0864]];
  for (const [unit, flow] of equivalents) {
    const result = calculatePipeFlow({ flow, unit, diameter: 50 });
    near(result.velocity, 0.5092958178940651, `${unit} velocity`);
    near(result.ls, 1, `${unit} to L/s`);
    near(result.m3h, 3.6, `${unit} to m³/h`);
    near(result.lmin, 60, `${unit} to L/min`);
    near(result.mld, 0.0864, `${unit} to MLD`);
  }
});

check('published 100 m³/h and 150 mm worked example rounds correctly', () => {
  const result = calculatePipeFlow({ flow: 100, unit: 'm3h', diameter: 150 });
  assert.equal(result.area.toFixed(6), '0.017671');
  assert.equal(result.velocity.toFixed(3), '1.572');
});

check('doubling the bore quarters velocity at unchanged flow', () => {
  const original = calculatePipeFlow({ flow: 1, unit: 'ls', diameter: 50 });
  const larger = calculatePipeFlow({ flow: 1, unit: 'ls', diameter: 100 });
  near(larger.velocity, original.velocity / 4, 'inverse-square bore relationship');
});

check('zero pipe flow remains a valid stationary-water estimate', () => {
  const result = calculatePipeFlow({ flow: 0, unit: 'ls', diameter: 50 });
  for (const field of ['velocity', 'm3h', 'ls', 'lmin', 'mld']) assert.equal(result[field], 0);
  assert.ok(result.area > 0);
});

check('pump duty separates hydraulic, shaft and electrical power', () => {
  const result = calculatePumpEnergy(pumpDuty);
  near(result.hydraulicKw, 8.172208333333333, 'hydraulic kW');
  near(result.shaftKw, 11.674583333333333, 'shaft kW');
  near(result.electricalKw, 12.97175925925926, 'electrical kW');
  near(result.kwh, 3113.222222222222, 'period energy kWh');
  near(result.cost, 24905.777777777777, 'period energy cost');
  assert.equal(result.hydraulicKw.toFixed(2), '8.17');
  assert.equal(result.electricalKw.toFixed(2), '12.97');
  assert.equal(Math.round(result.kwh), 3113);
  assert.equal(Math.round(result.cost), 24906);
});

check('100% efficiencies reduce to the ideal hydraulic power', () => {
  const result = calculatePumpEnergy({ ...pumpDuty, pumpEfficiency: 100, motorEfficiency: 100 });
  near(result.hydraulicKw, 8.172208333333333, 'ideal hydraulic kW');
  near(result.shaftKw, result.hydraulicKw, 'ideal shaft kW');
  near(result.electricalKw, result.hydraulicKw, 'ideal electrical kW');
  near(result.kwh, 1961.33, 'ideal energy kWh');
});

check('zero operating time and zero tariff have distinct effects', () => {
  for (const field of ['hours', 'days']) {
    const result = calculatePumpEnergy({ ...pumpDuty, [field]: 0 });
    near(result.electricalKw, 12.97175925925926, `${field}: duty power remains unchanged`);
    assert.equal(result.kwh, 0);
    assert.equal(result.cost, 0);
  }
  const freeEnergy = calculatePumpEnergy({ ...pumpDuty, tariff: 0 });
  near(freeEnergy.kwh, 3113.222222222222, 'zero tariff retains energy use');
  assert.equal(freeEnergy.cost, 0);
});

check('numeric form strings produce the same estimates as numeric inputs', () => {
  const result = calculatePumpEnergy(Object.fromEntries(Object.entries(pumpDuty).map(([key, value]) => [key, String(value)])));
  near(result.cost, 24905.777777777777, 'numeric string pump cost');
  near(calculatePipeFlow({ flow: '1', unit: 'ls', diameter: '50' }).velocity, 0.5092958178940651, 'numeric string velocity');
});

check('blank, missing, nonnumeric and nonfinite inputs are rejected', () => {
  const invalid = ['', ' \t ', undefined, null, true, 'not a number', NaN, Infinity, -Infinity];
  for (const value of invalid) {
    for (const field of ['flow', 'diameter']) {
      assert.throws(() => calculatePipeFlow({ flow: 1, unit: 'ls', diameter: 50, [field]: value }), `${field} accepted invalid input ${String(value)}`);
    }
    for (const field of Object.keys(pumpDuty)) {
      assert.throws(() => calculatePumpEnergy({ ...pumpDuty, [field]: value }), `${field} accepted invalid input ${String(value)}`);
    }
  }
});

check('pipe geometry, flow direction and supported unit bounds are enforced', () => {
  for (const diameter of [0, -50]) assert.throws(() => calculatePipeFlow({ flow: 1, unit: 'ls', diameter }));
  assert.throws(() => calculatePipeFlow({ flow: -1, unit: 'ls', diameter: 50 }));
  for (const unit of ['gpm', 'toString', '__proto__']) assert.throws(() => calculatePipeFlow({ flow: 1, unit, diameter: 50 }));
});

check('pump duty and percentage efficiencies stay within physical bounds', () => {
  for (const field of ['flow', 'head', 'pumpEfficiency', 'motorEfficiency']) {
    for (const value of [0, -1]) assert.throws(() => calculatePumpEnergy({ ...pumpDuty, [field]: value }), `${field} must be positive`);
  }
  for (const field of ['pumpEfficiency', 'motorEfficiency']) {
    assert.throws(() => calculatePumpEnergy({ ...pumpDuty, [field]: 100.01 }), `${field} cannot exceed 100%`);
  }
  assert.throws(() => calculatePumpEnergy({ ...pumpDuty, hours: 24.01 }));
  assert.doesNotThrow(() => calculatePumpEnergy({ ...pumpDuty, hours: 24 }));
  for (const field of ['hours', 'days', 'tariff']) assert.throws(() => calculatePumpEnergy({ ...pumpDuty, [field]: -1 }));
});

check('overflow cannot return a misleading finite velocity with infinite units or area', () => {
  assert.throws(() => calculatePipeFlow({ flow: 1, unit: 'ls', diameter: 1e200 }), 'infinite pipe area');
  assert.throws(() => calculatePipeFlow({ flow: Number.MAX_VALUE, unit: 'm3h', diameter: 1e150 }), 'infinite converted flow');
  assert.throws(() => calculatePumpEnergy({ ...pumpDuty, flow: Number.MAX_VALUE, head: Number.MAX_VALUE }), 'infinite pump power');
});

let failed = 0;
for (const { name, run } of checks) {
  try {
    run();
  } catch (error) {
    failed += 1;
    console.error(`FAIL: ${name}\n${error.message}`);
  }
}
console.log(`Engineering calculations: ${checks.length - failed}/${checks.length} checks passed.`);
if (failed) process.exitCode = 1;
