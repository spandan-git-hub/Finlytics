import Sidebar from './Sidebar'
import Header from './Header'
import MobileBottomNav from './MobileBottomNav'

export default function AppLayout({ children }) {
	return (
		<div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b]">
			<Sidebar />
			<div className="min-h-screen lg:ml-64">
				<Header />
				<main className="mx-auto w-full max-w-7xl px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">{children}</main>
			</div>
			<MobileBottomNav />
		</div>
	)
}
