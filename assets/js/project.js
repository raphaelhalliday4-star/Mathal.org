const projects = {
  ecommerce: {
    category: 'E-COMMERCE · PROFITABILITY',
    title: 'E-commerce Performance & Profitability',
    datasetPdf: '../reports/E-Commerce Marketing Dataset.pdf',
    finalReportPdf: '../reports/E-Commerce Performance Analysis Report.pdf',
    analysisPdf: '../reports/E-Commerce and Profitability Analysis.pdf',
    reportHeading: 'Understanding E-commerce Performance and Profitability',
  reportDescription:
  'Explore how sales growth translates into business profitability. This report examines contribution margins, promotional spending, return losses, and inventory availability to identify opportunities to improve financial performance and operational efficiency.',

finalReportPdf: '../reports/E-Commerce Performance Analysis Report.pdf',

datasetPdf: '../reports/E-Commerce Marketing Dataset.pdf',
    image: '../image.jpeg',
    imageHeading: 'Understanding E-commerce Performance',
    imageDescription:
    'This analysis explores retail performance across sales, profitability, promotions, returns, and inventory. By connecting these metrics, the project identifies opportunities to improve margins, reduce losses, and support better business decisions.',
    imageCaption:
    'E-commerce performance analysis and business intelligence overview.',
    summary: 'A retail performance analysis connecting sales growth to contribution margin, promotions, returns, fulfilment, and inventory health.',
    metrics: [
      ['€640.42K', 'Net sales'],
      ['19.42%', 'Contribution margin'],
      ['€102.90K', 'Return loss'],
      ['€36.71K', 'Lost to stock-outs'],
    ],
    pdf: '../E-Commerce and Profitability Analytics/E-Commerce and Profitability Analysis.pdf',
    files: [
      ['Read report · PDF', '../E-Commerce and Profitability Analytics/E-Commerce and Profitability Analysis.pdf'],
      ['Report · PowerPoint', '../extracted-ecommerce/E-Commerce Performance Analysis Report.pptx'],
      ['Dataset · Excel', '../extracted-ecommerce/E-Commerce and Profitability Dataset.xlsx'],
      [
      'Dataset · PDF',
      '../reports/E-Commerce Marketing Dataset.pdf'
      ],
       [
      'Final Report · PDF',
      '../reports/E-Commerce Performance Analysis Report.pdf'
      ],
    ],
  },
  marketing: {
    category: 'MARKETING · CUSTOMER ACQUISITION',
    title: 'Marketing & Customer Acquisition',
    finalReportPdf:
  '../reports/Marketing and Customer Acquisition Report.pdf',
  analysisPdf: '../reports/Marketing and Customer Acquisition Analysis.pdf',
  reportHeading:
    'Measuring Marketing Performance and Customer Value',

  reportDescription:
    'Explore acquisition channels, marketing costs, campaign performance, and customer segments to understand how marketing investment contributes to business growth.',
    datasetPdf:
  '../reports/E-Commerce Marketing Dataset-1-2275.pdf',
    image : '../image1.jpeg',
    summary: 'A channel and customer-value analysis exploring acquisition cost, promotion returns, segment performance, and customer lifecycle.',
    metrics: [
      ['€640.42K', 'Net sales'],
      ['2,200', 'Customers acquired'],
      ['€13.58', 'Cost per customer'],
      ['73%', 'Margin from top segments'],
    ],
    pdf: '../Marketing and Customer Acquisition Analytics/Marketing and Customer Acquisition Analysis.pdf',
    files: [
      ['Report · PowerPoint', '../Marketing and Customer Acquisition Analytics/Marketing and Customer Acquisition Report.pptx'],
      ['Dataset · Excel', '../Marketing and Customer Acquisition Analytics/E-Commerce Marketing Dataset.xlsx'],
    ],
  },
  saas: {
    category: 'SAAS · SUBSCRIPTIONS & CHURN',
    title: 'SaaS Subscription & Churn Analytics',
    finalReportPdf:
  '../reports/SaaS_Subscription_Churn_Report.pdf',
  analysisPdf: '../reports/SaaS Subscription and Churn Analysis.pdf',
    reportHeading: 'Understanding Subscription Health and Customer Retention',
    reportDescription:
  'Explore recurring revenue, customer churn, subscription performance, and retention risks to identify opportunities to strengthen customer relationships and protect recurring revenue.',
    image: '../image2.jpeg',
    summary: 'A subscription health study connecting recurring revenue, churn risk, account segments, product engagement, and customer support.',
    metrics: [
      ['$10.16M', 'Monthly recurring revenue'],
      ['22%', 'Account churn'],
      ['$4.66M', 'MRR at risk'],
      ['500', 'Customer accounts'],
    ],
    pdf: '../SaaS Subscription and Churn Analytics/SaaS Subscription and Churn Analysis.pdf',
    files: [
      ['Report · PowerPoint', '../SaaS Subscription and Churn Analytics/SaaS_Subscription_Churn_Report.pptx'],
      ['Dataset guide · README', '../SaaS Subscription and Churn Analytics/Data Collection/README.md'],
      ['Dataset · Accounts CSV', '../SaaS Subscription and Churn Analytics/Data Collection/ravenstack_accounts.csv'],
      ['Dataset · Subscriptions CSV', '../SaaS Subscription and Churn Analytics/Data Collection/ravenstack_subscriptions.csv'],
      ['Dataset · Churn events CSV', '../SaaS Subscription and Churn Analytics/Data Collection/ravenstack_churn_events.csv'],
      ['Dataset · Feature usage CSV', '../SaaS Subscription and Churn Analytics/Data Collection/ravenstack_feature_usage.csv'],
      ['Dataset · Support tickets CSV', '../SaaS Subscription and Churn Analytics/Data Collection/ravenstack_support_tickets.csv'],
    ],
  },
};

