import { useMemo } from 'react'
import { useTransactionsStore } from '../store/useTransactionsStore'
import { useUIStore } from '../store/useUIStore'
import Button from '../components/ui/Button'
import TransactionsFilters from '../features/transactions/TransactionsFilters'
import TransactionsTable from '../features/transactions/TransactionsTable'

export default function TransactionsPage() {
	const transactions = useTransactionsStore((state) => state.transactions)
	const addTransaction = useTransactionsStore((state) => state.addTransaction)
	const deleteTransaction = useTransactionsStore((state) => state.deleteTransaction)

	const search = useUIStore((state) => state.search)
	const categoryFilter = useUIStore((state) => state.categoryFilter)
	const typeFilter = useUIStore((state) => state.typeFilter)
	const setCategoryFilter = useUIStore((state) => state.setCategoryFilter)
	const setTypeFilter = useUIStore((state) => state.setTypeFilter)

	const categories = useMemo(
		() => Array.from(new Set(transactions.map((transaction) => transaction.category))).sort(),
		[transactions],
	)

	const filteredTransactions = useMemo(() => {
		const normalizedSearch = search.trim().toLowerCase()

		return transactions
			.filter((transaction) => {
				const matchesSearch =
					normalizedSearch.length === 0 ||
					transaction.merchant.toLowerCase().includes(normalizedSearch) ||
					transaction.note.toLowerCase().includes(normalizedSearch)

				const matchesCategory =
					categoryFilter === 'all' || transaction.category === categoryFilter

				const matchesType = typeFilter === 'all' || transaction.type === typeFilter

				return matchesSearch && matchesCategory && matchesType
			})
			.sort((left, right) => new Date(right.date) - new Date(left.date))
	}, [transactions, search, categoryFilter, typeFilter])

	const handleQuickAdd = () => {
		addTransaction({
			date: new Date().toISOString().slice(0, 10),
			merchant: 'New Manual Entry',
			note: 'Created from quick add',
			category: 'Operations',
			type: 'expense',
			amount: 200,
		})
	}

	return (
		<div className="space-y-8">
			<section className="flex items-end justify-between">
				<div>
					<h3 className="text-3xl font-extrabold tracking-tight">Transaction Log</h3>
					<p className="mt-1 text-sm text-[#424655]">Search, filter, and manage records across your accounts.</p>
				</div>
				<Button onClick={handleQuickAdd}>
					+ Add Transaction
				</Button>
			</section>

			<TransactionsFilters
				categories={categories}
				categoryFilter={categoryFilter}
				setCategoryFilter={setCategoryFilter}
				typeFilter={typeFilter}
				setTypeFilter={setTypeFilter}
				total={filteredTransactions.length}
			/>

			<TransactionsTable
				transactions={filteredTransactions}
				onDelete={deleteTransaction}
			/>
		</div>
	)
}
