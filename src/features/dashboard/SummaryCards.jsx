import Card from '../../components/ui/Card'
import { formatCurrency } from '../../utils/formatCurrency'

export default function SummaryCards({ totals, balance }) {
	return (
		<section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<Card>
				<p className="text-xs font-bold uppercase tracking-widest text-[#424655]">Total Balance</p>
				<p className="mt-3 text-4xl font-black tracking-tight">{formatCurrency(balance)}</p>
				<p className="mt-2 text-sm text-[#0050d6]">Based on recorded income and expenses</p>
			</Card>

			<Card>
				<p className="text-xs font-bold uppercase tracking-widest text-[#424655]">Total Income</p>
				<p className="mt-3 text-4xl font-black tracking-tight">{formatCurrency(totals.income)}</p>
				<p className="mt-2 text-sm text-emerald-700">Healthy inflow across service contracts</p>
			</Card>

			<Card>
				<p className="text-xs font-bold uppercase tracking-widest text-[#424655]">Total Expenses</p>
				<p className="mt-3 text-4xl font-black tracking-tight">{formatCurrency(totals.expenses)}</p>
				<p className="mt-2 text-sm text-rose-700">Primary drivers: rent, marketing, and cloud infra</p>
			</Card>
		</section>
	)
}
