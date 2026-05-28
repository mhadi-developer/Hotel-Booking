export const bookingStatusEmail = (name, status, roomName) => {
  const messages = {
    PENDING: "Your booking is pending wait for confirmation.",
    CONFIRMED: "Great news! Your booking is confirmed.",
    CANCELLED: "Your booking has been cancelled.",
  };

    return `
<div
  style="
    max-width: 650px;
    margin: 0 auto;
    background: #111111;
    border-radius: 18px;
    overflow: hidden;
    font-family: Arial, sans-serif;
    color: #f5f5f5;
    border: 1px solid #2a2a2a;
  "
>

  <div
    style="
      background: linear-gradient(135deg, #c8a96b, #9f7a3f);
      padding: 40px 30px;
      text-align: center;
    "
  >
    <h1
      style="
        margin: 0;
        font-size: 32px;
        color: #111;
        letter-spacing: 1px;
      "
    >
      Grand Maison Hotel
    </h1>

    <p
      style="
        margin-top: 10px;
        color: #222;
        font-size: 15px;
      "
    >
      Luxury Experience & Premium Hospitality
    </p>
  </div>

  <div style="padding: 40px 32px;">

    <h2
      style="
        margin-top: 0;
        font-size: 28px;
        color: #ffffff;
      "
    >
      Hello ${name} 👋
    </h2>

    <p
      style="
        font-size: 16px;
        line-height: 1.8;
        color: #cfcfcf;
      "
    >
      We would like to inform you about the latest update regarding your hotel reservation.
    </p>

    <div
      style="
        background: #181818;
        border: 1px solid #2f2f2f;
        border-radius: 14px;
        padding: 24px;
        margin-top: 30px;
      "
    >

      <p
        style="
          margin: 0 0 14px 0;
          font-size: 16px;
          color: #f1f1f1;
        "
      >
        🛏️ <strong>Room:</strong> ${roomName}
      </p>

      <p
        style="
          margin: 0 0 14px 0;
          font-size: 16px;
          color: #f1f1f1;
        "
      >
        📌 <strong>Booking Status:</strong>
      </p>

      <div
        style="
          display: inline-block;
          padding: 10px 18px;
          border-radius: 999px;
          background: ${status === "CONFIRMED"
            ? "#183d2f"
            : status === "CANCELLED"
                ? "#4a1f1f"
                : "#4a3d1f"
        };
          color: ${status === "CONFIRMED"
            ? "#5df2b5"
            : status === "CANCELLED"
                ? "#ff8b8b"
                : "#ffd66b"
        };
          font-weight: bold;
          font-size: 14px;
          letter-spacing: 0.5px;
        "
      >
        ${status}
      </div>

      <p
        style="
          margin-top: 24px;
          font-size: 15px;
          line-height: 1.7;
          color: #d0d0d0;
        "
      >
        ${messages[status]}
      </p>
    </div>

    <p
      style="
        margin-top: 35px;
        color: #b0b0b0;
        line-height: 1.8;
        font-size: 15px;
      "
    >
      Thank you for choosing
      <strong style="color:#c8a96b;">
        Grand Maison Hotel
      </strong>.
      We truly appreciate your trust and look forward to serving you with excellence.
    </p>

  </div>

  <div
    style="
      padding: 22px;
      text-align: center;
      background: #0b0b0b;
      border-top: 1px solid #1f1f1f;
    "
  >
    <p
      style="
        margin: 0;
        font-size: 13px;
        color: #777;
      "
    >
      © 2026 Grand Maison Hotel — All Rights Reserved
    </p>
  </div>

</div>


  `;
};
