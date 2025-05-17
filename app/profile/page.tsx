"use client";

import { useSession } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "sonner";
import { convertImageToBase64 } from "@/lib/image";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  password: z.string().optional(),
  image: z.any().optional(),
});

type ProfileForm = z.infer<typeof schema>;

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(user?.image || null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProfileForm>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const imageFile = watch("image");

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
      });
      if (user.image) {
        setPreview(user?.image);
      }
    }
  }, [user, reset]);

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [imageFile]);

  const onSubmit = async (data: ProfileForm) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      if (data.password) formData.append("password", data.password);
      if (data.image && data.image[0]) {
        formData.append("image", await convertImageToBase64(data.image[0]));
      }

      const res = await fetch("/api/users", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");
      toast.success("Profil mis à jour avec succès !");
      
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-[#003A45] mb-8 text-center">
        Mon profil
      </h1>

      <Card className="p-8 bg-white shadow-md rounded-2xl space-y-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center gap-4">
            {preview && (
              <Image
                src={preview}
                alt="Photo de profil"
                width={120}
                height={120}
                className="rounded-full border shadow-lg"
              />
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Nom
            </label>
            <Input {...register("name")} placeholder="Nom complet" />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email
            </label>
            <Input
              type="email"
              {...register("email")}
              placeholder="Adresse email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Mot de passe (optionnel)
            </label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Nouveau mot de passe"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Photo de profil
            </label>
            <Input type="file" accept="image/*" {...register("image")} />
          </div>

          <div className="md:col-span-2 flex justify-center">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#F7835A] hover:bg-[#e9724d] text-white px-6 py-3 text-lg rounded-xl transition-all"
            >
              {loading ? "Mise à jour..." : "Mettre à jour mon profil"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
