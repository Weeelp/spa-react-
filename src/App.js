import React, { useState, useEffect } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/Loader/Loader";
import { usePosts } from "./hooks/usePost";
import { useFetching } from "./hooks/useFetching";
import PostService from "./API/PostService";
import { getPagesCount } from "./components/utils/pages";
import { usePagination } from "./hooks/usePagination";
import MyInput from "./components/UI/input/MyInput";

function App() {
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

  const pagesArray = usePagination(totalPages);

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
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
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Создать карточку
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

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

      {
        <div className="page__wrapper">
          <h1 className="page__title">введите страницу:</h1>
          <MyInput
            type="number"
            min={0}
            max={totalPages}
            style={{ width: "200px" }}
          ></MyInput>
        </div>
      }
    </div>
  );
}

export default App;
