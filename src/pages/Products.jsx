import React, { useState, useEffect } from "react";
// import "../styles/App";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import { usePosts } from "../hooks/usePost";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import { getPagesCount } from "../components/utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

function Products() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSerachedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPagesCount(totalCount, limit));
  });

  useEffect(() => {
    fetchPosts();
    console.log("ЩЕК");
  }, [page]);

  const changePage = (page) => {
    setPage(page);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const setLikeOnPost = (like, post) => {
    if (like.contains("active")) {
      like.remove("active");
    } else if (!like.contains("active")) {
      like.add("active");
    }
    post.liked = !post.liked;
  };

  return (
    <div className="App">
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      {postError && <h1>Произошла ошибка: {postError}</h1>}

      {isPostsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          setLike={setLikeOnPost}
          remove={removePost}
          posts={sortedAndSerachedPosts}
          title="Список карточек"
        />
      )}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Products;
