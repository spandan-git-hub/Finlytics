import Select from '../../components/ui/Select'

export default function TransactionsFilters({
	categories,
	categoryFilter,
	setCategoryFilter,
	typeFilter,
	setTypeFilter,
	sortOrder,
	onToggleSort,
	total,
}) {
	return (
		<section className="rounded-2xl bg-[#f6f3f2] p-4">
			<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
				<Select className="w-full sm:w-auto" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
					<option value="all">All Categories</option>
					{categories.map((category) => (
						<option value={category} key={category}>
							{category}
						</option>
					))}
				</Select>

				<Select className="w-full sm:w-auto" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
					<option value="all">All Types</option>
					<option value="income">Income</option>
					<option value="expense">Expense</option>
				</Select>

				<button
					type="button"
					onClick={onToggleSort}
					className="w-full rounded-xl border border-transparent bg-white px-4 py-2 text-sm font-medium text-[#424655] outline-none ring-[#0050d6]/25 hover:bg-[#f0eded] focus:ring-2 sm:w-auto"
				>
					Sort: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
				</button>

				<div className="text-xs font-semibold uppercase tracking-widest text-[#424655] sm:ml-auto">
					{total} entries
				</div>
			</div>
		</section>
	)
}
