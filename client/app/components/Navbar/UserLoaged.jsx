"use client";
import React from "react";
import {
  Typography,
  Button,
  MenuHandler,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { msg, msgError, msgSuccess } from "@/app/utils/msg";
import {
  isLoggedInVar,
  LogoutMutation,
} from "@/app/graphql/Mutations/AuthMutation";
import { Loader } from "../Loader/Loader";
import { useRouter } from "next/navigation";
import { UseSenTokn } from "@/app/graphql/Queris/SenTokn";

const UserLoaged = () => {
  const router = useRouter();
  const { data, loading: tokenLoadeing } = UseSenTokn();
  const user = data?.SenTokn;

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const profileMenuItems = [
    {
      label: `${user?.name} Profile`,
      icon: UserCircleIcon,
      href: `/profile?id=${user?.id}`,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      href: "/",
    },

    {
      label: "Sign Out",
      icon: PowerIcon,
      href: "/auth/login",
    },
  ];
  const { logout, loading } = LogoutMutation();

  const signOut = async (e) => {
    e.preventDefault();
    try {
      await logout();
      msgSuccess("Logout success");
      isLoggedInVar(false);
      router.refresh();
    } catch (err) {
      msgError(err?.message);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 "
          >
            {user?.img ? (
              <Avatar
                variant="circular"
                size="sm"
                alt="tania andrew"
                className="border border-gray-900 p-0.5"
                src={user?.img}
              />
            ) : (
              <Avatar
                variant="circular"
                size="sm"
                alt="tania andrew"
                className="border border-gray-900 p-0.5"
                src={`/avatar.jpg`}
              />
            )}
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map((item, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem key={item?.label} onClick={isLastItem ? signOut : null}>
                <Link
                  onClick={closeMenu}
                  className={`flex items-center gap-2 rounded ${
                    isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : ""
                  }`}
                  href={`/pages/${item.href}`}
                >
                  {React.createElement(item.icon, {
                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                    strokeWidth: 2,
                  })}
                  <Typography
                    as="span"
                    variant="small"
                    className="font-normal capitalize"
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {item.label}
                  </Typography>
                </Link>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};

export default UserLoaged;
