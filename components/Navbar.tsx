import Link from "next/link";
import { FC } from "react";
import { Logo } from "./Logo";
import { Menu } from "lucide-react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui";
import { navLinks } from "@/utils/settings";

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  return (
    <nav className="border-b py-5 -2">
      <div className="container flex justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <Drawer direction="left">
          <DrawerTrigger>
            <Menu />
          </DrawerTrigger>
          <DrawerContent className="h-screen top-0 left-0 mt-0 w-3/4 rounded-none pl-10 pt-48 border-r">
            <DrawerHeader className="hidden">
              <DrawerTitle>Nav</DrawerTitle>
              <DrawerDescription>Nav</DrawerDescription>
            </DrawerHeader>
            {/* Links */}
            <div className="flex flex-col gap-8 *:text-3xl">
              {navLinks.map((link, idx) => (
                <Link className="w-fit" key={idx} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
        {/* <Menu /> */}
      </div>
    </nav>
  );
};
