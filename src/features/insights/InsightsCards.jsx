import Button from '../../components/ui/Button'
import { formatCurrency } from '../../utils/formatCurrency'

export default function InsightsCards({ insights }) {
	return (
		<section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
			<article className="rounded-[28px] bg-white p-7 shadow-[0px_10px_40px_rgba(28,27,27,0.05)] lg:col-span-7">
				<p className="text-xs font-bold uppercase tracking-widest text-[#424655]">Top Category</p>
				<h4 className="mt-2 text-3xl font-black tracking-tight">{insights.topCategory.category}</h4>
				<p className="mt-1 text-sm text-[#424655]">Highest spending segment this month</p>

				<p className="mt-8 text-5xl font-black tracking-tight">{formatCurrency(insights.topCategory.value)}</p>
				<p className="mt-2 text-sm text-[#424655]">
					Share of total expenses: {Math.round(insights.topCategory.percent)}%
				</p>

				<div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#e5e2e1] pt-6">
					<div>
						<p className="text-xs font-bold uppercase tracking-widest text-[#424655]">Previous Month</p>
						<p className="mt-2 text-xl font-bold">{formatCurrency(insights.monthlyComparison.previousValue)}</p>
					</div>
					<div>
						<p className="text-xs font-bold uppercase tracking-widest text-[#424655]">Current Month</p>
						<p className="mt-2 text-xl font-bold">{formatCurrency(insights.monthlyComparison.currentValue)}</p>
					</div>
				</div>
			</article>

			<article className="rounded-[28px] bg-[#f6f3f2] p-7 lg:col-span-5">
				<h4 className="text-xl font-bold">Savings Potential</h4>
				<p className="mt-1 text-sm text-[#424655]">
					Optimization identified in recurring subscriptions and dining behavior.
				</p>

				<div className="mt-8 space-y-5">
					<div>
						<div className="mb-2 flex justify-between text-sm font-semibold">
							<span>Current Savings</span>
							<span>{formatCurrency(insights.savingsPotential.currentSavings)}</span>
						</div>
						<div className="h-3 overflow-hidden rounded-full bg-[#e5e2e1]">
							<div
								className="h-full rounded-full bg-[#0050d6]"
								style={{ width: `${Math.round(insights.savingsPotential.ratio * 100)}%` }}
							/>
						</div>
					</div>

					<div>
						<div className="mb-2 flex justify-between text-sm font-semibold">
							<span>Target</span>
							<span>{formatCurrency(insights.savingsPotential.targetSavings)}</span>
						</div>
						<div className="h-3 rounded-full border-2 border-dashed border-[#c3c6d8]" />
					</div>
				</div>

				<Button className="mt-8 w-full">Apply Optimization Plan</Button>
			</article>
		</section>
	)
}
