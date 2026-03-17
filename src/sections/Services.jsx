function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="section-kicker">Services</p>
          <h2>What I build</h2>
          <p className="section-subtext">
            Systems designed to automate operations, connect platforms, and keep
            business workflows running cleanly.
          </p>
        </div>

        <div className="cards">
          <div className="card glass-card">
            <div className="card-icon">⚙️</div>
            <h3>Workflow Automation</h3>
            <p>
              Advanced n8n flows with routing, webhooks, retries, validation,
              and real-time process handling.
            </p>
          </div>

          <div className="card glass-card">
            <div className="card-icon">🧠</div>
            <h3>Backend Systems</h3>
            <p>
              Python and Django services for APIs, business logic, integrations,
              and reliable production workflows.
            </p>
          </div>

          <div className="card glass-card">
            <div className="card-icon">🔗</div>
            <h3>API Integrations</h3>
            <p>
              CRMs, WhatsApp, forms, databases, and third-party services working
              together without chaos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;