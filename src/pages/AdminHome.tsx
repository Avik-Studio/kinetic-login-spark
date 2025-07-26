import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Car, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  BarChart3,
  MapPin,
  Clock,
  Star,
  Shield,
  Settings,
  FileText,
  Activity
} from 'lucide-react'

export default function AdminHome() {
  const [stats] = useState({
    totalUsers: 15420,
    activeDrivers: 1250,
    totalRides: 45680,
    revenue: 125430.50,
    avgRating: 4.7,
    activeRides: 89
  })

  const recentActivity = [
    { id: 1, type: 'user_signup', message: 'New customer registered: John Doe', time: '2 mins ago' },
    { id: 2, type: 'driver_online', message: 'Driver Sarah went online', time: '5 mins ago' },
    { id: 3, type: 'ride_completed', message: 'Ride completed: $25.50 earned', time: '8 mins ago' },
    { id: 4, type: 'issue_reported', message: 'Customer reported payment issue', time: '12 mins ago' },
  ]

  const topDrivers = [
    { id: 1, name: 'Michael Johnson', rides: 156, rating: 4.9, earnings: 2450.75 },
    { id: 2, name: 'Sarah Williams', rides: 142, rating: 4.8, earnings: 2280.50 },
    { id: 3, name: 'David Brown', rides: 138, rating: 4.9, earnings: 2195.25 },
  ]

  const pendingIssues = [
    { id: 1, type: 'payment', customer: 'Alice Cooper', description: 'Payment failed for ride #12345', priority: 'high' },
    { id: 2, type: 'driver', driver: 'Bob Smith', description: 'Driver verification pending', priority: 'medium' },
    { id: 3, type: 'technical', description: 'App crash reported by multiple users', priority: 'high' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Monitor and manage your ride-sharing platform</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="px-3 py-1">
              <Activity className="w-4 h-4 mr-2" />
              System Healthy
            </Badge>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 text-center">
              <Car className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.activeDrivers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Active Drivers</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 text-center">
              <MapPin className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalRides.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Rides</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Revenue</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.avgRating}</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.activeRides}</div>
              <div className="text-sm text-gray-600">Active Rides</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Management Tabs */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Platform Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="users" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="drivers">Drivers</TabsTrigger>
                    <TabsTrigger value="rides">Rides</TabsTrigger>
                    <TabsTrigger value="finance">Finance</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="users" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <Users className="w-6 h-6" />
                        <span className="text-sm">Manage Users</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <Shield className="w-6 h-6" />
                        <span className="text-sm">User Verification</span>
                      </Button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Recent User Activity</h4>
                      <p className="text-sm text-gray-600">156 new registrations this week</p>
                      <p className="text-sm text-gray-600">12 users reported issues</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="drivers" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <Car className="w-6 h-6" />
                        <span className="text-sm">Driver Applications</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <FileText className="w-6 h-6" />
                        <span className="text-sm">Document Review</span>
                      </Button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Driver Statistics</h4>
                      <p className="text-sm text-gray-600">23 pending applications</p>
                      <p className="text-sm text-gray-600">1,250 active drivers</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="rides" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <MapPin className="w-6 h-6" />
                        <span className="text-sm">Live Tracking</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <BarChart3 className="w-6 h-6" />
                        <span className="text-sm">Ride Analytics</span>
                      </Button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Ride Metrics</h4>
                      <p className="text-sm text-gray-600">89 rides currently active</p>
                      <p className="text-sm text-gray-600">Average ride time: 18 minutes</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="finance" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <DollarSign className="w-6 h-6" />
                        <span className="text-sm">Revenue Reports</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <TrendingUp className="w-6 h-6" />
                        <span className="text-sm">Financial Analytics</span>
                      </Button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Financial Overview</h4>
                      <p className="text-sm text-gray-600">Monthly revenue: $125,430</p>
                      <p className="text-sm text-gray-600">Commission earned: $18,765</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Top Drivers */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Top Performing Drivers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topDrivers.map((driver, index) => (
                  <div key={driver.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{driver.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{driver.rides} rides</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{driver.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">${driver.earnings}</div>
                      <div className="text-sm text-gray-500">This month</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pending Issues */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Pending Issues
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingIssues.map((issue) => (
                  <div key={issue.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={issue.priority === 'high' ? 'destructive' : 'secondary'}>
                        {issue.priority}
                      </Badge>
                      <span className="text-xs text-gray-500 capitalize">{issue.type}</span>
                    </div>
                    <p className="text-sm text-gray-900">{issue.description}</p>
                    {issue.customer && (
                      <p className="text-xs text-gray-600 mt-1">Customer: {issue.customer}</p>
                    )}
                    {issue.driver && (
                      <p className="text-xs text-gray-600 mt-1">Driver: {issue.driver}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Server Status</span>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Gateway</span>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Response</span>
                  <span className="text-sm">125ms</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}