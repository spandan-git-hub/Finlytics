import Card from '../../components/ui/Card'
import { formatDate } from '../../utils/formatDate'
import { formatCurrency } from '../../utils/formatCurrency'

export default function RecentTransactions({ transactions }) {
	return (
		<Card className="overflow-hidden p-0">
			<div className="border-b border-[#e5e2e1] px-6 py-4">
				<h4 className="text-xl font-bold">Recent Transactions</h4>
				<p className="text-sm text-[#424655]">Your latest activity across all accounts</p>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full text-left text-sm">
					<thead>
						<tr className="text-xs uppercase tracking-widest text-[#424655]">
							<th className="px-6 py-4">Date</th>
							<th className="px-6 py-4">Description</th>
							<th className="px-6 py-4">Category</th>
							<th className="px-6 py-4 text-right">Amount</th>
							<th className="px-6 py-4 text-right">Status</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((transaction) => (
							<tr key={transaction.id} className="border-t border-[#e5e2e1]/40 hover:bg-[#f6f3f2]">
								<td className="px-6 py-4 text-[#424655]">{formatDate(transaction.date)}</td>
								<td className="px-6 py-4">
									<p className="font-semibold">{transaction.merchant}</p>
									<p className="text-xs text-[#424655]">{transaction.note}</p>
								</td>
								<td className="px-6 py-4 text-[#424655]">{transaction.category}</td>
								<td className={`px-6 py-4 text-right font-bold ${transaction.type === 'income' ? 'text-emerald-700' : 'text-[#1c1b1b]'}`}>
									{transaction.type === 'income' ? '+' : '-'}
									{formatCurrency(transaction.amount)}
								</td>
								<td className="px-6 py-4 text-right">
									<span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
										{transaction.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Card>
	)
}
