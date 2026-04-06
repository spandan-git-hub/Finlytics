import Sidebar from './Sidebar'
import Header from './Header'

export default function AppLayout({ children }) {
	return (
		<div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b]">
			<Sidebar />
			<div className="ml-64 min-h-screen">
				<Header />
				<main className="mx-auto w-full max-w-7xl px-8 py-8">{children}</main>
			</div>
		</div>
	)
}
