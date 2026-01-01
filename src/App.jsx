import { useEffect, useMemo, useState } from "react";
import "./App.css";

function pad2(n) {
  return String(n).padStart(2, "0");
}

// ✅ 여기만 나중에 네 로직으로 교체하면 됨
function generateResult({ dob, time }) {
  // 임시 점수 (나중에 사주/수비학 로직 넣기)
  const seed = (dob + time).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const score = (base) => Math.max(40, Math.min(80, (base + seed) % 81));

  return {
    date: new Date().toISOString().slice(0, 10),
    scores: {
      energy: score(58),
      wealth: score(53),
      career: score(58),
      relationship: score(50),
      health: score(65),
    },
    doList: ["서두르지 말기", "돈 먼저 정리", "말을 짧게"],
    avoidList: ["즉흥 결정", "감정적인 문자"],
    diary:
      "오늘은 불 기운이 강하다.\n서두르면 실수가 생긴다.\n중심을 잡고 천천히 가면 돈과 사람 모두 지킬 수 있다.",
  };
}

export default function App() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);

  const [dob, setDob] = useState(params.get("dob") || "");
  const [time, setTime] = useState(params.get("time") || "09:30");
  const [result, setResult] = useState(null);

  // ✅ 쿼리(dob,time) 있으면 자동 생성
  useEffect(() => {
    const qDob = params.get("dob");
    const qTime = params.get("time");
    if (qDob && qTime) {
      setDob(qDob);
      setTime(qTime);
      setResult(generateResult({ dob: qDob, time: qTime }));
    }
  }, [params]);

  const onCreate = () => {
    if (!dob || !time) {
      alert("생년월일과 시간을 입력해줘!");
      return;
    }
    const next = generateResult({ dob, time });
    setResult(next);

    // ✅ 공유 링크로 바꿔치기 (새로고침해도 유지)
    const url = new URL(window.location.href);
    url.searchParams.set("dob", dob);
    url.searchParams.set("time", time);
    window.history.replaceState({}, "", url.toString());
  };

  const onShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My Destiny OS", url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("공유 링크 복사됨!");
      }
    } catch (e) {
      // share 취소해도 에러로 들어올 수 있음
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>My Destiny OS</h1>

        {/* ✅ 입력 폼 */}
        <div className="formRow">
          <label>생년월일</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>

        <div className="formRow">
          <label>출생 시간</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>

        <div className="btnRow">
          <button onClick={onCreate}>결과 보기</button>
          <button className="secondary" onClick={onShare} disabled={!result}>
            공유
          </button>
        </div>

        {/* ✅ 결과 */}
        {result && (
          <>
            <div className="date">{result.date}</div>

            <div className="chips">
              {Object.entries(result.scores).map(([k, v]) => (
                <div key={k} className="chip">
                  <div className="chipTitle">{k}</div>
                  <div className="chipValue">{v}</div>
                </div>
              ))}
            </div>

            <h3>DO</h3>
            <ul>
              {result.doList.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>

            <h3>AVOID</h3>
            <ul>
              {result.avoidList.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>

            <h3>Destiny Diary</h3>
            <pre className="diary">{result.diary}</pre>

            <textarea className="memo" placeholder="오늘 메모..." />
          </>
        )}
      </div>
    </div>
  );
}
