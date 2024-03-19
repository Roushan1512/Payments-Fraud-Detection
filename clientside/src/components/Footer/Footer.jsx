// Footer.js
import React from "react";
import FooterNav from "./FooterNav";
import ContactInfo from "./ContactInfo";
import SocialLinks from "./SocialLinks";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#000] flex justify-center pt-6 pb-4 items-center h-auto w-[90vw] gap-36 mx-auto rounded-t-3xl mt-20 flex-wrap">
        <FooterNav />
        <div>
          <ContactInfo />
          <br />
          <br />
          <Copyright />
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;
