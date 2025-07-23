import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import InterviewCard from '../components/InterviewCard';
import { getCurrentUser } from '@/actions/auth.action';

// import { getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.action';
import { getInterviewsByUserId, getLatestInterviews } from '@/actions/general.action';
import { 
  Check, Star, Mail, Code, Brain, Users, Zap, Target, ArrowRight, 
  Award, TrendingUp, Sparkles, ChevronRight, 
  Play, Pause, Volume2, MessageCircle, Bot, Rocket, Shield,
  Globe, Database, Server, Monitor, Smartphone, Lightbulb,
  ChevronDown, Eye, Clock, BookOpen, Trophy, GitBranch,
  Cpu, Layers, Activity, BarChart3, Gauge, Wifi, Bluetooth
} from 'lucide-react';

// Enhanced sample data for visual components
const skillData = [
  { name: 'Data Structures & Algorithms', score: 85, color: '#00f5ff', icon: Database },
  { name: 'System Design', score: 78, color: '#7c3aed', icon: Server },
  { name: 'Behavioral Interviews', score: 92, color: '#06d6a0', icon: Users },
  { name: 'Frontend Development', score: 88, color: '#f59e0b', icon: Monitor },
  { name: 'Backend Development', score: 82, color: '#ef4444', icon: Globe }
];

const comparisonData = [
  { month: 'Jan', prepwise: 65, others: 45, interviews: 120 },
  { month: 'Feb', prepwise: 72, others: 48, interviews: 180 },
  { month: 'Mar', prepwise: 78, others: 52, interviews: 240 },
  { month: 'Apr', prepwise: 85, others: 55, interviews: 320 },
  { month: 'May', prepwise: 90, others: 58, interviews: 400 },
  { month: 'Jun', prepwise: 95, others: 60, interviews: 480 }
];

const testimonials = [
  {
    name: "Arjun Sharma",
    role: "SDE at Google",
    company: "Google",
    content: "PrepWise's AI feedback helped me identify my weak spots and improve my interview performance significantly! Got my dream job in just 3 weeks.",
    rating: 5,
    avatar: "/avatars/arjun.jpg",
    improvement: "40% improvement"
  },
  {
    name: "Priya Patel",
    role: "Software Engineer at Microsoft",
    company: "Microsoft",
    content: "Best interview prep platform I've used. The real-time feedback and personalized questions made all the difference.",
    rating: 5,
    avatar: "/avatars/priya.jpg",
    improvement: "35% improvement"
  },
  {
    name: "Rohit Kumar",
    role: "Full Stack Developer at Amazon",
    company: "Amazon",
    content: "Landed my dream job after practicing here for just 2 weeks. The mock interviews felt so real and prepared me perfectly!",
    rating: 5,
    avatar: "/avatars/rohit.jpg",
    improvement: "50% improvement"
  },
  {
    name: "Sneha Gupta",
    role: "Frontend Developer at Netflix",
    company: "Netflix",
    content: "The AI-powered practice sessions were incredibly realistic. I felt completely prepared for my actual interviews.",
    rating: 5,
    avatar: "/avatars/sneha.jpg",
    improvement: "45% improvement"
  }
];

const advantages = [
  {
    title: "AI-Powered Personalized Questions",
    description: "Our advanced AI creates custom interview questions based on your skill level and target role",
    icon: Bot,
    color: "from-cyan-400 to-blue-500"
  },
  {
    title: "Real-Time Feedback & Analysis",
    description: "Get instant, detailed feedback on your performance with actionable insights",
    icon: Zap,
    color: "from-purple-400 to-pink-500"
  },
  {
    title: "Industry-Standard Coding Environment",
    description: "Practice in a realistic coding environment used by top tech companies",
    icon: Code,
    color: "from-green-400 to-emerald-500"
  },
  {
    title: "Expert-Curated Question Database",
    description: "Access 500+ questions curated by engineers from FAANG companies",
    icon: Database,
    color: "from-yellow-400 to-orange-500"
  }
];

