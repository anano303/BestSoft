import React, { useState, useEffect } from "react";
import headPicture from "./head picture.png";
import "./Prices.css";
import CircleEffect from "../../Components/CircleEffect/CircleEffect";
import CircleSquare from "../../Components/CircleSquare/CircleSquare";
import CalculationPage from "../Calculator/Calculation";

const Prices = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="prices">
      {!isMobile && <CircleEffect />}

      <div className="servSect1 contactSect1 priceSect1">
        {isMobile ? (
          <img alt="contactImage" src={headPicture} className="image" />
        ) : null}
        {!isMobile && <CircleSquare />}

        <CalculationPage />
      </div>
    </div>
  );
};

export default Prices;
