import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/App.css";
import { fetchTranslations, setLang } from "./features/language/languageSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import Us from "./pages/Us";
import Products from "./pages/Products";

function App() {
  const dispatch = useDispatch();
  const { lang, translations, loading } = useSelector(
    (state) => state.language
  );

  const isPopup = window.name === "usWindow";

  useEffect(() => {
    if (!isPopup) {
      const storedLang = localStorage.getItem("lang");
      dispatch(setLang(storedLang ?? "en"));
      dispatch(fetchTranslations(storedLang ?? "en"));
    }
  }, [dispatch, isPopup]);

  function handleSelectLang(selectedLang) {
    localStorage.setItem("lang", selectedLang);
    dispatch(setLang(selectedLang));
    dispatch(fetchTranslations(selectedLang));
  }

  if (isPopup) {
    return (
      <div className="App">
        <Router>
          <Header
            translations={translations}
            lang={lang}
            handleSelectLang={handleSelectLang}
          />
          <Routes>
            <Route path="/us" element={<Us />} />
          </Routes>
        </Router>
      </div>
    );
  }

  return (
    <div className="App">
    <div className="bgFixed" aria-hidden />
      {!loading && (
        <Router>
          <Header
            translations={translations}
            lang={lang}
            handleSelectLang={handleSelectLang}
          />

          <Routes>
            <Route
              path="/home"
              element={<Home childern={translations?.navigation?.home} />}
            />
            <Route
              path="/order"
              element={<Home childern={translations?.navigation?.order} />}
            />
            <Route
              path="/about_us"
              element={<Home childern={translations?.navigation?.about_us} />}
            />
            <Route
              path="/our_customer"
              element={
                <Home childern={translations?.navigation?.our_customer} />
              }
            />
            <Route
              path="/contact_us"
              element={<Home childern={translations?.navigation?.contact_us} />}
            />
            <Route path="/terms" element={<Terms />} />
            <Route path="/products" element={<Products />} />

          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
