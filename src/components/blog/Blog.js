import React from "react";
import "./Blog.css";

import EastIcon from "@mui/icons-material/East";

function Blog(props) {
  return (
    <a
      className="blog_link"
      target={"_blank"}
      rel={"noreferrer"}
      href={props.link}
    >
      <div className="blog">
        <img src={props.image} alt={props.title} />
        <p className="blog__title">{props.title}</p>
        <p className="blog__description">{props.description}</p>
        <div className="blog__read">
          <span href="/#">Read The Story</span>
          <EastIcon sx={{ fontSize: 19 }} className="blog__arrow" />
        </div>
      </div>
    </a>
  );
}

export default Blog;
