import { useRef, useState } from "react";
import { BiSolidDetail } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { FaFile } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

export default function HeaderBusiness({
  translations,
  lang,
  handleSelectLang,
}) {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  const handleLangClick = (code) => {
    handleSelectLang(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  return (
    <>
      <header className="header-business">
        <div className="header-business-container">
          <div className="header-business-left">
            <div className="desktop-only">
              <ul>
                <li className="active">
                  <p>Business Detail</p>
                  <span>
                    <BiSolidDetail />
                  </span>
                </li>
                <li>
                  <p>Settings</p>
                  <span>
                    <IoSettings />
                  </span>
                </li>
                <li>
                  <p>Standard texts</p>
                  <span>
                    <FaListUl />
                  </span>
                </li>
                <li>
                  <p>Go to invoices</p>
                  <span>
                    <FaFile />
                  </span>
                </li>
              </ul>
            </div>
            <div className="hamburger mobile-only" style={{color: "black"}}>
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
                  fontSize: "18px",
                  fontWeight: "500",
                  display: "flex",
                  textDecoration: "none",
                  alignItems: "center",
                  color: "black",
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
    </>
  );
}
