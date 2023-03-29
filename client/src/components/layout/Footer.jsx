import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <strong>Óscar Couto Oujo</strong>
      <div className="external link" id="github">
        <img className="icon" src="/github.png" />
        <a href="https://github.com/oscarjco" target="_blank">
          Github
        </a>
      </div>
      <div className="external link" id="linkedin">
        <img className="icon" src="/linkedin.png" />
        <a
          href="https://www.linkedin.com/in/%C3%B3scar-couto-oujo-90a444110/"
          target="_blank"
        >
          Linkedin
        </a>
      </div>
      <div className="external link" id="mail">
        <img className="icon" src="/email.png" />
        <a href="mailto: oskarc94@hotmail.es">oskarc94@hotmail.es</a>
      </div>
    </footer>
  );
};

export default Footer;
