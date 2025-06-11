import { gql, useQuery } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      id
      title
      desc
      img
      User {
        id
        name
        img
      }
      comments {
        id
        title
        usersId
        postsId
        user {
          id
          name
          img
        }
      }
      likes {
        id
        usersId
      }
      User {
        id
        name
      }
      createdAt
    }
  }
`;

const GET_POST_BY_Category = gql`
  query getPostByCategory($id: String) {
    getPostByCategory(id: $id) {
      id
      title
      desc
      img
      comments {
        id
      }
      likes {
        id
        usersId
      }
    }
  }
`;
const GET_POSTS_BY_USERS_ID = gql`
  query getPostByUserId($id: String) {
    getPostByUserId(id: $id) {
      User {
        id
        name
        img
        posts {
          title
          img
          desc
          comments {
            title
          }
          likes {
            id
          }
        }
      }
    }
  }
`;
const GET_POST_BY_TITLE = gql`
  query getPostByTitle($title: String) {
    getPostByTitle(title: $title) {
      id
      title
      desc
      img
      usersId
    }
  }
`;

const GET_Post = gql`
  query getPost($id: String) {
    getOnePost(id: $id) {
      id
      title
      desc
      img
      comments {
        id
        title
      }
      categories {
        id
      }
      usersId
      User {
        id
        name
        img
      }
    }
  }
`;

export const GtAllPosts = () => {
  const { data, error, loading } = useQuery(GET_ALL_POSTS);

  return { data, error, loading };
};

export const GetPost = (id) => {
  const { data, error, loading } = useQuery(GET_Post, {
    variables: { id },
  });
  return { data, error, loading };
};

export const GetPostByTitle = (title) => {
  const { data, error, loading } = useQuery(GET_POST_BY_TITLE, {
    variables: { title },
  });
  return { data, error, loading };
};

export const GetPostByCategory = (id) => {
  const { data, error, loading } = useQuery(GET_POST_BY_Category, {
    variables: { id },
  });
  return { data, error, loading };
};

export const GetPostsByUsersId = (id) => {
  const { data, error, loading } = useQuery(GET_POSTS_BY_USERS_ID, {
    variables: { id },
  });
  return { data, error, loading };
};
