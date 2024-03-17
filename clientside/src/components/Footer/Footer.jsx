// Footer.js
import React from "react";
import FooterNav from "./FooterNav";
import ContactInfo from "./ContactInfo";
import SocialLinks from "./SocialLinks";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#000] flex justify-center items-center h-[25vh] w-[90vw] gap-36 mx-auto rounded-t-3xl mt-20">
        <FooterNav />
        <ContactInfo />
        <SocialLinks />
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
