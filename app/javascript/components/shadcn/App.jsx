import { TooltipProvider } from "@/components/ui/tooltip"
import DashboardPage from "@/components/dashboard/DashboardPage"

function App({ currentUser }) {
  return (
    <TooltipProvider>
      <DashboardPage currentUser={currentUser} />
    </TooltipProvider>
  )
}

export default App
