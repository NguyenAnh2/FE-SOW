import { useEffect } from "react";
import "./Us.css";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import rehypeRaw from "rehype-raw";
import {
  fetchTranslations,
  setLang,
} from "../../features/language/languageSlice";

export function Us() {
  const dispatch = useDispatch();
  const { translations, loading } = useSelector((state) => state.language);

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    dispatch(setLang(lang || "en"));
    dispatch(fetchTranslations(lang || "en"));
  }, [dispatch]);

  const termEntries = Object.entries(translations?.us || {})
    .filter(([key]) => key.startsWith("us_text_"))
    .sort(([a], [b]) => {
      const numA = parseInt(a.replace("us_text_", ""), 10);
      const numB = parseInt(b.replace("us_text_", ""), 10);
      return numA - numB;
    });

  const handleClose = () => {
    window.close();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="termsContianer">
      <button className="go-back-button" onClick={handleClose}>
        {translations?.us?.close}
      </button>
      <div className="termsContent">
        {termEntries.map(([key, text]) => (
          <div key={key} className="termSection">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{text}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
}
