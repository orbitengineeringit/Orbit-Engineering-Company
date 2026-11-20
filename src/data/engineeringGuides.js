/**
 * Original buyer guidance. Technical references support the measurement/process
 * explanations; checklists are planning aids, not site designs or operating SOPs.
 * Keep all published answers visible when reusing them in structured data.
 */
export const engineeringGuides = [
  {
    id: 'electromagnetic-vs-ultrasonic-flow-meters',
    path: '/guides/electromagnetic-vs-ultrasonic-flow-meters',
    title: 'Electromagnetic vs Ultrasonic Flow Meters: A Selection Guide',
    shortTitle: 'Choose a water flow meter',
    description: 'Compare electromagnetic and ultrasonic flow meters for water pipelines. Check conductivity, pipe conditions, installation, signals and quotation inputs.',
    intro: 'For a water pipeline, the best starting point is the measurement duty: what fluid is flowing, how the pipe is installed, and what decision the reading will support. An electromagnetic meter and a clamp-on ultrasonic meter can both measure water flow, but they have different installation and verification requirements. Use this guide to prepare a comparable enquiry for a new meter, a retrofit or a temporary survey.',
    sections: [
      {
        id: 'measurement-principles',
        title: 'Understand what each instrument measures',
        paragraphs: [
          'An electromagnetic flow meter detects the voltage generated as a conductive liquid moves through a magnetic field. Electrodes contact the liquid, so conductivity and compatibility of the electrode and liner materials matter. Check the selected model’s minimum conductivity and operating conditions; a specification for ordinary water does not automatically apply to very low-conductivity water.',
          'A transit-time ultrasonic meter compares sound travelling with and against the flow. Clamp-on versions attach sensors to the outside of an existing pipe. Doppler ultrasonic meters use reflections from particles or bubbles and need a different application assessment. “Ultrasonic” alone does not identify the measurement method.'
        ]
      },
      {
        id: 'selection-comparison',
        title: 'Compare the installation, not just the catalogue accuracy',
        paragraphs: ['This table concerns an inline electromagnetic meter and a clamp-on transit-time ultrasonic meter. Other ultrasonic designs have different requirements. Obtain the model-specific installation drawing before choosing a location.'],
        table: {
          columns: ['Selection question', 'Inline electromagnetic', 'Clamp-on transit-time ultrasonic'],
          rows: [
            ['Can the pipeline be interrupted?', 'Plan a spool-piece installation and the necessary isolation.', 'External sensors may permit installation without opening the pipe.'],
            ['What fluid information is needed?', 'Conductivity, chemical compatibility, temperature and solids.', 'Acoustic suitability, temperature and the effect of gas or solids.'],
            ['What pipe information is needed?', 'Bore, flange/connection, pressure rating and full-pipe conditions.', 'Outside diameter, wall thickness, material, lining and condition.'],
            ['What determines the location?', 'Full pipe, grounding/bonding and the manufacturer’s flow-profile requirements.', 'Full pipe, acoustic contact, sensor spacing and flow-profile requirements.'],
            ['What should acceptance demonstrate?', 'Stable local reading and correct total/output against an agreed reference.', 'Signal quality and repeatable readings against an agreed reference.']
          ]
        }
      },
      {
        id: 'survey-before-order',
        title: 'Survey the actual pipe and operating range',
        paragraphs: [
          'Record minimum, normal and maximum flow instead of choosing only from the line diameter. A meter that covers peak demand still needs to resolve the lower flows that matter to your operating decision. The pipe velocity calculator can help express a stated volume flow as average velocity using the actual internal diameter; it does not select an instrument or establish its accuracy.',
          'Photograph nearby elbows, pumps, reducers and control valves. Mark available access and the likelihood of an empty pipe or trapped air. Do not copy one generic upstream/downstream straight-length rule into every specification: the required arrangement depends on the meter, disturbance and manufacturer’s instructions.'
        ]
      },
      {
        id: 'quotation-checklist',
        title: 'Give every supplier the same quotation brief',
        paragraphs: ['A shared brief makes price and scope comparisons more useful. Ask suppliers to state assumptions and exceptions against it.'],
        items: [
          'Fluid and analysis: water source, conductivity if relevant, temperature, solids and entrained air.',
          'Duty: minimum/normal/maximum flow, pressure, flow direction and purpose of measurement.',
          'Pipe: measured dimensions, material, lining, connection details and installation photographs.',
          'Site: indoor/outdoor location, chamber flooding risk, access, power and shutdown availability.',
          'Integration: local display, totalizer, pulse or analogue output, protocol and required cable lengths.',
          'Deliverables: installation, commissioning record, calibration/verification documentation, training and spares.'
        ]
      },
      {
        id: 'acceptance-and-handover',
        title: 'Verify the whole measurement chain',
        paragraphs: [
          'At handover, record meter settings, units, flow direction, totalizer scaling and the value received by the PLC or SCADA. Agree in advance what reference and conditions will be used to assess performance. A correct display with an incorrectly scaled remote signal can still produce misleading reports.',
          'For an open drain or flume, start a separate selection exercise. Some open-channel systems measure liquid level and convert it to flow using a defined weir or flume; others combine level and velocity. Neither arrangement should be treated as a direct substitute for a full-pipe meter.'
        ]
      }
    ],
    faqs: [
      { question: 'Is an ultrasonic flow meter always better than an electromagnetic meter?', answer: 'No. The choice depends on the fluid, pipe, access, operating range and verification needs. A clamp-on meter can simplify a retrofit, while an inline electromagnetic meter may suit a permanent conductive-water installation. Compare the proposed installation and model-specific limitations.' },
      { question: 'Can a clamp-on flow meter measure through any pipe?', answer: 'Do not assume so. Pipe material, wall thickness, lining, condition and acoustic contact affect suitability. Give the supplier measured pipe details and request an installation assessment before ordering.' },
      { question: 'What should I send for a flow meter quotation in Bhopal?', answer: 'Share the site location, fluid, pipe dimensions and material, flow range, pressure, installation photographs, available power and PLC or SCADA interface. State whether you need supply only or installation and commissioning.' }
    ],
    relatedServicePaths: ['/solutions/flow-meters-instrumentation-bhopal', '/solutions/installation-commissioning-madhya-pradesh'],
    relatedCategoryIds: ['flow-meters', 'automation'],
    relatedToolPaths: ['/tools/pipe-flow-velocity-calculator'],
    sources: [
      { label: 'Endress+Hauser: Electromagnetic flow measurement', url: 'https://www.us.endress.com/en/support-overview/learning-center/flow-principle-animation-emf' },
      { label: 'Endress+Hauser: Ultrasonic measurement methods', url: 'https://www.endress.com/en/support-overview/learning-center/flow-measuring-principle-ultrasonic-methods' },
      { label: 'Siemens: SITRANS FS230 operating instructions', url: 'https://cache.industry.siemens.com/dl/files/111/109777111/att_1013004/v1/A5E38755607-AB_SITRANS_FS230_COI_en-US.pdf' },
      { label: 'Siemens: Open-channel level-to-flow measurement', url: 'https://support.industry.siemens.com/cs/attachments/109795758/A5E42673511-AC-002en_LU240_HA_mA_OI_en-US.pdf' }
    ]
  },
  {
    id: 'plc-rtu-scada-water-networks',
    path: '/guides/plc-rtu-scada-water-networks',
    title: 'PLC, RTU and SCADA for Water Networks: What to Specify',
    shortTitle: 'Plan PLC, RTU and SCADA',
    description: 'Understand PLC, RTU and SCADA roles for pumps, tanks and water networks. Prepare I/O, telemetry, communication-loss and commissioning requirements.',
    intro: 'A water automation project needs clear answers at three levels: how equipment operates locally, how remote stations communicate, and how operators supervise the network. PLC, RTU and SCADA are related parts of that architecture. Defining their responsibilities before selecting brands helps a buyer evaluate proposals for a pumping station, treatment plant or distributed water supply scheme.',
    sections: [
      {
        id: 'roles-and-overlap',
        title: 'PLC, RTU and SCADA describe different responsibilities',
        paragraphs: [
          'A programmable logic controller (PLC) runs local equipment logic, such as pump sequencing or valve interlocks. A remote terminal unit (RTU) connects measurements and commands at a field site to a supervisory system. Modern RTUs may also execute control logic and retain records, so an RTU is not necessarily just a communication box.',
          'SCADA means supervisory control and data acquisition. It presents the wider process to operators through screens, alarms and records, and can send permitted supervisory commands. A local human-machine interface (HMI) gives an operator access at the station. The labels alone do not define redundancy, storage, cybersecurity or response time: those are project requirements.'
        ],
        table: {
          columns: ['Need', 'Typical responsibility', 'Question to put in the specification'],
          rows: [
            ['Start/stop and interlocks', 'Local controller and associated protective systems', 'Which conditions permit operation, and which require a stop?'],
            ['Remote site data', 'RTU/controller, communications and field instruments', 'What is stored locally, and what is transmitted?'],
            ['Local operation', 'Panel controls and/or HMI', 'What can an operator do when the network is unavailable?'],
            ['Network supervision', 'SCADA application and its supporting infrastructure', 'Who can acknowledge alarms, change settings or issue commands?'],
            ['Operating history', 'Historian/logging at the defined system layers', 'What resolution, retention and export format are required?']
          ]
        }
      },
      {
        id: 'station-schedule',
        title: 'Create a station schedule before the I/O list',
        paragraphs: [
          'List every intake, booster station, reservoir and treatment unit with a unique identifier. For each location, record the available power, existing panel, access constraints, instruments and communication options. A station schedule prevents a proposal for “ten RTUs” from hiding ten different installation scopes.',
          'Then identify the signals: measured level, flow, pressure and water quality; pump run/trip status; valve position; and allowed commands. Record units, ranges, signal types and device protocols. Keep measured values distinct from calculated values and operator-entered values so that screens and reports explain where information comes from.'
        ]
      },
      {
        id: 'loss-of-communication',
        title: 'Specify communication loss and recovery as operating scenarios',
        paragraphs: [
          'Agree what each station should do if communication fails, a sensor becomes invalid or power returns after an outage. The correct response is process-specific; it might involve continued local operation, a restricted mode or a controlled stop. Have the responsible engineer define that behaviour rather than leaving it to an assumed software default.',
          'Ask how stale readings are displayed, whether time-stamped data is buffered, and how records are reconciled after reconnection. Test command expiry so an old remote instruction is not mistaken for a new operating request. Document local/remote authority and how operators regain control after a fault.'
        ]
      },
      {
        id: 'access-and-lifecycle',
        title: 'Include access, backups and ownership in the purchase scope',
        paragraphs: [
          'Remote maintenance should use controlled access with named users, appropriate authentication and recorded activity. CISA’s water-sector guidance recommends protecting operational technology from public internet exposure and controlling remote access. Apply the equipment vendor’s guidance to the actual network architecture.',
          'Ask who receives editable controller programs, SCADA project files, network drawings, licence records and a tested backup. Identify recurring software or connectivity charges and the responsibility for updates. These handover details influence how the owner can maintain the system after commissioning.'
        ]
      },
      {
        id: 'test-and-handover',
        title: 'Make acceptance tests part of the quotation',
        paragraphs: ['Write a short scenario-based acceptance schedule alongside the equipment list. It should demonstrate the intended operation from field input through the controller to the operator display.'],
        items: [
          'Check every agreed signal, engineering unit, alarm and permitted command.',
          'Demonstrate normal operation and transitions between local and remote modes.',
          'Simulate lost communication, invalid measurements and power recovery using an approved test plan.',
          'Check history timestamps, missing-data indication and report exports.',
          'Deliver final settings, program backups, drawings and operator training records.'
        ]
      }
    ],
    faqs: [
      { question: 'Can an RTU control pumps without a separate PLC?', answer: 'Some RTUs can execute control logic. Whether one can control the station depends on its I/O, processing, reliability requirements and the process design. Select from the required functions and tested behaviour rather than the device label alone.' },
      { question: 'Does a SCADA system need continuous internet?', answer: 'SCADA may use local networks, radio, cellular or other links; public internet is not a universal requirement. Specify which functions remain local, how communication loss is shown, and how data and control recover when the selected link returns.' },
      { question: 'What information is needed for a PLC and SCADA proposal?', answer: 'Provide a station list, I/O schedule, existing controller and instrument details, control requirements, communication options, alarm/report needs and desired handover deliverables. For upgrades, include available drawings, software versions and backup files.' }
    ],
    relatedServicePaths: ['/solutions/scada-plc-automation-bhopal', '/solutions/installation-commissioning-madhya-pradesh'],
    relatedCategoryIds: ['automation', 'level-transmitters', 'pressure-transmitters'],
    relatedToolPaths: [],
    sources: [
      { label: 'Schneider Electric: Remote SCADA and telemetry systems', url: 'https://www.se.com/in/en/product-category/6000-remote-scada-and-telemetry-systems/' },
      { label: 'Schneider Electric: SCADAPack RTU control and communication capabilities', url: 'https://www.se.com/ie/en/product-range/35344468-scadapack-47x-47xi-470r/' },
      { label: 'Siemens: Water and wastewater SCADA architecture example', url: 'https://cache.industry.siemens.com/dl/files/322/109780322/att_1322922/v2/Secure-Guideline-Blueprint-WWTP_OA_V20_en.pdf' },
      { label: 'CISA and EPA: Protecting water-sector human-machine interfaces', url: 'https://www.cisa.gov/sites/default/files/2024-12/joint-factsheet-epa-cisa-internet-exposed-human-machine-interfaces-508c.pdf' }
    ]
  },
  {
    id: 'stp-etp-wtp-ro-selection',
    path: '/guides/stp-etp-wtp-ro-selection',
    title: 'STP vs ETP vs WTP vs RO: Choose the Right Treatment Scope',
    shortTitle: 'Compare STP, ETP, WTP and RO',
    description: 'Understand STP, ETP, WTP and RO applications. Prepare water analysis, capacity, output quality and scope details for comparable treatment plant quotations.',
    intro: 'Treatment plant enquiries often begin with a capacity and an abbreviation. That is not enough to select a process. Start with the incoming water, its variation, and where the treated water will go. STP, ETP and WTP describe different treatment duties, while reverse osmosis is a membrane separation process that can form one part of a larger system.',
    sections: [
      {
        id: 'process-comparison',
        title: 'Match the term to the incoming stream',
        paragraphs: ['The following distinctions help frame an enquiry. A site may need more than one treatment system, with separate collection, storage and operating requirements.'],
        table: {
          columns: ['System', 'Typical incoming stream', 'Key design question'],
          rows: [
            ['WTP: water treatment plant', 'Raw water intended for a defined supply or process use', 'Which source-water characteristics must change to meet the intended use?'],
            ['STP: sewage treatment plant', 'Domestic sewage from people and building use', 'What flow and organic loading must the sewage process accommodate?'],
            ['ETP: effluent treatment plant', 'Wastewater from industrial production or processing', 'What pollutants and flow variations arise from the actual production process?'],
            ['RO: reverse osmosis', 'A prepared feed stream for membrane separation', 'What product-water quality, recovery and concentrate handling are feasible?']
          ]
        }
      },
      {
        id: 'treatment-train',
        title: 'Select a treatment sequence instead of an equipment label',
        paragraphs: [
          'A WTP can combine clarification, filtration and other processes selected for the source and intended output. Sewage treatment commonly combines solids removal with biological treatment and further stages as required. Industrial effluent may need a different sequence because manufacturing can introduce oils, salts, chemicals or variable loads. Keep different waste streams identifiable during the assessment.',
          'RO uses pressure and a membrane to separate a feed into permeate and concentrate. It is not an automatic replacement for pretreatment or an entire effluent plant. The US EPA describes the need to consider membrane pretreatment, energy use and concentrate disposal when assessing RO. Include those streams and supporting equipment in the enquiry rather than pricing only the membrane skid.'
        ]
      },
      {
        id: 'define-capacity',
        title: 'Make the capacity basis explicit',
        paragraphs: [
          'Distinguish daily volume, operating hours and peak incoming flow. A plant expected to treat a daily volume over one shift needs a different hourly basis from one operating continuously. Describe shift patterns, seasonal changes, shutdowns and foreseeable expansion rather than adding an unexplained allowance.',
          'For example, a preliminary requirement of 100 cubic metres per day over 10 operating hours implies an average treatment rate of 10 cubic metres per hour. This arithmetic does not size tanks, biological treatment, pumps or RO membranes; peak flow, buffering, water quality and process design still need assessment. State whether a capacity refers to feed or usable treated output.'
        ]
      },
      {
        id: 'water-analysis',
        title: 'Provide representative samples and a defined output requirement',
        paragraphs: [
          'Share laboratory reports with sample dates, locations and the production or supply conditions at the time. A single convenient sample may not represent a changing source or industrial batch process. Ask the process designer which additional tests and sampling conditions are needed before accepting a fixed design basis.',
          'Describe the intended destination: drinking-water supply, process use, cooling, irrigation or another specific reuse/discharge route. Include the project’s applicable quality requirements and testing plan. A low TDS reading alone does not demonstrate that water meets every requirement of its intended use.'
        ]
      },
      {
        id: 'rfq-scope',
        title: 'Use a common RFQ checklist for comparable offers',
        paragraphs: ['An RFQ is a request for quotation. Include these scope boundaries so that a lower equipment price is not confused with a smaller project scope.'],
        items: [
          'Source, representative water/wastewater analysis, daily and peak flow, operating schedule and required output.',
          'Site layout, available footprint, elevations, access, electricity and existing inlet/outlet connections.',
          'Civil works, tanks, mechanical equipment, interconnecting piping and electrical responsibilities.',
          'Instrumentation, automation, sampling points, operator facilities and process documentation.',
          'Sludge, backwash and concentrate handling, including who provides the downstream arrangements.',
          'Commissioning, operator training, consumables, spares, acceptance conditions and maintenance scope.'
        ]
      },
      {
        id: 'evaluate-proposals',
        title: 'Compare assumptions before comparing totals',
        paragraphs: [
          'Ask each bidder to identify the feed envelope, proposed process sequence, output basis, exclusions and utility assumptions. Record which items are estimated and which need confirmation after a site visit or further analysis. A useful proposal explains how the process responds when actual conditions depart from its design basis.',
          'For a Bhopal or Madhya Pradesh enquiry, provide the actual site location as well as the water data. Access, installation sequence and the owner’s operating resources can affect the engineering and support scope even when two plants have the same nominal capacity.'
        ]
      }
    ],
    faqs: [
      { question: 'Can an STP be used as an ETP?', answer: 'Do not assume that a sewage process can accept industrial wastewater. The industrial stream’s chemistry, variability and effect on the treatment process must be assessed. An appropriate ETP may require different collection, equalization and treatment stages.' },
      { question: 'Does every water treatment plant need RO?', answer: 'No. Select processes from the source-water analysis and intended output. RO may be appropriate for a dissolved-contaminant or salinity requirement, but it introduces pretreatment, energy and concentrate-management needs that must be evaluated.' },
      { question: 'Can I get a treatment plant quotation with only a KLD capacity?', answer: 'Capacity can start the discussion, but a meaningful proposal also needs water analysis, operating hours, peak flow, output requirements, site details and scope boundaries. KLD means kilolitres per day and does not describe contaminant loading or hourly peak demand.' }
    ],
    relatedServicePaths: ['/solutions/water-treatment-bhopal', '/solutions/scada-plc-automation-bhopal'],
    relatedCategoryIds: ['treatment', 'water-quality', 'chlorinators'],
    relatedToolPaths: [],
    sources: [
      { label: 'CPHEEO: Sewage treatment operation and maintenance', url: 'https://cpheeo.gov.in/upload/uploadfiles/files/operation_chapter4.pdf' },
      { label: 'CPHEEO: Water treatment plant operation and maintenance', url: 'https://cpheeo.gov.in/upload/uploadfiles/files/Chapter%205_3.pdf' },
      { label: 'US EPA: Drinking-water treatment technologies and RO considerations', url: 'https://www.epa.gov/sdwa/overview-drinking-water-treatment-technologies' },
      { label: 'Veolia: Industrial effluent treatment and water-recovery applications', url: 'https://www.veoliawatertechnologies.com/en/solutions/technologies/evaled' }
    ]
  },
  {
    id: 'water-treatment-amc-checklist',
    path: '/guides/water-treatment-amc-checklist',
    title: 'Water Treatment AMC: Preventive Maintenance and Scope Checklist',
    shortTitle: 'Prepare a water treatment AMC',
    description: 'Build a practical WTP, STP, ETP or RO maintenance brief: asset records, inspections, instrument checks, service reports, spares and AMC responsibilities.',
    intro: 'An annual maintenance contract should define which assets are covered, what work is included, how faults are handled and what evidence the owner receives. A visit count alone does not describe maintenance quality. Use this checklist to prepare an AMC discussion for a water treatment plant and adapt it to the installed equipment, manufacturer manuals and approved operating procedures.',
    sections: [
      {
        id: 'asset-baseline',
        title: 'Start with an asset register and a condition baseline',
        paragraphs: [
          'List pumps, motors, blowers, valves, dosing systems, filters, membranes, instruments and control panels with tags, models and locations. Collect manuals, drawings, commissioning settings, past breakdowns and existing warranties. Record unavailable information as a gap so it can be recovered during the initial survey.',
          'Agree what normal operation looks like for the site using its approved process targets and measured baseline. A maintenance record becomes more useful when it shows a change in flow, pressure, operating hours or instrument behaviour, rather than simply recording that an engineer attended.'
        ]
      },
      {
        id: 'inspection-plan',
        title: 'Separate operator rounds from planned service work',
        paragraphs: ['The following is a planning template, not a universal frequency schedule. Allocate tasks to trained personnel and set intervals using manufacturer instructions, duty, condition and process risk. Intrusive mechanical or electrical work requires the site’s isolation and permit procedures.'],
        table: {
          columns: ['Work group', 'What the plan should cover', 'Evidence to retain'],
          rows: [
            ['Operator rounds', 'Readings, abnormal noise/leaks, tank levels, equipment status and alarms.', 'Dated observations, process readings and escalation notes.'],
            ['Planned mechanical service', 'Equipment-specific inspection, lubrication, wear checks and replacement criteria.', 'Work order, measured condition, parts used and follow-up actions.'],
            ['Instrument checks', 'Sensor condition, reference checks, calibration when required and signal scaling.', 'As-found/as-left results, method and instrument identification.'],
            ['Control and electrical checks', 'Approved inspection, alarm/interlock tests, backups and panel condition.', 'Test record, exceptions and verified backup details.'],
            ['Performance review', 'Recurring faults, operating trends, spares and unresolved defects.', 'Review report with an owner and due date for each action.']
          ]
        }
      },
      {
        id: 'process-specific-records',
        title: 'Keep records that match the treatment process',
        paragraphs: [
          'For filtration and dosing equipment, identify the pressure, flow and chemical-use records needed by the operating procedure. For sewage or effluent treatment, agree the relevant process observations, laboratory results and solids-handling records. Link unusual readings to the action taken so repeated problems can be investigated.',
          'For RO, track feed conditions and the operating measurements recommended for the installed system. DuPont notes that temperature, salinity and operating conditions affect membrane performance; normalized performance helps distinguish those influences from deterioration. A lower raw permeate-flow reading alone is not a sufficient instruction to chemically clean a membrane. Cleaning criteria, chemistry and method must follow the equipment and membrane guidance.'
        ]
      },
      {
        id: 'commercial-scope',
        title: 'Define what the AMC actually includes',
        paragraphs: ['Two contracts labelled “comprehensive” can contain different exclusions. Ask for an asset-by-asset scope and a responsibility schedule covering the following.'],
        items: [
          'Scheduled visits, remote assistance, call-out availability and the process for reporting a fault.',
          'The distinction between acknowledging a complaint, attending the site and restoring operation.',
          'Labour, travel, consumables, wear parts, major replacements and specialist subcontract work.',
          'Sampling, laboratory testing, instrument calibration and the documentation included with each.',
          'The owner’s operator staffing, utilities, shutdown access, chemical supply and stock responsibilities.',
          'Approval for additional work, warranty coordination and handover when the contract ends.'
        ]
      },
      {
        id: 'service-report',
        title: 'Require a report that closes the loop',
        paragraphs: [
          'Every service report should identify the asset, observed condition, work completed and any limits on the checks performed. Include readings before and after adjustment when relevant. Unresolved defects need a priority, responsible person and next action; a signed attendance sheet cannot substitute for that record.',
          'Keep a critical-spares list with part identifiers, quantities, storage requirements and procurement lead times. Review recurring faults against operation and installation conditions before repeatedly replacing the same component. Track energy use alongside water volume and duty where reliable measurements are available; the pump-energy calculator provides an estimate for planning, not proof of achieved savings.'
        ]
      },
      {
        id: 'amc-enquiry',
        title: 'Prepare the site for an AMC assessment',
        paragraphs: ['Share the site location, process type, installed capacity, asset register, operating hours and current issues. Add recent service reports and available process trends. Identify whether the request is for maintenance support, full operation and maintenance, or a defined repair: the staffing and responsibility boundaries differ. Orbit Engineering’s Bhopal office can use these details to discuss the relevant service scope.']
      }
    ],
    faqs: [
      { question: 'What is the difference between AMC and operation and maintenance?', answer: 'An AMC defines contracted maintenance support for named assets. Operation and maintenance can also include routine plant operation and staffing. The actual responsibilities must be stated in the contract; the title alone does not confirm operator coverage.' },
      { question: 'How often should a water treatment plant be serviced?', answer: 'There is no single interval for every component. Set task frequencies using the installed equipment manuals, operating duty, water conditions, past failures and process requirements. Routine operator observations and specialist service visits serve different purposes.' },
      { question: 'Are membranes, chemicals and calibration included in an AMC?', answer: 'Only when the agreed scope includes them. Ask for a written schedule covering consumables, wear parts, major replacements, chemicals, testing and calibration, together with any quantity or service limits.' }
    ],
    relatedServicePaths: ['/solutions/operation-maintenance-amc', '/solutions/water-treatment-bhopal'],
    relatedCategoryIds: ['treatment', 'water-quality', 'automation'],
    relatedToolPaths: ['/tools/pump-energy-calculator'],
    sources: [
      { label: 'US EPA: Operation and maintenance planning checklist', url: 'https://www.epa.gov/sites/default/files/documents/om_checklisttasks.pdf' },
      { label: 'US EPA: Customizable resources for wastewater operators', url: 'https://www.epa.gov/compliance/resources-wastewater-operators' },
      { label: 'DuPont: RO performance and normalization', url: 'https://www.dupont.com/water/technologies/reverse-osmosis-ro.html' },
      { label: 'CPHEEO: Sewage treatment operation and maintenance', url: 'https://cpheeo.gov.in/upload/uploadfiles/files/operation_chapter4.pdf' }
    ]
  }
];
