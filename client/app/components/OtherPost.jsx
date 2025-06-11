"use client";
import Image from "next/image";
import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { useParams } from "next/navigation";
const OtherPost = ({ categories }) => {
  const { id } = useParams();

  const categoriesData = categories?.getPostByCategory.filter((catId) => {
    return catId.id !== id;
  });

  return (
    <div className="w-full">
      <h3 className="mb-4 text-gray-500 font-bold text-lg sm:text-xl">
        Other Posts
      </h3>
      <div className="flex flex-col gap-6 sm:gap-8">
        {categoriesData?.slice(0, 3)?.map((post) => (
          <Card
            key={post?.id}
            className="w-full flex-col sm:flex-row h-auto bg-white text-articleGray-800 dark:bg-articleGray-800 dark:text-white border border-articleGray-200 dark:border-articleGray-700 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-full sm:w-2/5 h-48 sm:h-auto shrink-0 rounded-b-none sm:rounded-r-none sm:rounded-b-lg"
            >
              <Image
                src={post?.img}
                alt="user"
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody className="bg-white dark:bg-articleGray-800">
              <Typography variant="h4" color="blue-gray" className="mb-2 text-base sm:text-lg text-articleGray-800 dark:text-white">
                {post.title.slice(0, 20)}
              </Typography>
              {/* Fix: Move Typography outside and use a span instead of div for dangerouslySetInnerHTML */}
              <div className="mb-4 sm:mb-8">
                <span
                  className="mt-2 line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm/relaxed text-gray-600 dark:text-gray-300 block"
                  dangerouslySetInnerHTML={{
                    __html: post?.desc,
                  }}
                />
              </div>
              <Link
                href={`/pages/articles/${post?.id}`}
                className="inline-block"
              >
                <Button variant="text" className="flex items-center gap-2 text-sm text-articleBlue-500 dark:text-white">
                  Read More
                  <ArrowLongRightIcon
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OtherPost;
