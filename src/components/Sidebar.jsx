import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();
  useEffect(() => {
    let children = document.querySelector(".sidebar").children;
    if (location.pathname === "/") {
      for (let i = 0; i < children.length; i++) {
        if (i === 0) {
          children[i].setAttribute("data-active", "1");
        } else {
          children[i].setAttribute("data-active", "0");
        }
      }
    } else if (location.pathname === "/upload") {
      for (let i = 0; i < children.length; i++) {
        if (i === 1) {
          children[i].setAttribute("data-active", "1");
        } else {
          children[i].setAttribute("data-active", "0");
        }
      }
    } else if (location.pathname === "/posts") {
      for (let i = 0; i < children.length; i++) {
        if (i === 2) {
          children[i].setAttribute("data-active", "1");
        } else {
          children[i].setAttribute("data-active", "0");
        }
      }
    } else if (location.pathname === "/setting") {
      for (let i = 0; i < children.length; i++) {
        if (i === 3) {
          children[i].setAttribute("data-active", "1");
        } else {
          children[i].setAttribute("data-active", "0");
        }
      }
    }
  }, [location.pathname ]);
  return (
    <>
      <div className="sidebar">
        <div data-active="0" className="item">
          <Link to="/">
            <i data-title="Home" className="ri-home-5-line"></i>
          </Link>
        </div>
        <div data-active="0" className="item">
          <Link to="/upload">
            <i data-title="Add" className="ri-add-circle-line"></i>
          </Link>
        </div>
        <div data-active="0" className="item">
          <Link to="/posts">
            <i data-title="Posts" className="ri-layout-grid-line"></i>
          </Link>
        </div>
        <div data-active="0" className="item">
          <Link to="/setting">
            <i data-title="Settings" className="ri-settings-4-line"></i>
          </Link>
        </div>
        <div data-active="0" className="item">
          <i data-title="Logout" className="warning ri-logout-circle-line"></i>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
