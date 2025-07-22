'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import InterviewCard from '@/app/components/InterviewCard';
import { getCurrentUser } from '@/actions/auth.action';
import { getInterviewsByUserId, getLatestInterviews } from '@/actions/general.action';
import { 
  Check, Star, Mail, Code, Brain, Users, Zap, Target, ArrowRight, 
  Menu, X, LogOut, Award, TrendingUp, Sparkles, ChevronRight, 
  Play, Pause, Volume2, MessageCircle, Bot, Rocket, Shield,
  Globe, Database, Server, Monitor, Smartphone, Lightbulb,
  ChevronDown, Eye, Clock, BookOpen, Trophy, GitBranch
} from 'lucide-react';

// Enhanced sample data
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

const Page = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Refs for intersection observer
  const chartRef = useRef(null);
  const skillsRef = useRef(null);
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  // Mock user data (replace with actual data fetching)
  const user = { name: "Yash Kumar", email: "yashlohar158@gmail.com", id: "1" };
  const userInterviews = [];
  const latestInterviews = [];
  const hasPastInterviews = userInterviews.length > 0;
  const hasUpcomingInterviews = latestInterviews.length > 0;

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll detection with enhanced effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      
      // Parallax effect for hero section
      const hero = heroRef.current;
      if (hero) {
        const scrollPercent = window.scrollY / (hero.offsetHeight / 2);
        hero.style.transform = `translateY(${scrollPercent * 50}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    [chartRef, skillsRef, statsRef, featuresRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
  };

  // Enhanced Animated Chart Component
  const AnimatedChart = () => {
    const isVisible = visibleElements.has('chart-section');
    
    return (
      <div className="relative w-full h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
        
        <svg viewBox="0 0 500 350" className="w-full h-full">
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
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="shadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* Animated background grid */}
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <g key={i}>
              <line 
                x1="60" y1={300 - i * 40} 
                x2="440" y2={300 - i * 40}
                stroke="#1f2937" 
                strokeWidth="1"
                opacity="0.3"
                strokeDasharray="5,5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;10"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </line>
              <text 
                x="45" 
                y={305 - i * 40} 
                fill="#6b7280" 
                fontSize="12" 
                textAnchor="end"
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
            opacity="0.2"
            style={{
              opacity: isVisible ? "0.2" : "0",
              transition: "opacity 1s ease-in-out 0.5s"
            }}
          />
          
          {/* PrepWise line */}
          <path
            d={`M60 ${300 - comparisonData[0].prepwise * 2} ${comparisonData.map((point, index) => 
              `L${60 + index * 60} ${300 - point.prepwise * 2}`
            ).join(' ')}`}
            fill="none"
            stroke="url(#prepwiseGradient)"
            strokeWidth="4"
            filter="url(#glow)"
            strokeDasharray="500"
            strokeDashoffset={isVisible ? "0" : "500"}
            style={{
              transition: "stroke-dashoffset 2s ease-in-out",
            }}
          />
          
          {/* Others line */}
          <path
            d={`M60 ${300 - comparisonData[0].others * 2} ${comparisonData.map((point, index) => 
              `L${60 + index * 60} ${300 - point.others * 2}`
            ).join(' ')}`}
            fill="none"
            stroke="url(#othersGradient)"
            strokeWidth="3"
            strokeDasharray="500"
            strokeDashoffset={isVisible ? "0" : "500"}
            style={{
              transition: "stroke-dashoffset 2.5s ease-in-out 0.5s",
            }}
          />
          
          {/* Interactive data points */}
          {comparisonData.map((point, index) => {
            const x = 60 + (index * 60);
            const prepwiseY = 300 - (point.prepwise * 2);
            const othersY = 300 - (point.others * 2);
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={prepwiseY}
                  r="8"
                  fill="#00f5ff"
                  filter="url(#shadow)"
                  opacity={isVisible ? "1" : "0"}
                  style={{
                    transition: `opacity 0.5s ease-in-out ${0.5 + index * 0.2}s`,
                    cursor: 'pointer'
                  }}
                  className="hover:r-10 transition-all duration-200"
                >
                  <animate
                    attributeName="r"
                    values="8;12;8"
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${index * 0.5}s`}
                  />
                </circle>
                <circle
                  cx={x}
                  cy={othersY}
                  r="6"
                  fill="#6b7280"
                  opacity={isVisible ? "1" : "0"}
                  style={{
                    transition: `opacity 0.5s ease-in-out ${1 + index * 0.2}s`,
                  }}
                />
                
                {/* Tooltip on hover */}
                <g className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <rect 
                    x={x - 30} 
                    y={prepwiseY - 40} 
                    width="60" 
                    height="25" 
                    rx="5" 
                    fill="rgba(0, 0, 0, 0.8)" 
                    stroke="#00f5ff" 
                    strokeWidth="1"
                  />
                  <text 
                    x={x} 
                    y={prepwiseY - 25} 
                    fill="#fff" 
                    fontSize="12" 
                    textAnchor="middle"
                  >
                    {point.prepwise}%
                  </text>
                </g>
              </g>
            );
          })}
          
          {/* Legend */}
          <g>
            <circle cx="380" cy="40" r="6" fill="url(#prepwiseGradient)" />
            <text x="395" y="45" fill="#00f5ff" fontSize="14" fontWeight="bold">PrepWise</text>
            
            <circle cx="380" cy="60" r="4" fill="#6b7280" />
            <text x="395" y="65" fill="#6b7280" fontSize="12">Others</text>
          </g>
        </svg>
        
        {/* Floating performance indicators */}
        <div className="absolute top-6 right-6 space-y-3">
          <div className={`bg-gradient-to-r from-cyan-500/90 to-purple-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold transform transition-all duration-1000 border border-cyan-400/30 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              95% Success Rate
            </div>
          </div>
          <div className={`bg-gradient-to-r from-green-500/90 to-emerald-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold transform transition-all duration-1000 delay-300 border border-green-400/30 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              2x Faster Learning
            </div>
          </div>
          <div className={`bg-gradient-to-r from-purple-500/90 to-pink-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold transform transition-all duration-1000 delay-600 border border-purple-400/30 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              1000+ Students
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Skills Chart
  const AnimatedSkillsChart = () => {
    const isVisible = visibleElements.has('skills-section');
    
    return (
      <div className="space-y-8">
        {skillData.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div key={skill.name} className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-5 h-5" style={{ color: skill.color }} />
                  </div>
                  <span className="text-white font-semibold text-lg">{skill.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-2xl" style={{ color: skill.color }}>
                    {skill.score}%
                  </span>
                  <div className="w-6 h-6 rounded-full border-2" style={{ borderColor: skill.color }}>
                    <div 
                      className="w-full h-full rounded-full transition-all duration-1000"
                      style={{ 
                        backgroundColor: isVisible ? skill.color : 'transparent',
                        transitionDelay: `${index * 0.2}s`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="relative w-full bg-gray-800/50 rounded-full h-4 overflow-hidden border border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
                <div
                  className="h-full rounded-full transition-all duration-1500 ease-out relative overflow-hidden"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}20, ${skill.color})`,
                    width: isVisible ? `${skill.score}%` : '0%',
                    transitionDelay: `${index * 0.3}s`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
              
              <div className="mt-2 text-sm text-gray-400 flex justify-between">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Enhanced Stats Component
  const AnimatedStats = () => {
    const isVisible = visibleElements.has('stats-section');
    const [counters, setCounters] = useState({ students: 0, success: 0, questions: 0, support: 0 });
    
    useEffect(() => {
      if (isVisible) {
        const targets = { students: 1000, success: 95, questions: 500, support: 24 };
        const duration = 2500;
        const steps = 100;
        const stepTime = duration / steps;
        
        const increment = {
          students: targets.students / steps,
          success: targets.success / steps,
          questions: targets.questions / steps,
          support: targets.support / steps,
        };
        
        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          setCounters({
            students: Math.min(Math.floor(increment.students * currentStep), targets.students),
            success: Math.min(Math.floor(increment.success * currentStep), targets.success),
            questions: Math.min(Math.floor(increment.questions * currentStep), targets.questions),
            support: Math.min(Math.floor(increment.support * currentStep), targets.support),
          });
          
          if (currentStep >= steps) clearInterval(timer);
        }, stepTime);
        
        return () => clearInterval(timer);
      }
    }, [isVisible]);
    
    const stats = [
      { 
        icon: Users, 
        value: `${counters.students}+`, 
        label: "Students Helped", 
        color: "text-purple-400",
        bgColor: "from-purple-400/20 to-purple-600/20",
        borderColor: "border-purple-400/30"
      },
      { 
        icon: Target, 
        value: `${counters.success}%`, 
        label: "Success Rate", 
        color: "text-cyan-400",
        bgColor: "from-cyan-400/20 to-cyan-600/20",
        borderColor: "border-cyan-400/30"
      },
      { 
        icon: Clock, 
        value: `${counters.support}/7`, 
        label: "AI Support", 
        color: "text-yellow-400",
        bgColor: "from-yellow-400/20 to-yellow-600/20",
        borderColor: "border-yellow-400/30"
      },
      { 
        icon: Brain, 
        value: `${counters.questions}+`, 
        label: "Questions", 
        color: "text-green-400",
        bgColor: "from-green-400/20 to-green-600/20",
        borderColor: "border-green-400/30"
      }
    ];
    
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              className={`group relative bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border ${stat.borderColor} backdrop-blur-sm hover:scale-105 transform transition-all duration-300 cursor-pointer`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s ease-out'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
              <div className="relative text-center space-y-4">
                <div className={`w-16 h-16 ${stat.color} mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <p className={`text-4xl font-bold ${stat.color} mb-2 font-mono`}>
                    {stat.value}
                  </p>
                  <p className="text-gray-300 font-medium">{stat.label}</p>
                </div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Dynamic background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
          }}
        ></div>
        <div 
          className="absolute w-72 h-72 bg-purple-600/5 rounded-full blur-3xl animate-pulse"
          style={{
            right: `${mousePosition.x / 30}px`,
            bottom: `${mousePosition.y / 30}px`,
          }}
        ></div>
      </div>

      {/* Enhanced Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl rotate-45 group-hover:rotate-180 transition-transform duration-500"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  PrepWise
                </h1>
                <p className="text-xs text-gray-400 font-medium">AI Interview Mastery</p>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200 group">
                <Link href="/past-interviews" className="flex items-center gap-2">
                  <Award className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                  Past Interviews
                </Link>
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-purple-400 hover:bg-purple-400/10 transition-all duration-200 group">
                <Link href="/available" className="flex items-center gap-2">
                  <Target className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  Available
                </Link>
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group">
                <Link href="/interview" className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                  Start Interview
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-cyan-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-4 py-6 space-y-4">
              <Link href="/past-interviews" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors py-2">
                <Award className="w-5 h-5" />
                Past Interviews
              </Link>
              <Link href="/available" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors py-2">
                <Target className="w-5 h-5" />
                Available
              </Link>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl">
                <Link href="/interview" className="flex items-center justify-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Start Interview
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="pt-20">
        {/* Enhanced Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-4 py-2 text-sm font-medium text-cyan-400">
                    <Sparkles className="w-4 h-4" />
                    AI-Powered Interview Preparation
                  </div>
                  
                  <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      Master Your
                    </span>
                    <br />
                    <span className="text-white">
                      Tech Interviews
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                    Practice with our advanced AI interviewer, get real-time feedback, and land your dream job at top tech companies. Join 1000+ successful candidates.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group">
                    <Link href="/interview" className="flex items-center gap-3">
                      <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                      Start Free Interview
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                      <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      Watch Demo
                    </div>
                  </Button>
                </div>

                <div className="flex items-center gap-8 pt-8">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">1000+</p>
                    <p className="text-sm text-gray-400">Students Placed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">95%</p>
                    <p className="text-sm text-gray-400">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">500+</p>
                    <p className="text-sm text-gray-400">Questions</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <Image
                    src="/robot.png"
                    alt="AI Interview Assistant"
                    width={500}
                    height={500}
                    className="w-full h-auto animate-float"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section ref={featuresRef} id="features-section" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Why Choose PrepWise?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the future of interview preparation with our cutting-edge AI technology and comprehensive learning platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                const isVisible = visibleElements.has('features-section');
                
                return (
                  <Card 
                    key={advantage.title} 
                    className="group bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                      transition: `all 0.8s ease-out ${index * 0.2}s`
                    }}
                  >
                    <CardContent className="p-8 text-center space-y-6">
                      <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${advantage.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                          {advantage.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
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

        {/* Enhanced Performance Chart Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    Proven Results
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Our students consistently outperform traditional interview preparation methods. See the difference PrepWise makes in your interview success rate.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">2x Faster Learning</h3>
                      <p className="text-gray-400">Accelerated skill development with AI-powered feedback</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">95% Success Rate</h3>
                      <p className="text-gray-400">Industry-leading placement success for our students</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">1000+ Success Stories</h3>
                      <p className="text-gray-400">Join thousands of successful candidates</p>
                    </div>
                  </div>
                </div>
              </div>

              <div ref={chartRef} id="chart-section">
                <AnimatedChart />
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Skills Assessment Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900/50 to-gray-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div ref={skillsRef} id="skills-section">
                <AnimatedSkillsChart />
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    Track Your Progress
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Monitor your improvement across all key interview areas with detailed analytics and personalized recommendations.
                  </p>
                </div>

                <div className="space-y-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={feature.title} className="flex items-start gap-4 group">
                        <div className={`w-12 h-12 ${feature.color} rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                          <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Interview Types Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Interview Categories
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Practice across all major interview types with our comprehensive question database and AI-powered assessment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {interviewTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <Card key={type.name} className="group bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{type.name}</h3>
                          <p className="text-sm text-gray-400">{type.questions} Questions</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Difficulty:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            type.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                            type.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {type.difficulty}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Duration:</span>
                          <span className="text-cyan-400 font-medium">{type.time}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-6 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-purple-600/30 transition-all duration-300">
                        Start Practice
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Your Actual Working Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Past Interviews Section */}
          <section className="flex flex-col gap-6 py-20">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Your Past Interviews
            </h2>
            <div className="interviews-section">
              {hasPastInterviews ? (
                userInterviews.map((interview) => (
                  <InterviewCard key={interview.id} {...interview} />
                ))
              ) : (
                <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-300">You haven't taken any interviews yet.</p>
                    <p className="text-gray-400 mt-2">Start your first interview to see your progress here!</p>
                    <Button asChild className="mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
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
          <section className="flex flex-col gap-6 py-20">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Available Interviews
            </h2>
            <div className="interviews-section">
              {hasUpcomingInterviews ? (
                latestInterviews.map((interview) => (
                  <InterviewCard key={interview.id} {...interview} />
                ))
              ) : (
                <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-300">There are no new interviews available at the moment.</p>
                    <p className="text-gray-400 mt-2">Check back soon for new interview opportunities!</p>
                    <Button asChild className="mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
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

        {/* Enhanced Statistics Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900/50 to-gray-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Our Impact
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join thousands of successful candidates who have transformed their interview performance with PrepWise.
              </p>
            </div>
            
            <div ref={statsRef} id="stats-section">
              <AnimatedStats />
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Success Stories
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Hear from our students who landed their dream jobs at top tech companies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <Card key={index} className="group bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">"{testimonial.content}"</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-cyan-400">{testimonial.company}</span>
                      <span className="text-sm font-medium text-green-400">{testimonial.improvement}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced About Me Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900/50 to-gray-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
                  <Image
                    src="/yash.png"
                    alt="Yash Malvi"
                    width={400}
                    height={400}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    Meet The Creator
                  </h2>
                  <h3 className="text-3xl font-semibold text-white mb-4">Yash Malvi</h3>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    I'm a 3rd-year CSE student passionate about DSA, Backend Development, and building PrepWise - 
                    an AI-powered interview preparation platform. My mission is to democratize interview success 
                    by providing personalized, intelligent feedback that helps developers land their dream jobs.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30">
                    <Code className="w-8 h-8 text-cyan-400" />
                    <div>
                      <p className="font-semibold text-white">Full Stack</p>
                      <p className="text-sm text-gray-400">Developer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30">
                    <Brain className="w-8 h-8 text-purple-400" />
                    <div>
                      <p className="font-semibold text-white">AI</p>
                      <p className="text-sm text-gray-400">Enthusiast</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold">
                    <Mail className="w-5 h-5 mr-2" />
                    Get In Touch
                  </Button>
                  
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-3 rounded-xl font-semibold">
                    <GitBranch className="w-5 h-5 mr-2" />
                    View Projects
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Contact Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Ready to Start?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join thousands of successful candidates and transform your interview performance today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group">
                  <Link href="/interview" className="flex items-center gap-3">
                    <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                    Start Free Interview
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                  <a href="mailto:yaashlohhar158@gmail.com" className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    Contact Me
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-br from-gray-900 to-black border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl rotate-45"></div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">PrepWise</span>
                </div>
                <p className="text-gray-400">
                  AI-powered interview preparation platform helping developers land their dream jobs.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Platform</h4>
                <div className="space-y-2">
                  <Link href="/interview" className="block text-gray-400 hover:text-cyan-400 transition-colors">Practice</Link>
                  <Link href="/past-interviews" className="block text-gray-400 hover:text-cyan-400 transition-colors">Past Interviews</Link>
                  <Link href="/available" className="block text-gray-400 hover:text-cyan-400 transition-colors">Available</Link>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Resources</h4>
                <div className="space-y-2">
                  <Link href="/about" className="block text-gray-400 hover:text-cyan-400 transition-colors">About</Link>
                  <Link href="/blog" className="block text-gray-400 hover:text-cyan-400 transition-colors">Blog</Link>
                  <Link href="/help" className="block text-gray-400 hover:text-cyan-400 transition-colors">Help</Link>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Contact</h4>
                <div className="space-y-2">
                  <a href="mailto:yaashlohhar158@gmail.com" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                    yaashlohhar158@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                Made with <span className="text-red-500">❤️</span> by Yash Malvi © 2024 PrepWise. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Page;
