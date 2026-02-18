import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="max-w-2xl w-full space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Shadcn + React + Tailwind
        </h1>
        <p className="text-lg text-muted-foreground">
          Add more components with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
            npx shadcn@latest add [component]
          </code>
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
    </div>
  )
}

export default App
