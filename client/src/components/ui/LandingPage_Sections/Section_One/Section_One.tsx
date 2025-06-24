import GoldBtn from "../../goldBtn/goldBtn";
import "./Section_One.css";
import { useNavigate } from "react-router-dom";

export default function SectionOne() {
  const navigate = useNavigate();

  return (
    <section id="section-one">
      <div className="text-box">
        <h1>Your Perfect Perfume, Crafted by AI Precision.</h1>
        <p>
          Our AI-driven platform analyzes your unique taste to curate the
          perfect perfume just for you—no more guessing, only personalized
          fragrance discovery
        </p>

        <GoldBtn
          text="Get Started"
          type="button"
          onClick={() => {
            navigate("/SignUp");
          }}
        />
      </div>
    </section>
  );
}
