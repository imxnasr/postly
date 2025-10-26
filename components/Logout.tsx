"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "./Loader";
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

export const Logout = ({ disabled } = { disabled: false }) => {
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
        <Button type="button" className="w-full mt-6" variant="destructive" disabled={disabled}>
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
          <Button
            className="flex items-center justify-center"
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading && <Loader />}
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
