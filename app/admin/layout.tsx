import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/admin/cars" className="hover:underline">
            Voitures
          </Link>
          <Link href="/admin/reservations" className="hover:underline">
            Réservations
          </Link>
          <Link href="/admin/agencies" className="hover:underline">
            Agences
          </Link>
          <Link href="/admin/users" className="hover:underline">
            Utilisateurs
          </Link>
          <Link href="/admin/settings" className="hover:underline">
            Paramètres
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
