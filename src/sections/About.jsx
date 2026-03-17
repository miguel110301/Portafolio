function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div className="about-card">
          <p className="section-kicker">About</p>
          <h2>Systems over hacks</h2>
          <p>
            I focus on building backend and automation systems that are reliable,
            maintainable, and useful in real operations, not just demos that
            look good for five minutes.
          </p>
        </div>

        <div className="about-card">
          <h3>My approach</h3>
          <p>
            I combine Python, APIs, automation, and workflow design to solve
            operational bottlenecks, reduce manual steps, and create processes
            that businesses can actually depend on.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;