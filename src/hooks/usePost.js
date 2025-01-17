import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    // console.log("OTR");

    if (sort && sort !== "liked") {
      console.log(sort);
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    } else if (sort === "liked") {
      console.log("Ты тут");
      return posts.filter((post) => post.liked);
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);
  const sortedAndSerachedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
  }, [query, sortedPosts]);

  return sortedAndSerachedPosts;
};
