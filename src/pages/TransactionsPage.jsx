import { useMemo, useState } from 'react'
import { useTransactionsStore } from '../store/useTransactionsStore'
import { useUIStore } from '../store/useUIStore'
import Button from '../components/ui/Button'
import TransactionsFilters from '../features/transactions/TransactionsFilters'
import TransactionsTable from '../features/transactions/TransactionsTable'
import TransactionFormModal from '../features/transactions/TransactionFormModal'
import EmptyState from '../components/ui/EmptyState'

export default function TransactionsPage() {
	const transactions = useTransactionsStore((state) => state.transactions)
	const addTransaction = useTransactionsStore((state) => state.addTransaction)
	const updateTransaction = useTransactionsStore((state) => state.updateTransaction)
	const deleteTransaction = useTransactionsStore((state) => state.deleteTransaction)

	const role = useUIStore((state) => state.role)
	const search = useUIStore((state) => state.search)
	const categoryFilter = useUIStore((state) => state.categoryFilter)
	const typeFilter = useUIStore((state) => state.typeFilter)
	const setCategoryFilter = useUIStore((state) => state.setCategoryFilter)
	const setTypeFilter = useUIStore((state) => state.setTypeFilter)

	const [isFormOpen, setIsFormOpen] = useState(false)
	const [editTarget, setEditTarget] = useState(null)
	const [sortOrder, setSortOrder] = useState('desc')

	const canManageTransactions = role === 'admin'

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
			.sort((left, right) => {
				const diff = new Date(right.date) - new Date(left.date)
				return sortOrder === 'desc' ? diff : -diff
			})
	}, [transactions, search, categoryFilter, typeFilter, sortOrder])

	const toggleSortOrder = () => {
		setSortOrder((current) => (current === 'desc' ? 'asc' : 'desc'))
	}

	const openAddModal = () => {
		if (!canManageTransactions) return
		setEditTarget(null)
		setIsFormOpen(true)
	}

	const openEditModal = (transaction) => {
		if (!canManageTransactions) return
		setEditTarget(transaction)
		setIsFormOpen(true)
	}

	const closeFormModal = () => {
		setIsFormOpen(false)
		setEditTarget(null)
	}

	const handleSubmitTransaction = (payload) => {
		if (!canManageTransactions) return

		if (editTarget) {
			updateTransaction(editTarget.id, payload)
		} else {
			addTransaction(payload)
		}

		closeFormModal()
	}

	const handleDeleteTransaction = (id) => {
		if (!canManageTransactions) return
		deleteTransaction(id)
	}

	return (
		<div className="space-y-8">
			<section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Transaction Log</h3>
					<p className="mt-1 text-sm text-[#424655]">Search, filter, and manage records across your accounts.</p>
				</div>
				{canManageTransactions ? <Button onClick={openAddModal}>+ Add Transaction</Button> : null}
			</section>

			{transactions.length === 0 ? (
				<EmptyState
					title="No transactions yet"
					description={
						canManageTransactions
							? 'Start by adding your first transaction to populate the dashboard.'
							: 'There is currently no transaction data to display.'
					}
					icon="receipt_long"
					actionLabel={canManageTransactions ? 'Add Transaction' : undefined}
					onAction={canManageTransactions ? openAddModal : undefined}
				/>
			) : (
				<>
					<TransactionsFilters
						categories={categories}
						categoryFilter={categoryFilter}
						setCategoryFilter={setCategoryFilter}
						typeFilter={typeFilter}
						setTypeFilter={setTypeFilter}
						sortOrder={sortOrder}
						onToggleSort={toggleSortOrder}
						total={filteredTransactions.length}
					/>

					<TransactionsTable
						transactions={filteredTransactions}
						canManage={canManageTransactions}
						onEdit={openEditModal}
						onDelete={handleDeleteTransaction}
					/>
				</>
			)}

			<TransactionFormModal
				isOpen={isFormOpen}
				mode={editTarget ? 'edit' : 'add'}
				initialTransaction={editTarget}
				categories={categories}
				onClose={closeFormModal}
				onSubmit={handleSubmitTransaction}
			/>
		</div>
	)
}
