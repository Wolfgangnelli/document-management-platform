import React from "react";
import "./_anchorLinks.scss";

const AnchorLinks = ({ anchor_links }) => {
  return (
    <ul>
      {anchor_links.map((l) => (
        <li className="hashtag" key={l}>
          <a
            href={`#${l.toLowerCase().replaceAll(" ", "-")}`}
            className="text-decoration-none"
          >
            {l}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default AnchorLinks;
