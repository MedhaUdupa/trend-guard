import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Custom cursor
    const cursor = document.getElementById("cursor");
    const cursorRing = document.getElementById("cursor-ring");

    document.addEventListener("mousemove", (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }
      if (cursorRing) {
        cursorRing.style.left = e.clientX + "px";
        cursorRing.style.top = e.clientY + "px";
      }
    });
  }, []);

  return (
    <div style={{ background: "var(--ink)", color: "var(--text)", fontFamily: "var(--body)", overflowX: "hidden" }}>
      {/* Nav */}
      <nav style={navStyle}>
        <a href="/" style={navLogoStyle}>
          <div style={navLogoMarkStyle}>⬡</div>
          <span style={navLogoTextStyle}>TrendGuard</span>
        </a>
        <div style={navLinksStyle}>
          <a href="#features" style={navLinkStyle}>Features</a>
          <a href="#pipeline" style={navLinkStyle}>Pipeline</a>
          <a href="#stack" style={navLinkStyle}>Stack</a>
        </div>
        <div style={navActionsStyle}>
          <div style={badgeLiveStyle}>
            <div style={liveDotStyle}></div>
            LIVE DATA
          </div>
          <button onClick={() => navigate("/dashboard")} style={btnLaunchStyle}>
            Launch App
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={heroStyle}>
        <div style={heroEyebrowStyle}>
          <div style={heroEyebrowDotStyle}></div>
          Social Media Intelligence · Data Integrity Platform
        </div>

        <h1 style={heroTitleStyle}>
          <span style={heroTitleLine1Style}>Guard the Signal.</span>
          <span style={heroTitleLine2Style}>Kill the Noise.</span>
        </h1>

        <p style={heroSubStyle}>
          Real-time detection of coordinated bot activity, inorganic trends, and misinformation campaigns — backed by automated data validation and CI/CD integrity checks.
        </p>

        <div style={heroActionsStyle}>
          <button onClick={() => navigate("/dashboard")} style={btnPrimaryHeroStyle}>
            Open Dashboard
            <svg className="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <a href="#features" style={btnSecondaryHeroStyle}>See how it works</a>
        </div>

        <div style={heroStatsStyle}>
          <div style={statItemStyle}>
            <div style={statNumStyle}>2,847</div>
            <div style={statLabelStyle}>Trends tracked</div>
          </div>
          <div style={statItemStyle}>
            <div style={{ ...statNumStyle, color: "var(--rose)" }}>312</div>
            <div style={statLabelStyle}>Flagged inorganic</div>
          </div>
          <div style={statItemStyle}>
            <div style={{ ...statNumStyle, color: "var(--teal)" }}>94.7%</div>
            <div style={statLabelStyle}>Detection accuracy</div>
          </div>
          <div style={statItemStyle}>
            <div style={{ ...statNumStyle, color: "var(--amber)" }}>1.2M</div>
            <div style={statLabelStyle}>Posts validated</div>
          </div>
        </div>
      </section>

      {/* Simple CTA at bottom */}
      <section style={ctaSectionStyle}>
        <div style={ctaBoxStyle}>
          <h2 style={ctaTitleStyle}>Ready to clean the signal?</h2>
          <p style={ctaSubStyle}>Launch the dashboard to start monitoring trends and detecting coordinated bot activity.</p>
          <button onClick={() => navigate("/dashboard")} style={btnPrimaryHeroStyle}>
            Open Dashboard
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={footerStyle}>
        <div>© 2024 TrendGuard. Social Media Integrity Platform.</div>
        <div>
          <a href="https://github.com/MedhaUdupa/trend-guard" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>GitHub</a>
        </div>
      </footer>
    </div>
  );
}

// Styles
const navStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  padding: "20px 40px",
  display: "flex",
  alignItems: "center",
  gap: "32px",
  background: "rgba(5,6,10,0.6)",
  backdropFilter: "blur(20px)",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const navLogoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textDecoration: "none",
  flexShrink: 0,
};

const navLogoMarkStyle = {
  width: "34px",
  height: "34px",
  background: "var(--indigo)",
  borderRadius: "9px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
};

const navLogoTextStyle = {
  fontFamily: "var(--display)",
  fontSize: "18px",
  fontWeight: 600,
  color: "var(--text)",
  letterSpacing: "-0.3px",
};

const navLinksStyle = {
  display: "flex",
  gap: "6px",
  flex: 1,
  justifyContent: "center",
};

const navLinkStyle = {
  padding: "7px 16px",
  fontSize: "14px",
  color: "var(--muted2)",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: 500,
  transition: "color 0.15s, background 0.15s",
};

const navActionsStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const badgeLiveStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "5px 12px",
  background: "rgba(29,229,180,0.08)",
  border: "1px solid rgba(29,229,180,0.2)",
  borderRadius: "20px",
  fontSize: "11px",
  fontFamily: "var(--mono)",
  color: "var(--teal)",
};

const liveDotStyle = {
  width: "6px",
  height: "6px",
  background: "var(--teal)",
  borderRadius: "50%",
};

const btnLaunchStyle = {
  padding: "9px 22px",
  background: "var(--indigo)",
  color: "white",
  border: "none",
  borderRadius: "9px",
  fontFamily: "var(--body)",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  transition: "background 0.15s, transform 0.12s",
};

const heroStyle = {
  position: "relative",
  zIndex: 1,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "100px 40px 80px",
};

const heroEyebrowStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "7px 16px",
  border: "1px solid rgba(255,255,255,0.11)",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.03)",
  fontFamily: "var(--mono)",
  fontSize: "11px",
  color: "var(--muted2)",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom: "32px",
};

const heroEyebrowDotStyle = {
  width: "5px",
  height: "5px",
  background: "var(--indigo2)",
  borderRadius: "50%",
};

const heroTitleStyle = {
  fontFamily: "var(--display)",
  fontSize: "clamp(52px, 8vw, 100px)",
  fontWeight: 700,
  lineHeight: 0.95,
  letterSpacing: "-3px",
  marginBottom: "28px",
  maxWidth: "900px",
};

const heroTitleLine1Style = {
  display: "block",
  color: "var(--text)",
};

const heroTitleLine2Style = {
  display: "block",
  background: "linear-gradient(135deg, var(--indigo2) 0%, var(--teal) 60%, var(--amber) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const heroSubStyle = {
  fontSize: "18px",
  color: "var(--muted2)",
  maxWidth: "540px",
  lineHeight: 1.65,
  marginBottom: "48px",
  fontWeight: 400,
};

const heroActionsStyle = {
  display: "flex",
  gap: "14px",
  alignItems: "center",
  marginBottom: "80px",
};

const btnPrimaryHeroStyle = {
  padding: "14px 32px",
  background: "var(--indigo)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontFamily: "var(--body)",
  fontSize: "16px",
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "9px",
  transition: "all 0.2s",
  boxShadow: "0 0 40px rgba(79,95,240,0.3)",
};

const btnSecondaryHeroStyle = {
  padding: "14px 28px",
  background: "transparent",
  color: "var(--muted2)",
  border: "1px solid rgba(255,255,255,0.11)",
  borderRadius: "12px",
  fontFamily: "var(--body)",
  fontSize: "16px",
  fontWeight: 500,
  cursor: "pointer",
  textDecoration: "none",
  transition: "all 0.2s",
};

const heroStatsStyle = {
  display: "flex",
  gap: "1px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "16px",
  overflow: "hidden",
};

const statItemStyle = {
  padding: "20px 36px",
  background: "var(--ink2)",
  textAlign: "left",
  position: "relative",
};

const statNumStyle = {
  fontFamily: "var(--display)",
  fontSize: "28px",
  fontWeight: 700,
  letterSpacing: "-1px",
  color: "var(--text)",
  marginBottom: "3px",
};

const statLabelStyle = {
  fontSize: "12px",
  color: "var(--muted)",
  fontFamily: "var(--mono)",
  whiteSpace: "nowrap",
};

const ctaSectionStyle = {
  position: "relative",
  zIndex: 1,
  padding: "80px 40px 120px",
  textAlign: "center",
};

const ctaBoxStyle = {
  maxWidth: "700px",
  margin: "0 auto",
  background: "var(--ink2)",
  border: "1px solid rgba(255,255,255,0.11)",
  borderRadius: "28px",
  padding: "70px 60px",
  position: "relative",
  overflow: "hidden",
};

const ctaTitleStyle = {
  fontFamily: "var(--display)",
  fontSize: "clamp(30px, 4vw, 46px)",
  fontWeight: 700,
  letterSpacing: "-1.5px",
  color: "var(--text)",
  marginBottom: "16px",
  lineHeight: 1.05,
};

const ctaSubStyle = {
  fontSize: "16px",
  color: "var(--muted2)",
  marginBottom: "40px",
  lineHeight: 1.6,
};

const footerStyle = {
  position: "relative",
  zIndex: 1,
  borderTop: "1px solid rgba(255,255,255,0.06)",
  padding: "28px 40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "12px",
  color: "var(--muted)",
  fontFamily: "var(--mono)",
};
