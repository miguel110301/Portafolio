function Hero() {
  return (
    <section id="hero" className="hero section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Automation & Backend Engineer</p>

          <h1>
            I build <span className="gradient-text">premium automation systems</span>{" "}
            with Python, Django, APIs, and n8n.
          </h1>

          <p className="hero-text">
            I help businesses automate operations, connect tools, and build
            reliable backend workflows that reduce manual work and improve speed,
            visibility, and control.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Let’s Work
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-number">APIs</span>
              <span className="stat-label">Integrations & orchestration</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">n8n</span>
              <span className="stat-label">Advanced automation flows</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">Python</span>
              <span className="stat-label">Backend logic in production</span>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-glow"></div>
          <div className="panel-card">
            <div className="panel-top">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>

            <div className="panel-content">
              <div className="code-line">
                <span className="code-key">Webhook</span>
                <span className="code-arrow">→</span>
                <span className="code-value">Validate Input</span>
              </div>
              <div className="code-line">
                <span className="code-key">Router</span>
                <span className="code-arrow">→</span>
                <span className="code-value">State-based Flow</span>
              </div>
              <div className="code-line">
                <span className="code-key">API Sync</span>
                <span className="code-arrow">→</span>
                <span className="code-value">Django / CRM / WhatsApp</span>
              </div>
              <div className="code-line">
                <span className="code-key">Retries</span>
                <span className="code-arrow">→</span>
                <span className="code-value">Reliable Execution</span>
              </div>
              <div className="code-line">
                <span className="code-key">Outcome</span>
                <span className="code-arrow">→</span>
                <span className="code-value">Less manual work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;