import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/paymentSuccessPage.css"

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
    const sessionId = searchParams.get("session_id");
    const roomId = searchParams.get("room_id")
    const [visible, setVisible] = useState(false);
    console.log({ sessionId });
    console.log({roomId});
    
    

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>

      <div className="gm-success-page">
        <div className={`gm-card ${visible ? "visible" : ""}`}>

          <div className="gm-icon-wrap">
            <svg className="gm-checkmark" viewBox="0 0 28 28">
              <polyline points="5,14 11,20 23,8" />
            </svg>
          </div>

          <p className="gm-eyebrow">Reservation Confirmed</p>

          <h1 className="gm-title">
            Your stay at<br /><em>Grand Maison</em><br />awaits you.
          </h1>

          <div className="gm-divider" />

          <p className="gm-subtitle">
            Thank you for your reservation. A confirmation has been sent<br />
            to your email with all the details of your stay.
          </p>

          {sessionId && (
            <p className="gm-session">Session · {sessionId.slice(0, 24)}…</p>
          )}

          <div>
            <button className="gm-btn-primary" onClick={() => navigate(`/booking/cart`)}>
              View My Bookings
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