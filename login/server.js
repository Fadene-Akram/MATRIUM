// Endpoint to validate device fingerprint
app.post("/api/validate-fingerprint", async (req, res) => {
  const { fingerprint } = req.body;

  // Mock database lookup (replace with actual database query in production)
  const users = [
    { fingerprint: "exampleAdminFingerprint", name: "Admin", isAdmin: true },
    { fingerprint: "exampleUserFingerprint", name: "User", isAdmin: false },
  ];

  const user = users.find((u) => u.fingerprint === fingerprint);
  if (user) {
    return res.send({ success: true, user });
  } else {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
});
