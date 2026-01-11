"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { loginSchema, LoginInput } from "@/app/validations/auth.schema"
import { loginUser } from "@/app/services/auth.service"
import { parseApiError } from "@/lib/http/errors"

import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    })

    async function onSubmit(data: LoginInput) {
        setError(null)
        try {
            await loginUser(data)
            toast.success("Login successful", { description: "Sunday, December 03, 2023 at 9:00 AM", })
            router.push("/dashboard")
        } catch (err) {
            setError(parseApiError(err).message)
            toast.error(parseApiError(err).message, { description: "Sunday, December 03, 2023 at 9:00 AM", })
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {/* {error && <p className="text-sm text-destructive">{error}</p>} */}
            <Card className="border-2 shadow-2xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to sign in
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoComplete="email"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button disabled={isSubmitting} className="w-full font-medium" size="lg">
                            {isSubmitting ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="gap-2">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                {/* Google icon svg here - or use lucide-react Google icon */}
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                {/* GitHub icon svg */}
                            </svg>
                            GitHub
                        </Button>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
                    <p>
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-medium text-primary hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </form>
    )
}