const selectedProject = new URLSearchParams(window.location.search).get('project');
const project = projects[selectedProject];

if (project) {
  document.title = `${project.title} | Mathal Case Study`;
  document.getElementById('project-category').textContent = project.category;
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-summary').textContent = project.summary;
  
  // ========================================
// DATASET PDF VIEWER
// ========================================

const datasetFrame = document.getElementById('dataset-pdf-frame');
const datasetSection = document.getElementById('dataset-viewer-section');

if (datasetFrame && project.datasetPdf) {
  datasetFrame.src = project.datasetPdf;
} else if (datasetSection) {
  datasetSection.hidden = true;
}

// ========================================
// REUSABLE PROJECT REPORT VIEWER
// ========================================

const finalReportSection = document.getElementById(
  'final-report-section'
);

const finalReportTitle = document.getElementById(
  'final-report-title'
);

const finalReportDescription = document.getElementById(
  'final-report-description'
);

const finalReportPages = document.getElementById(
  'final-report-pages'
);

if (project.finalReportPdf && finalReportPages) {

  // Update the heading.
  if (finalReportTitle) {
    finalReportTitle.textContent =
      project.reportHeading || `${project.title} Report`;
  }

  // Update the description.
  if (finalReportDescription) {
    finalReportDescription.textContent =
      project.reportDescription || project.summary;
  }

  // Check whether PDF.js is available.
  if (!window.pdfjsLib) {
    finalReportPages.textContent =
      'The report preview is currently unavailable.';
  } else {

    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    // Load the selected project's PDF.
    window.pdfjsLib
      .getDocument(project.finalReportPdf)
      .promise
      .then(async (pdf) => {

        finalReportPages.innerHTML = '';

        // Display no more than five pages.
        const pagesToShow = Math.min(5, pdf.numPages);

        for (
          let pageNumber = 1;
          pageNumber <= pagesToShow;
          pageNumber++
        ) {

          const page = await pdf.getPage(pageNumber);

          const containerWidth =
            finalReportPages.clientWidth || 800;

          const originalViewport = page.getViewport({
            scale: 1,
          });

          const scale = Math.min(
            containerWidth / originalViewport.width,
            1.5
          );

          const viewport = page.getViewport({
            scale: Math.max(scale, 0.1),
          });

          const canvas = document.createElement('canvas');

          const context = canvas.getContext('2d');

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const pageWrapper = document.createElement('article');

          pageWrapper.className = 'final-report-page';

          const pageLabel = document.createElement('p');

          pageLabel.className = 'final-report-page-label';

          pageLabel.textContent = `PAGE ${pageNumber}`;

          await page.render({
            canvasContext: context,
            viewport,
          }).promise;

          pageWrapper.appendChild(pageLabel);
          pageWrapper.appendChild(canvas);

          finalReportPages.appendChild(pageWrapper);
        }
      })
      .catch((error) => {

        console.error(
          'Unable to render project report:',
          error
        );

        finalReportPages.textContent =
          'Unable to load the report. Please check the PDF file path.';
      });
  }

} else if (finalReportSection) {

  // Hide the report section if this project has no report.
  finalReportSection.hidden = true;
}

  // ========================================
// ADDITIONAL PROJECT ANALYSIS PDF VIEWER
// ========================================

const analysisReportSection = document.getElementById(
  'analysis-report-section'
);

const analysisReportTitle = document.getElementById(
  'analysis-report-title'
);

const analysisReportDescription = document.getElementById(
  'analysis-report-description'
);

const analysisReportPages = document.getElementById(
  'analysis-report-pages'
);

if (project.analysisPdf && analysisReportPages) {

  // Set the analysis heading.
  if (analysisReportTitle) {
    analysisReportTitle.textContent =
      project.analysisHeading || `${project.title} Analysis`;
  }

  // Set the analysis description.
  if (analysisReportDescription) {
    analysisReportDescription.textContent =
      project.analysisDescription ||
      `Explore the detailed analysis behind ${project.title}.`;
  }

  // Check whether PDF.js is available.
  if (!window.pdfjsLib) {
    analysisReportPages.textContent =
      'The analysis preview is currently unavailable.';
  } else {

    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    // Load the analysis PDF for the selected project.
    window.pdfjsLib
      .getDocument(project.analysisPdf)
      .promise
      .then(async (pdf) => {

        analysisReportPages.innerHTML = '';

        // Display no more than five pages.
        const pagesToShow = Math.min(5, pdf.numPages);

        for (
          let pageNumber = 1;
          pageNumber <= pagesToShow;
          pageNumber++
        ) {

          const page = await pdf.getPage(pageNumber);

          const containerWidth =
            analysisReportPages.clientWidth || 800;

          const originalViewport = page.getViewport({
            scale: 1,
          });

          const scale = Math.min(
            containerWidth / originalViewport.width,
            1.5
          );

          const viewport = page.getViewport({
            scale: Math.max(scale, 0.1),
          });

          const canvas = document.createElement('canvas');

          const context = canvas.getContext('2d');

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const pageWrapper = document.createElement('article');

          pageWrapper.className = 'final-report-page';

          const pageLabel = document.createElement('p');

          pageLabel.className = 'final-report-page-label';

          pageLabel.textContent = `PAGE ${pageNumber}`;

          await page.render({
            canvasContext: context,
            viewport,
          }).promise;

          pageWrapper.appendChild(pageLabel);
          pageWrapper.appendChild(canvas);

          analysisReportPages.appendChild(pageWrapper);
        }
      })
      .catch((error) => {

        console.error(
          'Unable to render project analysis:',
          error
        );

        analysisReportPages.textContent =
          'Unable to load the analysis PDF. Please check the file path.';
      });
  }

} else if (analysisReportSection) {

  // Hide the analysis section if no analysis PDF exists.
  analysisReportSection.hidden = true;
}
 
  document.getElementById('project-metrics').innerHTML = project.metrics
    .map(([value, label]) => `<article class="project-metric"><strong>${value}</strong><span>${label}</span></article>`)
    .join('');

  const groupedFiles = {
    reports: project.files.filter(([label]) => label.toLowerCase().includes('report')),
    datasets: project.files.filter(([label]) => !label.toLowerCase().includes('report')),
  };

  const renderGroup = (title, items) => {
    if (!items.length) {
      return '';
    }

    return `
      <div class="project-file-group">
        <h3>${title}</h3>
        ${items
          .map(
            ([label, href]) =>
              `<a class="project-file-link" href="${href}" target="_blank" rel="noopener"><span>${label}</span></a>`,
          )
          .join('')}
      </div>
    `;
  };

const projectFileList = document.getElementById('project-file-list');
if (projectFileList) {
  projectFileList.innerHTML =
    `${renderGroup('Reports', groupedFiles.reports)}${renderGroup('Datasets', groupedFiles.datasets)}`;
}
} else {
  document.title = 'Project not found | Mathal';
  document.getElementById('project-category').textContent = 'CASE STUDY NOT FOUND';
  document.getElementById('project-title').textContent = 'This project link is not available.';
  document.getElementById('project-summary').textContent = 'Choose a project from the case studies page to view its report.';
  document.querySelector('.project-report').hidden = true;
  document.querySelector('.project-files').hidden = true;
}
