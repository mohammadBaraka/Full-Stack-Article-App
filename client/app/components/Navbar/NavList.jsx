"use client";
import { isLoggedInVar } from "@/app/graphql/Mutations/AuthMutation";
import { useReactiveVar } from "@apollo/client";
import { List, ListItem } from "@material-tailwind/react";
import Link from "next/link";
import Search from "./Search";
import { UseSenTokn } from "@/app/graphql/Queris/SenTokn";
import { GetAllCategories } from "@/app/graphql/Queris/Ctegory";

export function NavList() {
  const { data } = UseSenTokn();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data: categories } = GetAllCategories();
  const categoriesData = categories?.getAllCategories;
  return (
    <>
      <List className="mt-4 flex gap-2 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 items-center">
        <Link href={"/"}>
          <ListItem className="flex items-center  py-2 pr-4">Home</ListItem>
        </Link>
        {categoriesData?.map((cat) => (
          <Link
            key={cat.id}
            href={`/pages/categories?catId=${cat?.id}&name=${cat?.title}`}
          >
            <ListItem className="flex items-center  py-2 pr-4">
              {cat?.title}
            </ListItem>
          </Link>
        ))}

        <Link href="/pages/articles">
          <ListItem className="flex items-center  py-2 pr-4">Articles</ListItem>
        </Link>

        <Search />

        {isLoggedIn || data ? (
          <Link href="/pages/write">
            <ListItem
              className="flex items-center  w-12 h-12 justify-center rounded-full bg-articleBlue-300 font-bold
            hover:bg-articleBlue-400 hover:text-white dark:text-white text-gray-900 text-sm"
            >
              Write
            </ListItem>
          </Link>
        ) : null}
      </List>
    </>
  );
}
