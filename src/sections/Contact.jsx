function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-box">
          <p className="section-kicker">Contact</p>
          <h2>Let’s build something useful</h2>
          <p className="section-subtext contact-text">
            Need automation, backend systems, or API integrations that actually
            work in production? Let’s talk.
          </p>

          <div className="contact-links">
            <a href="mailto:miguelmoreno.uaq@gmail.com" className="btn btn-primary">
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/miguel-angel-moreno-sanchez"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;