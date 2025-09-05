import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Header({ translations, lang, handleSelectLang }) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const popupRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLangClick = (code) => {
    handleSelectLang(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  return (
    <header className="App-header">
      <div className="header-left">
        <img src="/diamond.png" alt="logo" className="logo desktop-only" />
        <div
          className="hamburger mobile-only"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </div>
      </div>

      <div className="header-right">
        <nav className="navigation desktop-only">
          <ul className="navigation-ul">
            {Object.keys(translations?.navigation || {}).map((key) => (
              <li key={key}>
                <Link to={`${key}`}>{translations.navigation[key]}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div
          style={{ position: "relative", display: "inline-block" }}
          ref={popupRef}
        >
          <div
            onClick={(e) => {
              e.preventDefault();
              setOpen((prev) => !prev);
            }}
            style={{
              fontSize: "15px",
              fontWeight: "500",
              display: "flex",
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            {lang === "en" ? (
              <div>
                English
                <img
                  style={{ marginLeft: "12px" }}
                  src="/GB.png"
                  alt="logoEn"
                  className="logoEn"
                />
              </div>
            ) : (
              <div>
                Svenska
                <img
                  style={{ marginLeft: "12px" }}
                  src="/SE.png"
                  alt="logoSv"
                  className="logoSv"
                />
              </div>
            )}
          </div>

          {open && (
            <div className="lang-popup">
              <div onClick={() => handleLangClick("en")}>
                <img src="/GB.png" alt="English" className="logoChangeLang" />
                <span className="textLang">English</span>
              </div>
              <div onClick={() => handleLangClick("sv")}>
                <img src="/SE.png" alt="Swedish" className="logoChangeLang" />
                <span className="textLang">Svenska</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {menuOpen && (
        <nav ref={menuRef} className="navigation mobile-only open">
          <ul className="navigation-ul">
            {Object.keys(translations?.navigation || {}).map((key) => (
              <li key={key}>
                <Link
                  as={Link}
                  to={`/${key}`}
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  {translations.navigation[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
