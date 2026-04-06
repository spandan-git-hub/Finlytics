import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { useTransactionsStore } from '../store/useTransactionsStore'
import { formatCurrency } from '../utils/formatCurrency'
import { getMonthlySeries } from '../utils/chartHelpers'
import { getInsights } from '../utils/calculateInsights'
import InsightsCards from '../features/insights/InsightsCards'

export default function InsightsPage() {
	const transactions = useTransactionsStore((state) => state.transactions)
	const monthlySeries = getMonthlySeries(transactions, 6)
	const insights = getInsights(transactions)

	return (
		<div className="space-y-8">
			<section className="flex items-end justify-between">
				<div>
					<h3 className="text-3xl font-extrabold tracking-tight">Financial Insights</h3>
					<p className="mt-1 text-sm text-[#424655]">Strategic overview of your fiscal performance.</p>
				</div>

				<div className="rounded-xl bg-[#f6f3f2] px-4 py-2 text-sm font-semibold">Last 30 Days</div>
			</section>

			<InsightsCards insights={insights} />

			<section className="rounded-2xl border border-[#c3c6d8]/20 bg-white p-6 shadow-[0px_10px_40px_rgba(28,27,27,0.04)]">
				<h4 className="text-xl font-bold">Monthly Income vs Expense</h4>
				<p className="mb-4 text-sm text-[#424655]">Trend comparison across the latest 6 months.</p>

				<div className="h-72">
					<ResponsiveContainer>
						<BarChart data={monthlySeries}>
							<CartesianGrid strokeDasharray="3 3" stroke="#e5e2e1" />
							<XAxis dataKey="month" stroke="#737687" />
							<YAxis stroke="#737687" tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
							<Tooltip formatter={(value) => formatCurrency(value)} />
							<Bar dataKey="income" fill="#0050d6" radius={[6, 6, 0, 0]} />
							<Bar dataKey="expense" fill="#c3c6d8" radius={[6, 6, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</section>

		</div>
	)
}
