export default async function handler(req, res) {
  try {
    const fortunes = [
      "Great wealth is coming to you.",
      "Your destiny will change in 30 days.",
      "A powerful ally will appear.",
      "A major financial breakthrough is near.",
      "Your past struggle is ending.",
      "You will rise higher than those who doubted you."
    ]

    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)]

    res.status(200).json({
      success: true,
      fortune,
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
}
