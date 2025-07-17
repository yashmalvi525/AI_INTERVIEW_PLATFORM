"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormField from "../components/FormField";
import { signIn, signUp } from "@/actions/auth.action"; // You need to have these actions
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client"; // Make sure this is the client-side auth import

import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Schema generator
const AuthFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
};

type FormType = "sign-in" | "sign-up";

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = AuthFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name ?? "",
          email,
          password: password ?? "",
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully! Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in failed, please try again");
          return;
        }

        const result = await signIn({ email, idToken });
        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Signed in successfully!");
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`There was an error: ${error.message || error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px] mx-auto mt-10">
      <div className="flex flex-col gap-6 card py-14 px-10 items-center text-center">
        <Image src="/logo.svg" alt="logo" height={32} width={120} />
        <h2 className="text-2xl font-bold text-primary-100">PrepWise</h2>
        <h3 className="text-muted-foreground text-sm">
          Practice job interviews with AI
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4 w-full">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="your@email.com"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your Password"
              type="password"
            />

            <Button type="submit" className="w-full">
              {isSignIn ? "Sign In" : "Create An Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
