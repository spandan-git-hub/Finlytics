import { formatDate } from '../../utils/formatDate'
import { formatCurrency } from '../../utils/formatCurrency'

export default function TransactionsTable({ transactions, onDelete }) {
	return (
		<section className="overflow-hidden rounded-3xl bg-[#f6f3f2] p-4">
			<div className="overflow-x-auto">
				<table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
					<thead>
						<tr className="text-xs font-semibold uppercase tracking-widest text-[#424655]/70">
							<th className="px-4">Date</th>
							<th className="px-4">Description</th>
							<th className="px-4">Category</th>
							<th className="px-4">Type</th>
							<th className="px-4 text-right">Amount</th>
							<th className="px-4 text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((transaction) => (
							<tr key={transaction.id} className="rounded-2xl bg-white shadow-[0px_10px_20px_rgba(28,27,27,0.03)]">
								<td className="rounded-l-2xl px-4 py-4 text-[#424655]">{formatDate(transaction.date)}</td>
								<td className="px-4 py-4">
									<p className="font-semibold">{transaction.merchant}</p>
									<p className="text-xs text-[#424655]">{transaction.note}</p>
								</td>
								<td className="px-4 py-4">{transaction.category}</td>
								<td className="px-4 py-4">
									<span
										className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
											transaction.type === 'income'
												? 'bg-emerald-50 text-emerald-700'
												: 'bg-rose-50 text-rose-700'
										}`}
									>
										{transaction.type}
									</span>
								</td>
								<td className={`px-4 py-4 text-right font-bold ${transaction.type === 'income' ? 'text-emerald-700' : ''}`}>
									{transaction.type === 'income' ? '+' : '-'}
									{formatCurrency(transaction.amount)}
								</td>
								<td className="rounded-r-2xl px-4 py-4 text-right">
									<button
										type="button"
										onClick={() => onDelete(transaction.id)}
										className="rounded-lg px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	)
}
