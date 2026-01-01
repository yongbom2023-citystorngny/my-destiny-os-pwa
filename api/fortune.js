export default function handler(req, res) {
  try {
    const { name = "guest", birth = "unknown", time = "unknown" } = req.query;

    const today = new Date().toISOString().split("T")[0];

    const result = {
      date: today,
      name,
      birth,
      time,
      energy: Math.floor(Math.random() * 100),
      wealth: Math.floor(Math.random() * 100),
      career: Math.floor(Math.random() * 100),
      relationship: Math.floor(Math.random() * 100),
      health: Math.floor(Math.random() * 100),
      do: [
        "Act before hesitation grows",
        "Make one bold decision",
        "Trust your instinct"
      ],
      avoid: [
        "Avoid emotional spending",
        "Do not argue with partners"
      ],
      diary: "Today the flow of fate is quietly shifting in your favor."
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
