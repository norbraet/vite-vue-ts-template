export interface AuthUser {
  id: string
  name: string
  email: string
  role?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
}
