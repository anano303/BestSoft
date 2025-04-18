import React, { useState, useEffect } from "react";
import "./App.css";
import Layout from "./Layouts/Layout.js";
import Home from "./Pages/Home/Home.jsx";
import About from "./Pages/About/About.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import { ThemeContext } from "./Hooks/ThemeContext.js";
import { LanguageContext } from "../src/Hooks/LanguageContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Service from "./Pages/Service/Service.jsx";
import Prices from "./Pages/Prices/Prices.jsx";
import Calculation from "./Pages/Calculator/Calculation.jsx";
import Portfolio from "./Pages/Portfolio/Portfolio.jsx";
import { FormProvider } from "./Hooks/FormContext.js";
import { HelmetProvider } from "react-helmet-async";
import ReactPixel from "react-facebook-pixel";
import { inject } from "@vercel/analytics";

const AppContent = () => {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("ge");

  const location = useLocation();
  inject();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlTheme = searchParams.get("theme");
    const urlLanguage = searchParams.get("lang");

    if (urlTheme) {
      setTheme(urlTheme);
    }

    if (urlLanguage) {
      setLanguage(urlLanguage);
    }
  }, [location.search]);

  useEffect(() => {
    const appEl = document.getElementById("app");
    if (appEl) {
      appEl.className = theme;
    }
  }, [theme]);

  useEffect(() => {
    document.body.className = language;
  }, [language]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <HelmetProvider>
      <div className="App" id="app">
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <LanguageContext.Provider value={{ language, setLanguage }}>
            <FormProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Home />
                    </Layout>
                  }
                />
                <Route
                  path="/service"
                  element={
                    <Layout>
                      <Service />
                    </Layout>
                  }
                />
                <Route
                  path="/prices"
                  element={
                    <Layout>
                      <Prices page="prices" />
                    </Layout>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <Layout>
                      <About />
                    </Layout>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <Layout>
                      <Contact page="contact" />
                    </Layout>
                  }
                />
                <Route
                  path="/Calculation"
                  element={
                    <Layout>
                      <Calculation />
                    </Layout>
                  }
                />
                <Route
                  path="/Portfolio"
                  element={
                    <Layout>
                      <Portfolio />
                    </Layout>
                  }
                />
              </Routes>
            </FormProvider>
          </LanguageContext.Provider>
        </ThemeContext.Provider>
      </div>
    </HelmetProvider>
  );
};

function App() {
  useEffect(() => {
    // ჩაანაცვლეთ თქვენი Pixel ID
    ReactPixel.init("1202180340893975");
    ReactPixel.pageView(); // თვალყურის დევნა გვერდების ჩატვირთვაზე
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
