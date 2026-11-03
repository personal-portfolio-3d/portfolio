import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#03060D] text-white">
      <h2 className="text-3xl font-orbitron font-bold text-[#22D3EE] mb-2">404 - PORTAL NOT FOUND</h2>
      <p className="text-sm font-mono text-[#C4D2E8] mb-6">The requested coordinates do not exist on this timeline.</p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-[#168BFF]/20 border border-[#22D3EE] text-[#22D3EE] font-mono text-xs hover:bg-[#168BFF]/40 transition-colors"
      >
        RETURN TO PORTAL
      </Link>
    </div>
  );
}

