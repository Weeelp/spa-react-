import React, { useState, useEffect } from "react";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import { usePosts } from "../hooks/usePost";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import { getPagesCount } from "../components/utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";

// import { useDispatch, useSelector } from "react-redux";
// import {
//   addManyPostsData,
//   createPostsData,
//   removePostsData,
// } from "../store/postReducer";

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

  // const dispatch = useDispatch();
  // const selector = useSelector((state) => {
  //   return state.post.posts;
  // });
  // const [fetchPostsData, isPostsLoadingData, postErrorData] = useFetching(
  //   async () => {
  //     const respStore = await PostService.getAllData();
  //     // console.log(typeof respStore, respStore.data);
  //     dispatch(addManyPostsData(respStore.data));
  //   }
  // );
  // useEffect(() => {
  //   fetchPostsData();
  // }, []);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const changePage = (page) => {
    setPage(page);
  };

  const createPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(
      posts.filter((p) => {
        // dispatch(removePostsData(p.id));
        return p.id !== post.id;
      })
    );
  };

  const setLikeOnPost = (like, post) => {
    like.toggle("active");

    post.liked = !post.liked;
  };

  return (
    <div className="App">
      {/* <div>
        {selector.map((p) => (
          <div key={p.id}>{p.title}</div>
        ))}
      </div> */}
      <MyButton onClick={() => setModal(true)}>Создать карту</MyButton>
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

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Products;
