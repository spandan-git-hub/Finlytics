import { create } from 'zustand'

export const useUIStore = create((set) => ({
	activePage: 'dashboard',
	role: 'admin',
	search: '',
	categoryFilter: 'all',
	typeFilter: 'all',

	setActivePage: (activePage) => {
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'auto' })
		}

		set({ activePage })
	},
	setRole: (role) => set({ role }),
	setSearch: (search) => set({ search }),
	setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
	setTypeFilter: (typeFilter) => set({ typeFilter }),
}))
