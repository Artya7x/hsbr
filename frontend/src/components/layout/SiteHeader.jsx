import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {  Avatar, AvatarImage, AvatarFallback }from "@/components/ui/avatar"
import logo from "../../assets/react.svg";
import AppBreadcrumb from "@/components/shared/AppBreadcrumb";
 import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
 } from "@/components/ui/dropdown-menu"



export default function SiteHeader() {
  return (
    <header
      className="
        flex 
        h-(--header-height)                        /* Height controlled by CSS variable */
        shrink-0                                   /* Prevent header from shrinking */
        items-center 
        gap-2 
        border-0 border-b border-border                         /* Bottom border */
        transition-[width,height]                  /* Animated transitions */
        ease-linear 
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)
      "
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        
        {/* SIDEBAR TOGGLE BUTTON */}
        <SidebarTrigger className="-ml-1" />

        {/* VERTICAL LINE */}
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {/* BREADCRUMB */}
        <AppBreadcrumb />

        {/* RIGHT SIDE BUTTONS */}
        <div className="ml-auto flex items-center gap-2">
           <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={logo} className="hover:opacity-40 transition" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" alignOffset={-6} sideOffset={10}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
        </div>

      </div>
    </header>
  )
}
