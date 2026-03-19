"use client";

import {
  IconDashboard,
  IconListDetails,
  IconChartBar,
  IconFolder,
  IconUsers,
  IconSettings,
  IconHelp,
  IconSearch,
  IconInnerShadowTop,
  IconDatabase,
  IconReport,
  IconFileWord,
  IconHome,
  IconUsersGroup, 
  IconFileSpreadsheet,
  IconVectorBezierCircle 
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom"


import { Button } from "@/components/ui/button";

export default function AppSidebar(props) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>

      {/* HEADER SECTION */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-2 data-[slot=sidebar-menu-button]:!h-auto"
            >
              <a href="#">
                <IconVectorBezierCircle className="!size-6 shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span className="text-base font-semibold">HSBR</span>
                  <span className="text-xs font-normal opacity-70">Acme Consulting</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* MAIN NAVIGATION */}
      <SidebarContent className="flex flex-col gap-2 mt-2">

        {/* MAIN SECTION */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
           >
              <a href="#">
                <IconHome className="!size-5" />
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to = "/">
              
                <IconUsersGroup  className="!size-5" />
                <span>Organizations</span>
             
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to = "/createForm">
                <IconFileSpreadsheet className="!size-5" />
                <span>Survays</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
       
        </SidebarMenu>
        {/* SECONDARY SECTION */}
        <SidebarMenu className="mt-auto mb-5">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <IconSettings className="!size-5" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <IconHelp className="!size-5" />
                <span>Help</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>


        </SidebarMenu>

      </SidebarContent>



    </Sidebar>
  );
}
