import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .gm-cancel-page {
          min-height: 100vh;
          background-color: #0e0a0a;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(160,60,60,0.1) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(192,155,83,0.04) 0%, transparent 60%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Jost', sans-serif;
          padding: 2rem 1rem;
        }

        .gm-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(160,80,80,0.2);
          border-radius: 2px;
          max-width: 560px;
          width: 100%;
          padding: 3.5rem 3rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .gm-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .gm-card::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 120px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(160,80,80,0.6), transparent);
        }

        .gm-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 120px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(192,155,83,0.3), transparent);
        }

        .gm-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 1px solid rgba(160,80,80,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          position: relative;
        }

        .gm-icon-wrap::before {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(160,80,80,0.1);
        }

        .gm-x-line {
          stroke: #c05050;
          stroke-width: 2;
          fill: none;
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          transition: stroke-dashoffset 0.6s ease;
        }

        .gm-x-line:nth-child(2) {
          transition-delay: 0.15s;
        }

        .visible .gm-x-line {
          stroke-dashoffset: 0;
        }

        .gm-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c05050;
          margin-bottom: 1rem;
        }

        .gm-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.6rem;
          font-weight: 300;
          color: #f0e8e8;
          line-height: 1.15;
          margin-bottom: 1rem;
        }

        .gm-title em {
          font-style: italic;
          color: #c09b53;
        }

        .gm-subtitle {
          font-size: 0.875rem;
          font-weight: 300;
          color: rgba(240,232,232,0.45);
          line-height: 1.7;
          margin-bottom: 2.5rem;
          letter-spacing: 0.02em;
        }

        .gm-divider {
          width: 40px;
          height: 1px;
          background: rgba(160,80,80,0.25);
          margin: 0 auto 2.5rem;
        }

        .gm-notice {
          background: rgba(160,80,80,0.07);
          border: 1px solid rgba(160,80,80,0.15);
          border-radius: 2px;
          padding: 1rem 1.25rem;
          margin-bottom: 2.5rem;
          font-size: 0.78rem;
          color: rgba(240,220,220,0.5);
          letter-spacing: 0.03em;
          line-height: 1.6;
        }

        .gm-btn-primary {
          display: inline-block;
          background: transparent;
          border: 1px solid #c09b53;
          color: #c09b53;
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.875rem 2.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          margin: 0 0.5rem 0.75rem;
        }

        .gm-btn-primary:hover {
          background: #c09b53;
          color: #0e0a0a;
        }

        .gm-btn-ghost {
          display: inline-block;
          background: transparent;
          border: 1px solid rgba(240,232,232,0.12);
          color: rgba(240,232,232,0.35);
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.875rem 2.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          margin: 0 0.5rem 0.75rem;
        }

        .gm-btn-ghost:hover {
          border-color: rgba(240,232,232,0.3);
          color: rgba(240,232,232,0.65);
        }

        .gm-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(192,155,83,0.35);
          margin-top: 3rem;
        }
      `}</style>

      <div className="gm-cancel-page">
        <div className={`gm-card ${visible ? "visible" : ""}`}>

          <div className="gm-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <line className="gm-x-line" x1="7" y1="7" x2="21" y2="21" />
              <line className="gm-x-line" x1="21" y1="7" x2="7" y2="21" />
            </svg>
          </div>

          <p className="gm-eyebrow">Payment Cancelled</p>

          <h1 className="gm-title">
            Your reservation<br />was <em>not</em> completed.
          </h1>

          <div className="gm-divider" />

          <p className="gm-subtitle">
            No charge has been made to your account.<br />
            Your selected room is still available — return anytime to complete your booking.
          </p>

          <div className="gm-notice">
            If you experienced a technical issue during checkout, please try again or contact our concierge for assistance.
          </div>

          <div>
            <button className="gm-btn-primary" onClick={() => navigate("/booking")}>
              Try Again
            </button>
            <button className="gm-btn-ghost" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>

          <p className="gm-brand">Grand Maison</p>
        </div>
      </div>
    </>
  );
}