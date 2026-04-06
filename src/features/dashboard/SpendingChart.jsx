import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import Card from '../../components/ui/Card'
import { formatCurrency } from '../../utils/formatCurrency'
import EmptyState from '../../components/ui/EmptyState'

const CATEGORY_COLORS = ['#0050d6', '#2a6af9', '#93b4ff', '#c3c6d8', '#717577']

export default function SpendingChart({ categoryData }) {
	if (categoryData.length === 0) {
		return (
			<Card className="xl:col-span-4">
				<EmptyState
					title="No category breakdown"
					description="Expense transactions will appear here once available."
					icon="donut_small"
				/>
			</Card>
		)
	}

	return (
		<Card className="xl:col-span-4">
			<h4 className="text-xl font-bold">Spending by Category</h4>
			<p className="mb-4 text-sm text-[#424655]">Allocation analysis</p>

			<div className="h-56">
				<ResponsiveContainer>
					<PieChart>
						<Pie data={categoryData} dataKey="value" nameKey="category" innerRadius={50} outerRadius={82}>
							{categoryData.map((entry, index) => (
								<Cell key={entry.category} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
							))}
						</Pie>
						<Tooltip formatter={(value) => formatCurrency(value)} />
					</PieChart>
				</ResponsiveContainer>
			</div>

			<div className="space-y-2">
				{categoryData.slice(0, 4).map((row, index) => (
					<div className="flex items-center justify-between text-sm" key={row.category}>
						<div className="flex items-center gap-2">
							<span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[index] }} />
							<span>{row.category}</span>
						</div>
						<span className="font-semibold">{Math.round(row.percent)}%</span>
					</div>
				))}
			</div>
		</Card>
	)
}
