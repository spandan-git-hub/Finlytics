import Button from './Button'

export default function EmptyState({
	title,
	description,
	icon = 'inbox',
	actionLabel,
	onAction,
	className = '',
}) {
	return (
		<div className={`rounded-2xl border border-dashed border-[#c3c6d8] bg-white p-8 text-center ${className}`}>
			<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f6f3f2] text-[#424655]">
				<span className="material-symbols-outlined">{icon}</span>
			</div>
			<h4 className="mt-4 text-lg font-bold text-[#1c1b1b]">{title}</h4>
			<p className="mt-1 text-sm text-[#424655]">{description}</p>
			{actionLabel && onAction ? (
				<Button className="mt-4" onClick={onAction}>
					{actionLabel}
				</Button>
			) : null}
		</div>
	)
}
