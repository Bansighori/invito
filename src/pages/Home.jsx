
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Heart,
  Menu,
  MessageCircle,
  Palette,
  Send,
  Sparkles,
  Star,
  Users,
  X,
  CalendarDays,
  Download,
  ShieldCheck,
  Gift,
} from "lucide-react";
import SupportChatButton from "../components/SupportChatButton";
import "./Home.css";

const celebrations = [
  {
    name: "Weddings",
    icon: "💍",
    description: "Elegant designs for your forever story.",
    className: "wedding",
    count: "01",
  },
  {
    name: "Birthdays",
    icon: "🎂",
    description: "Make their special day unforgettable.",
    className: "birthday",
    count: "02",
  },
  {
    name: "Engagements",
    icon: "💐",
    description: "Celebrate the beginning of forever.",
    className: "engagement",
    count: "03",
  },
  {
    name: "Baby Showers",
    icon: "🧸",
    description: "Sweet invites for your little miracle.",
    className: "baby",
    count: "04",
  },
  {
    name: "Parties",
    icon: "🎉",
    description: "Bring everyone together in style.",
    className: "party",
    count: "05",
  },
  {
    name: "Anniversaries",
    icon: "🥂",
    description: "Celebrate every chapter of your love.",
    className: "anniversary",
    count: "06",
  },
];

const previewCards = [
  {
    category: "WEDDING INVITATION",
    title: "The Wedding",
    names: "Olivia & James",
    date: "SATURDAY · OCTOBER 24",
    emoji: "✿",
    theme: "preview-rose",
  },
  {
    category: "BIRTHDAY CELEBRATION",
    title: "Birthday Party",
    names: "A Day for Maya",
    date: "SUNDAY · NOVEMBER 08",
    emoji: "✦",
    theme: "preview-lilac",
  },
  {
    category: "SPECIAL CELEBRATION",
    title: "You're Invited",
    names: "Let's Celebrate",
    date: "FRIDAY · NOVEMBER 20",
    emoji: "❋",
    theme: "preview-peach",
  },
];

