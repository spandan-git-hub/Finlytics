import { useEffect, useMemo, useState } from 'react'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'

const DEFAULT_FORM = {
	date: new Date().toISOString().slice(0, 10),
	merchant: '',
	note: '',
	category: 'Operations',
	type: 'expense',
	amount: '',
}

export default function TransactionFormModal({
	isOpen,
	mode,
	initialTransaction,
	categories,
	onClose,
	onSubmit,
}) {
	const [form, setForm] = useState(DEFAULT_FORM)

	const modalTitle = mode === 'edit' ? 'Edit Transaction' : 'Add Transaction'

	useEffect(() => {
		if (!isOpen) return

		if (initialTransaction) {
			setForm({
				date: initialTransaction.date,
				merchant: initialTransaction.merchant,
				note: initialTransaction.note,
				category: initialTransaction.category,
				type: initialTransaction.type,
				amount: String(initialTransaction.amount),
			})
			return
		}

		setForm(DEFAULT_FORM)
	}, [isOpen, initialTransaction])

	const categoryOptions = useMemo(() => {
		const baseline = ['Operations', 'Services', 'Technology', 'Marketing', 'Food & Dining', 'Transport']
		const all = [...baseline, ...categories]
		return Array.from(new Set(all)).sort()
	}, [categories])

	const updateField = (key, value) => {
		setForm((current) => ({ ...current, [key]: value }))
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		if (!form.merchant.trim() || !form.note.trim() || !form.date) {
			return
		}

		const parsedAmount = Number(form.amount)
		if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
			return
		}

		onSubmit({
			date: form.date,
			merchant: form.merchant.trim(),
			note: form.note.trim(),
			category: form.category,
			type: form.type,
			amount: parsedAmount,
		})
	}

	return (
		<Modal isOpen={isOpen} title={modalTitle} onClose={onClose}>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<label className="block space-y-2">
						<span className="block text-xs font-semibold uppercase tracking-widest text-[#424655]">Date</span>
						<Input type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} required />
					</label>

					<label className="block space-y-2">
						<span className="block text-xs font-semibold uppercase tracking-widest text-[#424655]">Amount</span>
						<Input
							type="number"
							min="0.01"
							step="0.01"
							value={form.amount}
							onChange={(event) => updateField('amount', event.target.value)}
							placeholder="0.00"
							required
						/>
					</label>
				</div>

				<label className="block space-y-2">
					<span className="block text-xs font-semibold uppercase tracking-widest text-[#424655]">Merchant</span>
					<Input value={form.merchant} onChange={(event) => updateField('merchant', event.target.value)} placeholder="Merchant name" required />
				</label>

				<label className="block space-y-2">
					<span className="block text-xs font-semibold uppercase tracking-widest text-[#424655]">Note</span>
					<Input value={form.note} onChange={(event) => updateField('note', event.target.value)} placeholder="Reason or context" required />
				</label>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<label className="block space-y-2">
						<span className="block text-xs font-semibold uppercase tracking-widest text-[#424655]">Category</span>
						<Select value={form.category} onChange={(event) => updateField('category', event.target.value)}>
							{categoryOptions.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</Select>
					</label>

					<label className="block space-y-2">
						<span className="block text-xs font-semibold uppercase tracking-widest text-[#424655]">Type</span>
						<Select value={form.type} onChange={(event) => updateField('type', event.target.value)}>
							<option value="income">Income</option>
							<option value="expense">Expense</option>
						</Select>
					</label>
				</div>

				<div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
					<Button type="button" variant="subtle" onClick={onClose} className="w-full sm:w-auto">
						Cancel
					</Button>
					<Button type="submit" className="w-full sm:w-auto">
						{mode === 'edit' ? 'Save Changes' : 'Add Transaction'}
					</Button>
				</div>
			</form>
		</Modal>
	)
}
