import { createRoot } from "react-dom/client"
import App from "../components/shadcn/App"
import "../globals.css"

const container = document.getElementById("shadcn-root")
if (container) {
  createRoot(container).render(<App />)
}
