import React from "react";
import { Copyright } from "lucide-react";

const Reserved = () => {
  return (
    <footer className="lg:ml-64 border-t border-white/[0.05] bg-[#0d0d0d] px-6 py-4 flex items-center justify-between gap-4">
      <p className="flex items-center gap-1.5 text-[11px] text-white/20 font-medium">
        <Copyright size={11} />
        2026 Atlas'Travel. All Rights Reserved.
      </p>
      <p className="text-[11px] text-white/10 font-medium hidden sm:block">Dashboard v1.0</p>
    </footer>
  );
};

export default Reserved;