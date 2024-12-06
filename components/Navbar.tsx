import Link from "next/link";
import { FC } from "react";
import { Logo } from "./Logo";
import { Menu } from "lucide-react";
import * as React from "react";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui";

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  return (
    <nav className="border-b py-5 -2">
      <div className="container flex justify-between">
        <Link href={"/"}>
          <Logo />
        </Link>
        <Drawer direction="left">
          <DrawerTrigger>
            <Menu />
          </DrawerTrigger>
          <DrawerContent className="h-screen top-0 left-0 mt-0 w-3/4 rounded-none">
            <DrawerHeader>
              <DrawerTitle>Hello</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription>Hello</DrawerDescription>
          </DrawerContent>
        </Drawer>
        {/* <Menu /> */}
      </div>
    </nav>
  );
};
