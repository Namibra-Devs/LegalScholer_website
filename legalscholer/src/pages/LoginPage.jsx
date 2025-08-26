import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@components/ui/button";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-primary">Login</h2>
        <input {...register("email")} placeholder="Email" className="w-full p-3 border rounded-lg" />
        <input {...register("password")} type="password" placeholder="Password" className="w-full p-3 border rounded-lg" />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
}