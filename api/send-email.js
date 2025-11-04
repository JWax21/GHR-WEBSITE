// API endpoint for sending emails via Resend
// This can be deployed as a serverless function (Vercel, Netlify, etc.)

module.exports = async (req, res) => {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Send email via Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev", // Replace with your verified domain
        to: email,
        subject: "Welcome to Grove Hill Research",
        html: `
                    <h1>Welcome to Grove Hill Research</h1>
                    <p>Thank you for your interest!</p>
                `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", data);
      return res.status(response.status).json({
        error: data.message || "Failed to send email",
      });
    }

    return res.status(200).json({
      success: true,
      messageId: data.id,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
