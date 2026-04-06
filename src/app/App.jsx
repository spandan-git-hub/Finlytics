import AppLayout from '../components/layout/AppLayout'
import DashboardPage from '../pages/DashboardPage'
import TransactionsPage from '../pages/TransactionsPage'
import InsightsPage from '../pages/InsightsPage'
import { useUIStore } from '../store/useUIStore'

const PAGE_COMPONENTS = {
	dashboard: DashboardPage,
	transactions: TransactionsPage,
	insights: InsightsPage,
}

export default function App() {
	const activePage = useUIStore((state) => state.activePage)
	const ActivePage = PAGE_COMPONENTS[activePage] ?? DashboardPage

	return (
		<AppLayout>
			<ActivePage />
		</AppLayout>
	)
}
