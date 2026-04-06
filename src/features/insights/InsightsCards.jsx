import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, Cell } from 'recharts'
import { formatCurrency } from '../../utils/formatCurrency'
import EmptyState from '../../components/ui/EmptyState'

export default function InsightsCards({ insights, hasTransactions }) {
	if (!hasTransactions) {
		return (
			<EmptyState
				title="No insights available"
				description="Add transaction data to unlock category, savings, and trend insights."
				icon="insights"
			/>
		)
	}

	const delta = insights.monthlyComparison.delta
	const deltaPercent = insights.monthlyComparison.deltaPercent
	const isExpenseUp = delta > 0
	const savingsBarData = [
		{ name: 'Current', value: insights.savingsPotential.currentSavings, fill: '#0050d6' },
		{ name: 'Target', value: insights.savingsPotential.targetSavings, fill: '#c3c6d8' },
	]

	return (
		<section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
			<div className="space-y-6 lg:col-span-3">
				<article className="rounded-[28px] bg-white p-7 shadow-[0px_10px_40px_rgba(28,27,27,0.05)]">
					<p className="text-xs font-bold uppercase tracking-widest text-[#424655]">Top Category</p>
					<h4 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">{insights.topCategory.category}</h4>
					<p className="mt-1 text-sm text-[#424655]">Highest spending segment this month</p>

					<p className="mt-8 text-4xl font-black tracking-tight sm:text-5xl">{formatCurrency(insights.topCategory.value)}</p>
					<p className="mt-2 text-sm text-[#424655]">
						Share of total expenses: {Math.round(insights.topCategory.percent)}%
					</p>
				</article>

				<article className="rounded-[28px] bg-white p-7 shadow-[0px_10px_40px_rgba(28,27,27,0.05)]">
					<p className="text-xs font-bold uppercase tracking-widest text-[#424655]">Monthly Expense Comparison</p>
					<div className="mt-6 grid grid-cols-2 gap-4">
						<div>
							<p className="text-xs font-bold uppercase tracking-widest text-[#424655]">Previous Month Expense</p>
							<p className="mt-2 text-xl font-bold">{formatCurrency(insights.monthlyComparison.previousValue)}</p>
						</div>
						<div>
							<p className="text-xs font-bold uppercase tracking-widest text-[#424655]">Current Month Expense</p>
							<p className="mt-2 text-xl font-bold">{formatCurrency(insights.monthlyComparison.currentValue)}</p>
						</div>
					</div>

					<div className={`mt-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
						isExpenseUp ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
					}`}>
						{isExpenseUp ? 'Expense increased' : 'Expense decreased'} by {Math.abs(deltaPercent).toFixed(1)}%
					</div>
				</article>
			</div>

			<article className="rounded-[28px] bg-[#f6f3f2] p-7 lg:col-span-2 lg:h-full">
				<h4 className="text-xl font-bold">Savings Potential</h4>
				<p className="mt-1 text-sm text-[#424655]">
					Optimization identified in recurring subscriptions and dining behavior.
				</p>

				<div className="mt-6 h-56 rounded-2xl bg-[#f6f3f2] p-4">
					<ResponsiveContainer>
						<BarChart data={savingsBarData} margin={{ top: 10, right: 8, left: 0, bottom: 8 }}>
							<XAxis
								dataKey="name"
								stroke="#737687"
								tickLine={false}
								axisLine={{ stroke: '#1c1b1b', strokeWidth: 1 }}
							/>
							<Tooltip formatter={(value) => formatCurrency(value)} />
							<Bar dataKey="value" radius={[8, 8, 0, 0]}>
								{savingsBarData.map((entry) => (
									<Cell key={entry.name} fill={entry.fill} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="mt-5 grid grid-cols-2 gap-4 text-sm">
					<div className="rounded-xl bg-white p-3 shadow-[0px_10px_40px_rgba(28,27,27,0.05)]">
						<p className="text-xs font-bold uppercase tracking-widest text-[#424655]">Current Savings</p>
						<p className="mt-1 font-semibold">{formatCurrency(insights.savingsPotential.currentSavings)}</p>
					</div>
					<div className="rounded-xl bg-white p-3 shadow-[0px_10px_40px_rgba(28,27,27,0.05)]">
						<p className="text-xs font-bold uppercase tracking-widest text-[#424655]">Target Goal</p>
						<p className="mt-1 font-semibold">{formatCurrency(insights.savingsPotential.targetSavings)}</p>
					</div>
				</div>
			</article>
		</section>
	)
}
