import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const resp = await PostService.getById(id);
    setPost(resp.data);
  });

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const resp = await PostService.getCommentsByPostId(id);
    setComments(resp.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", margin: "20px 40px" }}
    >
      <h1>Карта {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", margin: "20px 0" }}
        >
          <strong>
            {post.id}. {post.title}
          </strong>
          <img
            src={post.url}
            style={{ width: "250px", height: "250px", margin: "20px 0" }}
            alt="Not founded"
          />
          <p>{post.body}</p>
        </div>
      )}
      <h1>Комментарии:</h1>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div key={comm.id} style={{ marginTop: "20px" }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostPage;
