import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/20 bg-gradient-to-b from-background via-background/90 to-secondary/60 footer-orbit">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-[20%] w-72 h-72 bg-accent/15 blur-3xl animate-blob" />
        <div className="absolute bottom-[-18%] left-[10%] w-64 h-64 bg-primary/12 blur-[120px] animate-blob" style={{ animationDelay: '12s' }} />
        <div className="absolute top-1/3 -right-24 w-56 h-56 bg-white/20 blur-2xl animate-float-medium" />
      </div>

      <div className="container-wide mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 relative z-10 space-y-20">
        {/* CTA Panel */}
        <div className="panel-glass rounded-[36px] overflow-hidden grid lg:grid-cols-[1.2fr_0.8fr] gap-0" data-reveal>
          <div className="p-10 md:p-14 space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Stay In Motion</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-balance">
              Ready to design your next career chapter with immersive AI guidance?
            </h2>
            <p className="text-foreground/65 max-w-xl">
              Join thousands of learners using TarkAI to script their paths with cinematic storytelling, mentor insight,
              and data-rich decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/signup" className="glow-ring rounded-full">
                <Button size="lg" className="rounded-full px-8 shine-on-hover">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/programs" className="group">
                <Button variant="outline" size="lg" className="rounded-full border-white/60 group-hover:border-accent/70">
                  Explore Programs
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" />
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Students collaborating in an immersive learning studio"
              className="h-full w-full object-cover animate-float-slow"
              loading="lazy"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12" data-reveal>
          {/* Brand */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/Logo.png"
                alt="TarkAI Logo"
                className="w-auto h-28 hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-foreground/65 max-w-sm" style={{ fontFamily: 'Instrument Serif, serif' }}>
              Where intelligence choreographs every learning moment.
            </p>
            <p className="text-sm text-foreground/50 uppercase tracking-[0.3em]">TARK AI EdTech Private Limited</p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-widest text-foreground/40 mb-6">Navigation</p>
            <ul className="space-y-4">
              {['Programs', 'AI Career Guider', 'Team', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-300 link-underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-4 space-y-6">
            <p className="text-xs uppercase tracking-widest text-foreground/40">Legal</p>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy" className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-300 link-underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-300 link-underline">
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-4 pt-2">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-white/40 animate-float-medium">
                <img
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80"
                  alt="AI mentor"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">Concierge Team</p>
                <p className="text-sm text-foreground/70">tarkaiedtech@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-white/20" data-reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-foreground/50">
            <p>© 2026 TARK AI EdTech Private Limited</p>
            <p className="max-w-md md:text-right">
              AI recommendations are guidance-based and should be used as decision support, not absolute advice.
            </p>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
