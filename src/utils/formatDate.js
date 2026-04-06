export function formatDate(dateValue) {
	return new Date(dateValue).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
}
