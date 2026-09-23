import { useEffect, useState } from "react";
import { ArrowRight, Heart, Sparkles, PartyPopper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      title: "Wedding",
      emoji: "💍",
      color: "pink",
      text: "Celebrate your forever"
    },
    {
      title: "Birthday",
      emoji: "🎂",
      color: "purple",
      text: "Make every birthday special"
    },
    {
      title: "Party",
      emoji: "🎉",
      color: "orange",
      text: "Let the celebration begin"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page">

      {/* Floating decorations */}

      <div className="floating-shape shape-one">✦</div>
      <div className="floating-shape shape-two">♡</div>
      <div className="floating-shape shape-three">✦</div>
      <div className="floating-shape shape-four">✿</div>
      <div className="floating-shape shape-five">♡</div>


      {/* Navbar */}

      <nav className="home-navbar">

        <div className="home-logo">
          Invito<span>.</span>
        </div>

        <div className="home-nav-links">
          <button onClick={() => navigate("/templates")}>
            Templates
          </button>

          <button onClick={() => navigate("/pricing")}>
            Pricing
          </button>

          <button onClick={() => navigate("/settings")}>
            Setting
          </button>

          
        </div>

        <button
          className="home-nav-button"
          onClick={() => navigate("/templates")}
        >
          Create Invitation
        </button>

      </nav>


      {/* Hero */}

      <section className="hero-section">

        <div className="hero-left">

          <div className="hero-badge">
            <Sparkles size={15} />
            Beautiful digital invitations
          </div>

          <h1>
            Invitations
            <br />

            <span>
              made to feel
            </span>

            <br />

            <strong>
              unforgettable.
            </strong>
          </h1>

          <p>
            Create beautiful invitations for weddings,
            birthdays, parties and every special moment.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() => navigate("/templates")}
            >
              Create Invitation
              <ArrowRight size={18} />
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("/templates")}
            >
              Explore Templates
            </button>

          </div>

          <div className="hero-small-text">
            <Heart size={15} />
            Create. Share. Celebrate.
          </div>

        </div>


        {/* Animated invitation */}

        <div className="hero-right">

          <div className="hero-glow"></div>

          <div className="confetti confetti-one">✦</div>
          <div className="confetti confetti-two">✿</div>
          <div className="confetti confetti-three">♡</div>
          <div className="confetti confetti-four">✦</div>


          <div
            className={`hero-invitation ${cards[activeCard].color}`}
          >

            <div className="invitation-top">
              {cards[activeCard].emoji}
            </div>

            <div className="invitation-line"></div>

            <p>
              YOU ARE INVITED
            </p>

            <h2>
              {cards[activeCard].title}
            </h2>

            <span>
              {cards[activeCard].text}
            </span>

            <div className="invitation-date">
              24 · 10 · 2026
            </div>

            <button>
              RSVP
            </button>

          </div>


          {/* Small floating cards */}

          <div className="mini-card mini-one">
            💐
          </div>

          <div className="mini-card mini-two">
            🎂
          </div>

          <div className="mini-card mini-three">
            🎉
          </div>

        </div>

      </section>


      {/* Categories */}

      <section className="category-section">

        <p className="section-label">
          CELEBRATE EVERY MOMENT
        </p>

        <h2>
          One invitation.
          <br />
          <span>Every kind of celebration.</span>
        </h2>

        <div className="category-grid">

          <div className="category-card wedding">
            <div className="category-icon">
              💍
            </div>

            <h3>
              Weddings
            </h3>

            <p>
              Elegant invitations for your
              beautiful beginning.
            </p>
          </div>


          <div className="category-card birthday">
            <div className="category-icon">
              🎂
            </div>

            <h3>
              Birthdays
            </h3>

            <p>
              Colorful invitations for
              unforgettable celebrations.
            </p>
          </div>


          <div className="category-card party">
            <div className="category-icon">
              🎉
            </div>

            <h3>
              Parties
            </h3>

            <p>
              Bring your guests together
              in style.
            </p>
          </div>


          <div className="category-card baby">
            <div className="category-icon">
              🧸
            </div>

            <h3>
              Baby Shower
            </h3>

            <p>
              Sweet invitations for
              precious moments.
            </p>
          </div>

        </div>

      </section>


      {/* How it works */}

      <section className="steps-section">

        <div className="steps-heading">

          <p className="section-label">
            SIMPLE & BEAUTIFUL
          </p>

          <h2>
            From idea to invitation
            <span> in minutes.</span>
          </h2>

        </div>


        <div className="steps-grid">

          <div className="step-card step-one">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              ✨
            </div>

            <h3>
              Choose a design
            </h3>

            <p>
              Pick a beautiful template
              that matches your celebration.
            </p>

          </div>


          <div className="step-card step-two">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              🎨
            </div>

            <h3>
              Make it yours
            </h3>

            <p>
              Add your event details,
              photos and personal message.
            </p>

          </div>


          <div className="step-card step-three">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              💌
            </div>

            <h3>
              Share & celebrate
            </h3>

            <p>
              Share your invitation and
              collect RSVPs from your guests.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="home-cta">

        <div className="cta-decoration">
          ✦
        </div>

        <PartyPopper size={42} />

        <h2>
          Your celebration
          <br />
          deserves a beautiful invitation.
        </h2>

        <p>
          Start creating something memorable today.
        </p>

        <button
          onClick={() => navigate("/templates")}
        >
          Create Your Invitation
          <ArrowRight size={18} />
        </button>

      </section>


      {/* Footer */}

      <footer className="home-footer">

        <div className="home-logo">
          Invito<span>.</span>
        </div>

        <p>
          Made for moments worth celebrating.
        </p>

      </footer>

    </div>
  );
}

export default Home;