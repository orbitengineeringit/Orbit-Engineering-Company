import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Calculator, MapPin } from 'lucide-react';
import PageLink from '../components/PageLink';
import { VisibleFAQs } from '../components/SearchContent';
import { engineeringGuides, engineeringTools, projectExperiences, relatedResources } from '../data/learningResources';
import { procurementGuide } from '../data/procurementGuide';
import { servicePages } from '../data/seoContent';
import { PRODUCT_CATEGORIES } from '../data/products';
import { calculatePipeFlow, calculatePumpEnergy, flowUnits } from '../utils/engineeringCalculations';
import '../styles/procurement-guide.css';
import '../styles/resources.css';

const labels = { tool: 'Engineering calculator', guide: 'Engineering guide', project: 'Project experience' };

function ResourceCards({ items, onNavigate }) {
  return <div className="resource-cards">{items.map(item => <article key={item.path}>
    <span className="visual-eyebrow">{item.resourceType || (item.client ? item.location : 'Engineering reference')}</span>
    <h3><PageLink page={item.path} onNavigate={onNavigate}>{item.shortTitle || item.title}<ArrowRight size={17} aria-hidden="true" /></PageLink></h3>
    <p>{item.description}</p>
  </article>)}</div>;
}

export function ResourceRecommendations({ servicePath, categoryId, excludePath, onNavigate }) {
  const items = relatedResources({ servicePath, categoryId, excludePath });
  if (!items.length) return null;
  return <section className="visual-container resource-recommendations" aria-labelledby="related-resources-title">
    <span className="visual-eyebrow">Put the information to work</span><h2 id="related-resources-title">Selection guides & project context</h2>
    <ResourceCards items={items} onNavigate={onNavigate} />
    <PageLink className="resource-text-link" page="/resources" onNavigate={onNavigate}>Explore all engineering resources <ArrowRight size={16} /></PageLink>
  </section>;
}

function Breadcrumb({ title, project = false, onNavigate }) {
  return <nav className="procurement-guide__breadcrumb" aria-label="Breadcrumb"><ol>
    <li><PageLink page="home" onNavigate={onNavigate}>Home</PageLink></li>
    <li><PageLink page={project ? '/project-experience' : '/resources'} onNavigate={onNavigate}>{project ? 'Project experience' : 'Resources'}</PageLink></li>
    <li aria-current="page">{title}</li>
  </ol></nav>;
}

export function ResourcesPage({ projectsOnly = false, onNavigate }) {
  const groups = projectsOnly ? [{ id: 'projects', title: 'Municipal water and industrial applications', items: projectExperiences }] : [
    { id: 'calculators', title: 'Calculate a first estimate', items: engineeringTools.map(item => ({ ...item, resourceType: 'Calculator' })) },
    { id: 'guides', title: 'Make an informed equipment or service choice', items: [...engineeringGuides, procurementGuide] },
    { id: 'projects', title: 'Explore Orbit’s project experience', items: projectExperiences },
  ];
  return <article className="visual-page procurement-guide resource-directory">
    <header className="procurement-guide__hero"><div className="visual-container">
      <nav className="procurement-guide__breadcrumb" aria-label="Breadcrumb"><ol><li><PageLink page="home" onNavigate={onNavigate}>Home</PageLink></li><li aria-current="page">{projectsOnly ? 'Project experience' : 'Resources'}</li></ol></nav>
      <span className="visual-eyebrow">Orbit Engineering · Bhopal</span>
      <h1>{projectsOnly ? 'Water & automation project experience in Madhya Pradesh' : 'Water engineering guides, calculators & project experience'}</h1>
      <p>{projectsOnly ? 'Explore the recorded installation, instrumentation and automation scope behind municipal and industrial applications. Each overview connects the location and engineering work to the information needed for a similar project.' : 'Compare technologies, prepare a better enquiry and understand the engineering behind a water system. Start with a practical guide or calculator, then connect it to the equipment, services and local project experience relevant to your application.'}</p>
      <nav className="resource-jump-links" aria-label="Resource sections">{groups.map(group => <a key={group.id} href={`#${group.id}`}>{group.id === 'calculators' ? <Calculator size={16} /> : group.id === 'projects' ? <MapPin size={16} /> : <BookOpen size={16} />}{group.id === 'calculators' ? 'Calculators' : group.id === 'projects' ? 'Project experience' : 'Buying guides'}</a>)}</nav>
    </div></header>
    <div className="visual-container resource-directory__body">{groups.map(group => <section id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}><h2 id={`${group.id}-title`}>{group.title}</h2><ResourceCards items={group.items} onNavigate={onNavigate} /></section>)}
      <div className="resource-contact"><h2>Planning a project in Bhopal or Madhya Pradesh?</h2><p>Share your location, application, drawings and required scope with Orbit Engineering. A clear project brief helps the team review equipment selection, controls, installation and maintenance responsibilities.</p><PageLink page="contact" onNavigate={onNavigate} className="visual-button">Discuss your requirements <ArrowRight size={17} /></PageLink><PageLink className="resource-text-link" page={projectsOnly ? '/resources' : '/project-experience'} onNavigate={onNavigate}>{projectsOnly ? 'Browse guides and calculators' : 'View the project experience directory'} <ArrowRight size={16} /></PageLink></div>
    </div>
  </article>;
}

