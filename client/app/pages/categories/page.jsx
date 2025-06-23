"use client";

import FadeSlideUp from "@/app/components/animations/FadeSlideUp";
import CommetLikes from "@/app/components/CommetLikes";
import { Loader } from "@/app/components/Loader/Loader";
import { GetPostByCategory } from "@/app/graphql/Queris/Post";
import { UseSenTokn } from "@/app/graphql/Queris/SenTokn";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Categories = () => {
  const catId = useSearchParams().get("catId");
  const catName = useSearchParams().get("name");
  const { data, loading } = GetPostByCategory(catId);
  const categoriesData = data?.getPostByCategory;

  const { data: user, loading: LoadingUser } = UseSenTokn();
  return (
    <Suspense>
      <>
        {loading || LoadingUser ? <Loader /> : null}
        <h1 className="text-3xl font-bold text-center mt-marginGlobal text-gray-600">
          {catName}'s Articles
        </h1>

        <div className="w-[90%] mx-auto mt-10 flex flex-col justify-center ">
          <div
            className=" 
    grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 "
          >
            {categoriesData?.map((article, index) => {
              console.log("🚀 ~ {categoriesData?.map ~ article:", article);
              const ownerPost = article?.User?.id === user?.SenTokn?.id;

              return (
                <article key={article?.id}>
                  <div className="relative flex flex-col justify-between h-full">
                    <FadeSlideUp
                      delay={index * 0.05}
                      className="mb-6 rounded-lg border border-gray-100 bg-white
                      shadow-sm "
                    >
                      {ownerPost && (
                        <div className="absolute -top-8 -left-5">
                          <Image
                            src="/owner.png"
                            alt={"Croun"}
                            width={150}
                            height={150}
                            className="h-10 w-10 rounded-full"
                          />
                        </div>
                      )}
                      <div className="img">
                        {article?.img && (
                          <Image
                            alt={article?.title}
                            src={article?.img}
                            width={100}
                            height={100}
                            className="h-56 w-full"
                          />
                        )}
                      </div>
                      <div className="p-4 sm:p-6 flex flex-col justify-between">
                        <Link href="#">
                          <h3 className="text-md font-medium text-gray-900">
                            {article?.title.slice(0, 30)}...
                          </h3>
                        </Link>

                        <div
                          className="mt-2 line-clamp-1 text-sm/relaxed text-gray-500"
                          dangerouslySetInnerHTML={{
                            __html: article?.desc,
                          }}
                        />

                        <Link
                          href={`/pages/articles/${article?.id}`}
                          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600"
                        >
                          Read More
                          <span
                            aria-hidden="true"
                            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                          >
                            &rarr;
                          </span>
                        </Link>
                      </div>
                      <CommetLikes article={article} user={user} />
                    </FadeSlideUp>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </>
    </Suspense>
  );
};

export default Categories;
