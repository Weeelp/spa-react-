import React from "react";
import MyButton from "./UI/button/MyButton";
import heartIMG from "../API/img/img-320593.svg";

const PostItem = (props) => {
  return (
    <div className="post">
      <div>
        <div className="post__content">
          <strong>
            {props.number}. {props.post.title}
          </strong>
        </div>
        <div style={{ width: "100px", height: "100px" }}>
          {" "}
          <img
            src={props.post.url}
            className="post__img"
            alt="Нет изображения"
          />
        </div>{" "}
      </div>
      <div className="post__container">
        <img
          src={heartIMG}
          alt="like"
          className="post__like"
          onClick={(e) => props.setLike(e.target.classList, props.post)}
        />
        <div className="post__btns">
          <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
        </div>
      </div>
      <div className="post__body">{props.post.body}</div>
    </div>
  );
};

export default PostItem;
