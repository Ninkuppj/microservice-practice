import { create } from "zustand";

interface SideBarStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
}

const useSideBar = create<SideBarStore>((set:any) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    toggle: () => set((state:any) => ({ isOpen: !state.isOpen })),
}));

export default useSideBar;