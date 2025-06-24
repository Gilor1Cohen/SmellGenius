import drop from "../../../images/drop.png";
import home from "../../../images/Home.png";
import shop from "../../../images/Shop.png";
import profile from "../../../images/Profile.png";

import { Link, useLocation, useNavigate } from "react-router-dom";

import GoldBtn from "../goldBtn/goldBtn";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

import "./nav.css";

export default function NavUi() {
  const { pathname } = useLocation();

  const { auth } = useContext(UserContext);

  const hideNav: boolean =
    !auth && (pathname === "/SignUp" || pathname === "/LogIn");

  if (hideNav) return <></>;

  const navMaxWidth: string = auth ? "325px" : "600px";

  const navigate = useNavigate();

  return (
    <nav id="navUi" style={{ maxWidth: navMaxWidth }}>
      {auth ? (
        <>
          <Link to="/" className="auth-nav-item">
            <img className="auth-img" src={home} alt="" />
            <p className="auth-p">Home</p>
          </Link>

          <Link to="/Shop" className="auth-nav-item">
            <img className="auth-img" src={shop} alt="" />
            <p className="auth-p">Shop</p>
          </Link>

          <Link to="/Profile" className="auth-nav-item">
            <img className="auth-img" src={profile} alt="" />
            <p className="auth-p">Profile</p>
          </Link>
        </>
      ) : (
        <>
          <a href="#about" className="unauth-nav-item">
            About Us
          </a>
          <a href="#how-it-works" className="unauth-nav-item">
            How It Works
          </a>
          <img src={drop} id="middle-nav" />
          <a href="#features" className="unauth-nav-item">
            Features
          </a>
          <GoldBtn
            text="Get Started"
            type="button"
            onClick={() => {
              navigate("/SignUp");
            }}
          />
        </>
      )}
    </nav>
  );
}
