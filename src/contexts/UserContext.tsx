import { createContext, useContext, useState, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'driver' | 'admin'
  avatar?: string
  isOnline?: boolean
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  updateUserRole: (role: 'customer' | 'driver' | 'admin') => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer', // Default role - can be changed for demo
    avatar: '',
    isOnline: false,
  })

  const updateUserRole = (role: 'customer' | 'driver' | 'admin') => {
    if (user) {
      setUser({ 
        ...user, 
        role,
        isOnline: role === 'driver' ? false : undefined 
      })
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, updateUserRole }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}