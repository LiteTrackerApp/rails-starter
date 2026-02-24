import { useEffect, useState } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import DashboardPage from "@/components/dashboard/DashboardPage"

function App() {
  const [props, setProps] = useState(null)

  useEffect(() => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")

    fetch("/api/current_user", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : { currentUser: null }))
      .then((data) => setProps({ ...data, csrfToken }))
      .catch(() => setProps({ currentUser: null, csrfToken }))
  }, [])

  if (props === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <DashboardPage currentUser={props.currentUser} csrfToken={props.csrfToken} />
    </TooltipProvider>
  )
}

export default App
