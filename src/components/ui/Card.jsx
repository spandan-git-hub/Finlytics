function cx(...parts) {
	return parts.filter(Boolean).join(' ')
}

export default function Card({ as: Tag = 'article', className = '', children, ...props }) {
	return (
		<Tag
			className={cx(
				'rounded-2xl border border-[#c3c6d8]/20 bg-white p-6 shadow-[0px_10px_40px_rgba(28,27,27,0.04)]',
				className,
			)}
			{...props}
		>
			{children}
		</Tag>
	)
}
