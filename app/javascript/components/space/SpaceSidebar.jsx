"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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
  spaces,
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
    <Sidebar collapsible="icon" side="left" variant="inset">
      <SidebarHeader>
        <SpaceTeamSwitcher
          spaceName={spaceName}
          spacesPath={spacesPath}
          newSpacePath={newSpacePath}
          spaces={spaces}
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
    </Sidebar>
  )
}
