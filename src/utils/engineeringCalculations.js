export const flowUnits = { m3h: 'm³/h', ls: 'L/s', lmin: 'L/min', mld: 'MLD' };
const flowFactors = { m3h: 1 / 3600, ls: 1 / 1000, lmin: 1 / 60000, mld: 1000 / 86400 };

function number(value, label, { min = 0, max = Infinity, exclusiveMin = false } = {}) {
  if ((typeof value !== 'number' && typeof value !== 'string') || (typeof value === 'string' && !value.trim())) throw new Error(`Enter ${label}.`);
  const result = Number(value);
  if (!Number.isFinite(result) || (exclusiveMin ? result <= min : result < min) || result > max) {
    throw new Error(`${label} must be ${exclusiveMin ? 'greater than' : 'at least'} ${min}${Number.isFinite(max) ? ` and no more than ${max}` : ''}.`);
  }
  return result;
}

export function calculatePipeFlow({ flow, unit = 'm3h', diameter }) {
  if (!Object.hasOwn(flowFactors, unit)) throw new Error('Choose a supported flow unit.');
  const q = number(flow, 'flow rate') * flowFactors[unit];
  const d = number(diameter, 'internal diameter in mm', { exclusiveMin: true }) / 1000;
  const area = Math.PI * d * d / 4;
  const velocity = q / area;
  const result = { velocity, area, m3h: q * 3600, ls: q * 1000, lmin: q * 60000, mld: q * 86400 / 1000 };
  if (!Object.values(result).every(Number.isFinite)) throw new Error('These inputs exceed the calculation range.');
  return result;
}

export function calculatePumpEnergy({ flow, head, pumpEfficiency, motorEfficiency, hours, days, tariff }) {
  const q = number(flow, 'flow in m³/h', { exclusiveMin: true }) / 3600;
  const h = number(head, 'total dynamic head in metres', { exclusiveMin: true });
  const pump = number(pumpEfficiency, 'pump efficiency (%)', { max: 100, exclusiveMin: true }) / 100;
  const motor = number(motorEfficiency, 'motor efficiency (%)', { max: 100, exclusiveMin: true }) / 100;
  const dailyHours = number(hours, 'operating hours per day', { max: 24 });
  const operatingDays = number(days, 'operating days', { max: 366 });
  const rate = number(tariff, 'energy tariff in ₹/kWh');
  const hydraulicKw = 1000 * 9.80665 * q * h / 1000;
  const shaftKw = hydraulicKw / pump;
  const electricalKw = shaftKw / motor;
  const kwh = electricalKw * dailyHours * operatingDays;
  const cost = kwh * rate;
  if (![hydraulicKw, shaftKw, electricalKw, kwh, cost].every(Number.isFinite)) throw new Error('These inputs exceed the calculation range.');
  return { hydraulicKw, shaftKw, electricalKw, kwh, cost };
}
