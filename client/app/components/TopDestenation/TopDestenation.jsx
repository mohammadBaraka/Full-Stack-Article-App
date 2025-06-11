"use client";
import Image from "next/image";
import { articlesData } from "./articlesData";
import Link from "next/link";
import FadeSlideUp from "../animations/FadeSlideUp";
import { Typography } from "@material-tailwind/react";
import AnimatedContainer from "../animations/AnimatedContainer";

export default function TopDestenation() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeSlideUp delay={0.1}>
            <Typography className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Featured Articles
            </Typography>
          </FadeSlideUp>
          <FadeSlideUp delay={0.2}>
            <Typography className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our handpicked selection of the most engaging and
              insightful articles from our community of expert writers.
            </Typography>
          </FadeSlideUp>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.map((article, index) => {
            return (
              <AnimatedContainer key={article?.id} delay={index * 0.1}>
                <FadeSlideUp>
                  <article className="group modern-card overflow-hidden h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={article?.img}
                        alt={article?.title}
                        width={500}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Technology
                        </span>
                      </div>

                      {/* Reading Time */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          5 min read
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <time className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                        {article?.data || "Oct 10, 2024"}
                      </time>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article?.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 flex-1">
                        {article?.desc}
                      </p>

                      {/* Author & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              A
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Author Name
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Writer
                            </p>
                          </div>
                        </div>

                        <Link
                          href="/pages/articles"
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group/link"
                        >
                          Read More
                          <svg
                            className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                </FadeSlideUp>
              </AnimatedContainer>
            );
          })}
        </div>

        {/* View All Button */}
        <FadeSlideUp delay={0.6}>
          <div className="text-center mt-12">
            <Link
              href="/pages/articles"
              className="btn-primary inline-flex items-center"
            >
              View All Articles
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </FadeSlideUp>
      </div>
    </section>
  );
}
