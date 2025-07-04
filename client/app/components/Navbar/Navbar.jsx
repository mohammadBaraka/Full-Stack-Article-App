"use client";
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";
import { NavList } from "./NavList";
import Link from "next/link";
import { Loader } from "../Loader/Loader";
import UserLoaged from "./UserLoaged";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "@/app/graphql/Mutations/AuthMutation";
import Search from "./Search";
import { UseSenTokn } from "@/app/graphql/Queris/SenTokn";
import ThemeToggle from "../ThemeToggle";

export function Header() {
  const isLogedIn = useReactiveVar(isLoggedInVar);

  const { data, error, loading } = UseSenTokn();
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Navbar className="max-w-full px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-gray-900/20">
        <div className="flex items-center justify-between text-gray-900 dark:text-white">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            <div className="flex justify-center text-articleBlue-500">
              <svg
                id="logo-85"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="ccustom"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 0C15.5228 0 20 4.47715 20 10V0H30C35.5228 0 40 4.47715 40 10C40 15.5228 35.5228 20 30 20C35.5228 20 40 24.4772 40 30C40 32.7423 38.8961 35.2268 37.1085 37.0334L37.0711 37.0711L37.0379 37.1041C35.2309 38.8943 32.7446 40 30 40C27.2741 40 24.8029 38.9093 22.999 37.1405C22.9756 37.1175 22.9522 37.0943 22.9289 37.0711C22.907 37.0492 22.8852 37.0272 22.8635 37.0051C21.0924 35.2009 20 32.728 20 30C20 35.5228 15.5228 40 10 40C4.47715 40 0 35.5228 0 30V20H10C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM18 10C18 14.4183 14.4183 18 10 18V2C14.4183 2 18 5.58172 18 10ZM38 30C38 25.5817 34.4183 22 30 22C25.5817 22 22 25.5817 22 30H38ZM2 22V30C2 34.4183 5.58172 38 10 38C14.4183 38 18 34.4183 18 30V22H2ZM22 18V2L30 2C34.4183 2 38 5.58172 38 10C38 14.4183 34.4183 18 30 18H22Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>

          <div className="hidden gap-2 lg:flex items-center">
            <ThemeToggle />
            {data ? (
              <UserLoaged />
            ) : (
              <>
                <Link href="/pages/auth/login">
                  <Button
                    variant="text"
                    size="sm"
                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/pages/auth/register">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="bg-articleBlue-500 hover:bg-articleBlue-600 text-white"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden text-primary"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <ThemeToggle />
            {isLogedIn || data ? (
              <UserLoaged />
            ) : (
              <>
                <Link href="/pages/auth/login">
                  <Button
                    variant="text"
                    size="sm"
                    color="blue-gray"
                    className="text-primary"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/pages/auth/register">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="bg-articleBlue-500 hover:bg-articleBlue-600"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Collapse>
      </Navbar>
    </>
  );
}
