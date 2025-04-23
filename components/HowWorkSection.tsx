import { Section } from "./Section"

export const HowWorkSection = () => {
    return (
        <Section className="flex flex-col items-center justify-center gap-5 bg-[#FFF5E5] w-full p-10">
            <h1 className="text-4xl font-bold text-center">
                Comment ça marche
            </h1>
            <div className="grid grid-cols-1 min-sm:grid-cols-2 md:grid-cols-3 gap-4 justify-around items-center">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-15 h-15 rounded-full bg-[#F7835A] flex items-center justify-center text-2xl text-white">1</div>
                    <h3 className="text-2xl font-bold ">Recherchez</h3>
                    <p className=" text-center px-10">Entrez vos détails pour trouver une voiture</p>
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-15 h-15 rounded-full bg-[#F7835A] flex items-center justify-center text-2xl text-white">2</div>
                    <h3 className="text-2xl font-bold ">Comparez</h3>
                    <p className=" text-center px-10">Parcourez une gamme d'options et de pris</p>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 md:col-span-1 md:w-full col-span-full mx-auto sm:w-1/2 w-full">
                    <div className="w-15 h-15 rounded-full bg-[#F7835A] flex items-center justify-center text-2xl text-white">3</div>
                    <h3 className="text-2xl font-bold ">Réservez</h3>
                    <p className=" text-center px-10">Choisissez la meilleure voiture pour vous</p>
                </div>
            </div>
        </Section>
    )
}