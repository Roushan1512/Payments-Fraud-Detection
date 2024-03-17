import React from "react";

const FooterNav = () => {
  return (
    <nav>
      <ul className="flex gap-8 flex-col text-[100%]">
        <li>
          <a href="#">About Us</a>
        </li>
        <li>
          <a href="#">Our Services</a>
        </li>
        <li>
          <a href="#">Contact Us</a>
        </li>
      </ul>
    </nav>
  );
};

export default FooterNav;
