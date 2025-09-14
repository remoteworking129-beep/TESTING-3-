import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Database, Image, Activity, Download, Share2, Filter } from "lucide-react";

const DashboardPage = () => {
  // Sample data for charts
  const temperatureData = [
    { month: 'Jan', temp: 15.2 },
    { month: 'Feb', temp: 15.8 },
    { month: 'Mar', temp: 16.4 },
    { month: 'Apr', temp: 17.1 },
    { month: 'May', temp: 18.3 },
    { month: 'Jun', temp: 19.7 },
  ];

  const depthData = [
    { depth: '0-50m', count: 245 },
    { depth: '50-100m', count: 182 },
    { depth: '100-200m', count: 134 },
    { depth: '200-500m', count: 98 },
    { depth: '500m+', count: 67 },
  ];

  const marineLifeData = [
    { name: 'Fish', value: 45, color: '#0EA5E9' },
    { name: 'Coral', value: 30, color: '#10B981' },
    { name: 'Plankton', value: 15, color: '#F59E0B' },
    { name: 'Other', value: 10, color: '#8B5CF6' },
  ];

  const recentQueries = [
    { id: 1, query: "Ocean temperature trends in Pacific", timestamp: "2 hours ago", status: "completed" },
    { id: 2, query: "Coral bleaching patterns 2024", timestamp: "4 hours ago", status: "completed" },
    { id: 3, query: "Marine biodiversity analysis", timestamp: "1 day ago", status: "completed" },
    { id: 4, query: "Current flow measurements", timestamp: "2 days ago", status: "processing" },
  ];

  const imageResults = [
    { id: 1, title: "Coral Reef Satellite View", type: "Satellite", date: "Today" },
    { id: 2, title: "Ocean Current Visualization", type: "Generated", date: "Yesterday" },
    { id: 3, title: "Temperature Heatmap", type: "Analysis", date: "2 days ago" },
    { id: 4, title: "Marine Life Distribution", type: "Generated", date: "3 days ago" },
  ];

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Ocean Data Dashboard</h1>
          <p className="text-muted-foreground">Explore your ocean research data and insights</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1,247</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Images Generated</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">863</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent">+8%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Points</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2.4M</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent">+24%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">98.5%</div>
              <Progress value={98.5} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="glass">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="queries">Recent Queries</TabsTrigger>
            <TabsTrigger value="images">Image Results</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Temperature Trends */}
              <Card className="glass border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span>Ocean Temperature Trends</span>
                  </CardTitle>
                  <CardDescription>Average monthly temperatures (°C)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="temp" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={2} 
                        dot={{ fill: 'hsl(var(--accent))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Depth Distribution */}
              <Card className="glass border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart className="w-5 h-5 text-primary" />
                    <span>Data by Ocean Depth</span>
                  </CardTitle>
                  <CardDescription>Number of measurements by depth range</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={depthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="depth" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }} 
                      />
                      <Bar dataKey="count" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Marine Life Distribution */}
              <Card className="glass border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-secondary" />
                    <span>Marine Life Distribution</span>
                  </CardTitle>
                  <CardDescription>Species composition in analyzed samples</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={marineLifeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {marineLifeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass border-accent/20">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common data operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="ocean" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Current Dataset
                  </Button>
                  <Button variant="wave" className="w-full justify-start">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Analysis
                  </Button>
                  <Button variant="wave" className="w-full justify-start">
                    <Filter className="w-4 h-4 mr-2" />
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="queries" className="space-y-4">
            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle>Recent Query History</CardTitle>
                <CardDescription>Your latest data analysis requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQueries.map((query) => (
                    <div key={query.id} className="flex items-center justify-between p-4 rounded-lg glass border border-accent/20">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{query.query}</h4>
                        <p className="text-sm text-muted-foreground">{query.timestamp}</p>
                      </div>
                      <Badge variant={query.status === 'completed' ? 'default' : 'secondary'}>
                        {query.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-4">
            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle>Generated Images</CardTitle>
                <CardDescription>Visual outputs from your queries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {imageResults.map((image) => (
                    <div key={image.id} className="glass border border-accent/20 rounded-lg p-4 space-y-3">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <Image className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{image.title}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline">{image.type}</Badge>
                          <span className="text-xs text-muted-foreground">{image.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>Manage your account and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Research Focus</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Marine Biology</Badge>
                      <Badge>Climate Change</Badge>
                      <Badge>Ocean Temperature</Badge>
                      <Badge>Coral Reefs</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Preferred Data Sources</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">NOAA</Badge>
                      <Badge variant="outline">NASA</Badge>
                      <Badge variant="outline">EU Copernicus</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;