const features = [
  {
    icon: Brain,
    title: "AI Interview Simulator",
    description: "Practice with our advanced AI that adapts to your responses and provides realistic interview scenarios.",
    color: "text-cyan-400"
  },
  {
    icon: Shield,
    title: "Performance Analytics",
    description: "Track your progress with detailed analytics and identify areas for improvement.",
    color: "text-purple-400"
  },
  {
    icon: Rocket,
    title: "Career Guidance",
    description: "Get personalized career advice and interview strategies from industry experts.",
    color: "text-green-400"
  },
  {
    icon: Trophy,
    title: "Achievement System",
    description: "Earn badges and track milestones as you progress through your interview preparation.",
    color: "text-yellow-400"
  }
];

const interviewTypes = [
  { name: "Technical Coding", questions: 150, difficulty: "Medium", time: "45-60 min", icon: Code },
  { name: "System Design", questions: 75, difficulty: "Hard", time: "60-90 min", icon: Server },
  { name: "Behavioral", questions: 100, difficulty: "Easy", time: "30-45 min", icon: Users },
  { name: "Frontend", questions: 80, difficulty: "Medium", time: "45-60 min", icon: Monitor },
  { name: "Backend", questions: 90, difficulty: "Hard", time: "60-75 min", icon: Database }
];

// Server-Compatible Chart Component
const StaticChart = () => {
  return (
    <div className="relative w-full h-96 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
      
      <svg viewBox="0 0 500 350" className="w-full h-full relative z-10">
        <defs>
          <linearGradient id="prepwiseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="50%" stopColor="#0099ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="othersGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
        </defs>
        
        {/* Background grid */}
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <g key={i}>
            <line 
              x1="60" y1={300 - i * 40} 
              x2="440" y2={300 - i * 40}
              stroke="#1f2937" 
              strokeWidth="1"
              opacity="0.3"
              strokeDasharray="5,5"
            />
            <text 
              x="45" 
              y={305 - i * 40} 
              fill="#6b7280" 
              fontSize="12" 
              textAnchor="end"
              className="font-mono"
            >
              {i * 20}%
            </text>
          </g>
        ))}
        
        {/* Month labels */}
        {comparisonData.map((_, index) => (
          <text 
            key={index}
            x={60 + index * 60} 
            y="330" 
            fill="#6b7280" 
            fontSize="12" 
            textAnchor="middle"
            className="font-semibold"
          >
            {comparisonData[index].month}
          </text>
        ))}
        
        {/* PrepWise area chart */}
        <path
          d={`M60 ${300 - comparisonData[0].prepwise * 2} ${comparisonData.map((point, index) => 
            `L${60 + index * 60} ${300 - point.prepwise * 2}`
          ).join(' ')} L420 300 L60 300 Z`}
          fill="url(#prepwiseGradient)"
          opacity="0.3"
        />
        
        {/* PrepWise line */}
        <path
          d={`M60 ${300 - comparisonData[0].prepwise * 2} ${comparisonData.map((point, index) => 
            `L${60 + index * 60} ${300 - point.prepwise * 2}`
          ).join(' ')}`}
          fill="none"
          stroke="url(#prepwiseGradient)"
          strokeWidth="4"
        />
        
        {/* Others line */}
        <path
          d={`M60 ${300 - comparisonData[0].others * 2} ${comparisonData.map((point, index) => 
            `L${60 + index * 60} ${300 - point.others * 2}`
          ).join(' ')}`}
          fill="none"
          stroke="url(#othersGradient)"
          strokeWidth="3"
        />
        
        {/* Data points */}
        {comparisonData.map((point, index) => {
          const x = 60 + (index * 60);
          const prepwiseY = 300 - (point.prepwise * 2);
          const othersY = 300 - (point.others * 2);
          
          return (
            <g key={index}>
              <circle cx={x} cy={prepwiseY} r="8" fill="#00f5ff" />
              <circle cx={x} cy={othersY} r="6" fill="#6b7280" />
            </g>
          );
        })}
        
        {/* Legend */}
        <g>
          <circle cx="380" cy="40" r="8" fill="url(#prepwiseGradient)" />
          <text x="395" y="45" fill="#00f5ff" fontSize="16" fontWeight="bold">PrepWise</text>
          
          <circle cx="380" cy="65" r="6" fill="#6b7280" />
          <text x="395" y="70" fill="#6b7280" fontSize="14">Others</text>
        </g>
      </svg>
      
      {/* Static performance indicators */}
      <div className="absolute top-6 right-6 space-y-3">
        <div className="bg-gradient-to-r from-cyan-500/90 to-purple-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-2xl text-sm font-semibold border border-cyan-400/30 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-lg font-bold">95% Success Rate</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500/90 to-emerald-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-2xl text-sm font-semibold border border-green-400/30 shadow-lg">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5" />
            <span className="text-lg font-bold">2x Faster Learning</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/90 to-pink-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-2xl text-sm font-semibold border border-purple-400/30 shadow-lg">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5" />
            <span className="text-lg font-bold">1000+ Students</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Server-Compatible Skills Chart
