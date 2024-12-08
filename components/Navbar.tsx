import Link from "next/link";
import { FC } from "react";
import { Logo } from "./Logo";
import { Menu } from "lucide-react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui";
import { navLinks } from "@/utils/settings";

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  return (
    <>
      <div className="w-full -z-10 mb-2 h-16" />
      <nav className="fixed flex top-0 items-center bg-background w-full z-10 border-b h-16">
        <div className="h- container flex justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <Drawer direction="left">
            <DrawerTrigger>
              <Menu />
            </DrawerTrigger>
            <DrawerContent className="h-screen top-0 left-0 mt-0 w-3/4 rounded-none pl-10 pt-48 border-r">
              <DrawerHeader className="hidden">
                <DrawerTitle />
                <DrawerDescription />
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
        </div>
      </nav>
    </>
  );
};
