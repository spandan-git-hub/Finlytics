function cx(...parts) {
	return parts.filter(Boolean).join(' ')
}

export default function Button({
	className = '',
	variant = 'solid',
	type = 'button',
	children,
	...props
}) {
	const variants = {
		solid:
			'bg-linear-to-r from-[#0050d6] to-[#2a6af9] text-white shadow-lg shadow-[#0050d6]/20',
		ghost: 'bg-transparent text-[#424655] hover:bg-[#f6f3f2]',
		subtle: 'bg-[#f6f3f2] text-[#1c1b1b] hover:bg-[#e5e2e1]',
	}

	return (
		<button
			type={type}
			className={cx(
				'rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors',
				variants[variant] ?? variants.solid,
				className,
			)}
			{...props}
		>
			{children}
		</button>
	)
}
