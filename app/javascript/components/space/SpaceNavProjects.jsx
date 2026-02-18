"use client"

import {
  Home,
  Receipt,
  Settings,
  Users,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const SPACE_NAV_ITEMS = [
  { name: "Home", pathKey: "homePath", icon: Home },
  { name: "Users", pathKey: "usersPath", icon: Users },
  { name: "Settings", pathKey: "settingsPath", icon: Settings },
  { name: "Subscriptions", pathKey: "subscriptionsPath", icon: Receipt },
]

export function SpaceNavProjects({ navPaths }) {
  if (!navPaths) return null

  const projects = SPACE_NAV_ITEMS.map((item) => ({
    name: item.name,
    url: navPaths[item.pathKey],
    icon: item.icon,
  })).filter((p) => p.url)

  if (projects.length === 0) return null

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Space</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name}>
              <a href={item.url}>
                <item.icon className="size-4" />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
