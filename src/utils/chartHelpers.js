const MONTH_FORMAT = new Intl.DateTimeFormat('en-US', { month: 'short' })

function getMonthKey(date) {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	return `${year}-${month}`
}

export function getMonthlySeries(transactions, months = 6, openingBalance = 110000) {
	const now = new Date()
	const monthFrames = []

	for (let offset = months - 1; offset >= 0; offset -= 1) {
		const frameDate = new Date(now.getFullYear(), now.getMonth() - offset, 1)
		monthFrames.push({
			key: getMonthKey(frameDate),
			label: MONTH_FORMAT.format(frameDate),
		})
	}

	const monthMap = monthFrames.reduce((accumulator, frame) => {
		accumulator[frame.key] = { month: frame.label, income: 0, expense: 0, balance: 0 }
		return accumulator
	}, {})

	transactions.forEach((transaction) => {
		const key = getMonthKey(new Date(transaction.date))
		const bucket = monthMap[key]
		if (!bucket) return

		if (transaction.type === 'income') {
			bucket.income += transaction.amount
		} else {
			bucket.expense += transaction.amount
		}
	})

	let runningBalance = openingBalance
	return monthFrames.map((frame) => {
		const bucket = monthMap[frame.key]
		runningBalance += bucket.income - bucket.expense
		return {
			...bucket,
			balance: runningBalance,
		}
	})
}

export function getCategoryBreakdown(transactions) {
	const categoryTotals = transactions
		.filter((transaction) => transaction.type === 'expense')
		.reduce((accumulator, transaction) => {
			accumulator[transaction.category] =
				(accumulator[transaction.category] ?? 0) + transaction.amount
			return accumulator
		}, {})

	const rows = Object.entries(categoryTotals).map(([category, value]) => ({
		category,
		value,
	}))

	const total = rows.reduce((sum, row) => sum + row.value, 0)

	return rows
		.sort((left, right) => right.value - left.value)
		.map((row) => ({
			...row,
			percent: total === 0 ? 0 : (row.value / total) * 100,
		}))
}
