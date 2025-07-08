"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui";
import { Loader } from "./Loader";

export const Logout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="w-full mt-6" variant="destructive">
          Logout
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>Are you sure you want to logout?</DialogDescription>{" "}
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleLogout} disabled={isLoading}>
            {isLoading ? <Loader /> : "Logout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
