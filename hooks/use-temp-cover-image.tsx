import { create } from "zustand";

type TempCoverImageStore = {
    tempUrl?: string
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    onReplace: (url: string) => void
}

export const useTempCoverImage = create<TempCoverImageStore>((set) => ({
    tempUrl: undefined,
    isOpen: false,
    onOpen: () => set({ isOpen: true, tempUrl: undefined }),
    onClose: () => set({ isOpen: false, tempUrl: undefined }),
    onReplace: (tempUrl: string) => set({ isOpen: true, tempUrl })
}))