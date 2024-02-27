import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footer-links">
          <ul>
            <li>
              <a href="/conferences">Conferences</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Your Website Name. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