const faqs = [
  {
    question: "What is Invito?",
    answer:
      "Invito is a digital invitation platform where you can explore designs, personalize event invitations, and share them with your guests.",
  },
  {
    question: "How do I create an invitation?",
    answer:
      "Explore the available templates, choose a design, and use the invitation editor to add your event details and customize the invitation.",
  },
  {
    question: "Can guests respond to my invitation?",
    answer:
      "Invito supports RSVP-oriented invitations. Available response options depend on the invitation features enabled in your project.",
  },
  {
    question: "Can I share my invitation digitally?",
    answer:
      "Your invitation can be shared using the sharing options supported by your selected template and the features available in your account.",
  },
  {
    question: "Where can I find pricing information?",
    answer:
      "Visit the Pricing page to explore the plans currently available on Invito.",
  },
];

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
  Boolean(localStorage.getItem("invitoToken"))
);

  const [activePreview, setActivePreview] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePreview((previous) => (previous + 1) % previewCards.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const goToTemplates = () => {
    setMobileMenu(false);
    navigate("/templates");
  };

  const goToPricing = () => {
    setMobileMenu(false);
    navigate("/pricing");
  };

  const currentPreview = previewCards[activePreview];

  return (
    <main className="home-page">
      <SupportChatButton />

      {/* Navigation */}
      <header className="home-header">
        <nav className="home-navbar">
          <button
            className="home-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Invito home"
          >
            <span className="logo-mark">
              <Heart size={19} fill="currentColor" />
            </span>
            invito<span className="logo-dot">.</span>
          </button>

          <div className={`home-nav-links ${mobileMenu ? "menu-open" : ""}`}>
            <button onClick={() => navigate("/home")}>Home</button>
            <button onClick={goToTemplates}>Explore templates</button>
            <button onClick={goToPricing}>Pricing</button>
            <button onClick={() => navigate("/settings")}>Settings</button>

            <button
  className="mobile-create-button"
  onClick={() => {
    setMobileMenu(false);
    navigate(
      localStorage.getItem("invitoToken")
        ? "/dashboard"
        : "/login"
    );
  }}
>
  {localStorage.getItem("invitoToken")
    ? "Go to Dashboard"
    : "Log In"}
  <ArrowRight size={16} />
</button>
          </div>

          {isLoggedIn ? (
  <button
    className="home-nav-cta"
    onClick={() => navigate("/dashboard")}
  >
    Go to Dashboard <ArrowUpRight size={17} />
  </button>
) : (
  <button
    className="home-nav-cta"
    onClick={() => navigate("/login")}
  >
    Log In <ArrowRight size={17} />
  </button>
)}

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenu((open) => !open)}
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="home-hero">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="hero-copy">
          <div className="hero-eyebrow">
            <Sparkles size={15} />
            <span>YOUR MOMENTS, BEAUTIFULLY INVITED</span>
          </div>

          <h1>
            Every great moment
            <br />
            deserves an <em>invitation.</em>
          </h1>

          <p className="hero-description">
            Turn life's special moments into something beautiful.
            Create thoughtful digital invitations that feel like you,
            and bring your favorite people together.
          </p>

          <div className="hero-actions">
            <button className="button-primary" onClick={goToTemplates}>
              Create your invitation <ArrowRight size={18} />
            </button>

            <button
              className="button-text"
              onClick={() =>
                document.getElementById("celebrations")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Find your occasion <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="hero-trust">
            <div className="trust-avatars" aria-hidden="true">
              <span>💐</span>
              <span>💍</span>
              <span>🎂</span>
            </div>
            <div>
              <strong>Made for meaningful moments</strong>
              <p>From intimate gatherings to grand celebrations.</p>
            </div>
          </div>

          <div className="hero-mini-features">
            <span><CheckCircle2 size={15} /> Personalize your design</span>
            <span><CheckCircle2 size={15} /> Share with your guests</span>
          </div>
        </div>

        {/* Animated invitation preview */}
        <div className="hero-art">
          <div className="art-caption caption-top">
            <Sparkles size={15} />
            A little invitation magic
          </div>

          <div className="art-ring art-ring-one" />
          <div className="art-ring art-ring-two" />

          <div className={`hero-invite-card ${currentPreview.theme}`} key={currentPreview.title}>
            <div className="invite-card-top">
              <span>INVITO</span>
              <span className="invite-top-flower">{currentPreview.emoji}</span>
            </div>

            <div className="invite-card-flourish">✳</div>

            <p className="invite-kicker">{currentPreview.category}</p>
            <h2>{currentPreview.title}</h2>
            <div className="invite-divider"><span>♥</span></div>

            <p className="invite-names">{currentPreview.names}</p>
            <p className="invite-description">
              A special day, a beautiful memory,
              and the people who make it meaningful.
            </p>

            <div className="invite-date">
              <CalendarDays size={14} />
              {currentPreview.date}
            </div>

            <div className="invite-card-footer">
              <span>WITH LOVE</span>
              <span>♡</span>
            </div>
          </div>

          <div className="floating-note note-left">
            <span className="note-icon"><Palette size={17} /></span>
            <span><strong>Your style</strong><small>Your personal touch</small></span>
          </div>

          <div className="floating-note note-right">
            <span className="note-icon note-icon-green"><Check size={17} /></span>
            <span><strong>Made with love</strong><small>Ready to personalize</small></span>
          </div>

          <div className="art-sparkle sparkle-one">✦</div>
          <div className="art-sparkle sparkle-two">✿</div>
          <div className="art-sparkle sparkle-three">♡</div>

          <div className="preview-controls" aria-label="Invitation previews">
            {previewCards.map((card, index) => (
              <button
                key={card.title}
                className={activePreview === index ? "active" : ""}
                onClick={() => setActivePreview(index)}
                aria-label={`Show ${card.title} preview`}
                aria-pressed={activePreview === index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="home-value-strip">
        <div>
          <Sparkles size={20} />
          <span>Thoughtful designs</span>
        </div>
        <div>
          <Palette size={20} />
          <span>Made personal</span>
        </div>
        <div>
          <Send size={20} />
          <span>Easy to share</span>
        </div>
        <div>
          <Heart size={20} />
          <span>Moments that matter</span>
        </div>
      </section>

      {/* Celebrations */}
      <section className="home-section celebration-section" id="celebrations">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">A REASON TO CELEBRATE</p>
            <h2>
              What are we
              <br />
              <em>celebrating today?</em>
            </h2>
          </div>

          <button className="section-link" onClick={goToTemplates}>
            Explore all designs <ArrowRight size={17} />
          </button>
        </div>

        <div className="celebration-grid">
          {celebrations.map((item) => (
            <button
              className={`celebration-card ${item.className}`}
              key={item.name}
              onClick={goToTemplates}
            >
              <span className="celebration-number">{item.count}</span>
              <span className="celebration-emoji">{item.icon}</span>
              <span className="celebration-card-title">{item.name}</span>
              <span className="celebration-description">{item.description}</span>
              <span className="celebration-arrow"><ArrowUpRight size={19} /></span>
            </button>
          ))}
        </div>
      </section>

      {/* Template showcase */}
      <section className="home-section templates-section" id="templates">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">DESIGNS TO FALL IN LOVE WITH</p>
            <h2>
              A little inspiration.
              <br />
              <em>A lot of personality.</em>
            </h2>
          </div>
          <p className="heading-description">
            From timeless elegance to joyful color, find a look
            that feels just right for your celebration.
          </p>
        </div>

        <div className="showcase-grid">
          <button className="showcase-card showcase-large" onClick={goToTemplates}>
            <div className="showcase-art showcase-art-wedding">
              <span className="showcase-label">TIMELESS ROMANCE</span>
              <div className="showcase-paper">
                <span className="paper-flower">❀</span>
                <small>TOGETHER WITH THEIR FAMILIES</small>
                <h3>Olivia <i>&</i> James</h3>
                <span className="paper-line" />
                <p>REQUEST THE PLEASURE<br />OF YOUR COMPANY</p>
                <strong>OCTOBER 24, 2026</strong>
              </div>
              <span className="showcase-index">01 / WEDDING</span>
            </div>
            <div className="showcase-card-footer">
              <span><strong>The Romantic Edit</strong><small>Elegant · Classic · Personal</small></span>
              <span className="showcase-arrow"><ArrowUpRight size={19} /></span>
            </div>
          </button>

          <button className="showcase-card" onClick={goToTemplates}>
            <div className="showcase-art showcase-art-birthday">
              <span className="showcase-label">A LITTLE MORE JOY</span>
              <div className="birthday-paper">
                <span>✳</span>
                <small>LET'S CELEBRATE</small>
                <h3>It's My<br /><i>Birthday!</i></h3>
                <p>Good friends. Great cake.<br />Unforgettable memories.</p>
                <span className="birthday-stars">✦ ✧ ✦</span>
              </div>
              <span className="showcase-index">02 / BIRTHDAY</span>
            </div>
            <div className="showcase-card-footer">
              <span><strong>The Happy Edit</strong><small>Playful · Bright · Fun</small></span>
              <span className="showcase-arrow"><ArrowUpRight size={19} /></span>
            </div>
          </button>

          <button className="showcase-card" onClick={goToTemplates}>
            <div className="showcase-art showcase-art-minimal">
              <span className="showcase-label">LESS, BUT LOVELIER</span>
              <div className="minimal-paper">
                <span>— A SPECIAL INVITATION —</span>
                <h3>Save<br />the <i>Date</i></h3>
                <div className="minimal-flower">✾</div>
                <p>AN OCCASION TO REMEMBER</p>
              </div>
              <span className="showcase-index">03 / MINIMAL</span>
            </div>
            <div className="showcase-card-footer">
              <span><strong>The Minimal Edit</strong><small>Modern · Clean · Refined</small></span>
              <span className="showcase-arrow"><ArrowUpRight size={19} /></span>
            </div>
          </button>
        </div>

        <div className="showcase-bottom">
          <span><Star size={16} fill="currentColor" /> Your occasion, your aesthetic, your story.</span>
          <button className="button-primary" onClick={goToTemplates}>
            Discover templates <ArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="features-inner">
          <div className="features-intro">
            <p className="section-eyebrow">MORE THAN A PRETTY CARD</p>
            <h2>
              Everything you need
              <br />
              to bring people <em>together.</em>
            </h2>
            <p>
              Planning a celebration should feel exciting, not overwhelming.
              Invito helps you create an invitation experience from the
              first idea to the final RSVP.
            </p>
            <button className="button-primary" onClick={goToTemplates}>
              Make it yours <ArrowRight size={18} />
            </button>
          </div>

          <div className="feature-list">
            <article className="feature-item">
              <span className="feature-icon feature-pink"><Palette size={23} /></span>
              <div>
                <h3>Personalize every detail</h3>
                <p>Make the invitation your own with your event details and design choices.</p>
              </div>
              <ArrowUpRight size={19} className="feature-arrow" />
            </article>

            <article className="feature-item">
              <span className="feature-icon feature-purple"><Send size={23} /></span>
              <div>
                <h3>Share the excitement</h3>
                <p>Send your invitation digitally using the sharing options available to you.</p>
              </div>
              <ArrowUpRight size={19} className="feature-arrow" />
            </article>

            <article className="feature-item">
              <span className="feature-icon feature-green"><Users size={23} /></span>
              <div>
                <h3>Keep track of RSVPs</h3>
                <p>Manage guest responses through the RSVP features available for your invitation.</p>
              </div>
              <ArrowUpRight size={19} className="feature-arrow" />
            </article>

            <article className="feature-item">
              <span className="feature-icon feature-peach"><Download size={23} /></span>
              <div>
                <h3>Keep your memories close</h3>
                <p>Use the export or download options supported by your invitation design.</p>
              </div>
              <ArrowUpRight size={19} className="feature-arrow" />
            </article>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="home-section process-section">
        <div className="process-heading">
          <p className="section-eyebrow">THREE SIMPLE STEPS</p>
          <h2>
            Less planning stress.
            <br />
            <em>More celebrating.</em>
          </h2>
          <p>Creating something beautiful doesn't have to be complicated.</p>
        </div>

        <div className="process-grid">
          <article className="process-card">
            <div className="process-top"><span>01</span><Palette size={23} /></div>
            <div className="process-illustration illustration-one">✿</div>
            <h3>Choose your favorite</h3>
            <p>Explore designs and find the perfect starting point for your occasion.</p>
          </article>

          <article className="process-card">
            <div className="process-top"><span>02</span><Sparkles size={23} /></div>
            <div className="process-illustration illustration-two">✎</div>
            <h3>Add your personal touch</h3>
            <p>Enter your event information and customize your invitation.</p>
          </article>

          <article className="process-card">
            <div className="process-top"><span>03</span><Send size={23} /></div>
            <div className="process-illustration illustration-three">♡</div>
            <h3>Invite your people</h3>
            <p>Share your invitation and look forward to the moments ahead.</p>
          </article>
        </div>
      </section>

      {/* Personal touch banner */}
      <section className="personal-banner">
        <div className="personal-banner-decoration">✳</div>
        <div className="personal-banner-copy">
          <p className="section-eyebrow">IT STARTS WITH A FEELING</p>
          <h2>
            The little details
            <br />
            make the <em>biggest memories.</em>
          </h2>
          <p>
            Your people. Your story. Your celebration.
            Create an invitation that feels like the beginning
            of something wonderful.
          </p>
          <button className="button-light" onClick={goToTemplates}>
            Create something beautiful <ArrowRight size={18} />
          </button>
        </div>
        <div className="personal-stamp">
          <Heart size={27} fill="currentColor" />
          <span>MADE WITH</span>
          <strong>LOVE</strong>
          <span>BY INVITO</span>
        </div>
      </section>

      {/* FAQ */}
      <section className="home-section faq-section">
        <div className="faq-intro">
          <p className="section-eyebrow">GOOD TO KNOW</p>
          <h2>
            A few things
            <br />
            <em>you might wonder.</em>
          </h2>
          <p>Have another question? Our support team is here to help.</p>
          <div className="faq-support">
            <MessageCircle size={20} />
            <span>Need a hand?<strong>Talk to Invito Support</strong></span>
          </div>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <article className={`faq-item ${openFaq === index ? "faq-open" : ""}`} key={faq.question}>
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                aria-expanded={openFaq === index}
              >
                <span>{faq.question}</span>
                <ChevronDown size={20} />
              </button>
              {openFaq === index && (
                <p className="faq-answer">{faq.answer}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="final-cta-stars">✦　✧　✦</div>
        <span className="final-cta-icon"><Gift size={24} /></span>
        <p className="section-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h2>
          Make the invite.
          <br />
          <em>Make the memory.</em>
        </h2>
        <p className="final-cta-description">
          Give your next celebration the beautiful beginning it deserves.
        </p>
        <button className="button-primary" onClick={goToTemplates}>
          Let's create your invitation <ArrowRight size={18} />
        </button>
        <span className="final-cta-footnote">
          <Heart size={13} fill="currentColor" /> Created for the moments that matter
        </span>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <button className="home-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <span className="logo-mark"><Heart size={18} fill="currentColor" /></span>
              invito<span className="logo-dot">.</span>
            </button>
            <p>Beautiful invitations for life's most meaningful moments.</p>
          </div>

          <div className="footer-links">
            <div>
              <strong>EXPLORE</strong>
              <button onClick={goToTemplates}>Templates</button>
              <button onClick={goToPricing}>Pricing</button>
            </div>
            <div>
              <strong>YOUR ACCOUNT</strong>
              <button onClick={() => navigate("/settings")}>Settings</button>
              <button onClick={() => navigate("/support")}>Support</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Invito. Made for moments worth celebrating.</span>
          <span><ShieldCheck size={15} /> Your celebration, your way.</span>
        </div>
      </footer>
    </main>
  );
}

export default Home;
