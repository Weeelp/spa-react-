import React, { createRef } from "react";
import PostItem from "./PostItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const PostList = ({ posts, title, remove, setLike }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup className="post__list">
        {posts.map((post, index) => {
          const nodeRef = createRef(); // Создание ref для CSSTransition
          return (
            <CSSTransition
              key={post.id}
              timeout={500}
              classNames="post"
              nodeRef={nodeRef} // Указываем nodeRef
            >
              <div ref={nodeRef}>
                <PostItem
                  setLike={setLike}
                  remove={remove}
                  number={index + 1}
                  post={post}
                ></PostItem>
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default PostList;
