import React, { useEffect, useState } from "react";
import MyButton from "./UI/button/MyButton";
import heartIMG from "../API/img/img-320593.svg";
import { useNavigate } from "react-router";

const PostItem = (props) => {
  const [post, setPost] = useState(props.post);
  const router = useNavigate();

  function onChange(e) {
    if (e.target.classList.contains("post-ckickable")) {
      router(`/products/${props.post.id}`);
    }
  }

  return (
    <div
      className="post post-ckickable"
      onClick={(e) => {
        onChange(e);
      }}
    >
      <div className="post__content post-ckickable">
        <strong className="post__title post-ckickable">
          {props.post.id}. {props.post.title}
        </strong>
        <img src={props.post.url} className="post__img" alt="Нет изображения" />
        <div className="post__body">{props.post.body}</div>
      </div>
      <div className="post__container post-ckickable">
        <img
          src={heartIMG}
          alt="like"
          className="post__like"
          onClick={(e) => {
            props.setLike(e.target.classList, props.post);
            setPost(post);
            console.log(post);
          }}
        />
        <div className="post__btns">
          <MyButton
            style={{ zIndex: "1" }}
            onClick={() => props.remove(props.post)}
          >
            Delete
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
