export default function handler(req, res) {
  try {
    const { birth = "2000-01-01", time = "00:00", name = "" } = req.query;

    const seedStr = `${birth}|${time}|${name}`;
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) {
      seed = (seed * 31 + seedStr.charCodeAt(i)) % 1000000007;
    }

    const score = (n) => Math.abs((seed + n * 97) % 100);

    const DO = [
      "서두르지 말기",
      "돈 먼저 정리",
      "말을 짧게",
      "루틴 유지",
      "계약 재확인",
      "아침에 중요한 일 처리",
    ];

    const AVOID = [
      "즉흥 결정",
      "감정적인 문자",
      "충동 소비",
      "밤샘",
      "SNS 폭주",
    ];

    const DIARY = [
      "오늘은 불 기운이 강하다. 서두르면 실수가 생긴다.",
      "지금은 확장보다 정리가 이익이다.",
      "한 사람의 말이 하루의 흐름을 바꾼다.",
      "중심을 잡으면 돈과 사람을 모두 지킬 수 있다.",
      "몸 관리가 운을 끌어올린다.",
    ];

    res.status(200).json({
      ok: true,
      date: new Date().toISOString().slice(0, 10),
      input: { birth, time, name },
      energy: score(1),
      wealth: score(2),
      career: score(3),
      relationship: score(4),
      health: score(5),
      do: [
        DO[seed % DO.length],
        DO[(seed + 1) % DO.length],
        DO[(seed + 2) % DO.length],
      ],
      avoid: [
        AVOID[seed % AVOID.length],
        AVOID[(seed + 2) % AVOID.length],
      ],
      diary: DIARY[seed % DIARY.length],
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      error: e.message,
      stack: e.stack,
    });
  }
}