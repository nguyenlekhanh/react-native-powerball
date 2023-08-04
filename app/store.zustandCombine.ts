import { create } from 'zustand'
import { FishSlice, createFishSlice } from "./createFishSlice"
import { BearSlice, createBearSlice } from "./createBearSlice"

export const useBoundStore = create<BearSlice & FishSlice>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}))