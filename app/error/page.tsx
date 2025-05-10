'use client';

import { useRouter } from 'next/navigation';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#FFF5E5] px-4 text-center">
      <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold text-[#003A45] mb-2">Une erreur est survenue</h1>
      <p className="text-gray-600 max-w-md">
        Nous n'avons pas pu vous rediriger vers le paiement. Veuillez réessayer ou contacter le support si le problème persiste.
      </p>
      <Button
        onClick={() => router.push('/')}
        className="mt-6 bg-[#F7835A] text-white hover:bg-[#e86c44]"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        Retour à l'accueil
      </Button>
    </div>
  );
}
