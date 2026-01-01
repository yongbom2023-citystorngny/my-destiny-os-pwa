module.exports = function (req, res) {
  const fortunes = [
    "Great wealth is coming to you.",
    "Your destiny will change in 30 days.",
    "A powerful ally will appear.",
    "A major financial breakthrough is near.",
    "Your past struggle is ending.",
    "You will rise higher than those who doubted you."
  ];

  const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];

  res.status(200).json({
    fortune,
    date: new Date().toISOString().split("T")[0]
  });
};
