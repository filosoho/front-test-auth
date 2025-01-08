import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
});

export const fetchArticles = (params) => {
  return api.get("/articles", { params }).then((response) => {
    return response.data.articles;
  });
};

export const fetchArticleById = (articleId) => {
  return api.get(`/articles/${articleId}`).then((response) => {
    return response.data.article;
  });
};

export const fetchCommentsByArticleId = (articleId) => {
  return api
    .get(`/articles/${articleId}/comments`)
    .then((response) => response.data.comments);
};

export const fetchUsers = () => {
  return api.get("/users").then((response) => {
    console.log("response fetch users: ", response);
    return response.data.users;
  });
};

export const voteOnArticle = (articleId, voteChange) => {
  return api
    .patch(`/articles/${articleId}`, { inc_votes: voteChange })
    .then((response) => {
      return response.data.article;
    });
};

export const postComment = (articleId, comment) => {
  return api
    .post(`/articles/${articleId}/comments`, comment)
    .then((response) => response.data.comment);
};

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`).then((response) => {
    if (response.status === 204) {
      return response;
    }
  });
};

export const fetchTopics = () => {
  return api.get("/topics").then((response) => {
    return response.data.topics;
  });
};
