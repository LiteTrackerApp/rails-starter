import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

import dashboardData from "@/data/dashboard-data.json"

const LOGOUT_FORM_ID = "logout-form"

export default function DashboardPage({ currentUser, csrfToken }) {
  return (
    <>
      {currentUser?.logoutPath && csrfToken && (
        <form
          id={LOGOUT_FORM_ID}
          method="post"
          action={currentUser.logoutPath}
          className="hidden"
        >
          <input type="hidden" name="_method" value="delete" />
          <input type="hidden" name="authenticity_token" value={csrfToken} />
        </form>
      )}
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <AppSidebar
          variant="inset"
          currentUser={currentUser}
          csrfToken={csrfToken}
          logoutPath={currentUser?.logoutPath}
          logoutFormId={LOGOUT_FORM_ID}
        />
        <SidebarInset>
          <SiteHeader currentUser={currentUser} logoutFormId={LOGOUT_FORM_ID} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={dashboardData} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </>
  )
}
