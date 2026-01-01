import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "myDestinyOS_v1";

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function seedIfEmpty(prev) {
  if (prev) return prev;

  return {
    profile: {
      name: "YB",
      birthTime: "09:34",
      pillars: { day: "己巳", hour: "乙巳" }
    },
    entries: {}
  };
}

function generateTodayEntry() {
  const base = { energy: 60, wealth: 55, career: 58, relationship: 54, health: 62 };
  const jitter = () => Math.floor(Math.random() * 10) - 5;

  const scores = Object.fromEntries(
    Object.entries(base).map(([k, v]) => [k, Math.max(0, Math.min(100, v + jitter()))])
  );

  return {
    title: "오늘은 속도보다 컨트롤",
    scores,
    do: ["서두르지 말기", "돈 먼저 정리", "말을 짧게"],
    avoid: ["즉흥 결정", "감정적인 문자"],
    diary:
      "오늘은 불 기운이 강하다.\n" +
      "서두르면 실수가 생긴다.\n" +
      "중심을 잡고 천천히 가면 돈과 사람 모두 지킬 수 있다.",
    note: ""
  };
}

export default function App() {
  const [state, setState] = useState(() => seedIfEmpty(loadState()));
  const today = todayISO();

  const entry = useMemo(() => {
    if (state.entries[today]) return state.entries[today];
    const newEntry = generateTodayEntry();
    const next = { ...state, entries: { ...state.entries, [today]: newEntry } };
    setState(next);
    saveState(next);
    return newEntry;
  }, [today]);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <div style={{ minHeight: "100vh", background: "#0b0f1a", color: "white", padding: 20 }}>
      <h1 style={{ color: "#d7b44a" }}>My Destiny OS</h1>
      <h3>{today}</h3>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {Object.entries(entry.scores).map(([k, v]) => (
          <div key={k} style={{ padding: 10, background: "#222", borderRadius: 10 }}>
            <div>{k}</div>
            <b>{v}</b>
          </div>
        ))}
      </div>

      <h3>DO</h3>
      <ul>{entry.do.map((x, i) => <li key={i}>{x}</li>)}</ul>

      <h3>AVOID</h3>
      <ul>{entry.avoid.map((x, i) => <li key={i}>{x}</li>)}</ul>

      <h3>Destiny Diary</h3>
      <pre>{entry.diary}</pre>

      <textarea
        placeholder="오늘 메모..."

        value={entry.note}

        onChange={(e) => {

          const next = {

            ...state,

            entries: { ...state.entries, [today]: { ...entry, note: e.target.value } }

          };

          setState(next);

        }}

        style={{ width: "100%", height: 100 }}

      />

    </div>

  );

}



