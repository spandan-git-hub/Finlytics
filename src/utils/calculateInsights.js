import { getCategoryBreakdown } from './chartHelpers'

function monthKey(dateValue) {
	const date = new Date(dateValue)
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function getInsights(transactions) {
	const breakdown = getCategoryBreakdown(transactions)
	const topCategory = breakdown[0] ?? { category: 'No Data', value: 0, percent: 0 }

	const expensesByMonth = transactions
		.filter((transaction) => transaction.type === 'expense')
		.reduce((accumulator, transaction) => {
			const key = monthKey(transaction.date)
			accumulator[key] = (accumulator[key] ?? 0) + transaction.amount
			return accumulator
		}, {})

	const sortedMonths = Object.keys(expensesByMonth).sort()
	const currentMonth = sortedMonths.at(-1)
	const previousMonth = sortedMonths.at(-2)

	const currentValue = currentMonth ? expensesByMonth[currentMonth] : 0
	const previousValue = previousMonth ? expensesByMonth[previousMonth] : 0
	const delta = currentValue - previousValue
	const deltaPercent = previousValue === 0 ? 0 : (delta / previousValue) * 100

	const savingsTarget = Math.max(currentValue * 0.8, 0)

	return {
		topCategory,
		monthlyComparison: {
			currentValue,
			previousValue,
			delta,
			deltaPercent,
		},
		savingsPotential: {
			currentSavings: Math.max(currentValue * 0.3, 0),
			targetSavings: savingsTarget,
			ratio: savingsTarget === 0 ? 0 : Math.min((currentValue * 0.3) / savingsTarget, 1),
		},
	}
}
