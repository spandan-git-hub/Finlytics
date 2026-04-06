import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatCurrency } from '../../utils/formatCurrency'

export default function BalanceChart({ monthlySeries }) {
	return (
		<article className="rounded-2xl bg-[#f6f3f2] p-6 xl:col-span-8">
			<div className="mb-4">
				<h4 className="text-xl font-bold">Balance History</h4>
				<p className="text-sm text-[#424655]">6-month growth trajectory</p>
			</div>

			<div className="h-72 w-full">
				<ResponsiveContainer>
					<LineChart data={monthlySeries}>
						<XAxis dataKey="month" stroke="#737687" />
						<YAxis stroke="#737687" tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
						<Tooltip formatter={(value) => formatCurrency(value)} />
						<Line
							type="monotone"
							dataKey="balance"
							stroke="#0050d6"
							strokeWidth={3}
							dot={{ fill: '#0050d6', r: 4 }}
							activeDot={{ r: 6 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</article>
	)
}
