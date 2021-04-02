import "./BrandLogo.css";

import parkingPointLogo from "../../../assets/images/parking-point-logo.png";

import { useHistory } from "react-router-dom";

const BrandLogo = () => {
  const history = useHistory();

  return (
    <div
      className="BrandLogo"
      onClick={() => {
        history.push("/");
      }}
    >
      <img src={parkingPointLogo} alt="brand logo" />
      <h2>
        <span>P</span>arking <span> P</span>oint
      </h2>
    </div>
  );
};

export default BrandLogo;
