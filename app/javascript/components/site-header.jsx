import { ChevronDownIcon, KeyRoundIcon, LayoutGridIcon, LogOutIcon, UserIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader({ currentUser, logoutFormId }) {
  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">Documents</h1>
        {currentUser && (
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                    <AvatarFallback className="text-xs">
                      {currentUser.name?.slice(0, 2).toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-32 truncate sm:inline md:max-w-40">
                    {currentUser.name}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                    <AvatarFallback className="text-xs">
                      {currentUser.name?.slice(0, 2).toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{currentUser.name}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {currentUser.email}
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <a href={currentUser.profilePath}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={currentUser.changePasswordPath}>
                      <KeyRoundIcon className="mr-2 h-4 w-4" />
                      Change password
                    </a>
                  </DropdownMenuItem>
                  {currentUser.multiTenantMode && (
                    <DropdownMenuItem asChild>
                      <a href={currentUser.spacesPath}>
                        <LayoutGridIcon className="mr-2 h-4 w-4" />
                        Spaces
                      </a>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                {currentUser.isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <a href={currentUser.setupPath} target="_blank" rel="noopener noreferrer">
                          Setup
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href={currentUser.adminPath} target="_blank" rel="noopener noreferrer">
                          Admin
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}
                {logoutFormId && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <button
                        type="button"
                        onClick={() => document.getElementById(logoutFormId)?.requestSubmit()}
                        className="flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden"
                      >
                        <LogOutIcon className="h-4 w-4" />
                        Logout
                      </button>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
}
