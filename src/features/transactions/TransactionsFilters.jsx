import Select from '../../components/ui/Select'

export default function TransactionsFilters({
	categories,
	categoryFilter,
	setCategoryFilter,
	typeFilter,
	setTypeFilter,
	total,
}) {
	return (
		<section className="rounded-2xl bg-[#f6f3f2] p-4">
			<div className="flex flex-wrap items-center gap-3">
				<Select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
					<option value="all">All Categories</option>
					{categories.map((category) => (
						<option value={category} key={category}>
							{category}
						</option>
					))}
				</Select>

				<Select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
					<option value="all">All Types</option>
					<option value="income">Income</option>
					<option value="expense">Expense</option>
				</Select>

				<div className="ml-auto text-xs font-semibold uppercase tracking-widest text-[#424655]">
					{total} entries
				</div>
			</div>
		</section>
	)
}
