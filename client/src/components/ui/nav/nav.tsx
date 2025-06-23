import drop from "../../../images/drop.png";
import home from "../../../images/Home.png";
import shop from "../../../images/Shop.png";
import profile from "../../../images/Profile.png";

import { Link, useLocation } from "react-router-dom";

import type { NavUiProps } from "../../../types/UI.types";

import "./nav.css";

export default function NavUi({ auth }: NavUiProps) {
  const { pathname } = useLocation();

  const hideNav: boolean =
    !auth && (pathname === "/SignUp" || pathname === "/LogIn");

  if (hideNav) return <></>;

  const navMaxWidth: string = auth ? "325px" : "600px";

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
          <button id="get-started">Get Started</button>
        </>
      )}
    </nav>
  );
}