const StaticSkillsChart = () => {
  return (
    <div className="space-y-10">
      {skillData.map((skill, index) => {
        const Icon = skill.icon;
        return (
          <div key={skill.name} className="group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border border-gray-600/50">
                  <Icon className="w-7 h-7" style={{ color: skill.color }} />
                </div>
                <span className="text-white font-bold text-xl">{skill.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-3xl" style={{ color: skill.color }}>
                  {skill.score}%
                </span>
                <div className="w-8 h-8 rounded-full border-3" style={{ borderColor: skill.color }}>
                  <div 
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="relative w-full bg-gray-800/50 rounded-full h-6 overflow-hidden border border-gray-700/50 shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              <div
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  background: `linear-gradient(90deg, ${skill.color}30, ${skill.color})`,
                  width: `${skill.score}%`,
                  boxShadow: `0 0 20px ${skill.color}40`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            <div className="mt-3 text-sm text-gray-400 flex justify-between font-medium">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Server-Compatible Stats
const StaticStats = () => {
  const stats = [
    { 
      icon: Users, 
      value: "1000+", 
      label: "Students Helped", 
      color: "text-purple-400",
      bgColor: "from-purple-400/20 to-purple-600/20",
      borderColor: "border-purple-400/30",
      description: "Successful placements"
    },
    { 
      icon: Target, 
      value: "95%", 
      label: "Success Rate", 
      color: "text-cyan-400",
      bgColor: "from-cyan-400/20 to-cyan-600/20",
      borderColor: "border-cyan-400/30",
      description: "Interview success"
    },
    { 
      icon: Clock, 
      value: "24/7", 
      label: "AI Support", 
      color: "text-yellow-400",
      bgColor: "from-yellow-400/20 to-yellow-600/20",
      borderColor: "border-yellow-400/30",
      description: "Always available"
    },
    { 
      icon: Brain, 
      value: "500+", 
      label: "Questions", 
      color: "text-green-400",
      bgColor: "from-green-400/20 to-green-600/20",
      borderColor: "border-green-400/30",
      description: "Curated database"
    }
  ];
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div 
            key={stat.label} 
            className={`group relative bg-gradient-to-br ${stat.bgColor} rounded-3xl p-8 border ${stat.borderColor} backdrop-blur-sm hover:scale-105 transform transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
            <div className="relative text-center space-y-6">
              <div className={`w-20 h-20 ${stat.color} mx-auto mb-6 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
                <Icon className="w-10 h-10" />
              </div>
              <div>
                <p className={`text-5xl font-bold ${stat.color} mb-3 font-mono`}>
                  {stat.value}
                </p>
                <p className="text-white font-bold text-lg mb-2">{stat.label}</p>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
          </div>
        );
      })}
    </div>
  );
};

// Main Server Component
async function Home() {
  // Backend data fetching - preserving original logic
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Static background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse top-1/4 left-1/4"></div>
        <div className="absolute w-72 h-72 bg-purple-600/5 rounded-full blur-3xl animate-pulse bottom-1/4 right-1/4"></div>
        <div className="absolute w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-3 text-base font-semibold text-cyan-400 shadow-lg">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  AI-Powered Interview Preparation
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                
                <h1 className="text-7xl lg:text-8xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Master Your
                  </span>
                  <br />
                  <span className="text-white drop-shadow-2xl">
                    Tech Interviews
                  </span>
                </h1>
                
                <p className="text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  Practice with our advanced AI interviewer, get real-time feedback, and land your dream job at top tech companies. Join 1000+ successful candidates.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-10 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group transform hover:scale-105">
                  <Link href="/interview" className="flex items-center gap-4">
                    <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
                    Start Free Interview
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
                
                <Button variant="outline" className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-cyan-400 px-10 py-6 rounded-2xl font-bold text-xl transition-all duration-300 group transform hover:scale-105">
                  <div className="flex items-center gap-4">
                    <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                    Watch Demo
                  </div>
                </Button>
              </div>

              <div className="flex items-center gap-12 pt-10">
                <div className="text-center">
                  <p className="text-4xl font-bold text-cyan-400 mb-2">1000+</p>
                  <p className="text-base text-gray-400 font-medium">Students Placed</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-purple-400 mb-2">95%</p>
                  <p className="text-base text-gray-400 font-medium">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-400 mb-2">500+</p>
                  <p className="text-base text-gray-400 font-medium">Questions</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/robot.png"
                  alt="AI Interview Assistant"
                  width={600}
                  height={600}
                  className="w-full h-auto animate-bounce drop-shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
              
              {/* Static tech icons around the robot */}
              <div className="absolute top-10 left-10 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center animate-bounce">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-20 right-10 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center animate-bounce">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center animate-bounce">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-10 right-20 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center animate-bounce">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Why Choose PrepWise?
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience the future of interview preparation with our cutting-edge AI technology and comprehensive learning platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              
              return (
                <Card 
                  key={advantage.title} 
                  className="group bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-700 transform hover:scale-110 hover:-translate-y-4 shadow-xl hover:shadow-2xl"
                >
                  <CardContent className="p-10 text-center space-y-8">
                    <div className={`w-24 h-24 mx-auto rounded-3xl bg-gradient-to-r ${advantage.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                        {advantage.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-lg">
                        {advantage.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Performance Chart Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div>
                <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Proven Results
                </h2>
                <p className="text-2xl text-gray-300 leading-relaxed">
                  Our students consistently outperform traditional interview preparation methods. See the difference PrepWise makes in your interview success rate.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-400/20">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">2x Faster Learning</h3>
                    <p className="text-gray-400 text-lg">Accelerated skill development with AI-powered feedback</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-400/20">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">95% Success Rate</h3>
                    <p className="text-gray-400 text-lg">Industry-leading placement success for our students</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-400/20">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">1000+ Success Stories</h3>
                    <p className="text-gray-400 text-lg">Join thousands of successful candidates</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <StaticChart />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Assessment Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900/50 to-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <StaticSkillsChart />
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Track Your Progress
                </h2>
                <p className="text-2xl text-gray-300 leading-relaxed">
                  Monitor your improvement across all key interview areas with detailed analytics and personalized recommendations.
                </p>
              </div>

              <div className="space-y-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex items-start gap-6 group p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl border border-gray-600/30 hover:border-cyan-400/30 transition-all duration-300">
                      <div className={`w-16 h-16 ${feature.color} rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-lg">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Types Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Interview Categories
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Practice across all major interview types with our comprehensive question database and AI-powered assessment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {interviewTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={type.name} className="group bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                  <CardContent className="p-10">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-18 h-18 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{type.name}</h3>
                        <p className="text-base text-gray-400 font-medium">{type.questions} Questions</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-lg">Difficulty:</span>
                        <span className={`px-4 py-2 rounded-full text-base font-bold ${
                          type.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                          type.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {type.difficulty}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-lg">Duration:</span>
                        <span className="text-cyan-400 font-bold text-lg">{type.time}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-8 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-2 border-cyan-400/30 text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-purple-600/30 hover:border-cyan-400/50 transition-all duration-300 py-4 text-lg font-semibold">
                      Start Practice
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Your Actual Working Sections - Integrated with Backend */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Past Interviews Section */}
        <section className="flex flex-col gap-8 py-32">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent text-center">
            Your Past Interviews
          </h2>
          <div className="interviews-section">
            {hasPastInterviews ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userInterviews?.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    userId={user?.id}
                    interviewId={interview.id}
                    role={interview.role}
                    type={interview.type}
                    techstack={interview.techstack}
                    createdAt={interview.createdAt}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-xl">
                <CardContent className="p-12 text-center">
                  <Brain className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                  <p className="text-2xl text-gray-300 mb-4">You haven&apos;t taken any interviews yet.</p>
                  <p className="text-gray-400 text-lg mb-8">Start your first interview to see your progress here!</p>
                  <Button asChild className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 px-8 py-4 text-lg font-semibold">
                    <Link href="/interview">
                      Start Your First Interview
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Available New Interviews Section */}
        <section className="flex flex-col gap-8 py-32">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent text-center">
            Available Interviews
          </h2>
          <div className="interviews-section">
            {hasUpcomingInterviews ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allInterview?.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    userId={user?.id}
                    interviewId={interview.id}
                    role={interview.role}
                    type={interview.type}
                    techstack={interview.techstack}
                    createdAt={interview.createdAt}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-xl">
                <CardContent className="p-12 text-center">
                  <Target className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                  <p className="text-2xl text-gray-300 mb-4">There are no new interviews available at the moment.</p>
                  <p className="text-gray-400 text-lg mb-8">Check back soon for new interview opportunities!</p>
                  <Button asChild className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 px-8 py-4 text-lg font-semibold">
                    <Link href="/interview">
                      Create Custom Interview
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>

      {/* Statistics Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900/50 to-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Our Impact
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Join thousands of successful candidates who have transformed their interview performance with PrepWise.
            </p>
          </div>
          
          <div>
            <StaticStats />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Hear from our students who landed their dream jobs at top tech companies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Card key={index} className="group bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <CardContent className="p-10">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xl">{testimonial.name}</h4>
                      <p className="text-base text-gray-400 mb-2">{testimonial.role}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">&quot;{testimonial.content}&quot;</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-cyan-400">{testimonial.company}</span>
                    <span className="text-base font-bold text-green-400">{testimonial.improvement}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900/50 to-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-10 shadow-2xl">
                <Image
                  src="/yash.png"
                  alt="Yash Malvi"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
            
            <div className="space-y-10">
              <div>
                <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Meet The Creator
                </h2>
                <h3 className="text-4xl font-semibold text-white mb-6">Yash Malvi</h3>
                <p className="text-2xl text-gray-300 leading-relaxed">
                  I&apos;m a 3rd-year CSE student passionate about DSA, Backend Development, and building PrepWise - 
                  an AI-powered interview preparation platform. My mission is to democratize interview success 
                  by providing personalized, intelligent feedback that helps developers land their dream jobs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-400/30 shadow-lg">
                  <Code className="w-12 h-12 text-cyan-400" />
                  <div>
                    <p className="font-bold text-white text-xl">Full Stack</p>
                    <p className="text-base text-gray-400">Developer</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30 shadow-lg">
                  <Brain className="w-12 h-12 text-purple-400" />
                  <div>
                    <p className="font-bold text-white text-xl">AI</p>
                    <p className="text-base text-gray-400">Enthusiast</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg">
                  <Mail className="w-6 h-6 mr-3" />
                  Get In Touch
                </Button>
                
                <Button variant="outline" className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-cyan-400 px-8 py-4 rounded-2xl font-bold text-lg">
                  <GitBranch className="w-6 h-6 mr-3" />
                  View Projects
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-10">
            <h2 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Ready to Start?
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Join thousands of successful candidates and transform your interview performance today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group transform hover:scale-105">
                <Link href="/interview" className="flex items-center gap-4">
                  <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
                  Start Free Interview
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-cyan-400 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105">
                <a href="mailto:yaashlohhar158@gmail.com" className="flex items-center gap-4">
                  <Mail className="w-6 h-6" />
                  Contact Me
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl rotate-45"></div>
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">PrepWise</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                AI-powered interview preparation platform helping developers land their dream jobs.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-xl">Platform</h4>
              <div className="space-y-3">
                <Link href="/interview" className="block text-gray-400 hover:text-cyan-400 transition-colors text-lg">Practice</Link>
                <Link href="/past-interviews" className="block text-gray-400 hover:text-cyan-400 transition-colors text-lg">Past Interviews</Link>
                <Link href="/available" className="block text-gray-400 hover:text-cyan-400 transition-colors text-lg">Available</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-xl">Resources</h4>
              <div className="space-y-3">
                <Link href="/about" className="block text-gray-400 hover:text-cyan-400 transition-colors text-lg">About</Link>
                <Link href="/blog" className="block text-gray-400 hover:text-cyan-400 transition-colors text-lg">Blog</Link>
                <Link href="/help" className="block text-gray-400 hover:text-cyan-400 transition-colors text-lg">Help</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-xl">Contact</h4>
              <div className="space-y-3">
                <a href="mailto:yaashlohhar158@gmail.com" className="block text-gray-400 hover:text-cyan-400 transition-colors text-lg">
                  yaashlohhar158@gmail.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-lg">
              Made with <span className="text-red-500">❤️</span> by Yash Malvi © 2024 PrepWise. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;