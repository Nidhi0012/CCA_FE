import React from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div>
      <nav
        class="navbar navbar-expand-lg navbar-dark bg-success"
        style={{
          background:
            "linear-gradient(90deg, rgb(87 98 122), rgb(180, 196, 218))",
        }}
      >
        <div class="container-fluid">
          <Link to="/" class="nav-link active" aria-current="page" href="#">
            <a class="navbar-brand" href="#">
              Conference Club Application
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
};
