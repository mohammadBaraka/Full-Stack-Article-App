"use client";
import { GtAllPosts } from "@/app/graphql/Queris/Post";
import { UseSenTokn } from "@/app/graphql/Queris/SenTokn";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "@/app/components/Loader/Loader";
import CommetLikes from "@/app/components/CommetLikes";
import StaggeredList, {
  StaggeredItem,
} from "@/app/components/animations/StaggeredList";
import AnimatedContainer from "@/app/components/animations/AnimatedContainer";

const Articles = () => {
  const { data, loading, error } = GtAllPosts();
  const { data: user } = UseSenTokn();
  const post = data?.getAllPosts;

  return (
    <>
      {loading ? <Loader /> : null}
      <AnimatedContainer className="w-[90%] mx-auto mt-marginGlobal flex flex-col justify-center">
        <StaggeredList>
          <StaggeredItem
            className=" 
    grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 "
          >
            {post?.map((article, index) => {
              const ownerPost = article?.User?.id === user?.SenTokn?.id;
              return (
                <StaggeredItem
                  key={article?.id}
                  className="relative flex flex-col justify-between h-full"
                >
                  <AnimatedContainer
                    className="mb-6 rounded-lg border border-gray-100 bg-white shadow-sm"
                    delay={index * 0.1}
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
                  </AnimatedContainer>
                </StaggeredItem>
              );
            })}
          </StaggeredItem>
        </StaggeredList>
      </AnimatedContainer>
    </>
  );
};

export default Articles;
