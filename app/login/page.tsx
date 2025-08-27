"use client";

import { login } from "@/actions/login";
import { Button, Input } from "@/components/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const initialState: any = { success: false, message: "", errors: {}, inputs: {} };

export default () => {
  const [state, action, isPending] = useActionState(login, initialState);
  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      redirect("/");
    } else {
      if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state]);
  // defaultValue={state?.inputs?.text}
  // className={!isPending && state?.errors?.text ? "border-red-500" : ""}

  // const formSchema = z.object({
  //   usernameOrEmail: z
  //     .string()
  //     .min(1, "Username or email is required")
  //     .refine((val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[a-zA-Z0-9_]+$/.test(val), {
  //       message: "Must be a valid email or username",
  //     }),
  //   password: z.string().min(8, "Password must be at least 8 characters"),
  // });

  const formSchema = z.object({
    usernameOrEmail: z
      .string()
      .min(1, "Username or email is required")
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[a-zA-Z0-9_]+$/.test(val), {
        message: "Must be a valid email or username",
      }),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    // @ts-expect-error -- Doesn't know what's going on.
    resolver: zodResolver(formSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const formData = new FormData();
    formData.append("text", data.usernameOrEmail);
    formData.append("password", data.password);
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // onSubmit={(e: any) => {
        //   e.preventDefault();
        //   console.log("Submitted");
        // }}
        className="max-w-xl m-auto mt-8"
        autoComplete="on"
      >
        <h3 className="text-2xl font-bold mb-5">Login</h3>
        {/* Inputs */}
        <div className="space-y-3">
          {/* Email Input */}
          {/* <div className="grid w-full items-center gap-1.5"> */}
          {/*   <label htmlFor="text">Username or Email</label> */}
          {/* <Input id="text" name="text" type="text" placeholder="Username or Email" aria-describedby="text-error" /> */}
          {/* {!isPending && state?.errors?.text && ( */}
          {/*   <p id="text-error" className="text-red-500 text-sm"> */}
          {/*     {state.errors.text} */}
          {/*   </p> */}
          {/* )} */}
          {/* </div> */}
          <FormField
            control={form.control}
            name="usernameOrEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <Input placeholder="Username or Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password Input */}
          {/* <div className="grid w-full items-center gap-1.5"> */}
          {/* <label htmlFor="password">Password</label> */}
          {/* <Input */}
          {/*   id="password" */}
          {/*   name="password" */}
          {/*   type="password" */}
          {/*   placeholder="Password" */}
          {/*   aria-describedby="password-error" */}
          {/* /> */}
          {/* {!isPending && state?.errors?.password && ( */}
          {/*   <p id="password-error" className="text-red-500 text-sm"> */}
          {/*     {state.errors.password} */}
          {/*   </p> */}
          {/* )} */}
          {/* </div> */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <p className="text-muted-foreground text-sm mt-2">
          Don't have an account?{" "}
          <Link href="/register" className="text-foreground hover:underline">
            Register
          </Link>
        </p>
        <Button type="submit" className="w-full mt-6" disabled={false}>
          {isPending ? <Loader /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};
