import { useState, useRef, useEffect } from "react";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useMotionTemplate 
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { 
  Sparkles, 
  Mail, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Download, 
  Copy, 
  RefreshCw, 
  Cpu, 
  HelpCircle, 
  Layers, 
  Settings, 
  Users, 
  FileText, 
  Play, 
  CheckCircle2, 
  Lock,
  ChevronUp,
  Bookmark,
  Calendar,
  DollarSign,
  MoveRight,
  PhoneCall
} from "lucide-react";
import BorderGlow from "./BorderGlow";
import Ferrofluid from "./Ferrofluid";
import FlowingMenu from "./FlowingMenu";
import Silk from "./Silk";
import DarkVeil from "./DarkVeil";
import ColorBends from "./ColorBends";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5001";

// 🐦 Custom Monochrome Brand Icons (Consistent stroke-width & minimalist vector design)
function TwitterIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: "1em", height: "1em", display: "inline-block" }}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: "1em", height: "1em", display: "inline-block" }}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ width: "1em", height: "1em", display: "inline-block" }}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

// ✨ Spotlight Card Component (Cursor spotlight overlay with 3D mouse tilt)
function SpotlightCard({ children, className = "", style = {}, glowCorner = false }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    
    mouseX.set(x);
    mouseY.set(y);

    // Subtle 2-degree maximum tilt rotation
    const multiplier = 2; 
    const rX = ((y / height) - 0.5) * -multiplier; 
    const rY = ((x / width) - 0.5) * multiplier;
    
    rotateX.set(rX);
    rotateY.set(rY);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${glowCorner ? "glow-card" : ""} ${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        perspective: "1000px",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style
      }}
    >
      <motion.div
        className="spotlight-overlay"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(110, 168, 254, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      <div className="spotlight-content" style={{ height: "100%", width: "100%", position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  );
}

// 📈 Animated Stat Component
const CountUpComponent = typeof CountUp === "function" ? CountUp : (CountUp.default || CountUp);

function AnimatedStat({ value, suffix = "", desc, icon: Icon }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const numericPart = parseFloat(value);
  const textSuffix = value.replace(numericPart.toString(), "") + suffix;

  return (
    <div ref={ref} className="stat-card-inner">
      <div className="stat-card-header">
        {Icon && <Icon className="stat-icon" />}
      </div>
      <h3 className="stat-number">
        {inView ? (
          <CountUpComponent start={0} end={numericPart} duration={2} separator="," suffix={textSuffix} />
        ) : (
          "0"
        )}
      </h3>
      <p className="stat-desc">{desc}</p>
    </div>
  );
}

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const [toast, setToast] = useState("");
  const [copied, setCopied] = useState("");
  const [tone, setTone] = useState("professional");
  const [brandVoice, setBrandVoice] = useState("professional");
  const [audience, setAudience] = useState("Startup Founder");
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("twitter");
  const [format, setFormat] = useState("social");
  const [instructions, setInstructions] = useState("");
  const [userId, setUserId] = useState("");
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(0);

  // New UI-only states
  const [scrolled, setScrolled] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");

  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 4; // max 4deg
    const rotateY = (x / (rect.width / 2)) * 4; // max 4deg
    setHeroTilt({ x: rotateX, y: rotateY });
  };
  const handleHeroMouseLeave = () => {
    setHeroTilt({ x: 0, y: 0 });
  };

  // Auth pages & session state
  const [authMode, setAuthMode] = useState(null);
  const [userSession, setUserSession] = useState(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [authName, setAuthName] = useState("");

  const fetchUsage = async (currUserId) => {
    if (!currUserId) return;
    try {
      const res = await fetch(`${API_URL}/api/usage/${currUserId}`);
      if (res.ok) {
        const data = await res.json();
        setUsage(data.usage);
        setLimit(data.limit);
      }
    } catch (err) {
      console.error("Failed to fetch usage:", err);
    }
  };

  useEffect(() => {
    // Restore user session
    const sessionStr = localStorage.getItem("userSession");
    let activeId = "";
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      setUserSession(session);
      activeId = session.email;
    } else {
      let id = localStorage.getItem("userId");
      if (!id) {
        id = "user_" + Math.random().toString(36).substring(2, 9);
        localStorage.setItem("userId", id);
      }
      activeId = id;
    }
    setUserId(activeId);
    fetchUsage(activeId);

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) {
          if (result && !loading) {
            handleImprove();
          }
        } else {
          if (text.trim() && !loading) {
            handleGenerate();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [text, loading, result, brandVoice, audience, format, instructions, userId]);

  const handleImprove = async () => {
    if (!result) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          tone: "viral",
          format,
          instructions,
          brandVoice,
          audience,
          userId,
        }),
      });
      const data = await res.json();

      if (data.usage !== undefined) {
        setUsage(data.usage);
        setLimit(data.limit);
      }

      if (data.error) {
        if (data.error === "limit_reached") {
          setToast("Limit Reached! Upgrade to Pro");
        } else {
          setToast("Error: " + data.error);
        }
        setLoading(false);
        return;
      }

      setResult(data);
      setToast("Optimized!");
    } catch (err) {
      setToast("Optimization Failed");
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!result) return;
    let content = "";

    if (format === "social") {
      content = `TWITTER:\n${result.twitter?.join("\n\n")}\n\nLINKEDIN:\n${result.linkedin}\n\nSUMMARY:\n${result.summary}`;
    }
    if (format === "email") {
      content = `SUBJECT:\n${result.subject}\n\nBODY:\n${result.body}`;
    }
    if (format === "instagram") {
      content = `CAPTION:\n${result.caption}\n\nHASHTAGS:\n${result.hashtags}`;
    }
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${format}-content.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setLoading(true);

    if (text.length > 5000) {
      setToast("Text too long (max 5000 chars)");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          tone,
          format,
          instructions,
          brandVoice,
          audience,
          userId,
        }),
      });

      const data = await res.json();

      if (data.usage !== undefined) {
        setUsage(data.usage);
        setLimit(data.limit);
      }

      console.log("API RESPONSE:", data);

      if (data.error) {
        if (data.error === "limit_reached") {
          setToast("Limit reached! Upgrade to Pro");
        } else {
          setToast("Error: " + data.error);
        }
        setLoading(false);
        return;
      }

      setResult(data);

      setHistory((prev) => [
        {
          text,
          result: data,
          tone,
          format,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    } catch (error) {
      console.error(error);
      setToast("Server Not Reachable");
    }

    setLoading(false);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const triggerDemo = () => {
    setText(
      "Artificial intelligence is transforming early startups by helping lean founder teams automate repetitive content curation, streamline distribution leverage, and write at scale. In the next decade, we will see one-person unicorn businesses run entirely on agentic model workflows. The critical bottleneck is no longer building products, but capturing mindshare through multi-platform marketing formats."
    );
    const workspace = document.getElementById("workspace");
    if (workspace) {
      workspace.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFAQToggle = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="wrapper">
      
      {/* 🚀 FLOAT PILL NAVIGATION BAR */}
      <motion.nav 
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="navbar-container">
          <div className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <svg className="brand-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span className="brand-name">EchoStream</span>
          </div>

          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#examples">Examples</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="nav-actions">
            {userSession ? (
              <>
                <div className="user-profile-badge">
                  <div className="user-avatar">{userSession.name[0].toUpperCase()}</div>
                  <span>{userSession.name}</span>
                </div>
                <span className="logout-link" onClick={() => {
                  localStorage.removeItem("userSession");
                  setUserSession(null);
                  let id = localStorage.getItem("userId");
                  if (!id) {
                    id = "user_" + Math.random().toString(36).substring(2, 9);
                    localStorage.setItem("userId", id);
                  }
                  setUserId(id);
                  fetchUsage(id);
                  setToast("Logged out successfully");
                  setTimeout(() => setToast(""), 1500);
                }}>
                  Log Out
                </span>
              </>
            ) : (
              <>
                <span className="signin-link" style={{ cursor: 'pointer' }} onClick={() => setAuthMode("login")}>Sign In</span>
                <button className="navbar-cta-btn" onClick={() => setAuthMode("signup")}>
                  Get Started →
                </button>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      <div className="main-content-container">
        
        {/* ⚡ HERO */}
        <header className="hero-section" style={{ position: 'relative' }}>
          {/* 🌌 WebGL Ferrofluid Interactive Background */}
          <div style={{ position: 'absolute', top: 0, left: 'calc(50% - 50vw)', width: '100vw', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.6, overflow: 'hidden' }}>
            <Ferrofluid
              colors={["#ffffff","#ffffff","#ffffff"]}
              speed={0.5}
              scale={1.6}
              turbulence={1}
              fluidity={0.1}
              rimWidth={0.2}
              sharpness={2.5}
              shimmer={1.5}
              glow={2}
              flowDirection="down"
              opacity={1}
              mouseInteraction={true}
              mouseStrength={1}
              mouseRadius={0.35}
            />
          </div>

          <motion.div 
            className="hero-left"
            style={{ position: 'relative', zIndex: 2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="beta-badge">
              <Sparkles className="sparkle-icon" />
              <span>AI Content Repurposing Platform</span>
            </div>
            
            <h1 className="hero-headline">
              Repurpose content. <br />
              <span className="hero-gradient-text">Silent distribution.</span>
            </h1>
            
            <p className="hero-supporting-text">
              Transform transcript audio, article assets, and raw newsletters into high-end <span className="highlight-text">social threads</span>, <span className="highlight-text">LinkedIn</span> posts, and <span className="highlight-text">executive summaries</span>. Restraint over decoration.
            </p>

            <div className="horizontal-chips">
              <span className="chip"><TwitterIcon className="chip-icon-outline" style={{ color: '#5EA9FF' }} /> X Threads</span>
              <span className="chip"><LinkedinIcon className="chip-icon-outline" style={{ color: '#7FCBFF' }} /> LinkedIn Posts</span>
              <span className="chip"><Mail className="chip-icon-outline" style={{ color: '#F7C95E' }} /> Newsletter</span>
              <span className="chip"><InstagramIcon className="chip-icon-outline" style={{ color: '#FF8E8E' }} /> Instagram</span>
              <span className="chip"><Layers className="chip-icon-outline" style={{ color: '#6FD6A5' }} /> Summaries</span>
            </div>

            <div className="hero-cta-group">
              <motion.button 
                className="primary-cta-btn" 
                onClick={() => {
                  const workspace = document.getElementById("workspace");
                  if (workspace) workspace.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                Generate Content
              </motion.button>
              <motion.button 
                className="secondary-cta-btn" 
                onClick={triggerDemo}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Play className="play-icon" /> Watch Demo
              </motion.button>
            </div>

            <div className="trust-indicators">
              <div className="trust-item">
                <Check className="trust-check" />
                <span>3 Free daily runs</span>
              </div>
              <div className="trust-item">
                <Check className="trust-check" />
                <span>Fine-tuned Llama 3</span>
              </div>
              <div className="trust-item">
                <Check className="trust-check" />
                <span>10s Engine response</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="hero-right"
            style={{ position: 'relative', zIndex: 2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Extremely subtle backing radial ambient lighting */}
            <div className="hero-radial-lighting" />

            <motion.div 
              className="premium-workflow-container"
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                transform: `perspective(1000px) rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="glow-background"></div>
              
              <motion.div 
                className="floating-card raw-transcript"
                animate={{ y: [0, -10, 0], rotate: [0, 0.5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="card-header-ide">
                  <span className="window-dots"></span>
                  <span className="filename">source.txt</span>
                </div>
                <div className="card-excerpt">
                  "AI is transforming startups by helping lean founder teams streamline..."
                </div>
              </motion.div>

              <div className="connector-line">
                <div className="connecting-dot" />
              </div>

              <motion.div 
                className="floating-card ai-processing-card"
                animate={{ y: [0, 8, 0], rotate: [0, -0.5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Cpu className="processing-icon" />
                <div className="card-title">Llama Engine</div>
                <span className="processing-tag">Active</span>
              </motion.div>

              <div className="connector-line">
                <div className="connecting-dot" />
              </div>

              <div className="floating-outputs">
                <motion.div 
                  className="floating-card output-mini twitter"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                >
                  <TwitterIcon className="mini-logo-icon" />
                  <span>X Thread</span>
                </motion.div>
                <motion.div 
                  className="floating-card output-mini linkedin"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                  <LinkedinIcon className="mini-logo-icon" />
                  <span>LinkedIn</span>
                </motion.div>
                <motion.div 
                  className="floating-card output-mini email"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                >
                  <Mail className="mini-logo-icon" />
                  <span>Newsletter</span>
                </motion.div>
                <motion.div 
                  className="floating-card output-mini insta"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                  <InstagramIcon className="mini-logo-icon" />
                  <span>Instagram</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </header>

        {/* 🤝 TRUSTED BY / STATS */}
        <section className="stats-section">
          <p className="stats-header">ENGINEERING METRICS & PRODUCT UPTIME</p>
          <div className="stats-grid">
            <BorderGlow className="stat-card" edgeSensitivity={30} glowColor="210 100 70" backgroundColor="#111214" borderRadius={20} glowRadius={30} colors={['#6EA8FE', '#4F6BFF', '#8BC5FF']}>
              <AnimatedStat value="1.5" suffix="M+" desc="Posts Generated" icon={Layers} />
            </BorderGlow>
            <BorderGlow className="stat-card" edgeSensitivity={30} glowColor="210 100 70" backgroundColor="#111214" borderRadius={20} glowRadius={30} colors={['#6EA8FE', '#4F6BFF', '#8BC5FF']}>
              <AnimatedStat value="99.4" suffix="%" desc="API Success Uptime" icon={Cpu} />
            </BorderGlow>
            <BorderGlow className="stat-card" edgeSensitivity={30} glowColor="210 100 70" backgroundColor="#111214" borderRadius={20} glowRadius={30} colors={['#6EA8FE', '#4F6BFF', '#8BC5FF']}>
              <AnimatedStat value="10" suffix="s" desc="Average Output Latency" icon={RefreshCw} />
            </BorderGlow>
            <BorderGlow className="stat-card" edgeSensitivity={30} glowColor="210 100 70" backgroundColor="#111214" borderRadius={20} glowRadius={30} colors={['#6EA8FE', '#4F6BFF', '#8BC5FF']}>
              <AnimatedStat value="10" suffix="k+" desc="Active Writers Assisted" icon={Users} />
            </BorderGlow>
          </div>
        </section>

        {/* 📝 GENERATION WORKSPACE */}
        <section className="workspace-section" id="workspace" style={{ position: 'relative' }}>
          {/* 🌌 WebGL DarkVeil Background with Dark Overlay spanning full section width/height */}
          <div style={{ position: 'absolute', top: 0, left: 'calc(50% - 50vw)', width: '100vw', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <DarkVeil
              hueShift={0}
              noiseIntensity={0}
              scanlineIntensity={0}
              speed={0.5}
              scanlineFrequency={0}
              warpAmount={0}
            />
            {/* Dark overlay layer to let the purple CPPN veil shine through */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(5, 5, 5, 0.20)', zIndex: 1 }} />
          </div>

          <div className="workspace-glow"></div>
          <div className="glass-container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="workspace-header">
              <h2 className="section-title">Generation Workspace</h2>
              <p className="section-subtitle">Select formats, paste source text, and execute the translation engine.</p>
            </div>

            <div className="workspace-settings-grid">
              <div className="input-group">
                <label className="field-label">
                  <Settings className="label-icon-lucide" /> Brand Voice
                </label>
                <div className="select-wrapper">
                  <select 
                    className="premium-select"
                    value={brandVoice}
                    onChange={(e) => setBrandVoice(e.target.value)}
                  >
                    <option value="professional">Professional</option>
                    <option value="founder">Founder (Vulnerable, Insightful)</option>
                    <option value="storytelling">Storytelling (Hook, Narrative)</option>
                    <option value="marketing">Marketing (AIDA Structure)</option>
                    <option value="educational">Educational (Clear Steps)</option>
                    <option value="minimal">Minimalist (Direct, Clean)</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="field-label">
                  <Users className="label-icon-lucide" /> Target Audience
                </label>
                <div className="select-wrapper">
                  <select 
                    className="premium-select" 
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  >
                    <option value="Startup Founder">Startup Founders</option>
                    <option value="Business Owner">Business Owners</option>
                    <option value="Marketing Agencies">Marketing Agencies</option>
                    <option value="Students">Students & Learners</option>
                    <option value="Developers">Developers & Tech</option>
                    <option value="Recruiters">Recruiters & HR</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="field-label">
                  <Layers className="label-icon-lucide" /> Format Type
                </label>
                <div className="select-wrapper">
                  <select 
                    value={format}
                    onChange={(e) => {
                      setFormat(e.target.value);
                      setActiveTab("twitter");
                      setResult(null); 
                    }}
                    className="premium-select"
                  >
                    <option value="social">Social Pack (X, LinkedIn, Summary)</option>
                    <option value="email">Email Campaign</option>
                    <option value="instagram">Instagram Layout & Tags</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="input-group text-input-group">
              <label className="field-label">
                <FileText className="label-icon-lucide" /> Source Content Transcript
              </label>
              <div className="textarea-container">
                <textarea
                  className="premium-textarea"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste raw audio translation transcripts, meeting notes, blog text, or drafts..."
                />
                
                {/* Character Counter Fades in Only When Typing */}
                <AnimatePresence>
                  {text.length > 0 && (
                    <motion.div 
                      className="textarea-footer"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="char-count">{text.length} / 5000 characters</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Advanced Options Accordion */}
            <div className="advanced-options-container">
              <button 
                type="button" 
                className={`advanced-toggle-btn ${showAdvanced ? "active" : ""}`}
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <span className="flex-align-btn"><Settings className="btn-cog-icon" /> Advanced Instructions</span>
                <span className="arrow">{showAdvanced ? <ChevronUp className="arr" /> : <ChevronDown className="arr" />}</span>
              </button>
              
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div 
                    className="advanced-drawer-framer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="drawer-inner">
                      <textarea
                        className="instruction-box premium-textarea-secondary"
                        placeholder="Optional parameters (e.g. Write in the style of Stripe docs, omit emojis, structure as listicle...)"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Premium Usage Limits */}
            <div className="credits-card-wrapper">
              <div className="credits-card">
                <div className="credits-header">
                  <div className="credits-title">
                    <Sparkles className="sparkle-credits" /> Credit Consumption
                  </div>
                  <div className="credits-count">
                    Usage: <span className="highlight">{usage}</span> / {limit || 0} runs
                  </div>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${limit > 0 ? (usage / limit) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="credits-footer">
                  <span>Usage limits reset daily.</span>
                  <a href="#pricing" className="upgrade-link">Pricing Plans →</a>
                </div>
              </div>
            </div>

            <div className="workspace-buttons-group">
              <button
                className="main-generate-btn"
                onClick={handleGenerate}
                disabled={loading || !text.trim() || (limit > 0 && usage >= limit)}
              >
                {loading ? (
                  <span className="loading-span">
                    <RefreshCw className="spinner-animate" /> Executing Llama...
                  </span>
                ) : (
                  <span className="flex-btn-content">
                    Generate Output <span className="shortcut-badge">⌘ ↵</span>
                  </span>
                )}
              </button>

              <button 
                className="improve-btn" 
                onClick={handleImprove} 
                disabled={loading || !result || (limit > 0 && usage >= limit)}
              >
                <span className="flex-btn-content">
                  Optimize Output Hook <span className="shortcut-badge">⌘ ⇧ ↵</span>
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* 📦 OUTPUT VIEW */}
        {loading && !result && (
          <div className="loading-output-container">
            <div className="skeleton-wrapper">
              <div className="shimmer-card">
                <div className="shimmer-title"></div>
                <div className="shimmer-text"></div>
                <div className="shimmer-text short"></div>
              </div>
            </div>
          </div>
        )}

        {!result && !loading && (
          <section className="empty-workspace-state">
            <div className="empty-card">
              <h3>Output Interface</h3>
              <p>Generated formats will render in this container once source file execution finishes.</p>
            </div>
          </section>
        )}

        {result && (
          <section className="output-display-section" ref={resultRef}>
            <div className="output-glass-card">
              <div className="output-header-bar">
                <h3 className="output-title">Outputs</h3>
                <button className="premium-download-btn" onClick={handleDownload}>
                  <Download className="download-icon-lucide" /> Download Text Document
                </button>
              </div>

              <div className="output-tab-bar">
                {format === "social" && (
                  <div className="tab-buttons">
                    <button 
                      className={`tab-btn ${activeTab === "twitter" ? "active" : ""}`}
                      onClick={() => setActiveTab("twitter")}
                    >
                      X Thread
                    </button>
                    <button 
                      className={`tab-btn ${activeTab === "linkedin" ? "active" : ""}`}
                      onClick={() => setActiveTab("linkedin")}
                    >
                      LinkedIn Post
                    </button>
                    <button 
                      className={`tab-btn ${activeTab === "summary" ? "active" : ""}`}
                      onClick={() => setActiveTab("summary")}
                    >
                      Summary
                    </button>
                  </div>
                )}

                {format === "email" && (
                  <div className="tab-buttons">
                    <button className="tab-btn active">Email Newsletter</button>
                  </div>
                )}

                {format === "instagram" && (
                  <div className="tab-buttons">
                    <button className="tab-btn active">Instagram Caption</button>
                  </div>
                )}
              </div>

              <div className="output-body-container">
                {format === "social" && activeTab === "twitter" && result.twitter && (
                  <div className="output-card animate-fade-in">
                    <div className="card-top-action">
                      <h4>X Thread Package</h4>
                      <button className="copy-action-btn" onClick={() => {
                        const allTweets = result.twitter.join("\n\n");
                        navigator.clipboard.writeText(allTweets);
                        setCopied("twitter");
                        setToast("Copied Full Thread!");
                        setTimeout(() => {
                          setCopied("");
                          setToast("");
                        }, 1500);
                      }}>
                        <Copy className="copy-icon-btn" /> {copied === "twitter" ? "Copied!" : "Copy Thread"}
                      </button>
                    </div>

                    {result.twitter.length > 0 && (
                      <div className="premium-best-hook-card">
                        <span className="hook-badge">Select Hook Output</span>
                        <p>"{result.twitter[0]}"</p>
                      </div>
                    )}

                    <div className="tweet-thread-flow">
                      {Array.isArray(result.twitter) && result.twitter.map((tweet, index) => (
                        <div key={index} className="premium-tweet-box">
                          <div className="tweet-header">
                            <span className="tweet-index">Card {index + 1}</span>
                          </div>
                          <pre className="output-pre">{tweet}</pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {format === "social" && activeTab === "linkedin" && result.linkedin && (
                  <div className="output-card animate-fade-in">
                    <div className="card-top-action">
                      <h4>LinkedIn Segment</h4>
                      <button className="copy-action-btn" onClick={() => {
                        navigator.clipboard.writeText(result.linkedin);
                        setCopied("linkedin");
                        setToast("Copied LinkedIn Post!");
                        setTimeout(() => {
                          setCopied("");
                          setToast("");
                        }, 1500);
                      }}>
                        <Copy className="copy-icon-btn" /> {copied === "linkedin" ? "Copied!" : "Copy Post"}
                      </button>
                    </div>
                    <div className="linkedin-post-box">
                      <pre className="output-pre">{result.linkedin || "No content generated"}</pre>
                    </div>
                  </div>
                )}

                {format === "social" && activeTab === "summary" && result.summary && (
                  <div className="output-card animate-fade-in">
                    <div className="card-top-action">
                      <h4>Executive Summary</h4>
                      <button className="copy-action-btn" onClick={() => {
                        navigator.clipboard.writeText(result.summary);
                        setCopied("summary");
                        setToast("Copied Summary!");
                        setTimeout(() => {
                          setCopied("");
                          setToast("");
                        }, 1500);
                      }}>
                        <Copy className="copy-icon-btn" /> {copied === "summary" ? "Copied!" : "Copy Summary"}
                      </button>
                    </div>
                    <div className="summary-post-box">
                      <pre className="output-pre">{result.summary}</pre>
                    </div>
                  </div>
                )}

                {format === "email" && result.subject && (
                  <div className="output-card animate-fade-in">
                    <div className="card-top-action">
                      <h4>Email Campaign Outline</h4>
                      <button className="copy-action-btn" onClick={() => {
                        navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`);
                        setCopied("email");
                        setToast("Copied Email!");
                        setTimeout(() => {
                          setCopied("");
                          setToast("");
                        }, 1500);
                      }}>
                        <Copy className="copy-icon-btn" /> {copied === "email" ? "Copied!" : "Copy Email"}
                      </button>
                    </div>
                    <div className="email-post-box">
                      <div className="email-subject-line">
                        <strong>Subject:</strong> {result.subject}
                      </div>
                      <pre className="output-pre">{result.body}</pre>
                    </div>
                  </div>
                )}

                {format === "instagram" && result.caption && (
                  <div className="output-card animate-fade-in">
                    <div className="card-top-action">
                      <h4>Instagram Caption Output</h4>
                      <button className="copy-action-btn" onClick={() => {
                        navigator.clipboard.writeText(`${result.caption}\n\n${result.hashtags}`);
                        setCopied("instagram");
                        setToast("Copied Instagram Assets!");
                        setTimeout(() => {
                          setCopied("");
                          setToast("");
                        }, 1500);
                      }}>
                        <Copy className="copy-icon-btn" /> {copied === "instagram" ? "Copied!" : "Copy Caption"}
                      </button>
                    </div>
                    <div className="instagram-caption-box">
                      <pre className="output-pre">{result.caption}</pre>
                      <div className="insta-hashtags-container">
                        {result.hashtags?.split(" ").map((tag, i) => (
                          <span key={i} className="insta-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 📚 BENTO FEATURE GRID */}
        <section className="features-section" id="features" style={{ position: 'relative' }}>
          {/* 🌌 Interactive ColorBends Shader Background with Dark Overlay */}
          <div style={{ position: 'absolute', top: 0, left: 'calc(50% - 50vw)', width: '100vw', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <ColorBends
              colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
              rotation={90}
              speed={0.2}
              scale={1}
              frequency={1}
              warpStrength={1}
              mouseInfluence={1}
              noise={0.15}
              parallax={0.5}
              iterations={1}
              intensity={1.5}
              bandWidth={6}
              transparent
              autoRotate={0}
              color="#A855F7"
            />
            {/* Dark overlay layer to let the color bends texture shine through subtly */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(5, 5, 5, 0.35)', zIndex: 1 }} />
          </div>

          <div className="section-intro" style={{ position: 'relative', zIndex: 2 }}>
            <span className="sec-badge">CHANNELS</span>
            <h2 className="section-title">Supported Outputs</h2>
            <p className="section-subtitle">Asymmetric editorial layout representing translation options.</p>
          </div>

          <div className="bento-grid-outputs" style={{ position: 'relative', zIndex: 2 }}>
            <BorderGlow className="bento-card x-threads-bento" edgeSensitivity={30} glowColor="210 100 70" backgroundColor="#111214" borderRadius={20} glowRadius={30} colors={['#6EA8FE', '#4F6BFF', '#8BC5FF']}>
              <div className="bento-inner">
                <div className="feat-icon-wrapper"><TwitterIcon className="luc-icon" /></div>
                <h3>Twitter / X Threads <ArrowRight className="bento-arrow-icon" /></h3>
                <p>Splits transcript lines into continuous threads, retaining core hooks and parameters automatically.</p>
                <div className="feat-hover-reveal">Algorithmic lengths computed.</div>
              </div>
            </BorderGlow>

            <BorderGlow className="bento-card linkedin-bento" edgeSensitivity={30} glowColor="210 100 70" backgroundColor="#111214" borderRadius={20} glowRadius={30} colors={['#6EA8FE', '#4F6BFF', '#8BC5FF']}>
              <div className="bento-inner">
                <div className="feat-icon-wrapper"><LinkedinIcon className="luc-icon" /></div>
                <h3>LinkedIn Authority <ArrowRight className="bento-arrow-icon" /></h3>
                <p>Curates stories with appropriate paragraph spacing, hooks, and takeaways to maximize organic feeds.</p>
                <div className="feat-hover-reveal">Breathing room spacing added.</div>
              </div>
            </BorderGlow>

            <BorderGlow className="bento-card email-bento" edgeSensitivity={30} glowColor="210 100 70" backgroundColor="#111214" borderRadius={20} glowRadius={30} colors={['#6EA8FE', '#4F6BFF', '#8BC5FF']}>
              <div className="bento-inner">
                <div className="feat-icon-wrapper"><Mail className="luc-icon" /></div>
                <h3>Email Campaigns <ArrowRight className="bento-arrow-icon" /></h3>
                <p>Transforms raw transcript notes into curated newsletters for user databases.</p>
                <div className="feat-hover-reveal">Subject variants compiled.</div>
              </div>
            </BorderGlow>

            <BorderGlow className="bento-card instagram-bento" edgeSensitivity={30} glowColor="210 100 70" backgroundColor="#111214" borderRadius={20} glowRadius={30} colors={['#6EA8FE', '#4F6BFF', '#8BC5FF']}>
              <div className="bento-inner">
                <div className="feat-icon-wrapper"><InstagramIcon className="luc-icon" /></div>
                <h3>Instagram Caption <ArrowRight className="bento-arrow-icon" /></h3>
                <p>Slide-by-slide headlines matching carousels, hashtags, and captions.</p>
                <div className="feat-hover-reveal">Copy-ready layout formats.</div>
              </div>
            </BorderGlow>

            <BorderGlow className="bento-card summary-bento" edgeSensitivity={30} glowColor="210 100 70" backgroundColor="#111214" borderRadius={20} glowRadius={30} colors={['#6EA8FE', '#4F6BFF', '#8BC5FF']}>
              <div className="bento-inner">
                <div className="feat-icon-wrapper"><Layers className="luc-icon" /></div>
                <h3>Executive Summaries <ArrowRight className="bento-arrow-icon" /></h3>
                <p>Distills long-form recordings into clean reference points and actionable summaries.</p>
                <div className="feat-hover-reveal">Clean TL;DR layouts.</div>
              </div>
            </BorderGlow>

            <BorderGlow className="bento-card cloning-bento" edgeSensitivity={30} glowColor="210 100 70" backgroundColor="#111214" borderRadius={20} glowRadius={30} colors={['#6EA8FE', '#4F6BFF', '#8BC5FF']}>
              <div className="bento-inner">
                <div className="feat-icon-wrapper"><Cpu className="luc-icon" /></div>
                <h3>Tone Cloning <ArrowRight className="bento-arrow-icon" /></h3>
                <p>Fine-tune voice models to match custom tone filters on-demand.</p>
                <div className="feat-hover-reveal">Vector voice metrics.</div>
              </div>
            </BorderGlow>
          </div>
        </section>

        {/* ⚙️ HORIZONTAL ANIMATED TIMELINE */}
        <section className="steps-section">
          <div className="section-intro">
            <span className="sec-badge">METHODOLOGY</span>
            <h2 className="section-title">Timeline Pipeline</h2>
            <p className="section-subtitle">Re-authoring workflow mapping raw files into channel updates.</p>
          </div>

          <div className="timeline-horizontal-container">
            <div className="timeline-progress-background-line">
              <motion.div 
                className="timeline-active-progress-line"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>

            <div className="timeline-steps-grid">
              <motion.div 
                className="timeline-step-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="timeline-node">
                  <span className="step-num">01</span>
                </div>
                <h3>Ingest Source</h3>
                <p>Input messy video scripts, transcripts, long blogs, or raw meeting audio files.</p>
              </motion.div>

              <motion.div 
                className="timeline-step-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <div className="timeline-node">
                  <span className="step-num">02</span>
                </div>
                <h3>Configure Settings</h3>
                <p>Adjust tone presets, targeted audience profiles, and advanced instruction rules.</p>
              </motion.div>

              <motion.div 
                className="timeline-step-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="timeline-node">
                  <span className="step-num">03</span>
                </div>
                <h3>Export Outlines</h3>
                <p>Preview generated tabs, optimize viral hooks, copy items, or export documents.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 🔄 BEFORE → AFTER TRANSFORMATION */}
        <section className="transformation-section" id="examples">
          <div className="section-intro">
            <span className="sec-badge">TRANSFORMATION</span>
            <h2 className="section-title">Raw to Polished</h2>
            <p className="section-subtitle">Visualizing transcript inputs converting to high-converting social layouts.</p>
          </div>

          <div className="comparison-container">
            <div className="comparison-box raw-box">
              <div className="box-badge before-badge">Messy Ingestion File</div>
              <div className="box-content">
                <p className="muted-text">// Raw text inputs:</p>
                <p>"So what I really wanted to mention is that early on you have to get 10 users who absolutely love your startup. Otherwise scaling doesn't work, because if they don't love it, you're just paying marketing money to acquire users who will drop out anyway. Finding that fit is key..."</p>
              </div>
            </div>

            <div className="comparison-divider">
              <ArrowRight className="trans-arrow-icon" />
            </div>

            <div className="comparison-box polished-box">
              <div className="box-badge after-badge">Repurposed X Card</div>
              <div className="box-content font-inter">
                <div className="tweet-mock">
                  <TwitterIcon className="tweet-platform-icon" />
                  <div className="tweet-text">
                    <p><strong>1/ 10 users who love you are worth more than 1,000 who like you.</strong></p>
                    <p>Scaling a lukewarm product is just paying to acquire churn.</p>
                    <p>Here is why early founders struggle with this loop: 👇</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🌊 FLOWING INTERACTIVE MENU DIVIDER */}
        <section className="flowing-menu-section" style={{ margin: '120px 0 80px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ height: '360px', position: 'relative' }}>
            <FlowingMenu 
              items={[
                { link: '#workspace', text: 'Repurpose', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' },
                { link: '#features', text: 'Multi-Channel', image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80' },
                { link: '#workspace', text: 'Translate', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80' },
                { link: '#pricing', text: 'Scale', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80' }
              ]}
              speed={12}
              textColor="#ffffff"
              bgColor="transparent"
              marqueeBgColor="#ffffff"
              marqueeTextColor="#050505"
              borderColor="rgba(255, 255, 255, 0.08)"
            />
          </div>
        </section>

        {/* 💵 PRICING SECTION */}
        <section className="pricing-section" id="pricing" style={{ position: 'relative' }}>
          {/* 🌌 Interactive Silk Shader Background with Dark Overlay */}
          <div style={{ position: 'absolute', top: 0, left: 'calc(50% - 50vw)', width: '100vw', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <Silk
              speed={5}
              scale={1}
              color="#5227FF"
              noiseIntensity={1.5}
              rotation={0}
            />
            {/* Dark contrast overlay layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(5, 5, 5, 0.2)', zIndex: 1 }} />
          </div>

          <div className="section-intro" style={{ position: 'relative', zIndex: 2 }}>
            <span className="sec-badge">PRICING</span>
            <h2 className="section-title">Pricing plans</h2>
            <p className="section-subtitle">Free credits for testing, simple tiers for scaled distribution.</p>
 
            {/* Stripe-like cycle toggle */}
            <div className="pricing-toggle-container">
              <button 
                className={`toggle-option ${billingCycle === "monthly" ? "active" : ""}`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button 
                className={`toggle-option ${billingCycle === "yearly" ? "active" : ""}`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly <span className="discount-tag">Save 20%</span>
              </button>
            </div>
          </div>
 
          <div className="pricing-grid" style={{ position: 'relative', zIndex: 2 }}>
            <BorderGlow className="price-card" edgeSensitivity={30} glowColor="210 100 70" backgroundColor="#111214" borderRadius={20} glowRadius={30} colors={['#6EA8FE', '#4F6BFF', '#8BC5FF']}>
              <div className="plan-name">Hobby Beta</div>
              <div className="plan-price">$0</div>
              <p className="plan-desc">For creators and developers testing initial distribution loops.</p>
              <ul className="plan-features">
                <li><CheckCircle2 className="check-icon-svg" /> <span>3 Generations daily</span></li>
                <li><CheckCircle2 className="check-icon-svg" /> <span>5 Brand voice selectors</span></li>
                <li><CheckCircle2 className="check-icon-svg" /> <span>Social, Email, Instagram outputs</span></li>
                <li><CheckCircle2 className="check-icon-svg" /> <span>10s Ingestion speed</span></li>
              </ul>
              <button className="plan-cta-btn secondary" onClick={() => {
                const workspace = document.getElementById("workspace");
                if (workspace) workspace.scrollIntoView({ behavior: "smooth" });
              }}>
                Use Hobby
              </button>
            </BorderGlow>
 
            <BorderGlow className="price-card premium" edgeSensitivity={30} glowColor="210 100 70" backgroundColor="#111214" borderRadius={20} glowRadius={30} colors={['#6EA8FE', '#4F6BFF', '#8BC5FF']}>
              <div className="premium-pill"><Sparkles className="sparkle-pill-icon" /> POPULAR</div>
              <div className="plan-name">Pro Creator</div>
              <div className="plan-price">
                {billingCycle === "monthly" ? "$19" : "$15"}
                <span className="price-term">/ month</span>
              </div>
              {billingCycle === "yearly" && <span className="billed-annually-tag">Billed annually ($180)</span>}
              <p className="plan-desc">For serious startup teams and marketing writers scaling channels.</p>
              <ul className="plan-features">
                <li><CheckCircle2 className="check-icon-svg accent" /> <span>Unlimited generations</span></li>
                <li><CheckCircle2 className="check-icon-svg accent" /> <span>Advanced custom instructions</span></li>
                <li><CheckCircle2 className="check-icon-svg accent" /> <span>Dedicated execution servers</span></li>
                <li><CheckCircle2 className="check-icon-svg accent" /> <span>Long transcripts (Up to 15k chars)</span></li>
                <li><CheckCircle2 className="check-icon-svg accent" /> <span>Standard API keys access</span></li>
              </ul>
              <button className="plan-cta-btn primary">Upgrade to Pro</button>
            </BorderGlow>
          </div>
        </section>

        {/* ❓ FAQ SECTION */}
        <section className="faq-section" id="faq">
          <div className="section-intro">
            <span className="sec-badge">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Quick responses about run limits, credits, and AI engines.</p>
          </div>

          <div className="faq-accordion-list">
            {[
              {
                q: "How are daily credits reset?",
                a: "Free beta accounts receive 3 generations daily. Credits reset automatically at 00:00 UTC. Unused runs are updated in real-time in your workspace."
              },
              {
                q: "What models power the translation pipeline?",
                a: "Our core pipeline leverages custom fine-tuned Llama 3 weights tailored for formatting structures, paragraph pacing, and copy frameworks."
              },
              {
                q: "Can I input custom tone presets?",
                a: "Yes. By opening the 'Advanced Instructions' accordion inside the workspace, you can define formatting style presets."
              },
              {
                q: "Can I integrate the generation tool directly via API?",
                a: "Yes. Pro plan developers get API endpoint keys in their settings dashboard to run programmatic repurposing calls."
              }
            ].map((faq, index) => (
              <div key={index} className="faq-item">
                <button className="faq-question-bar" onClick={() => handleFAQToggle(index)}>
                  <h3>{faq.q}</h3>
                  <span className="faq-toggle-icon">
                    {activeFaq === index ? <ChevronUp className="arr-faq" /> : <ChevronDown className="arr-faq" />}
                  </span>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div 
                      className="faq-answer-pane-framer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="faq-answer-inner">
                        <p>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* 🚀 CALL TO ACTION (CTA) SECTION */}
        <section className="cta-outer-section" id="cta">
          <SpotlightCard className="cta-glass-card">
            <div className="cta-badge-wrapper">
              <button className="cta-badge-btn" onClick={() => window.open('https://github.com', '_blank')}>
                Start scaling distribution <MoveRight className="w-4 h-4" />
              </button>
            </div>
            <h1 className="cta-title">
              Ready to multiply your content leverage?
            </h1>
            <p className="cta-subtitle">
              Creating copy for multiple platforms is tedious. Avoid wasting hours manually formatting drafts. Let EchoStream transform your transcripts and notes into high-converting posts instantly.
            </p>
            <div className="cta-button-group">
              <a href="#pricing" className="cta-secondary-btn">
                Explore pricing plans <Sparkles className="w-4 h-4" />
              </a>
              <a href="#workspace" className="cta-primary-btn">
                Try workspace now <MoveRight className="w-4 h-4" />
              </a>
            </div>
          </SpotlightCard>
        </section>

        {/* 📜 HISTORICAL ARCHIVES */}
        {history.length > 0 && (
          <section className="history-section">
            <h2 className="section-title">Generation History</h2>
            <p className="section-subtitle">Select any historical entry to restore its configuration settings.</p>
            
            <div className="history-timeline">
              {history.map((item, index) => (
                <SpotlightCard 
                  key={index}
                  className="history-glass-item"
                  style={{ cursor: "pointer" }}
                >
                  <div 
                    onClick={() => {
                      setText(item.text);
                      setResult(item.result);
                      setTone(item.tone);
                      setFormat(item.format);
                      if (resultRef.current) {
                        resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <div className="history-top">
                      <span className="history-time">{item.time}</span>
                      <span className="history-format-tag">{item.format}</span>
                    </div>
                    <p className="history-text-preview">{item.text.slice(0, 80)}...</p>
                    <span className="history-tone-label">Tone: {item.tone}</span>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* 🏁 FOOTER */}
      <footer className="footer-section">
        {/* 🌌 WebGL Ferrofluid Interactive Background */}
        <div style={{ position: 'absolute', top: 0, left: 'calc(50% - 50vw)', width: '100vw', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.6, overflow: 'hidden' }}>
          <Ferrofluid
            colors={["#ffffff","#ffffff","#ffffff"]}
            speed={0.5}
            scale={1.6}
            turbulence={1}
            fluidity={0.1}
            rimWidth={0.2}
            sharpness={2.5}
            shimmer={1.5}
            glow={2}
            flowDirection="down"
            opacity={1}
            mouseInteraction={true}
            mouseStrength={1}
            mouseRadius={0.35}
          />
        </div>

        <div className="footer-top">
          <div className="footer-brand-column">
            <div className="brand">
              <svg className="brand-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="brand-name">EchoStream</span>
            </div>
            <p className="footer-desc">Repurpose content into platforms instantly. Built for startups scaling distribution leverage.</p>
          </div>

          <div className="footer-nav-columns">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#examples">Examples</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="#">Developer Docs</a>
              <a href="#">Guides</a>
              <a href="#">API Status</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 EchoStream Inc. All rights reserved.</span>
          <span className="made-by">Understated Restraint.</span>
        </div>
      </footer>

      {toast && <div className="toast-notification animate-fade-in">{toast}</div>}

      {authMode && (
        <div className="auth-overlay">
          {/* Background Canvas */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
            <Ferrofluid
              colors={["#ffffff","#ffffff","#ffffff"]}
              speed={0.5}
              scale={1.6}
              turbulence={1}
              fluidity={0.1}
              rimWidth={0.2}
              sharpness={2.5}
              shimmer={1.5}
              glow={2}
              flowDirection="down"
              opacity={1}
              mouseInteraction={true}
              mouseStrength={1}
              mouseRadius={0.35}
            />
            <div className="auth-overlay-backdrop" />
          </div>

          <motion.div 
            className="auth-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button className="auth-close-btn" onClick={() => setAuthMode(null)}>
              ✕
            </button>

            <div className="auth-header">
              <h2 className="auth-title">
                {authMode === "login" ? "Welcome back" : "Create account"}
              </h2>
              <p className="auth-subtitle">
                {authMode === "login" 
                  ? "Enter your credentials to access your workspace" 
                  : "Start distributing your content with restraint"}
              </p>
            </div>

            <div className="auth-social-grid">
              <button type="button" className="auth-social-btn" onClick={() => {
                setToast("Google login is disabled. Please use email credentials.");
                setTimeout(() => setToast(""), 3000);
              }}>
                <svg className="social-icon-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button type="button" className="auth-social-btn" onClick={() => {
                setToast("Apple login is disabled. Please use email credentials.");
                setTimeout(() => setToast(""), 3000);
              }}>
                <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/>
                </svg>
                Apple
              </button>
              <button type="button" className="auth-social-btn" onClick={() => {
                setToast("Microsoft login is disabled. Please use email credentials.");
                setTimeout(() => setToast(""), 3000);
              }}>
                <svg className="social-icon-svg" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#F25022" d="M0 0h11v11H0z"/>
                  <path fill="#7FBA00" d="M12 0h11v11H12z"/>
                  <path fill="#00A4EF" d="M0 12h11v11H0z"/>
                  <path fill="#FFB900" d="M12 12h11v11H12z"/>
                </svg>
                Microsoft
              </button>
            </div>

            <div className="auth-divider">or continue with email</div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!authEmail || !authPassword) {
                setToast("Please fill all fields.");
                setTimeout(() => setToast(""), 2000);
                return;
              }
              if (authMode === "signup" && authPassword !== authConfirmPassword) {
                setToast("Passwords do not match.");
                setTimeout(() => setToast(""), 2000);
                return;
              }
              
              try {
                const endpoint = authMode === "login" ? "/api/login" : "/api/signup";
                const payload = authMode === "login" 
                  ? { email: authEmail, password: authPassword }
                  : { email: authEmail, password: authPassword, name: authName || authEmail.split("@")[0] };

                const res = await fetch(`${API_URL}${endpoint}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(payload),
                });
                
                const data = await res.json();
                
                if (res.ok) {
                  const session = { 
                    email: data.email, 
                    name: data.name 
                  };
                  localStorage.setItem("userSession", JSON.stringify(session));
                  setUserSession(session);
                  setUserId(data.email);
                  fetchUsage(data.email);
                  setToast(authMode === "login" ? "Successfully logged in!" : "Account created successfully!");
                  setAuthMode(null);
                  setAuthEmail("");
                  setAuthPassword("");
                  setAuthConfirmPassword("");
                  setAuthName("");
                } else {
                  setToast(data.error || "Authentication failed");
                }
              } catch (err) {
                setToast("Connection to backend failed");
              }
              setTimeout(() => setToast(""), 2000);
            }}>
              {authMode === "signup" && (
                <div className="auth-form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    className="auth-input" 
                    placeholder="John Doe" 
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                  />
                </div>
              )}

              <div className="auth-form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="auth-input" 
                  placeholder="name@example.com" 
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                />
              </div>

              <div className="auth-form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  className="auth-input" 
                  placeholder="••••••••" 
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  required
                />
              </div>

              {authMode === "signup" && (
                <div className="auth-form-group">
                  <label>Confirm Password</label>
                  <input 
                    type="password" 
                    className="auth-input" 
                    placeholder="••••••••" 
                    value={authConfirmPassword}
                    onChange={(e) => setAuthConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              <button type="submit" className="auth-submit-btn">
                {authMode === "login" ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <div className="auth-toggle">
              {authMode === "login" ? (
                <>
                  Don't have an account? 
                  <span className="auth-toggle-link" onClick={() => setAuthMode("signup")}>Sign Up</span>
                </>
              ) : (
                <>
                  Already have an account? 
                  <span className="auth-toggle-link" onClick={() => setAuthMode("login")}>Sign In</span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;