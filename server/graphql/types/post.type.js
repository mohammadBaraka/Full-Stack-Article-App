export const postTypeDefs = /* GraphQL */ `
  scalar Upload
  type Post {
    id: String
    title: String
    desc: String
    img: String!
    categories: [Category]
    usersId: String
    User: User!
    likes: [Likes]
    comments: [Comments]
    createdAt: String
    updatedAt: String
  }
  input PostInputs {
    title: String
    desc: String
    img: Upload
    usersId: String
  }
  type Query {
    getAllPosts: [Post]
    getOnePost(id: String): Post
    getPostByTitle(title: String): [Post]
    getPostByCategory(id: String): [Post]
    getPostByUserId(id: String): [Post]
  }

  type Mutation {
    createPost(
      title: String
      desc: String
      img: Upload
      usersId: String
      categoryId: [String]
    ): Post

    updatePost(
      id: String
      title: String
      desc: String
      img: Upload
      usersId: String
      categoryId: [String]
    ): Post

    deletePost(id: String): String
  }
`;
