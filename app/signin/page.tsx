"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(2, "email requis").email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

type Value = z.infer<typeof schema>;

export default function SignInPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Value>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  });

  const onSubmit = async (data: Value) => {
    setLoading(true);
    const email = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (email.error) {
      toast.error(email.error.message);
      return;
    } else {
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push("/");
      }
    }
    setLoading(false);
  };

  const onError = (errors: FieldErrors<Value>) => {
    const message = Object.values(errors).find((e) => e.message)?.message;
    if (message) {
      toast.error(message);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const google = await signIn.social({
      provider: "google",
    });

    if (google.error) {
      toast.error(google.error.message);
      return;
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/arriere_plan_auth.png')] bg-cover bg-center">
      <Card className=" m-2 p-8 rounded-xl shadow-lg max-w-md w-full space-y-6">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/logo_rental_car.png"}
            alt="Logo"
            width={120}
            height={120}
          />
          <h3 className="text-5xl font-bold text-[#003A45]">Se connecter</h3>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit, onError)}>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Email"
            className={cn("bg-white", errors.email && "border-red-500")}
          />

          <Input
            id="password"
            type="password"
            placeholder="mot de passe"
            {...register("password")}
            className={cn("bg-white", errors.password && "border-red-500")}
          />

          <Button
            disabled={loading}
            type="submit"
            className="w-full bg-[#F7835A] text-white p-6"
          >
            <h3 className="text-2xl">Se connecter</h3>
          </Button>
          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              disabled={loading}
              onClick={handleGoogleSignIn}
              variant={"outline"}
              className="w-full bg-white p-6"
            >
              <FaGoogle className="h-10 w-10" />
              <h3 className="text-lg">Se connecter avec Google</h3>
            </Button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="text-[#F7835A] font-semibold">
            S’inscrire
          </Link>
        </div>
      </Card>
    </div>
  );
}
