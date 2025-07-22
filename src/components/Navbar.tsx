import { useState } from 'react'
import { Bell, Menu, X, Car, Users, BarChart3, Wallet, MapPin, Settings, LogOut, DollarSign, FileText, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'driver' | 'admin'
  avatar?: string
  isOnline?: boolean
}

interface NavbarProps {
  user: User
  onLogout: () => void
  notificationCount?: number
}

const roleNavItems = {
  customer: [
    { label: 'Book a Ride', href: '/book', icon: Plus, primary: true },
    { label: 'My Rides', href: '/rides', icon: Car },
    { label: 'Track Ride', href: '/track', icon: MapPin },
    { label: 'Wallet', href: '/wallet', icon: Wallet },
    { label: 'Support', href: '/support', icon: FileText },
  ],
  driver: [
    { label: 'Available Rides', href: '/available', icon: Car },
    { label: 'My Rides', href: '/rides', icon: MapPin },
    { label: 'Earnings', href: '/earnings', icon: DollarSign },
    { label: 'Support', href: '/support', icon: FileText },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin', icon: BarChart3 },
    { label: 'Manage Users', href: '/admin/users', icon: Users },
    { label: 'Manage Rides', href: '/admin/rides', icon: Car },
    { label: 'Revenue', href: '/admin/revenue', icon: DollarSign },
    { label: 'Reports', href: '/admin/reports', icon: FileText },
  ],
}

export default function Navbar({ user, onLogout, notificationCount = 0 }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(user.isOnline || false)

  const navItems = roleNavItems[user.role]

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline)
    // Here you would typically update the server
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => window.location.href = '/'}
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              NeoRide
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={item.primary ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "flex items-center gap-2",
                  item.primary && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                onClick={() => window.location.href = item.href}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}

            {/* Driver Online/Offline Toggle */}
            {user.role === 'driver' && (
              <Button
                variant={isOnline ? "default" : "secondary"}
                size="sm"
                onClick={toggleOnlineStatus}
                className={cn(
                  "flex items-center gap-2",
                  isOnline 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  isOnline ? "bg-white" : "bg-muted-foreground"
                )} />
                {isOnline ? 'Online' : 'Offline'}
              </Button>
            )}
          </div>

          {/* Right Side - Notifications & Profile */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Badge>
              )}
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={item.primary ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    item.primary && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  onClick={() => {
                    window.location.href = item.href
                    closeMobileMenu()
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}

              {/* Driver Online/Offline Toggle - Mobile */}
              {user.role === 'driver' && (
                <Button
                  variant={isOnline ? "default" : "secondary"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isOnline 
                      ? "bg-green-600 hover:bg-green-700 text-white" 
                      : "bg-muted hover:bg-muted/80"
                  )}
                  onClick={() => {
                    toggleOnlineStatus()
                    closeMobileMenu()
                  }}
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    isOnline ? "bg-white" : "bg-muted-foreground"
                  )} />
                  {isOnline ? 'Go Offline' : 'Go Online'}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}