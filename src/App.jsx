import React, { useState, useEffect } from 'react';

// EasyTheraNotes - Premium Clinical Note-Taking Platform
export default function EasyTheraNotes() {
  const [currentView, setCurrentView] = useState('landing');
  const [loginData, setLoginData] = useState({ providerId: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [signupData, setSignupData] = useState({ 
    fullName: '', 
    email: '', 
    providerId: '', 
    password: '', 
    confirmPassword: '',
    agreeTerms: false 
  });
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [notes, setNotes] = useState([
    {
      id: 1,
      patientInitials: 'J.M.',
      date: '2024-01-15',
      sessionType: 'Individual Therapy',
      subjective: 'Patient reports feeling anxious about upcoming work presentation. Sleep has been disrupted for the past week.',
      objective: 'Patient appeared alert and engaged. Speech was slightly rapid. No signs of acute distress.',
      assessment: 'Generalized Anxiety Disorder, moderate severity. Work-related stressors exacerbating symptoms.',
      plan: 'Continue CBT techniques. Practice breathing exercises before presentation. Follow-up in 1 week.',
      status: 'completed'
    },
    {
      id: 2,
      patientInitials: 'S.R.',
      date: '2024-01-14',
      sessionType: 'Couples Therapy',
      subjective: 'Both partners express difficulty communicating about finances. Wife feels unheard.',
      objective: 'Observed defensive body language from husband. Wife tearful at times.',
      assessment: 'Communication breakdown related to financial stress. No immediate safety concerns.',
      plan: 'Introduce Gottman communication exercises. Assign homework: daily 10-minute check-ins.',
      status: 'completed'
    },
    {
      id: 3,
      patientInitials: 'A.K.',
      date: '2024-01-13',
      sessionType: 'Initial Assessment',
      subjective: 'New patient presenting with symptoms of depression. Reports low energy and loss of interest in activities.',
      objective: 'Affect flat, minimal eye contact. PHQ-9 score: 14 (moderate depression).',
      assessment: 'Major Depressive Disorder, single episode, moderate.',
      plan: 'Begin weekly CBT sessions. Consider psychiatric referral for medication evaluation.',
      status: 'completed'
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [newNote, setNewNote] = useState({
    patientInitials: '',
    sessionType: 'Individual Therapy',
    transcript: '',
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGenerateSOAP = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setNewNote(prev => ({
        ...prev,
        subjective: 'Patient reports feeling overwhelmed with work responsibilities. Describes difficulty sleeping and increased irritability at home. States "I just can\'t seem to turn my mind off."',
        objective: 'Patient maintained good eye contact. Appeared fatigued but engaged in session. Speech was coherent and goal-directed. No psychomotor agitation observed.',
        assessment: 'Adjustment Disorder with mixed anxiety and depressed mood. Occupational stressors are primary contributing factor. No suicidal ideation present.',
        plan: '1. Introduce stress management techniques including progressive muscle relaxation. 2. Explore work-life boundaries. 3. Assign sleep hygiene homework. 4. Schedule follow-up in 2 weeks.'
      }));
      setIsGenerating(false);
    }, 3000);
  };

  const handleSaveNote = () => {
    const note = {
      id: Date.now(),
      ...newNote,
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };
    setNotes([note, ...notes]);
    setNewNote({
      patientInitials: '',
      sessionType: 'Individual Therapy',
      transcript: '',
      subjective: '',
      objective: '',
      assessment: '',
      plan: ''
    });
    setRecordingTime(0);
    setCurrentView('dashboard');
  };

  const handleLogin = () => {
    if (!loginData.providerId || !loginData.password) return;
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setCurrentView('dashboard');
    }, 1500);
  };

  const handleSignup = () => {
    if (!signupData.fullName || !signupData.email || !signupData.providerId || 
        !signupData.password || !signupData.confirmPassword || !signupData.agreeTerms) return;
    if (signupData.password !== signupData.confirmPassword) return;
    setIsSigningUp(true);
    setTimeout(() => {
      setIsSigningUp(false);
      setCurrentView('dashboard');
    }, 2000);
  };

  // Landing Page Component
  const LandingPage = () => (
    <div className="landing-page">
      <div className="bg-gradient"></div>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
      <div className="bg-grid"></div>
      
      <div 
        className="cursor-glow"
        style={{ left: mousePosition.x, top: mousePosition.y }}
      ></div>

      <nav className="nav">
        <div className="nav-brand">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3C7.5 3 4 6 4 10c0 2 1 4 3 5v4c0 1 1 2 2 2h6c1 0 2-1 2-2v-4c2-1 3-3 3-5 0-4-3.5-7-8-7z" fill="url(#logoGrad)"/>
                <path d="M9 13h6M12 10v6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="logoGrad" x1="4" y1="3" x2="20" y2="21">
                    <stop stopColor="#6366f1"/>
                    <stop offset="1" stopColor="#8b5cf6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="logo-text">EasyTheraNotes</span>
          </div>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#security">Security</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={() => setCurrentView('login')}>Sign In</button>
          <button className="btn-primary" onClick={() => setCurrentView('signup')}>
            Start Free
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-glow"></div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>HIPAA Compliant Platform</span>
          </div>
          
          <h1>
            <span className="hero-line">Transform Your Sessions</span>
            <span className="hero-line">Into Perfect</span>
            <span className="hero-line gradient-text">SOAP Notes</span>
          </h1>
          
          <p className="hero-subtitle">
            AI-powered clinical documentation that understands therapy. 
            Record, transcribe, and generate comprehensive notes in seconds.
          </p>

          <div className="hero-cta">
            <button className="btn-hero" onClick={() => setCurrentView('signup')}>
              <span>Start Free Trial</span>
              <div className="btn-shine"></div>
            </button>
            <button className="btn-demo">
              <div className="play-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span>Watch Demo</span>
            </button>
          </div>

          <div className="hero-social-proof">
            <div className="avatars">
              {['👩‍⚕️', '👨‍⚕️', '👩‍💼', '👨‍💼', '👩‍🔬'].map((emoji, i) => (
                <div key={i} className="avatar" style={{ animationDelay: `${i * 0.1}s` }}>
                  {emoji}
                </div>
              ))}
            </div>
            <div className="social-text">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="#fbbf24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span>Trusted by <strong>2,500+</strong> therapists</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="demo-window">
            <div className="window-header">
              <div className="window-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="window-title">Recording Session</span>
            </div>
            <div className="window-content">
              <div className="audio-visualizer">
                {[...Array(50)].map((_, i) => (
                  <div 
                    key={i} 
                    className="audio-bar"
                    style={{ 
                      '--delay': `${i * 0.02}s`,
                      '--height': `${30 + Math.sin(i * 0.3) * 20 + Math.random() * 30}%`
                    }}
                  ></div>
                ))}
              </div>
              <div className="recording-info">
                <div className="recording-timer">
                  <span className="rec-dot"></span>
                  <span className="rec-time">12:34</span>
                </div>
                <span className="rec-label">Session in progress...</span>
              </div>
            </div>
          </div>

          <div className="floating-card card-ai">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="card-text">
              <strong>AI Processing</strong>
              <span>Generating SOAP note...</span>
            </div>
            <div className="card-progress">
              <div className="progress-bar"></div>
            </div>
          </div>

          <div className="floating-card card-secure">
            <div className="card-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <div className="card-text">
              <strong>256-bit Encrypted</strong>
              <span>HIPAA Compliant</span>
            </div>
          </div>

          <div className="floating-card card-soap">
            <div className="soap-preview">
              <div className="soap-item">
                <span className="soap-badge s">S</span>
                <div className="soap-lines">
                  <div className="line"></div>
                  <div className="line short"></div>
                </div>
              </div>
              <div className="soap-item">
                <span className="soap-badge o">O</span>
                <div className="soap-lines">
                  <div className="line"></div>
                  <div className="line shorter"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="section-header">
          <span className="section-badge">Features</span>
          <h2>Everything you need for<br/>effortless documentation</h2>
          <p>Spend more time with patients, less time on paperwork</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <div className="icon-glow"></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
                <path d="M19 10v2a7 7 0 01-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </div>
            <h3>One-Click Recording</h3>
            <p>Start recording with a single click. Audio is encrypted and processed in real-time with clinical accuracy.</p>
            <div className="feature-visual">
              <div className="mini-waveform">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="mini-bar" style={{ '--i': i }}></div>
                ))}
              </div>
            </div>
          </div>

          <div className="feature-card featured">
            <div className="feature-icon">
              <div className="icon-glow purple"></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="featured-badge">Most Popular</div>
            <h3>AI-Powered SOAP Notes</h3>
            <p>Our specialized AI understands clinical context and generates accurate, professional SOAP notes in seconds.</p>
            <div className="feature-visual">
              <div className="ai-animation">
                <div className="ai-circle"></div>
                <div className="ai-circle"></div>
                <div className="ai-circle"></div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <div className="icon-glow teal"></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
            <h3>Smart Editing</h3>
            <p>Review and refine generated notes with our intuitive editor. Your clinical voice, enhanced by AI.</p>
            <div className="feature-visual">
              <div className="edit-animation">
                <div className="cursor-blink"></div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <div className="icon-glow orange"></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <h3>EHR Integration</h3>
            <p>Export directly to SimplePractice, TherapyNotes, and more. One click to your existing workflow.</p>
            <div className="feature-visual">
              <div className="integration-logos">
                <div className="int-logo">SP</div>
                <div className="int-logo">TN</div>
                <div className="int-logo">+</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="security-section" id="security">
        <div className="security-content">
          <div className="security-text">
            <span className="section-badge light">Security</span>
            <h2>Built for HIPAA<br/>Compliance</h2>
            <p>Your patients' privacy is our top priority. EasyTheraNotes exceeds industry standards for healthcare data protection.</p>
            
            <ul className="security-list">
              <li>
                <div className="check-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <strong>End-to-end AES-256 encryption</strong>
                  <span>Your data is encrypted at rest and in transit</span>
                </div>
              </li>
              <li>
                <div className="check-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <strong>BAA included with all plans</strong>
                  <span>Business Associate Agreement ready to sign</span>
                </div>
              </li>
              <li>
                <div className="check-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <strong>SOC 2 Type II certified</strong>
                  <span>Independently audited security controls</span>
                </div>
              </li>
              <li>
                <div className="check-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <strong>Auto-delete audio</strong>
                  <span>Recordings deleted after processing</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="security-visual">
            <div className="shield-wrapper">
              <div className="shield-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
              </div>
              <div className="shield-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#shieldGrad)" stroke="url(#shieldStroke)" strokeWidth="1"/>
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="shieldGrad" x1="4" y1="2" x2="20" y2="22">
                      <stop stopColor="#6366f1" stopOpacity="0.2"/>
                      <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.1"/>
                    </linearGradient>
                    <linearGradient id="shieldStroke" x1="4" y1="2" x2="20" y2="22">
                      <stop stopColor="#6366f1"/>
                      <stop offset="1" stopColor="#8b5cf6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-bg"></div>
        <div className="cta-content">
          <h2>Ready to save 5+ hours every week?</h2>
          <p>Join thousands of therapists who've transformed their documentation workflow.</p>
          <button className="btn-cta" onClick={() => setCurrentView('signup')}>
            <span>Start Your Free Trial</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <span className="cta-note">No credit card required • 14-day free trial • Cancel anytime</span>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon small">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C7.5 3 4 6 4 10c0 2 1 4 3 5v4c0 1 1 2 2 2h6c1 0 2-1 2-2v-4c2-1 3-3 3-5 0-4-3.5-7-8-7z" fill="url(#logoGrad2)"/>
                  <path d="M9 13h6M12 10v6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="logoGrad2" x1="4" y1="3" x2="20" y2="21">
                      <stop stopColor="#6366f1"/>
                      <stop offset="1" stopColor="#8b5cf6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span>EasyTheraNotes</span>
            </div>
            <p>AI-powered clinical documentation for modern therapists.</p>
          </div>
          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Integrations</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">HIPAA Compliance</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 EasyTheraNotes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );

  // Login Page Component
  const LoginPage = () => (
    <div className="login-page">
      <div className="login-bg"></div>
      <div className="login-container">
        <div className="login-card">
          <div className="login-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          
          <h1>Secure Portal</h1>
          <p className="login-subtitle">Provider Authentication</p>
          
          <div className="login-form">
            <div className="login-field">
              <label>Provider ID</label>
              <input 
                type="text"
                placeholder="dr.smith"
                value={loginData.providerId}
                onChange={(e) => setLoginData({...loginData, providerId: e.target.value})}
              />
            </div>
            
            <div className="login-field">
              <label>Password</label>
              <input 
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              />
            </div>
            
            <button 
              className="btn-login"
              onClick={handleLogin}
              disabled={isLoggingIn || !loginData.providerId || !loginData.password}
            >
              {isLoggingIn ? (
                <>
                  <div className="login-spinner"></div>
                  Authenticating...
                </>
              ) : (
                'Access Workspace'
              )}
            </button>
          </div>
          
          <div className="login-security">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            <span>256-bit End-to-End Encryption</span>
          </div>
          
          <div className="login-switch">
            <span>Don't have an account?</span>
            <button onClick={() => setCurrentView('signup')}>Create Account</button>
          </div>
        </div>
        
        <button className="back-to-home" onClick={() => setCurrentView('landing')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  );

  // Signup Page Component
  const SignupPage = () => (
    <div className="login-page">
      <div className="login-bg"></div>
      <div className="login-container signup-container">
        <div className="login-card signup-card">
          <div className="login-icon signup-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <line x1="20" y1="8" x2="20" y2="14"/>
              <line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
          </div>
          
          <h1>Create Account</h1>
          <p className="login-subtitle">Start your 14-day free trial</p>
          
          <div className="login-form">
            <div className="signup-row">
              <div className="login-field">
                <label>Full Name</label>
                <input 
                  type="text"
                  placeholder="Dr. Jane Smith"
                  value={signupData.fullName}
                  onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                />
              </div>
              
              <div className="login-field">
                <label>Provider ID</label>
                <input 
                  type="text"
                  placeholder="dr.smith"
                  value={signupData.providerId}
                  onChange={(e) => setSignupData({...signupData, providerId: e.target.value})}
                />
              </div>
            </div>
            
            <div className="login-field">
              <label>Email Address</label>
              <input 
                type="email"
                placeholder="jane.smith@clinic.com"
                value={signupData.email}
                onChange={(e) => setSignupData({...signupData, email: e.target.value})}
              />
            </div>
            
            <div className="signup-row">
              <div className="login-field">
                <label>Password</label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                />
              </div>
              
              <div className="login-field">
                <label>Confirm Password</label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                />
              </div>
            </div>
            
            {signupData.password && signupData.confirmPassword && 
             signupData.password !== signupData.confirmPassword && (
              <div className="password-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Passwords do not match
              </div>
            )}
            
            <div className="checkbox-field">
              <input 
                type="checkbox"
                id="agreeTerms"
                checked={signupData.agreeTerms}
                onChange={(e) => setSignupData({...signupData, agreeTerms: e.target.checked})}
              />
              <label htmlFor="agreeTerms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>, including <a href="#">HIPAA compliance</a> requirements
              </label>
            </div>
            
            <button 
              className="btn-login"
              onClick={handleSignup}
              disabled={isSigningUp || !signupData.fullName || !signupData.email || 
                       !signupData.providerId || !signupData.password || 
                       !signupData.confirmPassword || !signupData.agreeTerms ||
                       signupData.password !== signupData.confirmPassword}
            >
              {isSigningUp ? (
                <>
                  <div className="login-spinner"></div>
                  Creating Account...
                </>
              ) : (
                'Start Free Trial'
              )}
            </button>
          </div>
          
          <div className="signup-features">
            <div className="signup-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>14-day free trial</span>
            </div>
            <div className="signup-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="signup-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
          
          <div className="login-switch">
            <span>Already have an account?</span>
            <button onClick={() => setCurrentView('login')}>Sign In</button>
          </div>
        </div>
        
        <button className="back-to-home" onClick={() => setCurrentView('landing')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  );

  // Dashboard Component
  const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('session');
    const [patientId, setPatientId] = useState('');
    
    return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3C7.5 3 4 6 4 10c0 2 1 4 3 5v4c0 1 1 2 2 2h6c1 0 2-1 2-2v-4c2-1 3-3 3-5 0-4-3.5-7-8-7z" fill="url(#logoGradH)"/>
              <path d="M9 13h6M12 10v6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <defs>
                <linearGradient id="logoGradH" x1="4" y1="3" x2="20" y2="21">
                  <stop stopColor="#6366f1"/>
                  <stop offset="1" stopColor="#8b5cf6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>EasyTheraNotes</span>
        </div>
        <div className="header-user">
          <div className="user-status">
            <span className="user-name-header">Dr. Smith</span>
            <span className="status-connected">
              <span className="status-dot"></span>
              CONNECTED
            </span>
          </div>
          <button className="btn-header-logout" onClick={() => setCurrentView('login')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </header>

      <div className="app-tabs">
        <button 
          className={`tab-btn ${activeTab === 'session' ? 'active' : ''}`}
          onClick={() => setActiveTab('session')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2"/>
          </svg>
          Active Session
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          History
        </button>
      </div>

      <main className="app-main">
        {activeTab === 'session' ? (
          <div className="session-card">
            <div className="session-card-header">
              <h2>New Session</h2>
              <p>Configure session details below to start documentation.</p>
            </div>
            
            <div className="session-card-body">
              <div className="patient-id-section">
                <label>PATIENT IDENTIFIER</label>
                <div className="patient-id-input">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="e.g., PT-2024-8842"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                  />
                </div>
              </div>

              <div className="session-options">
                <button className="session-option-card" onClick={() => setCurrentView('newNote')}>
                  <div className="option-icon mic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
                      <path d="M19 10v2a7 7 0 01-14 0v-2"/>
                      <line x1="12" y1="19" x2="12" y2="23"/>
                      <line x1="8" y1="23" x2="16" y2="23"/>
                    </svg>
                  </div>
                  <span className="option-title">Start Recording</span>
                  <span className="option-subtitle">Use microphone</span>
                </button>

                <button className="session-option-card">
                  <div className="option-icon upload">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <span className="option-title">Upload Audio</span>
                  <span className="option-subtitle">MP3, WAV, M4A</span>
                </button>
              </div>

              <div className="privacy-notice">
                <div className="privacy-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="privacy-text">
                  <strong>Privacy Protocol Active</strong>
                  <p>Ensure no direct personal identifiers are spoken (names, specific addresses). The AI is trained to structure clinical data while maintaining anonymity.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="history-section">
            <div className="history-header">
              <h2>Session History</h2>
              <div className="history-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input type="text" placeholder="Search notes..." />
              </div>
            </div>
            <div className="notes-list-new">
              {notes.map((note, index) => (
                <div 
                  key={note.id} 
                  className="note-item"
                  style={{ '--delay': `${index * 0.05}s` }}
                  onClick={() => {
                    setSelectedNote(note);
                    setCurrentView('viewNote');
                  }}
                >
                  <div className="note-item-avatar">{note.patientInitials}</div>
                  <div className="note-item-content">
                    <div className="note-item-header">
                      <span className="note-item-patient">Patient {note.patientInitials}</span>
                      <span className={`note-item-status ${note.status}`}>{note.status}</span>
                    </div>
                    <span className="note-item-type">{note.sessionType}</span>
                    <span className="note-item-date">{note.date}</span>
                  </div>
                  <svg className="note-item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )};

  // New Note View Component - Rediseñado
  const NewNoteView = () => {
    const [activeTab, setActiveTab] = useState('session');
    const [uploadedFile, setUploadedFile] = useState(null);

    return (
      <div className="app-interior">
        <header className="app-header">
          <div className="app-header-left">
            <div className="app-logo">
              <div className="app-logo-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C7.5 3 4 6 4 10c0 2 1 4 3 5v4c0 1 1 2 2 2h6c1 0 2-1 2-2v-4c2-1 3-3 3-5 0-4-3.5-7-8-7z" fill="url(#logoGradApp)"/>
                  <path d="M9 13h6M12 10v6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="logoGradApp" x1="4" y1="3" x2="20" y2="21">
                      <stop stopColor="#6366f1"/>
                      <stop offset="1" stopColor="#8b5cf6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span>EasyTheraNotes</span>
            </div>
          </div>
          <div className="app-header-right">
            <div className="user-status">
              <span className="user-name-header">Dr. Smith</span>
              <span className="connection-status">
                <span className="status-dot"></span>
                CONNECTED
              </span>
            </div>
            <button className="btn-header-logout" onClick={() => setCurrentView('login')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </header>

        <div className="app-tabs">
          <button 
            className={`app-tab ${activeTab === 'session' ? 'active' : ''}`}
            onClick={() => setActiveTab('session')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
              <path d="M19 10v2a7 7 0 01-14 0v-2"/>
            </svg>
            Active Session
          </button>
          <button 
            className={`app-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('history');
              setCurrentView('dashboard');
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            History Archive
          </button>
        </div>

        <div className="app-content">
          <div className="session-card">
            <div className="session-card-header">
              <h2>New Session</h2>
              <p>Configure your session details below to begin documentation.</p>
            </div>
            
            <div className="session-card-body">
              <div className="field-group">
                <label className="field-label">PATIENT IDENTIFIER</label>
                <div className="patient-input-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input 
                    type="text"
                    placeholder="e.g., PT-2024-8842"
                    value={newNote.patientInitials}
                    onChange={(e) => setNewNote({...newNote, patientInitials: e.target.value})}
                  />
                </div>
              </div>

              <div className="input-methods">
                <button 
                  className={`method-card ${isRecording ? 'recording' : ''}`}
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <div className="method-icon">
                    {isRecording ? (
                      <div className="recording-pulse">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="6" width="12" height="12" rx="2"/>
                        </svg>
                      </div>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
                        <path d="M19 10v2a7 7 0 01-14 0v-2"/>
                        <line x1="12" y1="19" x2="12" y2="23"/>
                        <line x1="8" y1="23" x2="16" y2="23"/>
                      </svg>
                    )}
                  </div>
                  <span className="method-title">{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                  <span className="method-subtitle">{isRecording ? formatTime(recordingTime) : 'Use microphone'}</span>
                </button>

                <button className="method-card upload">
                  <div className="method-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <span className="method-title">Upload Audio</span>
                  <span className="method-subtitle">MP3, WAV, M4A</span>
                  <input 
                    type="file" 
                    accept="audio/*" 
                    onChange={(e) => setUploadedFile(e.target.files[0])}
                  />
                </button>
              </div>

              {(isRecording || uploadedFile || newNote.patientInitials) && (
                <button 
                  className="btn-generate-soap"
                  onClick={handleGenerateSOAP}
                  disabled={isGenerating || !newNote.patientInitials}
                >
                  {isGenerating ? (
                    <>
                      <div className="generate-spinner-light"></div>
                      Generating SOAP Note...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                      Generate SOAP Note
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="privacy-banner">
              <div className="privacy-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className="privacy-text">
                <strong>Active Privacy Protocol</strong>
                <p>Ensure no direct personal identifiers (names, specific addresses) are spoken. The AI is trained to structure clinical data while maintaining anonymity.</p>
              </div>
            </div>
          </div>

          {/* SOAP Note Section - Shows when generated */}
          {(newNote.subjective || newNote.objective || newNote.assessment || newNote.plan) && (
            <div className="soap-results-card">
              <div className="soap-results-header">
                <h3>Generated SOAP Note</h3>
                <div className="soap-results-actions">
                  <button className="btn-soap-action">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Edit
                  </button>
                  <button className="btn-soap-action primary" onClick={handleSaveNote}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                      <polyline points="17 21 17 13 7 13 7 21"/>
                      <polyline points="7 3 7 8 15 8"/>
                    </svg>
                    Save Note
                  </button>
                </div>
              </div>
              
              <div className="soap-results-grid">
                <div className="soap-result-item">
                  <div className="soap-result-label">
                    <span className="soap-badge s">S</span>
                    Subjective
                  </div>
                  <textarea
                    value={newNote.subjective}
                    onChange={(e) => setNewNote({...newNote, subjective: e.target.value})}
                  />
                </div>
                <div className="soap-result-item">
                  <div className="soap-result-label">
                    <span className="soap-badge o">O</span>
                    Objective
                  </div>
                  <textarea
                    value={newNote.objective}
                    onChange={(e) => setNewNote({...newNote, objective: e.target.value})}
                  />
                </div>
                <div className="soap-result-item">
                  <div className="soap-result-label">
                    <span className="soap-badge a">A</span>
                    Assessment
                  </div>
                  <textarea
                    value={newNote.assessment}
                    onChange={(e) => setNewNote({...newNote, assessment: e.target.value})}
                  />
                </div>
                <div className="soap-result-item">
                  <div className="soap-result-label">
                    <span className="soap-badge p">P</span>
                    Plan
                  </div>
                  <textarea
                    value={newNote.plan}
                    onChange={(e) => setNewNote({...newNote, plan: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // View Note Detail Component
  const ViewNoteDetail = () => (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo small">
            <div className="logo-icon tiny">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3C7.5 3 4 6 4 10c0 2 1 4 3 5v4c0 1 1 2 2 2h6c1 0 2-1 2-2v-4c2-1 3-3 3-5 0-4-3.5-7-8-7z" fill="url(#logoGrad5)"/>
                <path d="M9 13h6M12 10v6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="logoGrad5" x1="4" y1="3" x2="20" y2="21">
                    <stop stopColor="#6366f1"/>
                    <stop offset="1" stopColor="#8b5cf6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span>EasyTheraNotes</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section">
            <button className="nav-item" onClick={() => setCurrentView('dashboard')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              </svg>
              <span>Dashboard</span>
            </button>
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div className="header-with-back">
            <button className="btn-back" onClick={() => setCurrentView('dashboard')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>
            <div>
              <h1>Session Note</h1>
              <p>Patient {selectedNote?.patientInitials} • {selectedNote?.date}</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </button>
            <button className="btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Export
            </button>
          </div>
        </header>

        {selectedNote && (
          <div className="note-detail-content">
            <div className="note-detail-header">
              <div className="detail-avatar">
                <span>{selectedNote.patientInitials}</span>
              </div>
              <div className="detail-info">
                <h2>Patient {selectedNote.patientInitials}</h2>
                <div className="detail-meta">
                  <span className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {selectedNote.date}
                  </span>
                  <span className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    {selectedNote.sessionType}
                  </span>
                  <span className={`status-pill ${selectedNote.status}`}>{selectedNote.status}</span>
                </div>
              </div>
            </div>

            <div className="soap-display">
              <div className="soap-display-card">
                <div className="soap-display-header">
                  <span className="soap-badge s">S</span>
                  <h3>Subjective</h3>
                </div>
                <p>{selectedNote.subjective}</p>
              </div>

              <div className="soap-display-card">
                <div className="soap-display-header">
                  <span className="soap-badge o">O</span>
                  <h3>Objective</h3>
                </div>
                <p>{selectedNote.objective}</p>
              </div>

              <div className="soap-display-card">
                <div className="soap-display-header">
                  <span className="soap-badge a">A</span>
                  <h3>Assessment</h3>
                </div>
                <p>{selectedNote.assessment}</p>
              </div>

              <div className="soap-display-card">
                <div className="soap-display-header">
                  <span className="soap-badge p">P</span>
                  <h3>Plan</h3>
                </div>
                <p>{selectedNote.plan}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary: #6366f1;
          --primary-dark: #4f46e5;
          --primary-light: #818cf8;
          --secondary: #8b5cf6;
          --accent: #06b6d4;
          --success: #10b981;
          --warning: #f59e0b;
          --error: #ef4444;
          
          --bg: #0a0a0f;
          --bg-card: rgba(255,255,255,0.03);
          --bg-card-hover: rgba(255,255,255,0.06);
          --border: rgba(255,255,255,0.08);
          --text: #ffffff;
          --text-secondary: rgba(255,255,255,0.6);
          
          --radius: 16px;
          --radius-sm: 10px;
          --radius-lg: 24px;
          --radius-full: 9999px;
        }

        html, body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* Background Effects */
        .landing-page {
          min-height: 100vh;
          position: relative;
        }

        .bg-gradient {
          position: fixed;
          inset: 0;
          background: 
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.15), transparent),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(139,92,246,0.1), transparent),
            radial-gradient(ellipse 60% 40% at 0% 80%, rgba(6,182,212,0.08), transparent);
          pointer-events: none;
        }

        .bg-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          animation: float 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: rgba(99,102,241,0.15);
          top: -200px;
          right: -200px;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: rgba(139,92,246,0.12);
          bottom: -100px;
          left: -100px;
          animation-delay: -5s;
        }

        .orb-3 {
          width: 300px;
          height: 300px;
          background: rgba(6,182,212,0.1);
          top: 50%;
          left: 30%;
          animation-delay: -10s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.05); }
          50% { transform: translate(-10px, 10px) scale(0.95); }
          75% { transform: translate(-20px, -10px) scale(1.02); }
        }

        .bg-grid {
          position: fixed;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .cursor-glow {
          position: fixed;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 0;
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 48px;
          background: rgba(10,10,15,0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 42px;
          height: 42px;
        }

        .logo-icon svg {
          width: 100%;
          height: 100%;
        }

        .logo-icon.small { width: 36px; height: 36px; }
        .logo-icon.tiny { width: 28px; height: 28px; }

        .logo-text, .logo span {
          font-family: 'Instrument Serif', serif;
          font-size: 22px;
          font-weight: 400;
        }

        .nav-links {
          display: flex;
          gap: 40px;
        }

        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: var(--text);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Buttons */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          border: none;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(99,102,241,0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(99,102,241,0.4);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .btn-primary svg {
          width: 16px;
          height: 16px;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: var(--bg-card);
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: var(--bg-card-hover);
          border-color: rgba(255,255,255,0.15);
        }

        .btn-secondary svg {
          width: 16px;
          height: 16px;
        }

        .btn-ghost {
          padding: 12px 20px;
          background: transparent;
          color: var(--text-secondary);
          border: none;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
        }

        .btn-ghost:hover {
          color: var(--text);
        }

        .btn-text {
          background: none;
          border: none;
          color: var(--primary-light);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-back {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          color: var(--text-secondary);
          margin-right: 16px;
          transition: all 0.2s;
        }

        .btn-back:hover {
          background: var(--bg-card-hover);
          color: var(--text);
        }

        .btn-back svg {
          width: 18px;
          height: 18px;
        }

        /* Hero Section */
        .hero {
          padding: 160px 48px 100px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          padding-top: 40px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
        }

        .badge-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          100% { left: 100%; }
        }

        .hero-badge svg {
          width: 16px;
          height: 16px;
          color: var(--success);
        }

        .hero h1 {
          font-size: 64px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -2px;
          margin-bottom: 28px;
        }

        .hero-line {
          display: block;
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 0.6s ease forwards;
        }

        .hero-line:nth-child(1) { animation-delay: 0.1s; }
        .hero-line:nth-child(2) { animation-delay: 0.2s; }
        .hero-line:nth-child(3) { animation-delay: 0.3s; }

        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--secondary) 50%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 480px;
          margin-bottom: 40px;
          opacity: 0;
          animation: fadeIn 0.6s ease 0.4s forwards;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
          opacity: 0;
          animation: fadeIn 0.6s ease 0.5s forwards;
        }

        .btn-hero {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 36px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          border: none;
          border-radius: var(--radius-full);
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(99,102,241,0.4);
        }

        .btn-hero:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 40px rgba(99,102,241,0.5);
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          100% { left: 100%; }
        }

        .btn-demo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 28px;
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-demo:hover {
          background: var(--bg-card);
        }

        .play-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border-radius: 50%;
        }

        .play-icon svg {
          width: 14px;
          height: 14px;
          margin-left: 2px;
        }

        .hero-social-proof {
          display: flex;
          align-items: center;
          gap: 20px;
          opacity: 0;
          animation: fadeIn 0.6s ease 0.6s forwards;
        }

        .avatars {
          display: flex;
        }

        .avatar {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 2px solid var(--bg);
          border-radius: 50%;
          margin-left: -10px;
          font-size: 18px;
          opacity: 0;
          animation: popIn 0.4s ease forwards;
        }

        .avatar:first-child { margin-left: 0; }

        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .social-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stars {
          display: flex;
          gap: 2px;
        }

        .stars svg {
          width: 16px;
          height: 16px;
        }

        .social-text span {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .social-text strong {
          color: var(--text);
        }

        /* Hero Visual */
        .hero-visual {
          position: relative;
          opacity: 0;
          animation: fadeIn 0.8s ease 0.3s forwards;
        }

        .demo-window {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        .window-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(0,0,0,0.2);
          border-bottom: 1px solid var(--border);
        }

        .window-dots {
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .dot.red { background: #ef4444; }
        .dot.yellow { background: #f59e0b; }
        .dot.green { background: #22c55e; }

        .window-title {
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .window-content {
          padding: 40px;
        }

        .audio-visualizer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          height: 80px;
          margin-bottom: 24px;
        }

        .audio-bar {
          width: 4px;
          height: var(--height);
          background: linear-gradient(to top, var(--primary), var(--secondary));
          border-radius: 2px;
          animation: audioWave 1.2s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes audioWave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }

        .recording-info {
          text-align: center;
        }

        .recording-timer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .rec-dot {
          width: 10px;
          height: 10px;
          background: #ef4444;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .rec-time {
          font-size: 32px;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', monospace;
        }

        .rec-label {
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Floating Cards */
        .floating-card {
          position: absolute;
          background: rgba(20,20,30,0.9);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          animation: floatCard 4s ease-in-out infinite;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .card-ai {
          top: 20px;
          right: -20px;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          animation-delay: 0.5s;
        }

        .card-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: var(--radius-sm);
        }

        .card-icon svg {
          width: 20px;
          height: 20px;
          color: white;
        }

        .card-icon.green {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .card-text strong {
          display: block;
          font-size: 14px;
          margin-bottom: 2px;
        }

        .card-text span {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .card-progress {
          width: 100%;
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar {
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          border-radius: 2px;
          animation: progress 2s ease-in-out infinite;
        }

        @keyframes progress {
          0% { width: 20%; }
          50% { width: 80%; }
          100% { width: 20%; }
        }

        .card-secure {
          bottom: 100px;
          left: -40px;
          animation-delay: 1s;
        }

        .card-soap {
          bottom: 20px;
          right: 40px;
          padding: 20px;
          animation-delay: 1.5s;
        }

        .soap-preview {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .soap-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .soap-badge {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          color: white;
        }

        .soap-badge.s { background: linear-gradient(135deg, #6366f1, #818cf8); }
        .soap-badge.o { background: linear-gradient(135deg, #8b5cf6, #a78bfa); }
        .soap-badge.a { background: linear-gradient(135deg, #06b6d4, #22d3ee); }
        .soap-badge.p { background: linear-gradient(135deg, #10b981, #34d399); }

        .soap-lines {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .line {
          width: 100px;
          height: 6px;
          background: var(--border);
          border-radius: 3px;
        }

        .line.short { width: 70px; }
        .line.shorter { width: 50px; }

        /* Features Section */
        .features {
          padding: 120px 48px;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .section-badge {
          display: inline-block;
          padding: 8px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          font-size: 13px;
          font-weight: 600;
          color: var(--primary-light);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }

        .section-badge.light {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .section-header h2 {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -1px;
          margin-bottom: 16px;
        }

        .section-header p {
          font-size: 18px;
          color: var(--text-secondary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          position: relative;
          padding: 32px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: rgba(99,102,241,0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .feature-card.featured {
          background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05));
          border-color: rgba(99,102,241,0.2);
        }

        .featured-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          padding: 4px 10px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .feature-icon {
          position: relative;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .icon-glow {
          position: absolute;
          inset: 0;
          background: rgba(99,102,241,0.2);
          border-radius: var(--radius);
          filter: blur(12px);
        }

        .icon-glow.purple { background: rgba(139,92,246,0.2); }
        .icon-glow.teal { background: rgba(6,182,212,0.2); }
        .icon-glow.orange { background: rgba(245,158,11,0.2); }

        .feature-icon svg {
          position: relative;
          width: 28px;
          height: 28px;
          color: var(--primary-light);
        }

        .feature-card h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .feature-card p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .feature-visual {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mini-waveform {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 40px;
        }

        .mini-bar {
          width: 4px;
          background: linear-gradient(to top, var(--primary), var(--secondary));
          border-radius: 2px;
          animation: miniWave 1s ease-in-out infinite;
          animation-delay: calc(var(--i) * 0.05s);
        }

        @keyframes miniWave {
          0%, 100% { height: 10px; }
          50% { height: 30px; }
        }

        .ai-animation {
          display: flex;
          gap: 8px;
        }

        .ai-circle {
          width: 12px;
          height: 12px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          animation: bounce 1.4s ease-in-out infinite;
        }

        .ai-circle:nth-child(2) { animation-delay: 0.2s; }
        .ai-circle:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .edit-animation {
          width: 80px;
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          position: relative;
        }

        .cursor-blink {
          position: absolute;
          right: 0;
          top: -8px;
          width: 2px;
          height: 20px;
          background: var(--primary-light);
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .integration-logos {
          display: flex;
          gap: 8px;
        }

        .int-logo {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
        }

        /* Security Section */
        .security-section {
          padding: 120px 48px;
          position: relative;
          z-index: 1;
          background: linear-gradient(180deg, transparent, rgba(99,102,241,0.03), transparent);
        }

        .security-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .security-text h2 {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -1px;
          margin-bottom: 20px;
        }

        .security-text > p {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 40px;
        }

        .security-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .security-list li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .check-icon {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(16,185,129,0.15);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .check-icon svg {
          width: 14px;
          height: 14px;
          color: var(--success);
        }

        .security-list li div strong {
          display: block;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .security-list li div span {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .security-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .shield-wrapper {
          position: relative;
          width: 280px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .shield-rings {
          position: absolute;
          inset: 0;
        }

        .ring {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 50%;
          animation: ringPulse 3s ease-out infinite;
        }

        .ring-1 { animation-delay: 0s; }
        .ring-2 { animation-delay: 1s; }
        .ring-3 { animation-delay: 2s; }

        @keyframes ringPulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .shield-icon svg {
          width: 120px;
          height: 120px;
        }

        /* CTA Section */
        .cta-section {
          padding: 120px 48px;
          position: relative;
          z-index: 1;
        }

        .cta-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05));
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .cta-content {
          position: relative;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 42px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .cta-content p {
          font-size: 18px;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .btn-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 20px 40px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          border: none;
          border-radius: var(--radius-full);
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(99,102,241,0.4);
        }

        .btn-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(99,102,241,0.5);
        }

        .btn-cta svg {
          width: 20px;
          height: 20px;
        }

        .cta-note {
          display: block;
          margin-top: 20px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Footer */
        .footer {
          padding: 80px 48px 40px;
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--border);
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1.5fr 2fr;
          gap: 80px;
          max-width: 1200px;
          margin: 0 auto 60px;
        }

        .footer-brand .logo {
          margin-bottom: 16px;
        }

        .footer-brand p {
          font-size: 14px;
          color: var(--text-secondary);
          max-width: 280px;
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .footer-col h4 {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .footer-col a {
          display: block;
          font-size: 14px;
          color: var(--text-secondary);
          text-decoration: none;
          margin-bottom: 12px;
          transition: color 0.2s;
        }

        .footer-col a:hover {
          color: var(--text);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 40px;
          border-top: 1px solid var(--border);
        }

        .footer-bottom p {
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Dashboard */
        .dashboard {
          display: flex;
          min-height: 100vh;
          background: var(--bg);
        }

        .sidebar {
          width: 280px;
          background: rgba(15,15,20,0.8);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          backdrop-filter: blur(20px);
        }

        .sidebar-header {
          padding: 24px;
          border-bottom: 1px solid var(--border);
        }

        .sidebar-header .logo span {
          font-family: 'Instrument Serif', serif;
          font-size: 18px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 24px 16px;
          overflow-y: auto;
        }

        .nav-section {
          margin-bottom: 32px;
        }

        .nav-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-secondary);
          padding: 0 12px;
          margin-bottom: 12px;
        }

        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: transparent;
          border: none;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .nav-item:hover {
          background: var(--bg-card);
          color: var(--text);
        }

        .nav-item.active {
          background: var(--bg-card);
          color: var(--text);
        }

        .nav-item.highlight {
          background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1));
          color: var(--primary-light);
          border: 1px solid rgba(99,102,241,0.2);
        }

        .nav-item svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-card {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: var(--bg-card);
          border-radius: var(--radius-sm);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          font-size: 14px;
          font-weight: 700;
        }

        .user-info {
          flex: 1;
        }

        .user-name {
          display: block;
          font-size: 14px;
          font-weight: 600;
        }

        .user-plan {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .btn-logout {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          background: rgba(239,68,68,0.1);
          color: #ef4444;
          border-color: rgba(239,68,68,0.3);
        }

        .btn-logout svg {
          width: 18px;
          height: 18px;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: 280px;
          padding: 32px;
        }

        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .main-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .main-header p {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .header-with-back {
          display: flex;
          align-items: center;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          width: 280px;
        }

        .search-box svg {
          width: 18px;
          height: 18px;
          color: var(--text-secondary);
        }

        .search-box input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text);
          font-size: 14px;
          outline: none;
        }

        .search-box input::placeholder {
          color: var(--text-secondary);
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          padding: 24px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(99,102,241,0.15);
          border-radius: var(--radius-sm);
        }

        .stat-icon svg {
          width: 22px;
          height: 22px;
          color: var(--primary-light);
        }

        .stat-icon.blue { background: rgba(59,130,246,0.15); }
        .stat-icon.blue svg { color: #60a5fa; }
        .stat-icon.green { background: rgba(16,185,129,0.15); }
        .stat-icon.green svg { color: #34d399; }
        .stat-icon.purple { background: rgba(139,92,246,0.15); }
        .stat-icon.purple svg { color: #a78bfa; }
        .stat-icon.orange { background: rgba(245,158,11,0.15); }
        .stat-icon.orange svg { color: #fbbf24; }

        .stat-trend {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: var(--radius-full);
        }

        .stat-trend.up {
          background: rgba(16,185,129,0.15);
          color: #34d399;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .stat-bar {
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
        }

        .stat-bar::after {
          content: '';
          display: block;
          width: var(--width);
          height: 100%;
          border-radius: 2px;
        }

        .stat-bar.blue::after { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
        .stat-bar.green::after { background: linear-gradient(90deg, #10b981, #34d399); }
        .stat-bar.purple::after { background: linear-gradient(90deg, #8b5cf6, #a78bfa); }
        .stat-bar.orange::after { background: linear-gradient(90deg, #f59e0b, #fbbf24); }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .notes-panel, .quick-actions {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .panel-header h2 {
          font-size: 18px;
          font-weight: 700;
        }

        .notes-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .note-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
          opacity: 0;
          animation: slideIn 0.4s ease forwards;
          animation-delay: var(--delay);
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .note-card:hover {
          background: var(--bg-card-hover);
          border-color: var(--border);
        }

        .note-avatar {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          flex-shrink: 0;
        }

        .note-avatar span {
          font-size: 14px;
          font-weight: 700;
        }

        .note-content {
          flex: 1;
          min-width: 0;
        }

        .note-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .note-patient {
          font-size: 15px;
          font-weight: 600;
        }

        .note-date {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .note-type {
          font-size: 12px;
          color: var(--primary-light);
          font-weight: 500;
        }

        .note-preview {
          font-size: 13px;
          color: var(--text-secondary);
          margin-top: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .note-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .status-pill {
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-pill.completed {
          background: rgba(16,185,129,0.15);
          color: #34d399;
        }

        .note-actions svg {
          width: 18px;
          height: 18px;
          color: var(--text-secondary);
        }

        /* Quick Actions */
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-card:hover {
          background: var(--bg-card-hover);
          transform: translateY(-2px);
        }

        .action-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1));
          border-radius: var(--radius-sm);
        }

        .action-icon svg {
          width: 24px;
          height: 24px;
          color: var(--primary-light);
        }

        .action-icon.purple { background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(167,139,250,0.1)); }
        .action-icon.purple svg { color: #a78bfa; }
        .action-icon.teal { background: linear-gradient(135deg, rgba(6,182,212,0.15), rgba(34,211,238,0.1)); }
        .action-icon.teal svg { color: #22d3ee; }
        .action-icon.orange { background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(251,191,36,0.1)); }
        .action-icon.orange svg { color: #fbbf24; }

        .action-card span {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        /* New Note View */
        .new-note-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .recording-panel {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .panel-section {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
        }

        .panel-section h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-group input, .form-group select {
          padding: 12px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text);
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .form-group input:focus, .form-group select:focus {
          outline: none;
          border-color: var(--primary);
        }

        /* Recorder Card */
        .recorder-card {
          background: rgba(255,255,255,0.02);
          border: 2px dashed var(--border);
          border-radius: var(--radius);
          padding: 32px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .recorder-card.active {
          border-color: var(--primary);
          background: rgba(99,102,241,0.05);
        }

        .recorder-visualizer {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .mic-icon-large svg {
          width: 64px;
          height: 64px;
          color: var(--text-secondary);
        }

        .live-waveform {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 80px;
        }

        .live-waveform .wave-bar {
          width: 4px;
          background: linear-gradient(to top, var(--primary), var(--secondary));
          border-radius: 2px;
          animation: liveWave 0.8s ease-in-out infinite;
          animation-delay: calc(var(--i) * 0.03s);
        }

        @keyframes liveWave {
          0%, 100% { height: 20px; }
          50% { height: 60px; }
        }

        .recorder-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .recorder-time {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .rec-indicator {
          width: 12px;
          height: 12px;
          background: #ef4444;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        .time-display {
          font-size: 36px;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', monospace;
        }

        .btn-record {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          border: none;
          border-radius: var(--radius-full);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(99,102,241,0.3);
        }

        .btn-record:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(99,102,241,0.4);
        }

        .btn-record.recording {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          box-shadow: 0 4px 20px rgba(239,68,68,0.3);
        }

        .btn-record svg {
          width: 18px;
          height: 18px;
        }

        .recorder-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .recorder-note svg {
          width: 16px;
          height: 16px;
          color: var(--success);
        }

        /* Notes Textarea */
        .notes-textarea {
          width: 100%;
          min-height: 150px;
          padding: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text);
          font-size: 14px;
          font-family: inherit;
          line-height: 1.6;
          resize: vertical;
          transition: border-color 0.2s;
        }

        .notes-textarea:focus {
          outline: none;
          border-color: var(--primary);
        }

        .btn-generate {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          margin-top: 16px;
          background: linear-gradient(135deg, #1f2937, #374151);
          color: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-generate:hover {
          background: linear-gradient(135deg, #374151, #4b5563);
        }

        .btn-generate:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-generate svg {
          width: 20px;
          height: 20px;
        }

        .generate-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* SOAP Panel */
        .soap-panel {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .soap-fields {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 24px;
        }

        .soap-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .soap-label {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .soap-label span:last-child {
          font-size: 14px;
          font-weight: 600;
        }

        .soap-field textarea {
          width: 100%;
          min-height: 100px;
          padding: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text);
          font-size: 14px;
          font-family: inherit;
          line-height: 1.6;
          resize: vertical;
          transition: border-color 0.2s;
        }

        .soap-field textarea:focus {
          outline: none;
          border-color: var(--primary);
        }

        .soap-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }

        /* View Note */
        .note-detail-content {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 32px;
        }

        .note-detail-header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-bottom: 24px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border);
        }

        .detail-avatar {
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
        }

        .detail-avatar span {
          font-size: 24px;
          font-weight: 700;
        }

        .detail-info h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .detail-meta {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .meta-item svg {
          width: 16px;
          height: 16px;
        }

        .soap-display {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .soap-display-card {
          padding: 20px;
          background: rgba(255,255,255,0.02);
          border-radius: var(--radius-sm);
        }

        .soap-display-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .soap-display-header h3 {
          font-size: 16px;
          font-weight: 600;
        }

        .soap-display-card p {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .content-grid { grid-template-columns: 1fr; }
          .new-note-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; padding: 140px 24px 60px; }
          .hero-visual { display: none; }
          .hero h1 { font-size: 44px; }
          .security-content { grid-template-columns: 1fr; }
          .sidebar { display: none; }
          .main-content { margin-left: 0; }
          .nav { padding: 16px 24px; }
          .nav-links { display: none; }
        }

        /* Login Page */
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 20px;
        }

        .login-bg {
          position: fixed;
          inset: 0;
          background: 
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.12), transparent),
            radial-gradient(ellipse 60% 60% at 100% 100%, rgba(139,92,246,0.08), transparent),
            var(--bg);
        }

        .login-container {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          width: 100%;
          max-width: 440px;
        }

        .login-card {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 48px 40px;
          text-align: center;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .login-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(99,102,241,0.3);
        }

        .login-icon svg {
          width: 40px;
          height: 40px;
          color: white;
        }

        .login-card h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .login-subtitle {
          font-size: 16px;
          color: var(--primary-light);
          font-weight: 500;
          margin-bottom: 36px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .login-field {
          text-align: left;
        }

        .login-field label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 10px;
        }

        .login-field input {
          width: 100%;
          padding: 16px 20px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text);
          font-size: 16px;
          font-family: inherit;
          transition: all 0.2s;
        }

        .login-field input:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(99,102,241,0.05);
        }

        .login-field input::placeholder {
          color: var(--text-secondary);
        }

        .btn-login {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 18px 24px;
          margin-top: 8px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(99,102,241,0.3);
        }

        .btn-login:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(99,102,241,0.4);
        }

        .btn-login:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .login-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .login-security {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 14px;
        }

        .login-security svg {
          width: 18px;
          height: 18px;
          color: var(--success);
        }

        .back-to-home {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .back-to-home:hover {
          background: var(--bg-card);
          color: var(--text);
          border-color: rgba(255,255,255,0.15);
        }

        .back-to-home svg {
          width: 16px;
          height: 16px;
        }

        /* Signup Page Additional Styles */
        .signup-container {
          max-width: 520px;
        }

        .signup-card {
          padding: 40px 36px;
        }

        .signup-icon {
          background: linear-gradient(135deg, #10b981, #059669);
          box-shadow: 0 8px 32px rgba(16,185,129,0.3);
        }

        .signup-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .checkbox-field {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          text-align: left;
        }

        .checkbox-field input[type="checkbox"] {
          width: 20px;
          height: 20px;
          margin-top: 2px;
          accent-color: var(--primary);
          cursor: pointer;
          flex-shrink: 0;
        }

        .checkbox-field label {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          cursor: pointer;
        }

        .checkbox-field a {
          color: var(--primary-light);
          text-decoration: none;
        }

        .checkbox-field a:hover {
          text-decoration: underline;
        }

        .password-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: var(--radius-sm);
          color: #f87171;
          font-size: 13px;
        }

        .password-error svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .signup-features {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }

        .signup-feature {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .signup-feature svg {
          width: 14px;
          height: 14px;
          color: var(--success);
        }

        .login-switch {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
          font-size: 14px;
          color: var(--text-secondary);
        }

        .login-switch button {
          background: none;
          border: none;
          color: var(--primary-light);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-left: 6px;
          transition: color 0.2s;
        }

        .login-switch button:hover {
          color: var(--primary);
          text-decoration: underline;
        }

        @media (max-width: 560px) {
          .signup-row {
            grid-template-columns: 1fr;
          }
          
          .signup-features {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
          
          .login-card, .signup-card {
            padding: 32px 24px;
          }
        }

        /* New App Interior Styles */
        .app-container {
          min-height: 100vh;
          background: #fafbfc;
        }

        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background: white;
          border-bottom: 1px solid #e5e7eb;
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-logo {
          width: 36px;
          height: 36px;
        }

        .header-logo svg {
          width: 100%;
          height: 100%;
        }

        .header-brand span {
          font-family: 'Instrument Serif', serif;
          font-size: 20px;
          font-weight: 400;
          color: #111827;
        }

        .header-user {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-status {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        .user-name-header {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .status-connected {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          color: #10b981;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .btn-header-logout {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.2s;
        }

        .btn-header-logout:hover {
          background: #fee2e2;
          color: #ef4444;
        }

        .btn-header-logout svg {
          width: 20px;
          height: 20px;
        }

        .app-tabs {
          display: flex;
          background: #f3f4f6;
          padding: 8px;
          margin: 0 24px;
          margin-top: 20px;
          border-radius: 12px;
          gap: 4px;
        }

        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 20px;
          background: transparent;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn:hover {
          color: #374151;
        }

        .tab-btn.active {
          background: white;
          color: #111827;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .tab-btn svg {
          width: 18px;
          height: 18px;
        }

        .app-main {
          padding: 24px;
        }

        /* Session Card */
        .session-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .session-card-header {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          padding: 24px 28px;
          color: white;
        }

        .session-card-header h2 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .session-card-header p {
          font-size: 14px;
          opacity: 0.9;
        }

        .session-card-body {
          padding: 28px;
        }

        .patient-id-section {
          margin-bottom: 28px;
        }

        .patient-id-section label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }

        .patient-id-input {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .patient-id-input:focus-within {
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        .patient-id-input svg {
          width: 20px;
          height: 20px;
          color: #9ca3af;
        }

        .patient-id-input input {
          flex: 1;
          background: transparent;
          border: none;
          font-size: 15px;
          color: #111827;
          outline: none;
        }

        .patient-id-input input::placeholder {
          color: #9ca3af;
        }

        .session-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 28px;
        }

        .session-option-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 28px 20px;
          background: #f9fafb;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .session-option-card:hover {
          border-color: var(--primary);
          background: rgba(99,102,241,0.03);
        }

        .option-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .option-icon svg {
          width: 28px;
          height: 28px;
          color: var(--primary);
        }

        .option-icon.upload svg {
          color: #8b5cf6;
        }

        .option-title {
          font-size: 15px;
          font-weight: 600;
          color: #111827;
        }

        .option-subtitle {
          font-size: 13px;
          color: #6b7280;
        }

        .privacy-notice {
          display: flex;
          gap: 16px;
          padding: 20px;
          background: #fffbeb;
          border: 1px solid #fcd34d;
          border-radius: 12px;
        }

        .privacy-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fef3c7;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .privacy-icon svg {
          width: 22px;
          height: 22px;
          color: #d97706;
        }

        .privacy-text strong {
          display: block;
          font-size: 14px;
          color: #92400e;
          margin-bottom: 4px;
        }

        .privacy-text p {
          font-size: 13px;
          color: #a16207;
          line-height: 1.5;
          margin: 0;
        }

        /* History Section */
        .history-section {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .history-header h2 {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
        }

        .history-search {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background: #f3f4f6;
          border-radius: 10px;
          width: 260px;
        }

        .history-search svg {
          width: 18px;
          height: 18px;
          color: #9ca3af;
        }

        .history-search input {
          flex: 1;
          background: transparent;
          border: none;
          font-size: 14px;
          color: #111827;
          outline: none;
        }

        .history-search input::placeholder {
          color: #9ca3af;
        }

        .notes-list-new {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .note-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          opacity: 0;
          animation: slideIn 0.4s ease forwards;
          animation-delay: var(--delay);
        }

        .note-item:hover {
          border-color: var(--primary);
          background: rgba(99,102,241,0.02);
        }

        .note-item-avatar {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          font-weight: 700;
          font-size: 14px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .note-item-content {
          flex: 1;
          min-width: 0;
        }

        .note-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .note-item-patient {
          font-size: 15px;
          font-weight: 600;
          color: #111827;
        }

        .note-item-status {
          padding: 4px 10px;
          background: #dcfce7;
          color: #166534;
          font-size: 11px;
          font-weight: 600;
          border-radius: 20px;
          text-transform: capitalize;
        }

        .note-item-type {
          display: block;
          font-size: 13px;
          color: var(--primary);
          font-weight: 500;
          margin-bottom: 2px;
        }

        .note-item-date {
          font-size: 12px;
          color: #6b7280;
        }

        .note-item-arrow {
          width: 20px;
          height: 20px;
          color: #9ca3af;
        }

        @media (max-width: 640px) {
          .session-options {
            grid-template-columns: 1fr;
          }
          
          .app-tabs {
            margin: 16px;
          }
          
          .app-main {
            padding: 16px;
          }
          
          .history-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }
          
          .history-search {
            width: 100%;
          }
        }

        /* ===== APP INTERIOR - Light Theme ===== */
        .app-interior {
          min-height: 100vh;
          background: #f8fafc;
        }

        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .app-header-left {
          display: flex;
          align-items: center;
        }

        .app-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .app-logo-icon {
          width: 32px;
          height: 32px;
        }

        .app-logo-icon svg {
          width: 100%;
          height: 100%;
        }

        .app-logo span {
          font-family: 'Instrument Serif', serif;
          font-size: 18px;
          font-weight: 400;
          color: #1e293b;
        }

        .app-header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-status {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        .user-name-header {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .connection-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: #10b981;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .btn-header-logout {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-header-logout:hover {
          background: #fef2f2;
          border-color: #fecaca;
          color: #ef4444;
        }

        .btn-header-logout svg {
          width: 20px;
          height: 20px;
        }

        /* App Tabs */
        .app-tabs {
          display: flex;
          gap: 0;
          padding: 0 24px;
          background: #f1f5f9;
          border-bottom: 1px solid #e2e8f0;
        }

        .app-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 24px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .app-tab:hover {
          color: #475569;
          background: rgba(255,255,255,0.5);
        }

        .app-tab.active {
          background: white;
          color: #6366f1;
          border-bottom-color: #6366f1;
          border-radius: 8px 8px 0 0;
        }

        .app-tab svg {
          width: 18px;
          height: 18px;
        }

        /* App Content */
        .app-content {
          padding: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        /* Session Card */
        .session-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .session-card-header {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          padding: 24px;
          color: white;
        }

        .session-card-header h2 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .session-card-header p {
          font-size: 14px;
          opacity: 0.9;
        }

        .session-card-body {
          padding: 24px;
        }

        /* Field Group */
        .field-group {
          margin-bottom: 24px;
        }

        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }

        .patient-input-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .patient-input-wrapper:focus-within {
          border-color: #6366f1;
          background: white;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        .patient-input-wrapper svg {
          width: 20px;
          height: 20px;
          color: #94a3b8;
        }

        .patient-input-wrapper input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 15px;
          color: #1e293b;
          outline: none;
        }

        .patient-input-wrapper input::placeholder {
          color: #94a3b8;
        }

        /* Input Methods */
        .input-methods {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        .method-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 28px 20px;
          background: #f8fafc;
          border: 2px dashed #e2e8f0;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }

        .method-card:hover {
          border-color: #cbd5e1;
          background: #f1f5f9;
        }

        .method-card.recording {
          border-color: #ef4444;
          border-style: solid;
          background: #fef2f2;
        }

        .method-card input[type="file"] {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }

        .method-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .method-icon svg {
          width: 26px;
          height: 26px;
          color: #6366f1;
        }

        .method-card.recording .method-icon {
          background: #ef4444;
        }

        .method-card.recording .method-icon svg {
          color: white;
        }

        .recording-pulse {
          animation: recordPulse 1s infinite;
        }

        @keyframes recordPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .method-title {
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
        }

        .method-subtitle {
          font-size: 13px;
          color: #64748b;
        }

        /* Generate Button */
        .btn-generate-soap {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 24px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 14px rgba(99,102,241,0.3);
        }

        .btn-generate-soap:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99,102,241,0.4);
        }

        .btn-generate-soap:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-generate-soap svg {
          width: 20px;
          height: 20px;
        }

        .generate-spinner-light {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        /* Privacy Banner */
        .privacy-banner {
          display: flex;
          gap: 14px;
          margin-top: 24px;
          padding: 16px 20px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 12px;
        }

        .privacy-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fef3c7;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .privacy-icon svg {
          width: 20px;
          height: 20px;
          color: #d97706;
        }

        .privacy-text strong {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #b45309;
          margin-bottom: 4px;
        }

        .privacy-text p {
          font-size: 13px;
          color: #92400e;
          line-height: 1.5;
          margin: 0;
        }

        /* SOAP Results Card */
        .soap-results-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-top: 24px;
          overflow: hidden;
        }

        .soap-results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e2e8f0;
        }

        .soap-results-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
        }

        .soap-results-actions {
          display: flex;
          gap: 10px;
        }

        .btn-soap-action {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-soap-action:hover {
          background: #e2e8f0;
        }

        .btn-soap-action.primary {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          color: white;
        }

        .btn-soap-action.primary:hover {
          box-shadow: 0 4px 12px rgba(99,102,241,0.3);
        }

        .btn-soap-action svg {
          width: 16px;
          height: 16px;
        }

        .soap-results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: #e2e8f0;
        }

        .soap-result-item {
          background: white;
          padding: 20px;
        }

        .soap-result-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #475569;
        }

        .soap-result-item textarea {
          width: 100%;
          min-height: 100px;
          padding: 12px 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          color: #1e293b;
          line-height: 1.6;
          resize: vertical;
          transition: all 0.2s;
        }

        .soap-result-item textarea:focus {
          outline: none;
          border-color: #6366f1;
          background: white;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        /* Responsive for App Interior */
        @media (max-width: 640px) {
          .app-content {
            padding: 16px;
          }

          .input-methods {
            grid-template-columns: 1fr;
          }

          .soap-results-grid {
            grid-template-columns: 1fr;
          }

          .soap-results-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .app-tabs {
            padding: 0 16px;
          }

          .app-tab {
            padding: 14px 16px;
            font-size: 13px;
          }
        }
      `}</style>
      
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'login' && <LoginPage />}
      {currentView === 'signup' && <SignupPage />}
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'newNote' && <NewNoteView />}
      {currentView === 'viewNote' && <ViewNoteDetail />}
    </>
  );
}
