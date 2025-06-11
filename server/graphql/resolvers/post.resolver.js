import { GraphQLError } from "graphql";
import { prisma } from "../../utils/connect.js";
import { checkAuth } from "../../utils/verify.js";
import { uploadFile } from "../../utils/uploadFile.js";
export const postReaolvers = {
  Query: {
    getAllPosts: async () => {
      try {
        const User = true;
        const posts = await prisma.posts.findMany({
          orderBy: { createdAt: "desc" },
          include: {
            User,
            likes: true,
            comments: {
              include: { user: true },
            },
            categories: {
              include: {
                Category: true,
              },
            },
          },
        });

        if (!posts.length) throw new GraphQLError("There is no posts to show!");

        return posts;
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
    getPostByTitle: async (_, { title }) => {
      try {
        if (!title) throw new GraphQLError("Title is required");
        const postName = await prisma.posts.findMany({
          where: {
            title: {
              contains: title,
            },
          },
        });
        if (!postName.length) throw new GraphQLError("Post Not Found");
        return postName;
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },

    getPostByUserId: async (_, { id }) => {
      try {
        const usersPost = await prisma.posts.findMany({
          where: { usersId: id },
          include: {
            User: {
              include: {
                posts: {
                  include: {
                    comments: true,
                    likes: true,
                  },
                },
              },
            },
          },
        });
        if (!usersPost.length) throw new GraphQLError("Post Not Found");
        return usersPost;
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },

    getOnePost: async (_, { id }) => {
      try {
        const post = await prisma.posts.findUnique({
          where: { id },
          include: {
            User: true,
            comments: true,
            categories: {
              include: {
                Category: true,
              },
            },
          },
        });

        if (!post) throw new GraphQLError("Post Not Found");

        // Map the categories to return just the Category data, not PostCategory
        const categories = post.categories.map(
          (postCategory) => postCategory.Category
        );

        return {
          ...post,
          categories,
        };
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },

    getPostByCategory: async (_, { id }) => {
      try {
        const post = await prisma.posts.findMany({
          where: {
            categories: {
              some: {
                Category: {
                  id,
                },
              },
            },
          },

          include: {
            User: true,
            comments: true,
            likes: true,
          },
          orderBy: { createdAt: "desc" },
        });

        if (!post) throw new GraphQLError("Post Not Found");

        // Map the categories to return just the Category data, not PostCategory
        return post;
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    createPost: async (_, { title, desc, img, categoryId }, context) => {
      try {
        const user = checkAuth(context);
        const fileUrl = await uploadFile(img);

        const post = await prisma.posts.create({
          data: {
            title,
            desc,
            img: fileUrl,
            usersId: user.id,
            categories: {
              create: categoryId.map((id) => ({ categoryId: id })), // Simplified to connect a single category
            },
          },
          include: { User: true, comments: true, likes: true },
        });

        return post;
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },

    updatePost: async (_, { id, title, desc, img, categoryId }, context) => {
      try {
        const user = checkAuth(context);
        const fileUrl = await uploadFile(img);
        const post = await prisma.posts.update({
          where: { id },
          data: {
            title,
            desc,
            img: fileUrl,
            usersId: user.id,
            categories: {
              // remove all categories and create new ones
              deleteMany: {},
              create: categoryId.map((id) => ({ categoryId: id })),
            },
          },
          include: { User: true },
        });

        return post;
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
    deletePost: async (_, { id }, context) => {
      try {
        const usersId = checkAuth(context);
        const post = await prisma.posts.findMany({
          where: { id },
        });
        if (!post.length) throw new GraphQLError("Post Not Found");
        const allowed = usersId?.id === post[0].usersId;
        if (!allowed) throw new Error("Not Allowed To Delte Post");
        await prisma.posts.delete({
          where: { id },
        });
        return "Post Deleted Success";
      } catch (error) {
        throw new GraphQLError(error?.message);
      }
    },
  },
};
