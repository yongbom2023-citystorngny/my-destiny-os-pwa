export default function (req, res) {
  res.setHeader("Content-Type", "application/json");

  const { birth = "2000-01-01", time = "00:00", name = "" } = req.query;

  const seedStr = `${birth}|${time}|${name}`;
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) % 1000000007;
  }

  const score = (n) => Math.abs((seed + n * 97) % 100);

  const data = {
    date: new Date().toISOString().slice(0, 10),
    energy: score(1),
    wealth: score(2),
    career: score(3),
    relationship: score(4),
    health: score(5),
    do: ["서두르지 말기", "돈 먼저 정리", "루틴 유지"],
    avoid: ["즉흥 결정", "충동 소비"],
    diary: "오늘은 확장보다 정리가 이익이다.",
  };

  res.status(200).end(JSON.stringify(data));
}
