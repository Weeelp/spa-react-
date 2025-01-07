import React, { useEffect, useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: "", body: "", url: "" });
  const [postError, setPostError] = useState({
    title: "Заголовок не может быть пустым!",
    url: "URL не может быть пустым!",
  });
  const [postDirty, setPostDirty] = useState({
    title: false,
    url: false,
  });
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    console.log();
    if (postError.title || postError.url) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [postError.title, postError.url]);

  const blurHundler = (e) => {
    switch (e.target.name) {
      case "title":
        setPostDirty({ title: true, url: postDirty.url });
        break;
      case "url":
        setPostDirty({ url: true, title: postDirty.title });
        break;
    }
  };

  const titleHundler = (e) => {
    setPost({ ...post, title: e.target.value });
    if (e.target.value.length < 1 || e.target.value.length > 30) {
      setPostError({
        title: "Должен содержать не меньше 1 и не больше 30 символов",
        url: postError.url,
      });
    } else {
      setPostError({ title: "", url: postError.url });
    }
  };

  const urlHundler = (e) => {
    setPost({ ...post, url: e.target.value });
    const urlRegEx = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegEx.test(String(e.target.value).toLowerCase())) {
      setPostError({ url: "Некорректный URL", title: postError.title });
    } else {
      setPostError({ url: "", title: postError.title });
    }
  };

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
    <form className="post__form">
      {postDirty.title && postError.title && (
        <div style={{ color: "red" }}>{postError.title}</div>
      )}
      <MyInput
        value={post.title}
        onBlur={(e) => blurHundler(e)}
        onChange={(e) => titleHundler(e)}
        type="text"
        name="title"
        placeholder="Загаловок"
      ></MyInput>

      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Описание"
      ></MyInput>

      {postDirty.url && postError.url && (
        <div style={{ color: "red" }}>{postError.url}</div>
      )}
      <MyInput
        value={post.url}
        onBlur={(e) => blurHundler(e)}
        onChange={(e) => urlHundler(e)}
        type="url"
        name="url"
        placeholder="URL"
      ></MyInput>
      <MyButton disabled={!formValid} onClick={addNewPost}>
        Создать карточку
      </MyButton>
    </form>
  );
};

export default PostForm;
