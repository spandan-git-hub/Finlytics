import { APP_ROUTES } from '../../app/routes'
import { useUIStore } from '../../store/useUIStore'

export default function Sidebar() {
	const activePage = useUIStore((state) => state.activePage)
	const setActivePage = useUIStore((state) => state.setActivePage)

	return (
		<aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-[#c3c6d8]/20 bg-[#f6f3f2] p-4">
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
					<img
						alt="Admin user"
						className="h-10 w-10 rounded-full object-cover"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2fRjhjsOTNChXZ-IwsP8xaer70gazWAVKed_UIglremsZ7qtpszxAAy_gYK_M-QLgxCeOV7p2BsHyZ9Mwj59Lc1mPFDMwMTAHjwJ2w9k1QovcZ6IfLxaxlXynrAmk3TTYbvT6ijEb5oFewCGlSwJFKtObh8IlwBjJDw2JhswPr5FbyORPJ8UtNuNsXR0oEb-ss_v8eB3gPaQFMc8xTuAl5CugpG2BHabiYGii7RvhQvVpVvY-NqYr7Gd2fz_ksVXPEJJkEJVG79k"
					/>
					<div>
						<p className="text-sm font-semibold">Alex Sterling</p>
						<p className="text-xs text-[#424655]">Admin Access</p>
					</div>
				</div>
			</div>
		</aside>
	)
}
