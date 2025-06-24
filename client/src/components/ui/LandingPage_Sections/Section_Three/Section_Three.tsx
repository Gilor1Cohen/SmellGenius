import purchasing from "../../../../images/purchasing.png";
import Situations from "../../../../images/Situations.png";
import Discounts from "../../../../images/Discounts.png";

import "./Section_Three.css";

export default function SectionThree() {
  return (
    <section className="SectionThree" id="features">
      <h1>Features</h1>

      <div className="features-box">
        <img src={purchasing} alt="" />
        <p>AI-based personalized purchasing recommendations</p>
      </div>

      <div className="features-box">
        <img src={Situations} alt="" />
        <p>AI-based perfume recommendations for situations</p>
      </div>

      <div className="features-box">
        <img src={Discounts} alt="" />
        <p>Special discounts</p>
      </div>
    </section>
  );
}
