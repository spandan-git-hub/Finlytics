import { create } from 'zustand'
import { mockTransactions } from '../data/mockTransactions'

export const useTransactionsStore = create((set) => ({
	transactions: mockTransactions,

	addTransaction: (transaction) =>
		set((state) => ({
			transactions: [
				{
					id: `txn-${Date.now()}`,
					status: 'Completed',
					...transaction,
				},
				...state.transactions,
			],
		})),

	updateTransaction: (id, updates) =>
		set((state) => ({
			transactions: state.transactions.map((transaction) =>
				transaction.id === id ? { ...transaction, ...updates } : transaction,
			),
		})),

	deleteTransaction: (id) =>
		set((state) => ({
			transactions: state.transactions.filter((transaction) => transaction.id !== id),
		})),
}))
