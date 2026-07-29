import { brand } from "@/config/brand";
export function BrandMark({ light = false }: { light?: boolean }) {
  return <div className="brand" style={light ? { color: "#f9f5ed" } : undefined}>{brand.name.slice(0, 2)}<span className="brand-x">{brand.name[2]}</span>{brand.name.slice(3)}</div>;
}
