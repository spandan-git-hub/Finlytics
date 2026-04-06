import { useTransactionsStore } from '../store/useTransactionsStore'
import { getCategoryBreakdown, getMonthlySeries } from '../utils/chartHelpers'
import SummaryCards from '../features/dashboard/SummaryCards'
import BalanceChart from '../features/dashboard/BalanceChart'
import SpendingChart from '../features/dashboard/SpendingChart'
import RecentTransactions from '../features/dashboard/RecentTransactions'

export default function DashboardPage() {
	const transactions = useTransactionsStore((state) => state.transactions)

	const totals = transactions.reduce(
		(accumulator, transaction) => {
			if (transaction.type === 'income') {
				accumulator.income += transaction.amount
			} else {
				accumulator.expenses += transaction.amount
			}
			return accumulator
		},
		{ income: 0, expenses: 0 },
	)

	const balance = totals.income - totals.expenses
	const monthlySeries = getMonthlySeries(transactions, 6)
	const categoryData = getCategoryBreakdown(transactions)
	const recentTransactions = [...transactions]
		.sort((left, right) => new Date(right.date) - new Date(left.date))
		.slice(0, 5)
	const hasTransactions = transactions.length > 0

	return (
		<div className="space-y-8">
			<section>
				<h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Dashboard Overview</h3>
				<p className="mt-1 text-sm text-[#424655]">Welcome back, your financial snapshot is up to date.</p>
			</section>

			<SummaryCards totals={totals} balance={balance} />

			<section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
				<BalanceChart monthlySeries={monthlySeries} hasTransactions={hasTransactions} />
				<SpendingChart categoryData={categoryData} />
			</section>

			<RecentTransactions transactions={recentTransactions} />
		</div>
	)
}
