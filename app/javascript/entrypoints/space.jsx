import { createRoot } from "react-dom/client"
import SpacePage from "../components/space/SpacePage"
import "../globals.css"

const propsEl = document.getElementById("space-root-props")
const props = propsEl ? JSON.parse(propsEl.textContent || "{}") : {}

function SpaceApp() {
  if (!props.spaceName) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return <SpacePage {...props} />
}

const container = document.getElementById("space-root")
if (container) {
  createRoot(container).render(<SpaceApp />)
}
