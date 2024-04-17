import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useCookies } from 'react-cookie';
import "./Header.css";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [cookies ,setCookie] = useCookies(['user']);
  const isCookieSet = cookies.Token !== undefined;

  const Logout =  (event) => {
    try {
      event.preventDefault();
      console.log(isCookieSet)
      console.log(cookies.Token)
      const action = axios.get("/logout",{"params":{"token":cookies.Token}}).then(function(response){
        if(response.data.error)
        {
            alert(response.data.error)// Set error message received from backend
        }
        else
        {
            setCookie("Token", undefined);
            setCookie("UserId",undefined);
            navigate("/login");
        }
      });
    } catch (err) {
      // Handle other unexpected errors
      console.error("Error during Logout:", err);
    }
  }

  const authenticated = [
    {
      id: 1,
      title: "Topics",
      to: "/topics",
    },
    {
      id: 2,
      title: "Github",
      to: "https://github.com/badri119/Project-Unemployment",
      target: "_blank",
    },

    {
      id: 3,
      title: "Why and future updates",
      to: "/why",
    },
    {
      id: 4,
      title: "Logout",
      to: "",
      click: Logout
    },
  ];
  const unauthenticated = [
    {
      id: 1,
      title: "Topics",
      to: "/topics",
    },
    {
      id: 2,
      title: "Github",
      to: "https://github.com/badri119/Project-Unemployment",
      target: "_blank",
    },
    {
      id: 3,
      title: "Why and future updates",
      to: "/why",
    },
    {
      id: 4,
      title: "Login",
      to: "/login",
    },
  ];

  if (!isCookieSet)
  {
    // const links = unauthenticated;
    return (
      <div className="header-container">
        <ul className=" header-links">
          {unauthenticated.map(({ id, title, to, target }) => (
            <li key={id} className="li-point ">
              <a
                href={to}
                target={target}
                smooth={true}
                duration={50}
                className="a-link"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
        <div onClick={() => setNav(!nav)} className="hamburger">
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
        {nav && (
          <ul className="hamburger-ul">
            {unauthenticated.map(({ id, title, to, target }) => (
              <li key={id} className="hamburger-li">
                <a
                  onClick = { setNav(!nav) }
                  href={to}
                  target={target}
                  smooth={true}
                  duration={50}
                  className="hamburger"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  else
  {
    // const links = authenticated;
    return (
      <div className="header-container">
        <ul className=" header-links">
          {authenticated.map(({ id, title, to, target, click }) => (
            <li key={id} className="li-point ">
              <a
                href={to}
                target={target}
                smooth={true}
                duration={50}
                className="a-link"
                onClick = {click}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
        <div onClick={() => setNav(!nav)} className="hamburger">
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
        {nav && (
          <ul className="hamburger-ul">
            {authenticated.map(({ id, title, to, target, click }) => (
              <li key={id} className="hamburger-li">
                <a
                  click = {click ? {click} : setNav(!nav)}
                  href={to}
                  target={target}
                  smooth={true}
                  duration={50}
                  className="hamburger"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
};

export default Header;
