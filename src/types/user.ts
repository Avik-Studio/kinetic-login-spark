export interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'driver' | 'admin'
  avatar?: string
  phone?: string
  isOnline?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface AuthUser extends User {
  accessToken?: string
  refreshToken?: string
}