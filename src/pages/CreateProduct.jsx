import React from "react";
import PostForm from "../components/PostForm";

const CreateProduct = () => {
  const createPost = (newPost) => {
    console.log("create");
    // setPosts([...posts, newPost]);
  };

  return (
    <div>
      <h1
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        Cоздание карты
      </h1>
      <PostForm create={createPost} />
    </div>
  );
};

export default CreateProduct;