function ContentSections({ entry }) {
  return <>{entry.sections.map(section => <section className="procurement-guide__section resource-section" key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
    <h2 id={`${section.id}-title`}>{section.title}</h2>
    {(section.paragraphs || []).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    {section.items?.length > 0 && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
    {section.table && <div className="procurement-guide__table-wrap" role="region" aria-label={section.table.caption || section.title} tabIndex={0}><table><caption>{section.table.caption || section.title}</caption><thead><tr>{section.table.columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{section.table.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th scope="row" key={cellIndex}>{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>}
  </section>)}
  <VisibleFAQs faqs={entry.faqs} id={`${entry.id}-questions`} />
  {entry.sources?.length > 0 && <section className="resource-sources" id="references" aria-labelledby="references-title"><h2 id="references-title">References & further reading</h2><ul>{entry.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul></section>}
  </>;
}

function RelatedServices({ entry, onNavigate }) {
  const services = servicePages.filter(item => entry.relatedServicePaths?.includes(item.path));
  const categories = PRODUCT_CATEGORIES.filter(item => entry.relatedCategoryIds?.includes(item.id));
  const tools = engineeringTools.filter(item => entry.relatedToolPaths?.includes(item.path));
  return <section className="procurement-guide__next"><div className="visual-container"><span className="visual-eyebrow">From planning to practical scope</span><h2>Related engineering services & equipment</h2>
    <nav className="procurement-guide__related" aria-label="Related services and equipment">{[...services.map(item => ({ path: item.path, label: item.shortTitle })), ...categories.map(item => ({ path: `/products/${item.id}`, label: item.name })), ...tools.map(item => ({ path: item.path, label: item.shortTitle }))].map(link => <PageLink key={link.path} page={link.path} onNavigate={onNavigate}>{link.label}<ArrowRight size={16} /></PageLink>)}</nav>
    <div className="procurement-guide__contact"><p>For a project-specific review, send your site location, application, equipment information and operating requirements to the Bhopal team.</p><PageLink page="contact" onNavigate={onNavigate} className="visual-button">Contact Orbit Engineering <ArrowRight size={17} /></PageLink></div>
  </div></section>;
}

export function ResourceArticlePage({ entry, type = 'guide', onNavigate, children }) {
  return <article className="visual-page procurement-guide resource-article">
    <header className="procurement-guide__hero"><div className="visual-container"><Breadcrumb title={entry.shortTitle} project={type === 'project'} onNavigate={onNavigate} />
      <span className="visual-eyebrow">{labels[type]} · Orbit Engineering</span><h1>{entry.title}</h1><p>{entry.intro}</p>
      <div className="resource-byline">Published by <PageLink page="about" onNavigate={onNavigate}>Orbit Engineering, Bhopal</PageLink></div>
      {type === 'project' && <dl className="resource-project-facts"><div><dt>Client in portfolio</dt><dd>{entry.client}</dd></div><div><dt>Location</dt><dd>{entry.location}</dd></div></dl>}
    </div></header>
    {children && <div className="visual-container">{children}</div>}
    <div className="visual-container procurement-guide__layout">
      <aside className="procurement-guide__contents"><p>In this {type === 'project' ? 'overview' : 'reference'}</p><nav aria-label="On this page">{entry.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}{entry.sources?.length > 0 && <a href="#references">References</a>}</nav></aside>
      <div className="procurement-guide__body">{entry.scope?.length > 0 && <section className="resource-scope"><h2>Recorded engineering scope</h2><ul>{entry.scope.map(item => <li key={item}>{item}</li>)}</ul></section>}<ContentSections entry={entry} /></div>
    </div>
    <RelatedServices entry={entry} onNavigate={onNavigate} />
    <ResourceRecommendations excludePath={entry.path} onNavigate={onNavigate} />
  </article>;
}

const defaults = {
  'pipe-flow-velocity-calculator': { flow: '100', unit: 'm3h', diameter: '150' },
  'pump-energy-calculator': { flow: '100', head: '30', pumpEfficiency: '70', motorEfficiency: '90', hours: '8', days: '30', tariff: '8' },
};
const format = (value, decimals = 2) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: decimals }).format(value);

function EngineeringCalculator({ tool }) {
  const pipe = tool.id === 'pipe-flow-velocity-calculator';
  const calculate = pipe ? calculatePipeFlow : calculatePumpEnergy;
  const [values, setValues] = useState(defaults[tool.id]);
  const [ready, setReady] = useState(false);
  const [result, setResult] = useState(() => calculate(defaults[tool.id]));
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { setReady(true); }, []);
  const change = event => { setValues(current => ({ ...current, [event.target.name]: event.target.value })); setDirty(true); setError(''); };
  const field = (name, label, min = 0, max) => <label key={name} htmlFor={`input-${name}`}>{label}<input id={`input-${name}`} name={name} type="number" inputMode="decimal" min={min} max={max} step="any" value={values[name]} onChange={change} required /></label>;
  const rows = result ? pipe ? [['Average velocity', `${format(result.velocity, 3)} m/s`], ['Flow in m³/h', format(result.m3h, 3)], ['Flow in L/s', format(result.ls, 3)], ['Flow in L/min', format(result.lmin, 3)], ['Equivalent MLD', format(result.mld, 4)]] : [['Hydraulic power', `${format(result.hydraulicKw)} kW`], ['Pump shaft power', `${format(result.shaftKw)} kW`], ['Estimated motor input', `${format(result.electricalKw)} kW`], ['Energy for selected period', `${format(result.kwh)} kWh`], ['Energy-only cost', `₹${format(result.cost)}`]] : [];
  return <section className="engineering-calculator" aria-labelledby="calculator-title">
    <div><span className="visual-eyebrow">Enter your application</span><h2 id="calculator-title">{pipe ? 'Flow and internal pipe bore' : 'Duty point and operating schedule'}</h2><p id="calculator-help">{ready ? 'Change the example inputs, then calculate. Results update only when you submit.' : 'Example inputs and results are shown. Interactive controls activate when the page finishes loading.'}</p>
      <form aria-describedby="calculator-help" onSubmit={event => { event.preventDefault(); try { setResult(calculate(values)); setError(''); setDirty(false); } catch (problem) { setError(problem.message); setResult(null); } }}>
        <fieldset disabled={!ready}><legend className="sr-only">Calculator inputs</legend><div className="calculator-fields">
          {field('flow', pipe ? 'Volume flow rate' : 'Flow (m³/h)', pipe ? 0 : 0.000001)}
          {pipe ? <><label htmlFor="input-unit">Flow unit<select id="input-unit" name="unit" value={values.unit} onChange={change}>{Object.entries(flowUnits).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>{field('diameter', 'Internal diameter (mm)', 0.000001)}</> : <>{field('head', 'Total dynamic head (m)', 0.000001)}{field('pumpEfficiency', 'Pump efficiency (%)', 0.000001, 100)}{field('motorEfficiency', 'Motor efficiency (%)', 0.000001, 100)}{field('hours', 'Operating hours / day', 0, 24)}{field('days', 'Operating days', 0, 366)}{field('tariff', 'Energy tariff (₹/kWh)')}</>}
        </div><button className="visual-button" type="submit">Calculate estimate <ArrowRight size={17} /></button></fieldset>
      </form><noscript><p>Use the formulas and worked example below, or enable JavaScript to enter your own values.</p></noscript>
    </div>
    <div className="calculator-result" aria-live="polite" aria-atomic="true"><span className="visual-eyebrow">{dirty ? 'Previous calculation' : 'Calculated estimate'}</span>{error ? <p role="alert">{error}</p> : <><dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>{dirty && <p>Inputs changed. Calculate again to update these results.</p>}<p>{pipe ? 'Full circular pipe; average velocity. Confirm the actual bore and manufacturer requirements.' : 'Steady water duty, density 1,000 kg/m³. Excludes additional losses and non-energy bill charges.'}</p></>}</div>
  </section>;
}

export function EngineeringToolPage({ tool, onNavigate }) {
  return <ResourceArticlePage entry={tool} type="tool" onNavigate={onNavigate}><EngineeringCalculator tool={tool} /></ResourceArticlePage>;
}
