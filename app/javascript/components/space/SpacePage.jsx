import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { SpaceSidebar } from "./SpaceSidebar"

const LOGOUT_FORM_ID = "space-logout-form"

export default function SpacePage({
  spaceName,
  spacesPath,
  newSpacePath,
  spaces,
  navPaths,
  currentUser,
  csrfToken,
  breadcrumbTitle,
  contentHtml,
}) {
  const logoutPath = currentUser?.logoutPath

  return (
    <>
      {currentUser?.logoutPath && csrfToken && (
        <form
          id={LOGOUT_FORM_ID}
          method="post"
          action={logoutPath}
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
        <SpaceSidebar
          spaceName={spaceName}
          spacesPath={spacesPath}
          newSpacePath={newSpacePath}
          spaces={spaces}
          navPaths={navPaths}
          currentUser={currentUser}
          logoutPath={logoutPath}
          logoutFormId={LOGOUT_FORM_ID}
        />
        <SidebarInset>
          <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex w-full items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      <a href={spacesPath || "/spaces"}>{spaceName || "Space"}</a>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumbTitle || "Overview"}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div
                className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6 min-h-0 flex-1"
                dangerouslySetInnerHTML={contentHtml ? { __html: contentHtml } : undefined}
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
