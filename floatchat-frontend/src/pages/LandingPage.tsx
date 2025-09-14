import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ParticleBackground from "@/components/ParticleBackground";
import { MessageCircle, Database, Image, BarChart3, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/ocean-hero.png";
import logoImage from "@/assets/floatchat-logo.jpg";

const LandingPage = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Intelligent Chat",
      description: "AI-powered conversations about ocean data with real-time responses"
    },
    {
      icon: Database,
      title: "Ocean Analytics",
      description: "Query vast ocean datasets with natural language processing"
    },
    {
      icon: Image,
      title: "Visual Insights",
      description: "Generate and explore ocean imagery with AI assistance"
    },
    {
      icon: BarChart3,
      title: "Data Visualization",
      description: "Beautiful charts and graphs for your ocean research"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security for your sensitive data"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Instant results from complex ocean data queries"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="relative z-10 glass border-b border-accent/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logoImage} alt="FloatChat" className="w-10 h-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FloatChat 🌊
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="wave">Login</Button>
              </Link>
              <Link to="/auth">
                <Button variant="ocean">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Dive Deep
                </span>
                <br />
                <span className="text-foreground">Into Ocean Data</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Explore the depths of ocean intelligence with AI-powered chat, 
                real-time data queries, and stunning visualizations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/chat">
                <Button variant="ocean" size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Chatting
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="wave" size="lg" className="w-full sm:w-auto">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Demo
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Real-time Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>AI Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Secure</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="wave-animation rounded-2xl overflow-hidden shadow-ocean">
              <img 
                src={heroImage} 
                alt="Ocean depths visualization" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Powerful Ocean Intelligence
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to explore, analyze, and understand ocean data like never before
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="glass border-accent/20 hover:border-accent/40 transition-all duration-300 float">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <Card className="glass border-accent/20 p-12 text-center">
          <CardContent className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Explore the Ocean's Depths?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of researchers, scientists, and ocean enthusiasts using FloatChat 
              to unlock insights from the world's largest datasets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button variant="ocean" size="lg">
                  Start Free Trial
                </Button>
              </Link>
              <Button variant="wave" size="lg">
                Schedule Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default LandingPage;