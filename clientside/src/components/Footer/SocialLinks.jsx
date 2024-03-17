import React from "react";

const SocialLinks = () => {
  return (
    <div>
      <ul className="flex gap-8 flex-col text-[75%] flex-wrap">
        <p className="bg-purple-800 px-2 rounded-2xl">
          Follow Us on social media
        </p>
        <li>
          <a href="#">Facebook</a>
        </li>
        <li>
          <a href="#">Twitter</a>
        </li>
        <li>
          <a href="#">Instagram</a>
        </li>
      </ul>
    </div>
  );
};

export default SocialLinks;
