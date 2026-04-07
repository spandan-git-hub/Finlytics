import { APP_ROUTES } from '../../app/routes'
import { useUIStore } from '../../store/useUIStore'

export default function Sidebar() {
	const activePage = useUIStore((state) => state.activePage)
	const role = useUIStore((state) => state.role)
	const setActivePage = useUIStore((state) => state.setActivePage)

	return (
		<aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-[#c3c6d8]/20 bg-[#f6f3f2] p-4 lg:flex">
			<div className="mb-10 flex items-center gap-3 px-2">
				<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0050d6] text-white">
					<span className="material-symbols-outlined text-[18px]">finance_chip</span>
				</div>
				<div>
					<h1 className="text-lg font-bold tracking-tight">Finlytics</h1>
					<p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-[#424655]/70">
						Digital Curator Workspace
					</p>
				</div>
			</div>

			<nav className="flex flex-1 flex-col gap-1">
				{APP_ROUTES.map((route) => {
					const isActive = activePage === route.id
					return (
						<button
							key={route.id}
							type="button"
							onClick={() => setActivePage(route.id)}
							className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
								isActive
									? 'bg-[#e5e2e1] font-semibold text-[#1c1b1b]'
									: 'font-medium text-[#424655] hover:bg-[#e5e2e1]/60'
							}`}
						>
							<span className="material-symbols-outlined text-[20px]">{route.icon}</span>
							<span>{route.label}</span>
						</button>
					)
				})}
			</nav>

			<div className="mt-auto rounded-xl bg-white/70 p-3">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8eefc] text-[#0050d6]">
						<svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
							<path d="M12 12.5c2.07 0 3.75-1.68 3.75-3.75S14.07 5 12 5 8.25 6.68 8.25 8.75 9.93 12.5 12 12.5Zm0 1.5c-3.04 0-5.5 2.02-5.5 4.5 0 .28.22.5.5.5h10c.28 0 .5-.22.5-.5 0-2.48-2.46-4.5-5.5-4.5Z" />
						</svg>
					</div>
					<div>
						<p className="text-sm font-semibold">Alex Sterling</p>
						<p className="text-xs text-[#424655]">{role === 'admin' ? 'Admin Access' : 'Viewer Access'}</p>
					</div>
				</div>
			</div>
		</aside>
	)
}
