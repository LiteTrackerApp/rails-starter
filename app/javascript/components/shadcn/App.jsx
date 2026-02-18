import { TooltipProvider } from "@/components/ui/tooltip"
import DashboardPage from "@/components/dashboard/DashboardPage"

function App({ currentUser, csrfToken }) {
  return (
    <TooltipProvider>
      <DashboardPage currentUser={currentUser} csrfToken={csrfToken} />
    </TooltipProvider>
  )
}

export default App
