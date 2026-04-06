import { PAGE_TITLES } from '../../app/routes'
import { useUIStore } from '../../store/useUIStore'

export default function Header() {
	const activePage = useUIStore((state) => state.activePage)
	const search = useUIStore((state) => state.search)
	const role = useUIStore((state) => state.role)
	const setSearch = useUIStore((state) => state.setSearch)
	const setRole = useUIStore((state) => state.setRole)
	const toggleSidebar = useUIStore((state) => state.toggleSidebar)

	return (
		<header className="sticky top-0 z-40 flex items-center justify-between bg-[#fcf9f8]/85 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
			<div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
				<button
					type="button"
					onClick={toggleSidebar}
					className="flex h-10 w-10 items-center justify-center rounded-full text-[#424655] hover:bg-[#e5e2e1] lg:hidden"
					aria-label="Toggle sidebar"
				>
					<span className="material-symbols-outlined">menu</span>
				</button>

				<div>
					<p className="text-xs font-semibold uppercase tracking-widest text-[#424655]/70">Finlytics</p>
					<h2 className="text-base font-bold text-[#1c1b1b] sm:text-lg">{PAGE_TITLES[activePage]}</h2>
				</div>

				<label className="relative hidden md:block">
					<span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#424655]">
						search
					</span>
					<input
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search transactions..."
						className="w-56 rounded-xl border border-transparent bg-[#f0eded] py-2 pl-10 pr-4 text-sm outline-none ring-[#0050d6]/25 transition focus:ring-2 lg:w-72"
					/>
				</label>
			</div>

			<div className="flex items-center gap-2 sm:gap-4">
				<div className="hidden items-center gap-4 md:flex">
					<button
						type="button"
						onClick={() => setRole('viewer')}
						className={`border-b-2 pb-1 text-sm font-medium ${
							role === 'viewer' ? 'border-[#3370FF] text-[#3370FF]' : 'border-transparent text-[#424655]'
						}`}
					>
						Viewer
					</button>
					<button
						type="button"
						onClick={() => setRole('admin')}
						className={`border-b-2 pb-1 text-sm font-medium ${
							role === 'admin' ? 'border-[#3370FF] text-[#3370FF]' : 'border-transparent text-[#424655]'
						}`}
					>
						Admin
					</button>
				</div>

				<select
					className="rounded-lg border border-transparent bg-[#f0eded] px-2 py-1 text-xs font-semibold text-[#424655] outline-none ring-[#0050d6]/25 focus:ring-2 md:hidden"
					value={role}
					onChange={(event) => setRole(event.target.value)}
				>
					<option value="viewer">Viewer</option>
					<option value="admin">Admin</option>
				</select>

				<button type="button" className="hidden h-10 w-10 items-center justify-center rounded-full text-[#424655] hover:bg-[#e5e2e1] sm:flex">
					<span className="material-symbols-outlined">notifications</span>
				</button>
				<button type="button" className="hidden h-10 w-10 items-center justify-center rounded-full text-[#424655] hover:bg-[#e5e2e1] sm:flex">
					<span className="material-symbols-outlined">settings</span>
				</button>
			</div>
		</header>
	)
}
