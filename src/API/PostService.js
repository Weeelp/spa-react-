import axios from "axios";

export default class PostService {
  static async getAll(limit = 10, page = 1) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      {
        params: {
          _limit: limit,
          _page: page,
        },
      }
    );

    return response;
  }

  static async getById(id) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/photos/" + id
    );
    return response;
  }

  static async getCommentsByPostId(id) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${id}/comments`
    );
    return response;
  }
}
