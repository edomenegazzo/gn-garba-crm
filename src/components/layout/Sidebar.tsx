"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BadgeCheck,
  Megaphone,
  ScrollText,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/contatti", label: "Contatti", icon: Users },
  { href: "/iscritti", label: "Iscritti GN", icon: BadgeCheck },
  { href: "/militanti", label: "Militanti", icon: Megaphone },
  { href: "/audit", label: "Audit log", icon: ScrollText },
  { href: "/admin", label: "Amministrazione", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-ink text-cream flex flex-col shrink-0">
      <div className="px-6 py-6 border-b border-cream/10">
        <div className="font-display font-black text-2xl leading-none tracking-tight">
          NUCLEO
        </div>
        <div className="font-display font-black text-2xl leading-none tracking-tight text-red">
          GARBATELLA
        </div>
        <div className="font-body text-[10px] uppercase tracking-[0.2em] text-cream/60 mt-3">
          CRM Territoriale
        </div>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm relative transition-colors ${
                isActive
                  ? "bg-cream/5 text-cream"
                  : "text-cream/70 hover:text-cream hover:bg-cream/5"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-red" />
              )}
              <Icon size={18} strokeWidth={2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-cream/10 text-[10px] uppercase tracking-[0.2em] text-cream/40">
        v0.1 · sviluppo
      </div>
    </aside>
  );
}
