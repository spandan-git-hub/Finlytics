function cx(...parts) {
	return parts.filter(Boolean).join(' ')
}

export default function Input({ className = '', ...props }) {
	return (
		<input
			className={cx(
				'rounded-xl border border-transparent bg-white px-4 py-2 text-sm outline-none ring-[#0050d6]/25 focus:ring-2',
				className,
			)}
			{...props}
		/>
	)
}
