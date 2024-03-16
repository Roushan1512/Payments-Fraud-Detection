// Footer.js
import React from 'react';
import FooterNav from './FooterNav';
import ContactInfo from './ContactInfo';
import SocialLinks from './SocialLinks';
import Copyright from './Copyright';

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#6C16C7] flex justify-center items-center h-[40vh] w-[90vw] gap-36 mx-auto rounded-b-3xl ">
      <FooterNav />
      <ContactInfo />
      <SocialLinks />
      <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
