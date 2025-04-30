import { useCarStore } from "../stores/carStore";
import { useQuery } from "@tanstack/react-query";

export const useAvailableCarsQuery = (filters: {pickupDateTime: string, returnDateTime: string, pickupLocation: string, returnLocation: string}) => {
    const setCars = useCarStore((state) => state.setCars)

    return useQuery({
        queryKey: ['availableCars', filters.pickupDateTime, filters.returnDateTime, filters.pickupLocation, filters.returnLocation],
        queryFn: async () => {
            const params = new URLSearchParams({
                pickupDateTime: filters.pickupDateTime!,
                returnDateTime: filters.returnDateTime!,
                pickupLocation: filters.pickupLocation!,
                returnLocation: filters.returnLocation!
            })

            const res = await fetch(`/api/cars?${params.toString()}`)
            const data = await res.json()
            setCars(data.data)
            return data.data
        },
        enabled: !!filters.pickupDateTime && !!filters.returnDateTime && !!filters.pickupLocation && !!filters.returnLocation,
        staleTime: 1000 * 60 * 5,
    })
}