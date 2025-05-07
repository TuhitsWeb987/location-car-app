"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const schema = z
  .object({
    firstName: z.string().min(2, "Prénom requis"),
    lastName: z.string().min(2, "Nom requis"),
    email: z.string().min(2, "email requis").email("Email invalide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Les mots de passe ne correspondent pas",
    }
  );

type Value = z.infer<typeof schema>;

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Value>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = async (data: Value) => {
    setLoading(true);
    const email = await signUp.email({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
      image: image ? await convertImageToBase64(image) : "",
    });

    if (email.error) {
      setLoading(false);
      toast.error(email.error.message);
      return;
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  const onError = (errors: FieldErrors<Value>) => {
    const message = Object.values(errors).find((e) => e.message)?.message;
    if (message) {
      toast.error(message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          <h3 className="text-5xl font-bold text-[#003A45]">Créer un compte</h3>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex items-center justify-center gap-4">
            <Input
              id="firstName"
              type="text"
              {...register("firstName")}
              placeholder="Prénom"
              className={cn("bg-white", errors.firstName && "border-red-500")}
            />
            <Input
              id="lastName"
              type="text"
              {...register("lastName")}
              placeholder="Nom"
              className={cn("bg-white", errors.lastName && "border-red-500")}
            />
          </div>
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

          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirmer le mot de passe"
            {...register("confirmPassword")}
            className={cn(
              "bg-white",
              errors.confirmPassword && "border-red-500"
            )}
          />

          <div className="grid gap-2">
            <div className="flex items-end gap-4">
              {imagePreview && (
                <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 w-full">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                {imagePreview && (
                  <X
                    className="cursor-pointer"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="w-full bg-[#F7835A] text-white p-6"
          >
            <h3 className="text-2xl">S'inscrire</h3>
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Vous avez déjà ?{" "}
          <Link href="/signin" className="text-[#F7835A] font-semibold">
            Se connecter
          </Link>
        </div>
      </Card>
    </div>
  );
}
