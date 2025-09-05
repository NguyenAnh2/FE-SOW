import React from "react";
import ReactMarkdown from "react-markdown";
import "./Terms.css";
import rehypeRaw from "rehype-raw";
import { useSelector } from "react-redux";

export function Terms() {
  const { translations } = useSelector((state) => state.language);
  const termEntries = Object.entries(translations?.terms || {})
    .filter(([key]) => key.startsWith("terms_text_"))
    .sort(([a], [b]) => {
      const numA = parseInt(a.replace("terms_text_", ""), 10);
      const numB = parseInt(b.replace("terms_text_", ""), 10);
      return numA - numB;
    });

  const LinkRenderer = ({ href, children }) => {
    const handleClick = (e) => {
      e.preventDefault();

      const popupWidth = 1000;
      const popupHeight = window.screen.height;
      const left = 10;
      const top = 10;

      window.open(
        href,
        "usWindow",
        `height=${popupHeight},width=${popupWidth},left=${left},top=${top},resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=yes`
      );
    };

    return (
      <a href={href} onClick={handleClick}>
        {children}
      </a>
    );
  };

  return (
    <div className="termsContianer">
      <div>
        <h1
          style={{
            textAlign: "center",
            marginTop: "24px",
            color: "white",
            fontSize: "1.5em",
          }}
        >
          {translations?.terms?.terms}
        </h1>
        <button className="go-back-button">{translations?.terms?.close}</button>
      </div>

      <div className="termsContent">
        {termEntries.map(([key, text]) => (
          <div key={key} className="termSection">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{ a: LinkRenderer }}
            >
              {text}
            </ReactMarkdown>
          </div>
        ))}
      </div>

      <button className="go-back-button">{translations?.terms?.close}</button>
    </div>
  );
}
