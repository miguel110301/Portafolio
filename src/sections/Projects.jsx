function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="section-kicker">Projects</p>
          <h2>Featured work</h2>
          <p className="section-subtext">
            Strategic project presentations built to show systems thinking,
            automation depth, and backend execution.
          </p>
        </div>

        <div className="project-list">
          <article className="project-card featured-project">
            <div>
              <p className="project-tag">Logistics Automation</p>
              <h3>LogisticsFlow AI</h3>
              <p>
                Event-driven workflow system for evidence intake, routing,
                operational state handling, notifications, and backend sync.
              </p>
              <ul className="project-tech">
                <li>n8n</li>
                <li>Django</li>
                <li>Webhooks</li>
                <li>WhatsApp API</li>
              </ul>
            </div>
          </article>

          <article className="project-card">
            <p className="project-tag">Lead Operations</p>
            <h3>LeadOps Engine</h3>
            <p>
              Automation pipeline for lead capture, validation, CRM sync,
              assignment, and follow-up triggers.
            </p>
            <ul className="project-tech">
              <li>Python</li>
              <li>APIs</li>
              <li>Automation</li>
              <li>CRM</li>
            </ul>
          </article>

          <article className="project-card">
            <p className="project-tag">Analytics Platform</p>
            <h3>QroData</h3>
            <p>
              Monitoring platform with backend ingestion pipelines,
              analytics-ready models, and reporting workflows.
            </p>
            <ul className="project-tech">
              <li>Flask</li>
              <li>MySQL</li>
              <li>Data Pipelines</li>
              <li>Reporting</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Projects;