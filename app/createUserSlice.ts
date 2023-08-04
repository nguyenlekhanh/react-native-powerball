import { StateCreator } from 'zustand'

export interface UserSlice {
  user: any
  setUser: (userInfo: any) => void
}

export const createUserSlice: StateCreator<
  UserSlice,
  [],
  [],
  UserSlice
> = (set) => ({
  user: '',
  setUser: (userInfo) => set((state) => ({ user: userInfo }))
})
