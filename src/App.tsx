/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Stethoscope, 
  ShieldCheck, 
  Activity, 
  Users, 
  Award, 
  Calendar, 
  ArrowRight,
  MessageSquare,
  Star,
  CheckCircle2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Sparkles,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini lazily to avoid module-level crashes
let aiInstance: GoogleGenAI | null = null;
const getAi = () => {
  if (!aiInstance) {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY is not defined. AI features will use fallback logic.");
      }
      aiInstance = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
    } catch (e) {
      console.error("Failed to initialize GoogleGenAI:", e);
    }
  }
  return aiInstance;
};

// Components

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-slate-900'}`}>LUMINA <span className="text-blue-600 tracking-wider">HEALTHCARE</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#appointment"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ willChange: 'height, opacity' }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden transform-gpu"
            >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <a 
                  href="#appointment"
                  className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-xl text-base font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DNAHelix = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, x: 20 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        y: [0, -60, 10, -30, 0],
        x: [0, -80, 40, -40, 0],
        rotate: [-8, 12, -4, 6, -8]
      }}
      transition={{ 
        opacity: { duration: 10, repeat: Infinity, ease: "linear" },
        y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 25, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 30, repeat: Infinity, ease: "easeInOut" }
      }}
      style={{ willChange: 'transform, opacity' }}
      className="absolute top-[8%] -right-[10%] sm:right-[5%] md:right-[15%] w-[120px] h-[400px] sm:w-[140px] sm:h-[450px] md:w-[200px] md:h-[650px] z-0 pointer-events-none overflow-visible flex items-center justify-center transform-gpu"
    >
      <div className="relative w-full h-full">
        <svg
          viewBox="0 0 100 400"
          className="w-full h-full drop-shadow-[0_0_40px_rgba(37,99,235,0.1)] overflow-visible"
        >
          <defs>
            <linearGradient id="dna-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#2563eb" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
            </linearGradient>
            <filter id="dna-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {Array.from({ length: 20 }).map((_, i) => {
            const y = 20 + i * 18;
            const delay = i * 0.15;
            const duration = 5;
            
            return (
              <motion.g key={i} className="origin-center" style={{ willChange: 'transform, opacity' }}>
                {/* Connecting Line (Rung) */}
                <motion.line
                  x1="20"
                  y1={y}
                  x2="80"
                  y2={y}
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  strokeOpacity="0.3"
                  animate={{
                    x1: [30, 70, 30],
                    x2: [70, 30, 70],
                    strokeOpacity: [0.2, 0.4, 0.2],
                    strokeWidth: [1, 2, 1]
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay
                  }}
                />
                
                {/* Nucleotides (Spheres) */}
                {[0, 1].map((node) => (
                  <motion.circle
                    key={node}
                    cy={y}
                    r="4"
                    fill={node === 0 ? "#2563eb" : "#60a5fa"}
                    filter="url(#dna-glow-filter)"
                    animate={{
                      cx: node === 0 ? [30, 70, 30] : [70, 30, 70],
                      scale: node === 0 ? [1.2, 0.8, 1.2] : [0.8, 1.2, 0.8],
                      opacity: node === 0 ? [1, 0.4, 1] : [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay
                    }}
                  />
                ))}
              </motion.g>
            );
          })}
          
          {/* Main vertical winding paths (Sugar-phosphate backbones) */}
          <motion.path
            d="M 30 10 Q 70 50, 30 90 Q 70 130, 30 170 Q 70 210, 30 250 Q 70 290, 30 330 Q 70 370, 30 410"
            fill="none"
            stroke="url(#dna-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{
              d: [
                "M 30 10 Q 70 50, 30 90 Q 70 130, 30 170 Q 70 210, 30 250 Q 70 290, 30 330 Q 70 370, 30 410",
                "M 70 10 Q 30 50, 70 90 Q 30 130, 70 170 Q 30 210, 70 250 Q 30 290, 70 330 Q 30 370, 70 410",
                "M 30 10 Q 70 50, 30 90 Q 70 130, 30 170 Q 70 210, 30 250 Q 70 290, 30 330 Q 70 370, 30 410"
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ willChange: 'd' }}
          />
          <motion.path
            d="M 70 10 Q 30 50, 70 90 Q 30 130, 70 170 Q 30 210, 70 250 Q 30 290, 70 330 Q 30 370, 70 410"
            fill="none"
            stroke="url(#dna-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.4"
            animate={{
              d: [
                "M 70 10 Q 30 50, 70 90 Q 30 130, 70 170 Q 30 210, 70 250 Q 30 290, 70 330 Q 30 370, 70 410",
                "M 30 10 Q 70 50, 30 90 Q 70 130, 30 170 Q 70 210, 30 250 Q 70 290, 30 330 Q 70 370, 30 410",
                "M 70 10 Q 30 50, 70 90 Q 30 130, 70 170 Q 30 210, 70 250 Q 30 290, 70 330 Q 30 370, 70 410"
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ willChange: 'd' }}
          />
        </svg>

        {/* Ambient particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-40 blur-[1px]"
            animate={{
              y: [0, -100],
              x: [0, (i % 2 === 0 ? 30 : -30)],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
            style={{
              bottom: "20%",
              left: `${20 + Math.random() * 60}%`,
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-200/30 rounded-full blur-[80px]"></div>

      {/* Floating 3D DNA Visual */}
      <DNAHelix />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="transform-gpu"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              PRECISION CARE
            </div>
            <h1 className="text-[2.75rem] sm:text-5xl md:text-8xl font-serif font-extrabold text-slate-900 leading-[1.1] md:leading-[0.95] tracking-tighter mb-6 md:mb-8">
              PRECISION <br className="hidden sm:block" /> 
              HEALTH FOR <br className="hidden sm:block" />
              <span className="text-blue-600 italic uppercase">Tomorrow</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 mb-8 md:mb-10 max-w-md leading-relaxed">
              Experience the intersection of advanced AI diagnostics and world-class medical expertise. Your wellness, redefined.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
              <a 
                href="#appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                Start Registration
                <ArrowRight className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                  ].map((src, i) => (
                    <img 
                      key={i}
                      src={src} 
                      alt="Patient Avatar"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">+2k</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="relative transform-gpu"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 ease-[0.23,1,0.32,1]">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                alt="Modern Clinic" 
                className="w-full h-auto transform-gpu"
              />
            </div>
            {/* Floating glass card */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 z-20 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/50 max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Activity className="text-green-600 w-5 h-5" />
                </div>
                <div className="text-xs font-bold uppercase text-slate-500 tracking-tighter">Live Monitor</div>
              </div>
              <div className="text-2xl font-bold text-slate-900">98%</div>
              <div className="text-[10px] text-slate-600 uppercase tracking-wide">Success Treatment rate</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Patients Treated', value: '15k+', icon: Users },
    { label: 'Years Experience', value: '12+', icon: Award },
    { label: 'Specialist Doctors', value: '45+', icon: Stethoscope },
    { label: 'Emergency Support', value: '24/7', icon: ShieldCheck },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="p-8 md:p-10 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-blue-600 transition-colors duration-300 transform-gpu"
            >
              <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tighter">{item.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const features = [
    "Personalized AI Health Insights",
    "Top-Tier Medical Specialists",
    "State-of-the-art diagnostic tools",
    "Patient-centric digital workflows",
    "Secure & private consultations"
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ willChange: 'transform, opacity' }}
            className="relative transform-gpu"
          >
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" 
                alt="Clinic Interior" 
                className="w-full"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl z-20 hidden md:block">
              <div className="text-blue-600 font-bold text-4xl mb-1">12+</div>
              <div className="text-slate-500 uppercase tracking-widest text-xs font-bold leading-tight">Awards for <br />Medical Excellence</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ willChange: 'transform, opacity' }}
            className="transform-gpu"
          >
            <div className="text-blue-600 font-bold mb-4 flex items-center gap-2">
              <div className="w-8 h-[2px] bg-blue-600"></div>
              Who We Are
            </div>
            <h2 className="text-[2.25rem] sm:text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 md:mb-8 leading-[1.1] md:leading-[0.95] tracking-tighter">
              Leading the Way in <br className="hidden sm:block" />Healthcare Innovation
            </h2>
            <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed">
              Founded in 2014, Lumina Healthcare has been at the forefront of medical technology. We merge expert human intuition with AI-driven analytics to provide the most accurate diagnoses and effective treatments.
            </p>

            <div className="grid gap-4 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all">
              Learn More About Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { 
      title: 'General Checkup', 
      desc: 'Regular health screenings and comprehensive checkups for all ages.', 
      icon: Activity,
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      title: 'Dental Care', 
      desc: 'Professional oral health services from routine cleaning to complex surgeries.', 
      icon: ShieldCheck,
      color: 'bg-indigo-50 text-indigo-600'
    },
    { 
      title: 'Skin Treatment', 
      desc: 'Advanced dermatological care for healthy, glowing skin.', 
      icon: Sparkles,
      color: 'bg-indigo-50 text-indigo-600'
    },
    { 
      title: 'Pediatrics', 
      desc: 'Specialized healthcare for infants, children, and adolescents.', 
      icon: Users,
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      title: 'Diagnostics', 
      desc: 'AI-assisted imaging and laboratory testing for precise results.', 
      icon: Stethoscope,
      color: 'bg-indigo-50 text-indigo-600'
    },
    { 
      title: 'Physiotherapy', 
      desc: 'Recovery and rehabilitation programs tailored to your needs.', 
      icon: Award,
      color: 'bg-blue-50 text-blue-600'
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-blue-600 font-bold mb-4">Our Expertise</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Comprehensive Care</h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">Providing a wide range of medical services with the latest technology and care.</p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              whileHover={{ y: -5 }}
              className="p-10 rounded-3xl border border-slate-100 bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all group transform-gpu"
            >
              <div className="text-blue-600 mb-4 font-mono text-xs uppercase font-bold tracking-tighter">
                0{idx + 1} / {service.title.split(' ')[0]}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.desc}</p>
              <a href="#" className="text-xs font-bold text-blue-600 underline underline-offset-4">
                Full Specialization
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Doctors = () => {
  const doctors = [
    {
      name: "Dr. Sarah Chen",
      role: "Cardiologist",
      exp: "12 years",
      image: "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=600",
      available: "Mon - Fri"
    },
    {
      name: "Dr. Marcus Thorne",
      role: "Neurologist",
      exp: "15 years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
      available: "Tue - Sat"
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Pediatrician",
      exp: "10 years",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600",
      available: "Mon - Wed"
    }
  ];

  return (
    <section id="doctors" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <div className="text-blue-600 font-bold mb-4">Meet Our Team</div>
          <h2 className="text-[2.25rem] md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">Expert Medical Specialists</h2>
          <p className="text-slate-500 text-sm md:text-base">The most qualified doctors dedicated to your health.</p>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {doctors.map((doctor, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-lg group transform-gpu"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-4">
                    <button className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/40 transition-colors">
                      <Linkedin className="w-5 h-5 text-white" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/40 transition-colors">
                      <Twitter className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="text-blue-600 font-bold mb-1">{doctor.role}</div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{doctor.name}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6 pb-6 border-b border-slate-100">
                  <div>
                    <div className="text-slate-400 uppercase text-[10px] font-bold tracking-tighter">Experience</div>
                    <div className="text-slate-700 font-bold">{doctor.exp}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 uppercase text-[10px] font-bold tracking-tighter">Availability</div>
                    <div className="text-slate-700 font-bold">{doctor.available}</div>
                  </div>
                </div>
                <button className="w-full bg-slate-50 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all transform group-hover:shadow-lg">
                  Book Consultation
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const AppointmentForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', doctor: '', date: '', message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="appointment" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <div className="text-blue-600 font-bold mb-4">Book Your Visit</div>
            <h2 className="text-[2.25rem] md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1] md:leading-[0.95]">Schedule An Appointment Online</h2>
            <p className="text-slate-600 text-sm md:text-base mb-8 max-w-md">
              Complete the form and our coordinator will reach out to confirm your slot within 2 hours.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Emergency Hotline", info: "+1 (555) 000-1111" },
                { icon: Clock, label: "Response Time", info: "Under 2 Hours" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-slate-50 border border-slate-100 rounded-2xl w-fit">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</div>
                    <div className="text-xl font-bold text-slate-900">{item.info}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ willChange: 'transform, opacity' }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative transform-gpu"
          >
            <AnimatePresence>
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Appointment Received!</h3>
                  <p className="text-slate-600">Our medical coordinator will contact you shortly to confirm your booking.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white border border-slate-100 px-5 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white border border-slate-100 px-5 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Doctor</label>
                    <select className="w-full bg-white border border-slate-100 px-5 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer">
                      <option>Dr. Sarah Chen</option>
                      <option>Dr. Marcus Thorne</option>
                      <option>Dr. Elena Rodriguez</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Messages / Symptoms</label>
                    <textarea 
                      rows={4}
                      placeholder="Tell us briefly about your situation..."
                      className="w-full bg-white border border-slate-100 px-5 py-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  <div className="col-span-2">
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1">
                      Confirm Appointment
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-widest font-bold">Secure data encryption powered by Lumina Healthcare</p>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Robert Wilson", review: "The AI diagnostic assistant really helped bridge the gap before I spoke to the doctor. Amazing tech!", rating: 5 },
    { name: "Jessica Smith", review: "Lumina has revolutionized how I think about clinic visits. So clean, professional, and efficient.", rating: 5 },
    { name: "David Lee", review: "Best dental care I've had in years. The facility looks like a 5-star hotel!", rating: 4.8 },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-blue-600 font-bold mb-4">Testimonials</div>
          <h2 className="text-[2.25rem] md:text-4xl font-extrabold text-slate-900 mb-4">What Our Patients Say</h2>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm transform-gpu"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className={`w-5 h-5 ${idx < Math.floor(r.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                ))}
              </div>
              <p className="text-slate-600 text-lg mb-8 italic">"{r.review}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                  {r.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{r.name}</div>
                  <div className="text-slate-400 text-xs uppercase font-bold tracking-widest">Verified Patient</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
          <div>
            <div className="text-blue-600 font-bold mb-4">Contact Details</div>
            <h2 className="text-[2.25rem] md:text-4xl font-extrabold text-slate-900 mb-6">Let's Connected</h2>
            <p className="text-slate-600 mb-10 leading-relaxed max-w-md">Our friendly team is always here to chat. Reach out via email, phone, or visit our high-tech clinic.</p>
            
            <div className="space-y-8">
              {[
                { icon: MapPin, title: "Our Location", content: "123 Healthcare Blvd, Medical District, NY 10001" },
                { icon: Phone, title: "Call Us", content: "+1 (555) 789-0123" },
                { icon: Mail, title: "Email Us", content: "hello@luminacare.com" },
                { icon: Clock, title: "Working Hours", content: "Mon - Sat: 8:00 AM - 9:00 PM" },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 mb-1">{item.title}</h5>
                    <p className="text-slate-500">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl h-[450px]">
            {/* Google Map Mock - in real world use an actual embed */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976373946229!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1651817478051!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const AIHealthAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [booking, setBooking] = useState({ on: false, step: 0, name: '', phone: '', date: '', treatment: '' });
  const [messages, setMessages] = useState<{ role: 'user' | 'ai' | 'system', content: string, opts?: string[] }[]>([
    { role: 'system', content: "WELCOME" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const CLINIC = {
    name: "Lumina Healthcare",
    phone: "+1 (800) VITA-CARE",
    address: "123 Healthcare Blvd, Medical District, NY 10001",
    timings: "Mon–Sat 8AM–9PM | Sun - Emergency Only"
  };

  const STEPS = [
    { q: "Sure! Let me help you book your appointment 😊\n\nFirst — what's your **full name**?", f: 'name' },
    { q: "Got it! Now please share your **phone number** so the clinic can confirm your slot.", f: 'phone' },
    { q: "Perfect! When would you like to visit?", f: 'date', opts: ['Tomorrow', 'Day After Tomorrow', 'This Saturday', 'Next Week', 'Choose Another Date'] },
    { q: "Almost there! What treatment do you need?", f: 'treatment', opts: ['General Checkup', 'Cardiology', 'Neurology', 'Pediatrics', 'Diagnostics', 'Physiotherapy', 'Other'] },
  ];

  const faqChips = [
    { label: '📅 Book an appointment', value: 'I want to book an appointment' },
    { label: '💰 Consultation costs?', value: 'What are your consultation costs?' },
    { label: '⏰ Clinic timings?', value: 'What are your clinic timings?' },
    { label: '🚨 Emergency help!', value: 'I have a medical emergency!' }
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  // Cleanup timeouts on unmount or close
  useEffect(() => {
    return () => {
      if (processingTimeoutRef.current) clearTimeout(processingTimeoutRef.current);
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (processingTimeoutRef.current) clearTimeout(processingTimeoutRef.current);
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
      if (isProcessing) setIsProcessing(false);
      setIsTyping(false);
    }
  }, [isOpen]);

  const handleSend = async (customInput?: string) => {
    const msg = (customInput || input).trim();
    if (!msg || isTyping) return;

    if (!customInput) setInput('');
    
    setMessages(prev => [...prev, { role: 'user', content: msg }]);

    if (booking.on) {
      handleBookingStep(msg);
      return;
    }

    const m = msg.toLowerCase();
    const wantsBook = ['book', 'appoint', 'slot', 'schedule', 'visit', 'booking', 'fix'].some(w => m.includes(w));
    
    if (wantsBook) {
      startBooking();
    } else {
      getAIResponse(msg);
    }
  };

  const startBooking = () => {
    setBooking({ on: true, step: 0, name: '', phone: '', date: '', treatment: '' });
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', content: STEPS[0].q }]);
    }, 800);
  };

  const handleBookingStep = (val: string) => {
    const currentStep = STEPS[booking.step];

    if (currentStep.f === 'phone' && val.replace(/\D/g, '').length < 8) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'ai', content: "Hmm, please enter a valid **phone number** (at least 8 digits). 📞" }]);
      }, 600);
      return;
    }

    const updatedBooking = { ...booking, [currentStep.f]: val, step: booking.step + 1 };
    setBooking(updatedBooking);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (updatedBooking.step < STEPS.length) {
        const next = STEPS[updatedBooking.step];
        setMessages(prev => [...prev, { role: 'ai', content: next.q, opts: next.opts }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: "Perfect! All details received. Let me confirm your slot now... ⚡" }]);
        
        processingTimeoutRef.current = setTimeout(() => {
          setIsProcessing(true);
          successTimeoutRef.current = setTimeout(() => {
            setIsProcessing(false);
            setShowSuccess(true);
          }, 2500);
        }, 1500);
      }
    }, 800);
  };

  const getAIResponse = async (userMsg: string) => {
    setIsTyping(true);
    try {
      const ai = getAi();
      if (!ai) throw new Error("AI not initialized");
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: `You are a friendly, helpful AI Receptionist for "${CLINIC.name}".
            Info:
            - Location: ${CLINIC.address}
            - Hours: ${CLINIC.timings}
            - Phone: ${CLINIC.phone}
            - Services: General Checkup ($150), Cardiology, Neurology, Pediatrics, Diagnostics, Physiotherapy.
            Respond warmly and concisely (under 80 words). Use **bold** for key info. 
            If someone wants to book, encourage them and say the booking assistant will take over.
            DISCLAIMER: Remind them to call 911 for life-threatening emergencies.`,
        }
      });

      if (response && response.text) {
        setMessages(prev => [...prev, { role: 'ai', content: response.text }]);
      } else {
        throw new Error("Empty response from AI");
      }
    } catch (error) {
      console.error(error);
      const m = userMsg.toLowerCase();
      let reply = `Happy to help! For specific queries, call us at **${CLINIC.phone}** or just ask me anything 😊`;
      if (m.includes('timing') || m.includes('open')) reply = `⏰ Our timings:\n**${CLINIC.timings}**`;
      if (m.includes('cost') || m.includes('price')) reply = `💰 Consultation starts at **$150**. Exact quotes for treatments follow after your initial visit!`;
      if (m.includes('emergency') || m.includes('pain')) reply = `🚨 **Medical Emergency?**\nCall us immediately: **${CLINIC.phone}**\nSame-day slots available for urgent cases!`;
      
      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
    } finally {
      setIsTyping(false);
    }
  };

  const resetChat = () => {
    if (processingTimeoutRef.current) clearTimeout(processingTimeoutRef.current);
    if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    setIsProcessing(false);
    setShowSuccess(false);
    setBooking({ on: false, step: 0, name: '', phone: '', date: '', treatment: '' });
    setMessages([{ role: 'system', content: "WELCOME" }]);
  };

  const closeChat = () => {
    setIsOpen(false);
    // Don't reset entirely, just stop processing if active
    if (isProcessing) setIsProcessing(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[100] bg-slate-900 text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <Bot className="w-8 h-8" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot-window"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="fixed bottom-0 left-0 right-0 md:bottom-10 md:left-8 md:right-auto z-[200] w-full md:w-[420px] bg-white h-[95vh] md:h-[85vh] md:max-h-[780px] rounded-t-[2rem] md:rounded-[2.5rem] shadow-2xl border-t md:border border-slate-100 flex flex-col overflow-hidden text-slate-900 transform-gpu"
          >
            {/* Processing Overlay */}
            {isProcessing && (
              <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="text-xl font-bold tracking-tight text-slate-900">Booking your visit…</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Securing AI Slot</div>
              </div>
            )}

            {/* Success Overlay */}
            {showSuccess && (
              <div className="absolute inset-0 z-[60] bg-white flex flex-col items-center justify-center p-8 text-center">
                <button onClick={resetChat} className="absolute top-6 right-6 w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-4xl mb-6 shadow-xl shadow-green-500/10 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">Confirmed!</h3>
                  <p className="text-sm text-slate-500 mb-8 leading-relaxed">Your smart medical appointment has been secured. Our concierge will reach out shortly.</p>

                  <div className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 mb-8 text-left">
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">📋 Reservation Summary</div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center"><span className="text-slate-400 font-medium">Patient</span><span className="font-bold text-slate-900">{booking.name}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400 font-medium">Phone</span><span className="font-bold text-slate-900">{booking.phone}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400 font-medium">Date</span><span className="font-bold text-slate-900">{booking.date}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400 font-medium">Service</span><span className="font-bold text-slate-900">{booking.treatment}</span></div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-xl px-6 py-3 mb-8 text-blue-600 font-bold tracking-wider text-xs">
                    ID: HC-{Math.floor(100000 + Math.random() * 900000)}
                  </div>

                  <button onClick={resetChat} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">← Back to Console</button>
                </div>
              )}

              {/* Header */}
              <div className="p-6 bg-white border-b border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 relative">
                  <Sparkles className="w-6 h-6" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full shadow-lg"></div>
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold text-slate-900">Lumina Healthcare</div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Virtual Receptionist
                  </div>
                </div>
                <button 
                  onClick={closeChat} 
                  className="w-10 h-10 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-xl flex items-center justify-center transition-all group"
                >
                  <X className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                </button>
              </div>

              {/* Chat Area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#fcfdfe] [scrollbar-width:none] overscroll-contain">
                {messages.map((m, i) => {
                  if (m.role === 'system') {
                    return (
                      <div key={i} className="text-center py-8 animate-in slide-in-from-bottom-4 duration-700">
                        <div className="w-16 h-16 bg-blue-50 rounded-3xl mx-auto flex items-center justify-center text-3xl mb-4 shadow-sm">🧬</div>
                        <h4 className="text-2xl font-serif font-bold text-slate-900 mb-2">Welcome to <br/><span className="text-blue-600">Lumina Healthcare</span></h4>
                        <p className="text-xs font-medium text-slate-400 mb-10 max-w-[200px] mx-auto leading-relaxed uppercase tracking-widest">Next generation clinic assistance</p>
                        
                        <div className="flex flex-col gap-3 text-left">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1 ml-4">Direct Actions</div>
                          {faqChips.map(chip => (
                            <button 
                              key={chip.label}
                              onClick={() => handleSend(chip.value)}
                              className="bg-white border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:shadow-xl hover:shadow-blue-500/5 transition-all flex items-center justify-between group"
                            >
                              {chip.label}
                              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </button>
                          ))}
                        </div>
                        <div className="mt-12 inline-block px-4 py-1.5 rounded-full bg-slate-100 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Secure Session · Active Now</div>
                      </div>
                    );
                  }

                  return (
                    <div key={i} className={`flex flex-col gap-2 animate-in slide-in-from-bottom-2 duration-300 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                      {m.role === 'ai' && (
                        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-blue-600 mb-1 ml-2">
                          <Activity className="w-3 h-3" />
                          AI Specialist
                        </div>
                      )}
                      <div className={`max-w-[85%] px-5 py-4 rounded-3xl text-[14px] shadow-sm ${
                        m.role === 'user' 
                          ? 'bg-slate-900 text-white font-medium rounded-tr-none shadow-lg' 
                          : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                      }`}>
                        <p className="whitespace-pre-wrap">{m.content.split('**').map((part, idx) => idx % 2 === 1 ? <b key={idx} className="text-blue-600 font-bold">{part}</b> : part)}</p>
                      </div>
                      {m.opts && (
                        <div className="flex flex-wrap gap-2 mt-4 ml-2">
                          {m.opts.map(o => (
                            <button 
                              key={o} 
                              onClick={() => handleSend(o)} 
                              className="bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-600 rounded-full px-5 py-2.5 text-xs font-bold transition-all shadow-sm"
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="text-[10px] text-slate-300 px-3 flex items-center gap-1.5 mt-1 font-bold">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {m.role === 'user' && <CheckCircle2 className="w-3 h-3 text-blue-400" />}
                      </div>
                    </div>
                  );
                })}
                
                {isTyping && (
                  <div className="flex items-center gap-3 animate-in fade-in duration-300 ml-2">
                    <div className="bg-white border border-slate-100 px-5 py-4 rounded-3xl rounded-tl-none shadow-sm flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-slate-100 pb-10 md:pb-6">
                <div className="flex items-end gap-3 bg-white border border-slate-100 rounded-2xl p-2 pl-5 focus-within:border-blue-400 focus-within:ring-4 ring-blue-500/5 transition-all shadow-sm">
                  <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    rows={1}
                    placeholder={booking.on ? "Your response..." : "Consult our medical AI..."}
                    className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 py-3 resize-none [scrollbar-width:none] placeholder:text-slate-400 placeholder:font-medium"
                    style={{ height: 'auto', minHeight: '26px', maxHeight: '90px' }}
                  />
                  <button 
                    onClick={() => handleSend()}
                    disabled={isTyping}
                    className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-95 transition-transform disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-[9px] text-slate-400 text-center font-bold mt-4 uppercase tracking-[0.15em] opacity-60">Lumina Healthcare Core · Version 2.4.0</div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-8 overflow-hidden relative">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-xl font-bold tracking-tight uppercase">Lumina Healthcare</span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed max-w-sm">
              Experience the intersection of advanced AI diagnostics and world-class medical expertise. Your wellness, redefined.
            </p>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">Practices</h5>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Cardiology</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Neurology</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">AI Screening</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Diagnostics</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">Contact</h5>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li>+1 (800) VITA-CARE</li>
              <li>hello@lumina.ai</li>
              <li>123 Healthcare Blvd, NY</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest gap-4">
          <p>© 2026 Lumina Healthcare. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial loading simulation
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-800">
      <AnimatePresence>
        {loading ? (
          <motion.div 
            key="loader"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white flex items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <Stethoscope className="w-16 h-16 text-blue-600 animate-pulse mb-6" />
              <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-1/2 h-full bg-blue-600 rounded-full shadow-[0_0_10px_#2563eb]"
                />
              </div>
              <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest animate-bounce">Starting Lumina Healthcare...</p>
            </div>
          </motion.div>
        ) : (
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />
            <Hero />
            <Stats />
            <About />
            <Services />
            <Doctors />
            <AppointmentForm />
            <Testimonials />
            <Contact />
            <Footer />
            
            <AIHealthAssistant />

            {/* Floating WhatsApp button */}
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noreferrer"
              className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] bg-[#25D366] text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
            >
              <MessageSquare className="w-8 h-8" />
              <span className="absolute right-20 bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                Chat on WhatsApp
              </span>
            </a>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
