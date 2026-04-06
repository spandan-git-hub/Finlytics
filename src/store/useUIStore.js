import { create } from 'zustand'

export const useUIStore = create((set) => ({
	activePage: 'dashboard',
	role: 'admin',
	search: '',
	categoryFilter: 'all',
	typeFilter: 'all',

	setActivePage: (activePage) => set({ activePage }),
	setRole: (role) => set({ role }),
	setSearch: (search) => set({ search }),
	setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
	setTypeFilter: (typeFilter) => set({ typeFilter }),
}))
