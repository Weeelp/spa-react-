// const posts = [];
// const defaultState = {
//   posts: [],
// };

// const REMOVE_POST = "REMOVE_POST";
// const CREATE_POST = "CREATE_POST";
// const ADD_MANY_POSTS = "ADD_MANY_POSTS";
// const TOGGLE_LIKE = "TOGGLE_LIKE";

// export const postReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case REMOVE_POST:
//       console.log("remove", ...state.posts, action.payload, posts);

//       return {
//         ...state,
//         posts: state.posts.filter((p) => p.id !== action.payload),
//       };

//     case CREATE_POST:
//       console.log("create", ...state.posts, action, posts);
//       return { ...state, posts: [...state.posts, action.payload] };

//     case TOGGLE_LIKE:
//       console.log("create", ...state.posts, action, posts);
//       return { ...state, posts: [...state.posts, action.payload] };

//     case ADD_MANY_POSTS:
//       console.log("add");
//       // console.log("add", ...state.posts, action.payload, posts);
//       return { ...state, posts: [...action.payload] };
//     default:
//       return state;
//   }
// };

// export const createPostsData = (payload) => ({ type: REMOVE_POST, payload });
// export const removePostsData = (payload) => ({ type: CREATE_POST, payload });
// export const addManyPostsData = (payload) => ({
//   type: ADD_MANY_POSTS,
//   payload,
// });
