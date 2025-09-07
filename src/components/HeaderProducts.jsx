import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";

export default function HeaderProducts({
  translations,
  lang,
  handleSelectLang,
}) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("invoices");
  const popupRef = useRef(null);

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
    setActiveMenuItem("price");
  }, []);

  const handleLangClick = (code) => {
    handleSelectLang(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuItemClick = (itemKey) => {
    setActiveMenuItem(itemKey);
  };

  return (
    <>
      <header className="header-products">
        <div className="header-container">
          <div className="header-left">
            <div className="userAvatar desktop-only-header-product">
              <div className="avatarWrapper">
                <img src="/user.png" alt="userAvatar" />
                <div className="dotActive"></div>
              </div>
              <div>
                <h4>John Andre</h4>
                <p>Stanford AS</p>
              </div>
            </div>
            <div className="hamburger mobile-only" onClick={handleMenuToggle}>
              ☰
            </div>
          </div>

          <div className="header-right">
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
                  alignItems: "center",
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
                    <img
                      src="/GB.png"
                      alt="English"
                      className="logoChangeLang"
                    />
                    <span className="textLang">English</span>
                  </div>
                  <div onClick={() => handleLangClick("sv")}>
                    <img
                      src="/SE.png"
                      alt="Swedish"
                      className="logoChangeLang"
                    />
                    <span className="textLang">Svenska</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <Sidebar
        isOpen={menuOpen}
        onClose={handleMenuClose}
        activeItem={activeMenuItem}
        onItemClick={handleMenuItemClick}
      />
    </>
  );
}
