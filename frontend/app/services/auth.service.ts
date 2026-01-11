import { api } from "@/lib/http/axios"
import { tokenStorage } from "@/app/storage/token"
import { LoginInput, RegisterInput } from "@/app/validations/auth.schema"

export async function registerUser(data: RegisterInput) {
  const res = await api.post("/auth/register", data)
  tokenStorage.set(res.data.token)
  return res.data
}

export async function loginUser(data: LoginInput) {
  const res = await api.post("/auth/login", data)
  tokenStorage.set(res.data.token)
  return res.data
}

export function logout() {
  tokenStorage.remove()
}

export async function getProfile() {
  const res = await api.get("/auth/me")
  return res.data
}

export async function getGoogleStatus(userId: string) {
  const res = await api.get(`/users/${userId}/google-status`)
  return res.data as { googleConnected: boolean }
}

export function getGoogleAuthUrl(userId: string) {
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
  return `${baseUrl}/auth/google?userId=${userId}`
}

export async function getProfileBySlug(slug: string) {
  const res = await api.get(`/profile/${slug}/full`)
  return res.data
}
