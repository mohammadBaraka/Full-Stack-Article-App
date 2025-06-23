"use client";
import CommetLikes from "@/app/components/CommetLikes";
import { Loader } from "@/app/components/Loader/Loader";
import { UseSenTokn } from "@/app/graphql/Queris/SenTokn";
import AnimatedContainer from "@/app/components/animations/AnimatedContainer";
import FadeSlideUp from "@/app/components/animations/FadeSlideUp";
import StaggeredList, {
  StaggeredItem,
} from "@/app/components/animations/StaggeredList";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { GetPostsByUsersId } from "@/app/graphql/Queris/Post";

const Profile = () => {
  const id = useSearchParams().get("id");
  const { data, loading } = GetPostsByUsersId(id);
  const { data: user } = UseSenTokn();
  const userPosts = data?.getPostByUserId[0]?.User?.posts;
  const profileUser = data?.getPostByUserId[0]?.User;

  if (loading) return <Loader />;

  return (
    <Suspense>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Profile Header Section */}
        <FadeSlideUp delay={0.1}>
          <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Profile Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <Image
                      src={profileUser?.img || "/avatar-user.png"}
                      alt={profileUser?.name || "User Avatar"}
                      width={120}
                      height={120}
                      className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                    />
                    {/* Online Status Indicator */}
                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-700 rounded-full"></div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {profileUser?.name || "Anonymous User"}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-2xl">
                    {profileUser?.bio ||
                      "Welcome to my profile! I love sharing interesting articles and thoughts."}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-900 dark:text-white">
                        {userPosts?.length || 0}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Articles
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-900 dark:text-white">
                        {profileUser?.followers?.length || 0}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Followers
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-900 dark:text-white">
                        {profileUser?.following?.length || 0}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Following
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeSlideUp>

        {/* Posts Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FadeSlideUp delay={0.2}>
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Published Articles
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {userPosts?.length
                  ? `${userPosts.length} articles published`
                  : "No articles published yet"}
              </p>
            </div>
          </FadeSlideUp>

          {/* Articles Grid */}
          {userPosts?.length > 0 ? (
            <StaggeredList className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {userPosts.map((article, index) => {
                const ownerPost = profileUser?.id === user?.SenTokn?.id;

                return (
                  <StaggeredItem key={article?.id}>
                    <AnimatedContainer delay={index * 0.1} className="group">
                      <div className="relative flex flex-col h-full">
                        <article className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
                          {/* Owner Badge */}
                          {ownerPost && (
                            <div className="absolute -top-2 -left-2 z-10">
                              <Image
                                src="/owner.png"
                                alt="Owner"
                                width={40}
                                height={40}
                                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full shadow-lg"
                              />
                            </div>
                          )}

                          {/* Article Image */}
                          <div className="relative overflow-hidden">
                            {article?.img && (
                              <Image
                                alt={article?.title}
                                src={article?.img}
                                width={400}
                                height={250}
                                className="h-48 sm:h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            )}
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>

                          {/* Article Content */}
                          <div className="p-4 sm:p-6 flex flex-col flex-1">
                            <div className="flex-1">
                              <Link
                                href={`/pages/articles/${article?.id}`}
                                className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                              >
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                  {article?.title}
                                </h3>
                              </Link>

                              <div
                                className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-3 mb-4"
                                dangerouslySetInnerHTML={{
                                  __html: article?.desc,
                                }}
                              />
                            </div>

                            {/* Read More Link */}
                            <Link
                              href={`/pages/articles/${article?.id}`}
                              className="group/link inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 mt-auto"
                            >
                              Read More
                              <span
                                aria-hidden="true"
                                className="block transition-transform group-hover/link:translate-x-1 rtl:rotate-180"
                              >
                                →
                              </span>
                            </Link>
                          </div>

                          {/* Comments and Likes */}
                          <div className="border-t border-gray-200 dark:border-gray-700">
                            <CommetLikes article={article} user={user} />
                          </div>
                        </article>
                      </div>
                    </AnimatedContainer>
                  </StaggeredItem>
                );
              })}
            </StaggeredList>
          ) : (
            <FadeSlideUp delay={0.3}>
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No Articles Yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  This user hasn't published any articles yet. Check back later!
                </p>
              </div>
            </FadeSlideUp>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Profile;
