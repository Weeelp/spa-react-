import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: "", body: "", url: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost({ title: "", body: "", url: "" });
  };

  return (
    <form>
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Загаловок"
      ></MyInput>
      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Описание"
      ></MyInput>
      <MyInput
        value={post.url}
        onChange={(e) => setPost({ ...post, url: e.target.value })}
        type="url"
        placeholder="URL"
      ></MyInput>
      <MyButton onClick={addNewPost}>Создать карточку</MyButton>
    </form>
  );
};

export default PostForm;
