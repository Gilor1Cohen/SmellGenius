import profile from "../../../../images/Profile.png";
import AI from "../../../../images/AI.png";
import Tools from "../../../../images/Tools.png";
import Discounts from "../../../../images/Discounts.png";

import "./Section_Four.css";

export default function SectionFour() {
  return (
    <section id="how-it-works" className="SectionFour">
      <h1>How It Works?</h1>

      <div className="boxes">
        <div className="how-box">
          <p className="stepNum">Step 1</p>
          <img src={profile} className="stepImg" />
          <h1 className="stepName">Create a profile</h1>
          <p className="stepD">
            Sign up and set up your personal preferences to get started.
          </p>
        </div>

        <div className="how-box">
          <p className="stepNum">Step 2</p>
          <img src={AI} className="stepImg" />
          <h1 className="stepName">Let AI recognize your favorite perfumes</h1>
          <p className="stepD">
            Select or upload your favorite scents so the AI can learn your
            taste.
          </p>
        </div>

        <div className="how-box">
          <p className="stepNum">Step 3</p>
          <img src={Tools} className="stepImg" />
          <h1 className="stepName">Use the AI tools</h1>
          <p className="stepD">
            Explore personalized recommendations and advanced AI features.
          </p>
        </div>

        <div className="how-box">
          <p className="stepNum">Step 4</p>
          <img src={Discounts} className="stepImg" />
          <h1 className="stepName">Buy perfumes at an exclusive discount</h1>
          <p className="stepD">
            Enjoy special member-only prices on top fragrances.
          </p>
        </div>
      </div>
    </section>
  );
}
