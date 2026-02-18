"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { NavUser } from "@/components/nav-user"
import { SpaceNavProjects } from "./SpaceNavProjects"
import { SpaceTeamSwitcher } from "./SpaceTeamSwitcher"

const defaultUser = {
  name: "Guest",
  email: "",
  avatar: "/avatars/default.jpg",
}

export function SpaceSidebar({
  spaceName,
  spacesPath,
  newSpacePath,
  navPaths,
  currentUser,
  logoutPath,
  logoutFormId,
}) {
  const user = currentUser
    ? {
        ...defaultUser,
        ...currentUser,
        avatar: currentUser.avatarUrl || defaultUser.avatar,
      }
    : defaultUser

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader>
        <SpaceTeamSwitcher
          spaceName={spaceName}
          spacesPath={spacesPath}
          newSpacePath={newSpacePath}
        />
      </SidebarHeader>
      <SidebarContent>
        <SpaceNavProjects navPaths={navPaths} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={user}
          logoutPath={logoutPath}
          logoutFormId={logoutFormId}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
