export interface IUser {
    _id: string
    fullName: string
    email: string
    role: string
    googleConnected: boolean
    timezone: string
    createdAt?: string
    slug: string
    __v?: number
    googleId?: string
    image?: string
    refreshToken?: string
}
