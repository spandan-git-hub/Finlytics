export default function Modal({ isOpen, title, onClose, children }) {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-70 flex items-center justify-center bg-black/45 p-4" role="dialog" aria-modal="true">
			<div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-[0px_20px_60px_rgba(0,0,0,0.2)] sm:p-6">
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-lg font-bold text-[#1c1b1b]">{title}</h3>
					<button
						type="button"
						onClick={onClose}
						className="flex h-9 w-9 items-center justify-center rounded-full text-[#424655] hover:bg-[#f6f3f2]"
						aria-label="Close modal"
					>
						<span className="material-symbols-outlined text-[20px]">close</span>
					</button>
				</div>
				{children}
			</div>
		</div>
	)
}
