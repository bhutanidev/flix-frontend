"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Info, ChevronDown, Star, Zap, Shield, Smartphone, Code2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const RotFlixLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter()
  const heroSlides = [
    {
      title: "Scroll of Doom",
      description: "You thought you'd stop at one reel. Now it's 4 AM and you're arguing with strangers in the comments.",
      gradient: "from-red-900/90 to-black/90"
    },
    {
      title: "Mindless Loop",
      description: "You've refreshed the feed 12 times. Nothing's new. But here you are. Again.",
      gradient: "from-pink-900/90 to-purple-900/90"
    },
    {
      title: "Digital Rot",
      description: "Where critical thinking dies and clickbait thrives. Welcome to your new home.",
      gradient: "from-orange-900/90 to-red-900/90"
    }
  ];

  const features = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "24/7 Doomscroll",
      description: "Our algorithms ensure you never sleep again.",
      color: "from-rose-600 to-red-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Hyper Engagement",
      description: "Dopamine hits every 3.2 seconds. Guaranteed.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Zero Control",
      description: "You think you're in charge? Adorable.",
      color: "from-red-700 to-pink-700"
    }
  ];

  const trendingShows = [
    { title: "Quantum Nexus", rating: 4.9, image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&h=600&fit=crop", genre: "Sci-Fi" },
    { title: "Dark Circuit", rating: 4.7, image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=600&fit=crop", genre: "Thriller" },
    { title: "Neon Dreams", rating: 4.8, image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=600&fit=crop", genre: "Drama" },
    { title: "Binary Hearts", rating: 4.6, image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop", genre: "Romance" },
    { title: "Code Red", rating: 4.8, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop", genre: "Action" },
    { title: "Digital Pulse", rating: 4.5, image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&h=600&fit=crop", genre: "Mystery" }
  ];

  useEffect(() => {    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast(`🎬 Welcome to RotFlix! We'll send exclusive updates to ${email}`);
      setEmail('');
    }
  };

  const handleTechStackClick = () => {
    router.push('/tech-used')
  };

  const handleSignIn = () => {
    router.push('/signin')
  };

  const handleWatchNow = () => {
    router.push('/signin')
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-500" 
           style={{ 
             backgroundColor: scrollY > 100 ? 'rgba(0,0,0,0.95)' : 'transparent',
             backdropFilter: scrollY > 100 ? 'blur(20px)' : 'none',
             borderBottom: scrollY > 100 ? '1px solid rgba(255,255,255,0.1)' : 'none'
           }}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
            RotFlix
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleTechStackClick}
              variant="ghost" 
              className="text-white/80 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 border border-transparent hover:border-cyan-400/30"
            >
              <Code2 className="w-4 h-4 mr-2" />
              Built with 💻
            </Button>
            <Button onClick={handleSignIn} variant="ghost" className="text-white hover:text-red-400 transition-colors duration-300">
              Sign In
            </Button>
            <Button onClick={handleWatchNow} className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25">
              Watch Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].gradient} transition-all duration-1000`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold backdrop-blur-sm">
              🧠 Daily Degeneration
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Unlimited Movies ,
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Videos and More
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Mindless entertainment
            <br />
            <span className="text-red-400 font-medium">Stream exclusive brainrot videos.</span>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className=" bg-gradient-to-b from-black via-gray-900/50 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Why RotFlix?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience entertainment like never before with cutting-edge technology and unlimited content.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/30 backdrop-blur-sm hover:scale-105 hover:border-white/20 transition-all duration-500 cursor-pointer">
                <CardContent className="p-10 text-center">
                  <div className={`w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Shows */}
      <section className="py-24 bg-gradient-to-br from-gray-900/80 to-black">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Trending Now
                </span>
              </h2>
              <p className="text-gray-400 text-lg">What everyone's watching this week</p>
            </div>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-white hover:text-white transition-all duration-300">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trendingShows.map((show, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl transition-all duration-500 group-hover:scale-105 group-hover:z-10">
                  <img 
                    src={show.image} 
                    alt={show.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                    <span className="inline-block px-3 py-1 bg-red-600/80 backdrop-blur-sm rounded-full text-xs font-semibold">
                      {show.genre}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-bold">{show.rating}</span>
                      </div>
                      <Button size="sm" className="bg-white/20 hover:bg-white hover:text-black backdrop-blur-sm transition-all duration-300">
                        <Play className="w-3 h-3" />
                      </Button>
                    </div>
                    <h3 className="text-white font-bold text-lg leading-tight">{show.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
            Ready for the revolution?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto font-light">
            Join millions who've already discovered their new obsession.
            <br />
            <span className="font-semibold">Start your journey today.</span>
          </p>
          <div className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white focus:bg-white/20 backdrop-blur-sm h-14 text-lg"
              onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit(e)}
            />
            <Button 
              onClick={handleEmailSubmit} 
              className="bg-black text-white hover:bg-gray-900 px-8 h-14 text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Start Watching
            </Button>
          </div>
          <p className="text-white/70 text-sm">
            No commitments. Cancel online anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                RotFlix
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your gateway to unlimited entertainment. Stream the latest movies, binge-worthy series, and exclusive content.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">i</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-red-400 transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors duration-300">Press Kit</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors duration-300">Investors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-red-400 transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors duration-300">Contact Us</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors duration-300">Device Support</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors duration-300">Account</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-red-400 transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors duration-300">Terms of Use</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors duration-300">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors duration-300">Content Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2025 RotFlix. All rights reserved. Made with ❤️ for movie lovers.
            </p>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span>All content, trademarks, and images belong to their respective owners. RotFlix claims no ownership.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RotFlixLanding;