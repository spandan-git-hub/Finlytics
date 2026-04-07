import { APP_ROUTES } from '../../app/routes'
import { useUIStore } from '../../store/useUIStore'

export default function MobileBottomNav() {
	const activePage = useUIStore((state) => state.activePage)
	const setActivePage = useUIStore((state) => state.setActivePage)

	return (
		<nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#c3c6d8]/30 bg-[#fcf9f8]/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.45rem)] pt-2 backdrop-blur-xl lg:hidden">
			<ul className="mx-auto grid max-w-md grid-cols-3 gap-1">
				{APP_ROUTES.map((route) => {
					const isActive = activePage === route.id
					return (
						<li key={route.id}>
							<button
								type="button"
								onClick={() => setActivePage(route.id)}
								className={`flex w-full flex-col items-center justify-center rounded-2xl px-2 py-2 text-xs font-semibold transition-colors ${
									isActive
										? 'bg-[#0050d6] text-white shadow-[0_10px_22px_rgba(0,80,214,0.22)]'
										: 'text-[#424655] hover:bg-[#e5e2e1]/70'
								}`}
							>
								<span className="material-symbols-outlined text-[20px]">{route.icon}</span>
								<span className="mt-0.5 leading-none">{route.label}</span>
							</button>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
