import { GuestLayout } from "../components/auth/guest-layout"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <GuestLayout>
            <div className="relative h-full overflow-y-auto bg-background">
                <div className="relative flex min-h-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        {children}
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}