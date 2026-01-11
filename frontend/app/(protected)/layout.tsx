"use client"

import dynamic from "next/dynamic"
import { ProtectedLayout } from "../components/auth/protected-layout"
import { Navbar } from "../components/layout/navbar"
import { Sidebar } from "../components/layout/sidebar"
import { useProfileQuery } from "../services/queries/authQuery"
const CommandSearch = dynamic(
    () => import("../components/search/command-search").then((mod) => mod.CommandSearch),
    { ssr: false }
)
export default function ProtectedGroupLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: user } = useProfileQuery();
   
    return (
        <ProtectedLayout>
            <div className="flex h-full overflow-hidden">
                <CommandSearch />

                <Sidebar />

                <div className="flex flex-1 flex-col overflow-hidden">
                    <Navbar user={user} />

                    <main className="flex-1 overflow-y-auto p-6 bg-zinc-50/50">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedLayout>
    )
}
