import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LayoutGrid,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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

export function NavUser({ user, logoutPath, logoutFormId }) {
  const { isMobile } = useSidebar()
  const hasProfilePath = user?.profilePath || user?.changePasswordPath || user?.spacesPath

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded-lg">
                  {user?.name?.slice(0, 2).toUpperCase() || "CN"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name || "User"}</span>
                <span className="truncate text-xs">{user?.email || ""}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">
                    {user?.name?.slice(0, 2).toUpperCase() || "CN"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name || "User"}</span>
                  <span className="truncate text-xs">{user?.email || ""}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {hasProfilePath && (
              <>
                <DropdownMenuGroup>
                  {user?.profilePath && (
                    <DropdownMenuItem asChild>
                      <a href={user.profilePath}>
                        <BadgeCheck />
                        Account
                      </a>
                    </DropdownMenuItem>
                  )}
                  {user?.changePasswordPath && (
                    <DropdownMenuItem asChild>
                      <a href={user.changePasswordPath}>
                        <CreditCard />
                        Change password
                      </a>
                    </DropdownMenuItem>
                  )}
                  {user?.multiTenantMode && (user?.spacesPath || user?.newSpacePath) && (
                    <DropdownMenuItem asChild>
                      <a href={user.hasSpaces ? user.spacesPath : user.newSpacePath}>
                        <LayoutGrid />
                        {user.hasSpaces ? "Spaces" : "+ Add space"}
                      </a>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}
            {!hasProfilePath && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}
            {logoutPath && logoutFormId ? (
              <DropdownMenuItem asChild>
                <button
                  type="button"
                  onClick={() => document.getElementById(logoutFormId)?.requestSubmit()}
                  className="flex w-full cursor-pointer items-center gap-2"
                >
                  <LogOut />
                  Log out
                </button>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
