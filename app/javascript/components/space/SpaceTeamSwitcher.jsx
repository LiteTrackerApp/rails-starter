"use client"

import { Building2, ChevronsUpDown, LayoutGrid, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function SpaceTeamSwitcher({ spaceName, spacesPath, newSpacePath, spaces = [] }) {
  const { isMobile } = useSidebar()

  if (!spaceName) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Building2 className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{spaceName}</span>
                <span className="truncate text-xs">Space</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Spaces
            </DropdownMenuLabel>
            {spacesPath && (
              <DropdownMenuItem asChild>
                <a href={spacesPath} className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <LayoutGrid className="size-3.5 shrink-0" />
                  </div>
                  All spaces
                </a>
              </DropdownMenuItem>
            )}
            {spaces?.length > 0 &&
              spaces.map((space) => (
                <DropdownMenuItem key={space.id} asChild>
                  <a href={space.path} className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                      <Building2 className="size-3.5 shrink-0" />
                    </div>
                    {space.name}
                  </a>
                </DropdownMenuItem>
              ))}
            {newSpacePath && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href={newSpacePath} className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                      <Plus className="size-4" />
                    </div>
                    <span className="text-muted-foreground font-medium">Add space</span>
                  </a>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
