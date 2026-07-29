import { useEffect, useState } from "react";
import { Orbit } from "@/components/orbit";
const phrases = ["读取你的出生轨迹", "识别内在运行模式", "生成属于你的观察"];
export function Generating({ onDone }: { onDone: () => void }) {
 const [index, setIndex] = useState(0); useEffect(() => { const timer = setInterval(() => setIndex((i) => i + 1), 650); const done = setTimeout(onDone, 2100); return () => { clearInterval(timer); clearTimeout(done); }; }, [onDone]);
 return <section className="page" style={{display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center"}}><div><div style={{display:"flex",justifyContent:"center",marginBottom:36}}><Orbit /></div><p className="eyebrow">INNER ORBIT</p><p className="display" style={{fontSize:25,marginTop:16}}>{phrases[Math.min(index, phrases.length - 1)]}</p><div style={{display:"flex",gap:6,justifyContent:"center",marginTop:27}}>{phrases.map((_, i) => <i key={i} style={{width:6,height:6,borderRadius:"50%",background:i <= index ? "var(--navy)" : "#d5d1c8",display:"block",transition:"background .2s"}} />)}</div></div></section>;
}
