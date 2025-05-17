"use client";
import Image from "next/image";
import { Section } from "./Section";
import logo from "@/public/logo_rental_car.png";
import { signOut, useSession } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Car, LogOut, UserRound } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  return (
    <header className="sticky top-0 h-full w-full mx-auto bg-[#FFF5E5]">
      <Section className="px-2 py-3 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="Logo car rental"
            width={50}
            height={50}
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-bold text-[#003A45]">Car Rental</h1>
        </a>
        <nav className="flex items-center gap-4">
          <a href="/" className="text-sm font-medium hover:text-[#003A45]">
            Accueil
          </a>
          <Button
            onClick={async () => {
              try {
                const res = await fetch("/api/debug/clear-rentals", {
                  method: "DELETE",
                });

                if (!res.ok) throw new Error("Suppression échouée");

                alert("Réservations supprimées !");
              } catch (err) {
                console.error(err);
                alert("Une erreur est survenue.");
              }
            }}
          >
            Supprimer les réservations
          </Button>
          {!session?.user ? (
            <>
              <a
                href="/signup"
                className="text-sm font-medium hover:text-[#003A45]"
              >
                Inscription
              </a>
              <a
                href="/signin"
                className="text-sm font-medium hover:text-[#003A45]"
              >
                Connexion
              </a>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button onClick={() => {
                  router.push('/profile')
                }} variant="outline" className="p-2 py-6">
                  <span className="font-semibold">{user?.name}</span>

                  {user?.image ? (
                    <Image
                      src={user?.image}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <UserRound className="w-5 h-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuGroup className="flex flex-col gap-2">
                  <DropdownMenuItem className="flex items-center justify-center gap-2">
                    <a href="/profile" className="flex items-center gap-2">
                      <UserRound className="w-5 h-5" />
                      <span className="text-md font-semibold">Mon Profil</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center justify-center gap-2">
                    <a href="/my-bookings" className="flex items-center gap-2">
                      <Car className="w-5 h-5" />
                      <span className="text-md font-semibold">
                        Mes Réservations
                      </span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      className="w-full hover:bg-red-500 hover:text-white"
                      onClick={async () => {
                        await signOut({
                          fetchOptions: {
                            onSuccess: () => {
                              router.push("/");
                              router.refresh();
                            },
                          },
                        });
                      }}
                    >
                      <LogOut className="w-5 h-5 hover:text-white" />
                      Déconnexion
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </Section>
    </header>
  );
}
