import React from "react";
import classes from  "./Blog.module.css";

import EastIcon from "@mui/icons-material/East";

function Blog(props) {
  return (
    <a
      className={classes.blog_link}
      target={"_blank"}
      rel={"noreferrer"}
      href={props.link}
    >
      <div className={classes.blog}>
        <img src={props.image} alt={props.title} />
        <p className={classes.blog__title}>{props.title}</p>
        <p className={classes.blog__description}>{props.description}</p>
        <div className={classes.blog__read}>
          <span href="/#">Read The Story</span>
          <EastIcon sx={{ fontSize: 19 }} className={classes.blog__arrow} />
        </div>
      </div>
    </a>
  );
}

export default Blog;
