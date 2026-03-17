function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <a href="#hero" className="logo">
          <span className="logo-mark">M</span>
          <span>Miguel Moreno</span>
        </a>

        <nav className="nav-links">
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact" className="nav-cta">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;