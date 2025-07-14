"use client";

import Image from "next/image";
import Link from "next/link"; // ✅ Required for <Link>
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner"
import FormField from "../components/FormField"; // ✅ NO curly braces
import { useRouter } from 'next/navigation';


import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const AuthFormSchema = (type : FormType) =>{
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(6, "Password must be at least 6 characters"),
})
}
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        if(type==='sign-up'){
            console.log("SIGN UP", values);
            toast.success('Account created successfully! please sign in');
            router.push('/sign-in');
        }else{
            console.log("SIGN IN", values);
            toast.success('Signed in successfully!');
            router.push('/');
        }
    }catch(error){
        console.log(error);
        toast.error('There was an error : ${error}')
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
            
            {/* ✅ Conditionally render name field on Sign-up */}
            {!isSignIn && (
              <FormField 
                control={form.control}
                name="name" 
                label="Name"
                placeholder="Your Name"
              />
            )}
  
            {/* Email and Password (use <FormField> or replace these with real inputs) */}
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
