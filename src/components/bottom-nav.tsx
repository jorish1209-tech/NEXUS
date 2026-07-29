import type { Screen } from "@/components/app-shell";

const icons = {
  today: <svg className="icon" viewBox="0 0 24 24"><path d="M7 3v3m10-3v3M4 9h16M5 5h14v15H5z"/></svg>,
  chart: <svg className="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M4 12h5m6 0h5"/></svg>,
  share: <svg className="icon" viewBox="0 0 24 24"><path d="M12 16V3m0 0 4 4m-4-4L8 7M5 13v7h14v-7"/></svg>,
};
export function BottomNav({ screen, setScreen }: { screen: Screen; setScreen: (screen: Screen) => void }) {
  return <nav className="bottom-nav">{(["today", "chart", "share"] as const).map((item) => <button key={item} className={`nav-item ${screen === item ? "active" : ""}`} onClick={() => setScreen(item)}>{icons[item]}{item === "today" ? "Today" : item[0].toUpperCase() + item.slice(1)}</button>)}</nav>;
}
