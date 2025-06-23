"use client";
import React, { useEffect, useState, Suspense, useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Input } from "@material-tailwind/react";
import {
  CreatePostMutation,
  UpdatePostMutation,
} from "@/app/graphql/Mutations/PostMutation";
import { UseSenTokn } from "@/app/graphql/Queris/SenTokn";
import { msgError, msgSuccess } from "@/app/utils/msg";
import { GetPost } from "@/app/graphql/Queris/Post";
import Categories from "@/app/components/WriteComponents/Categoris";
import { Loader } from "@/app/components/Loader/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { GetAllCategories } from "@/app/graphql/Queris/Ctegory";
import Publish from "@/app/components/WriteComponents/Bublish";
const QuillEditor = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Home() {
  const postId = useSearchParams().get("post");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const { data: postData, loading: loadingPost } = GetPost(postId);
  const { data: token } = UseSenTokn();
  const {
    updatePost,
    data: dataUpdate,
    loading: loadingUpdate,
  } = UpdatePostMutation();

  const usersId = token?.SenTokn?.id;
  const categoriesIds = postData?.getOnePost?.categories?.map((cat) => cat?.id);

  // Initialize state with empty values to prevent hydration mismatch
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    usersId: undefined,
    img: null,
    categoryId: [],
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoize categoriesIds to prevent unnecessary re-renders
  const memoizedCategoriesIds = useMemo(() => {
    return postData?.getOnePost?.categories?.map((cat) => cat?.id) || [];
  }, [postData?.getOnePost?.categories]);

  useEffect(() => {
    if (isClient && postData?.getOnePost && usersId) {
      const newInputs = {
        title: postData.getOnePost.title || "",
        desc: postData.getOnePost.desc || "",
        usersId: usersId,
        img: postData.getOnePost.img || null,
        categoryId: categoriesIds || [],
      };

      // Only update if the values are actually different
      setInputs((prevInputs) => {
        const hasChanged =
          prevInputs.title !== newInputs.title ||
          prevInputs.desc !== newInputs.desc ||
          prevInputs.usersId !== newInputs.usersId ||
          prevInputs.img !== newInputs.img ||
          JSON.stringify(prevInputs.categoryId) !==
            JSON.stringify(newInputs.categoryId);

        return hasChanged ? newInputs : prevInputs;
      });
    }
  }, [
    isClient,
    postData?.getOnePost?.title,
    postData?.getOnePost?.desc,
    postData?.getOnePost?.img,
    usersId,
    JSON.stringify(categoriesIds),
  ]);

  useEffect(() => {
    if (isClient && postId && postData?.getOnePost?.img && !imagePreview) {
      setImagePreview(postData.getOnePost.img);
    }
  }, [isClient, postId, postData?.getOnePost?.img, imagePreview]);

  const {
    createPost,
    loading: loadingCreate,
    data,
    error: errorCreate,
  } = CreatePostMutation(inputs);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setInputs((prevState) => ({
          ...prevState,
          [name]: file,
        }));
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const variables = {
      title: inputs.title,
      desc: inputs.desc,
      usersId,
      categoryId: inputs.categoryId,
    };

    if (inputs.img instanceof File) {
      variables.img = inputs.img;
    }

    if (postId) {
      variables.id = postId;
      updatePost({
        variables,
      })
        .then((res) => {
          msgSuccess("Post Updated Successfully");
          setInputs({
            title: "",
            desc: "",
            img: null,
            categoryId: [],
          });
          setImagePreview(null);
          router.push("/pages/articles");
        })
        .catch((err) => {
          msgError(err?.message);
        });
    } else {
      createPost({
        variables,
      })
        .then(() => {
          msgSuccess("Post Created Successfully");
          setInputs({
            title: "",
            desc: "",
            img: null,
            categoryId: [],
          });
          setImagePreview(null);
          router.push("/pages/articles");
        })
        .catch((err) => {
          msgError(err?.message);
        });
    }
  };

  const handleDescChange = (value) => {
    setInputs((prevState) => ({
      ...prevState,
      desc: value,
    }));
  };

  const { data: categories, loading } = GetAllCategories();

  if (!isClient || loading || loadingPost) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Input
        type="hidden"
        color="teal"
        value={inputs.usersId || ""}
        name="usersId"
        onChange={handleChange}
      />
      <main className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 gap-4 sm:gap-6 lg:gap-8 lg:flex-row lg:mt-marginGlobal">
        {/* Main Content Area */}
        <div className="flex flex-col gap-4 w-full lg:w-2/3">
          <Input
            color="teal"
            label="Title"
            value={inputs.title}
            name="title"
            onChange={handleChange}
            className="w-full"
          />
          <div className="h-64 sm:h-80 md:h-96 lg:h-[59vh]">
            <QuillEditor
              className="h-full"
              value={inputs.desc}
              onChange={handleDescChange}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4 w-full lg:w-1/3 lg:max-w-md">
          {/* Publish Section */}
          <div className="w-full">
            <Publish
              loadingUpdate={loadingUpdate}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              params={postId}
              loadingCreate={loadingCreate}
              imagePreview={imagePreview}
            />
          </div>

          {/* Categories Section */}
          <div className="w-full border border-gray-200 rounded-lg p-4 min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
            <Categories
              categories={categories}
              handleChange={handleChange}
              inputs={inputs}
            />
          </div>
        </div>
      </main>
    </Suspense>
  );
}
