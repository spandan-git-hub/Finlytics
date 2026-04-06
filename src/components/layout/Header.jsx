import { PAGE_TITLES } from '../../app/routes'
import { useUIStore } from '../../store/useUIStore'

export default function Header() {
	const activePage = useUIStore((state) => state.activePage)
	const search = useUIStore((state) => state.search)
	const role = useUIStore((state) => state.role)
	const setSearch = useUIStore((state) => state.setSearch)
	const setRole = useUIStore((state) => state.setRole)

	return (
		<header className="sticky top-0 z-40 flex items-center justify-between bg-[#fcf9f8]/85 px-8 py-3 backdrop-blur-xl">
			<div className="flex items-center gap-8">
				<div>
					<p className="text-xs font-semibold uppercase tracking-widest text-[#424655]/70">Finlytics</p>
					<h2 className="text-lg font-bold text-[#1c1b1b]">{PAGE_TITLES[activePage]}</h2>
				</div>

				<label className="relative hidden md:block">
					<span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#424655]">
						search
					</span>
					<input
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search transactions..."
						className="w-72 rounded-xl border border-transparent bg-[#f0eded] py-2 pl-10 pr-4 text-sm outline-none ring-[#0050d6]/25 transition focus:ring-2"
					/>
				</label>
			</div>

			<div className="flex items-center gap-4">
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

				<button type="button" className="flex h-10 w-10 items-center justify-center rounded-full text-[#424655] hover:bg-[#e5e2e1]">
					<span className="material-symbols-outlined">notifications</span>
				</button>
				<button type="button" className="flex h-10 w-10 items-center justify-center rounded-full text-[#424655] hover:bg-[#e5e2e1]">
					<span className="material-symbols-outlined">settings</span>
				</button>
			</div>
		</header>
	)
}
