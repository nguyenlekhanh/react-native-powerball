import { create } from 'zustand'

interface UserState {
  user: any
  setUser: (userInfo: any) => void
  token: string,
  setToken: (token1: string) => void
}

export const useUserStore = create<UserState>()((set) => ({
  user: 0,
  setUser: (userInfo) => set((state) => ({ user: userInfo })),
  token: '',
  setToken: (token1) => set((state) => ({ token: token1 })),
}))