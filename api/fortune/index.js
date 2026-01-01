export default function handler(req, res) {
  res.status(200).json({
    fortune: "Your destiny API is now alive."
  });
}