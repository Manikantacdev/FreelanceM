import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

const highlightMetrics = [
  { label: 'Projects curated', value: '1,280+', tone: 'accent' },
  { label: 'Talent acceptance', value: '7%', tone: 'neutral' },
  { label: 'Average payout', value: '₹82K', tone: 'delight' },
];

const stories = [
  {
    title: 'Briefs that respect the craft',
    copy: 'Every project is hand-vetted by our team to ensure thoughtful scopes, fair budgets, and the right creative chemistry.',
  },
  {
    title: 'Clients who champion makers',
    copy: 'We work with studios, founders, and teams who value collaboration. No more ghosting, vague direction, or race-to-the-bottom bids.',
  },
  {
    title: 'Tools built for momentum',
    copy: 'From cinematic project rooms to intentional feedback loops, we designed FreelanceM to keep your flow state intact.',
  },
];

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('usertype');
    if (userType === 'freelancer') {
      navigate('/freelancer');
    } else if (userType === 'client') {
      navigate('/client');
    } else if (userType === 'admin') {
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <div className="landing page-shell">
      <header className="landing-header">
        <div className="brand-lockup" data-animate="fade">
          <span className="brand-glyph">FM</span>
          <span className="brand-wordmark">FreelanceM</span>
        </div>
        <div className="header-actions">
          <button className="ghost-button" type="button" onClick={() => navigate('/authenticate')}>
            Sign in
          </button>
        </div>
      </header>

      <section className="landing-hero panel-surface" data-animate="rise">
        <div className="hero-copy">
          <span className="eyebrow">The patron studio for independent talent</span>
          <h1>Where bold freelancers find briefs worth caring about.</h1>
          <p>
            FreelanceM curates meaningful collaborations between boundary-pushing makers and visionary teams.
            We lead with intention, honour the craft, and build partnerships that turn ambition into momentum.
          </p>
          <div className="hero-actions">
            <button type="button" onClick={() => navigate('/authenticate')}>
              Join the collective
            </button>
            <button
              className="ghost-button"
              type="button"
              onClick={() => navigate('/authenticate')}
            >
              Explore live briefs
            </button>
          </div>
        </div>

        <aside className="hero-visual" aria-hidden="true">
          <div className="visual-glow" />
          <div className="visual-grid">
            {highlightMetrics.map((metric) => (
              <div className={`visual-tile tone-${metric.tone}`} key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
          <div className="visual-marquee">Craft. Curate. Collaborate.</div>
        </aside>
      </section>

      <section className="landing-stories">
        <header>
          <span className="eyebrow">Why creatives choose us</span>
          <h2>Momentum begins with respectfully designed collaboration.</h2>
          <p>
            FreelanceM is a pulse of curated opportunities. We are intentional matchmakers, ensuring every
            engagement feels like it was designed for the humans behind the work.
          </p>
        </header>
        <div className="story-grid">
          {stories.map((story) => (
            <article className="story-card" key={story.title} data-animate="fade-up">
              <h3>{story.title}</h3>
              <p>{story.copy}</p>
              <div className="story-underline" />
            </article>
          ))}
        </div>
      </section>

      <section className="landing-cta panel-surface" data-animate="rise">
        <div>
          <span className="eyebrow">For founders & teams</span>
          <h2>Bring your next project to talent that listens, experiments, and delivers.</h2>
          <p>
            From product storytellers to technical visionaries, our roster is intentionally diverse and rigorously
            vetted. Post your brief and meet the crew who will champion it.
          </p>
        </div>
        <div className="cta-actions">
          <button type="button" onClick={() => navigate('/authenticate?mode=client')}>
            Start a commission
          </button>
          <button className="ghost-button" type="button" onClick={() => navigate('/authenticate')}>
            View partnership playbook
          </button>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <span className="brand-glyph">FM</span>
          <p>© {new Date().getFullYear()} FreelanceM. Crafted with intention by <strong>Manikanta</strong></p>
        </div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;