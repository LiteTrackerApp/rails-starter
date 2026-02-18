import { createRoot } from "react-dom/client"
import App from "../components/shadcn/App"
import "../globals.css"

const propsEl = document.getElementById("shadcn-root-props")
const props = propsEl ? JSON.parse(propsEl.textContent || "{}") : {}

const container = document.getElementById("shadcn-root")
if (container) {
  createRoot(container).render(<App {...props} />)
}
