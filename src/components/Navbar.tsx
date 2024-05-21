"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import HomeFillIcon from "@/components/ui/icons/HomeFillIcon";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import SearchFillIcon from "@/components/ui/icons/SearchFillIcon";
import NewIcon from "@/components/ui/icons/NewIcon";
import NewFillIcon from "@/components/ui/icons/NewFillIcon";
import ColorButton from "@/components/ui/ColorButton";
import { signIn, signOut, useSession } from "next-auth/react";
import Avatar from "@/components/ui/ColorImage";

const menuList = [
  {
    href: "/",
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: "/new",
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="px-6 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-3xl font-bold">Instagram</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4">
          {menuList.map(({ href, icon, clickedIcon }) => (
            <li key={href}>
              <Link href={href}>{pathname === href ? clickedIcon : icon}</Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.name}`}>
                <Avatar image={user?.image || ""} />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text="Sign out" onClick={() => signOut()} />
            ) : (
              <ColorButton text="Sign in" onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
