import { create } from 'zustand'

type Location = {
  id: string
  name: string
}

type LocationStore = {
  locations: Location[]
  setLocations: (locations: Location[]) => void
}

export const useLocationStore = create<LocationStore>((set) => ({
  locations: [],
  setLocations: (locations) => set({ locations }),
}))
