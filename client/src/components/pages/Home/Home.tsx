import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

import "./Home.css";
import HomeForm from "../../ui/homeForm/homeForm";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <section id="Home">
      <article id="blur">
        <h1>Hello {user?.Name}</h1>

        {user?.FavoritePerfumes && user?.FavoritePerfumes > 0 ? (
          <p>Ready to discover your next signature scent?</p>
        ) : (
          <p>
            Browse our collection and add some favorites to get personalized
            recommendations!
          </p>
        )}

        <div id="Boxes">
          <Link className="homeLink" to="/next-scent">
            <div className="Box">Find my next scent.</div>
          </Link>
          <Link className="homeLink" to="/scent-for-the-moment">
            <div className="Box">Scent for the moment.</div>
          </Link>
        </div>

        <HomeForm />
      </article>
    </section>
  );
}
