"use client"

import { Bell, HelpCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IUser } from "@/app/types/user.types"
import Link from "next/link"




export function Navbar({ user }: { user: IUser }) {
    const initials = user?.fullName
        ?.split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()

    return (
        <header className="flex h-16 items-center justify-between border-b px-6">
            {/* Search */}
            <div className="flex w-full max-w-md items-center gap-2">
                <Search className="text-muted-foreground" size={18} />
                <Input placeholder="Search..." />

            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <Bell className="cursor-pointer text-muted-foreground" />
                <HelpCircle className="cursor-pointer text-muted-foreground" />

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Avatar>
                                {user?.image ? (
                                    <AvatarImage src={user?.image} />
                                ) : (
                                    <AvatarFallback>{initials}</AvatarFallback>
                                )}
                            </Avatar>
                            <span className="hidden md:block text-sm font-medium">
                                {user?.fullName}
                            </span>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer"><Link href="/profile">Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>



            </div>
        </header>
    )
}
