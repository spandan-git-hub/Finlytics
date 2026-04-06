import { create } from 'zustand'

export const useUIStore = create((set) => ({
	activePage: 'dashboard',
	role: 'admin',
	search: '',
	categoryFilter: 'all',
	typeFilter: 'all',
	isSidebarOpen: false,

	setActivePage: (activePage) => set({ activePage, isSidebarOpen: false }),
	setRole: (role) => set({ role }),
	setSearch: (search) => set({ search }),
	setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
	setTypeFilter: (typeFilter) => set({ typeFilter }),
	setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
	toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}))
