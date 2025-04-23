import { Section } from "./Section";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-full w-full mx-auto">
      <Section className="px-2 py-3 bg-[#FFF5E5] flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">🚗 Car Rental</h1>
        <nav className="space-x-4">
          <a href="/" className="text-sm font-medium hover:text-blue-500">
            Accueil
          </a>
          <a href="/cars" className="text-sm font-medium hover:text-blue-500">
            Nos voitures
          </a>
          <a href="/login" className="text-sm font-medium hover:text-blue-500">
            Connexion
          </a>
        </nav>
      </Section>
    </header>
  );
}
