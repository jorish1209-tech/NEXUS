export function Orbit({ size = "large" }: { size?: "large" | "small" }) {
  return <div className="orbit" style={size === "small" ? { width: 116, height: 116 } : undefined} aria-hidden="true"><i /></div>;
}
