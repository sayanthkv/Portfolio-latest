import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  Car, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  QrCode, 
  Search, 
  ShieldCheck, 
  ShoppingBag, 
  Sparkles, 
  Users 
} from "lucide-react";

export function BrowserFrame({ 
  children, 
  label, 
  url 
}: { 
  children: React.ReactNode; 
  label: string;
  url?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-3.5 py-2">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </div>
        <div className="flex items-center gap-1.5 rounded-md border border-border/40 bg-background/80 px-3 py-0.5 text-[0.625rem] text-muted-foreground font-mono">
          <span className="size-1 rounded-full bg-emerald-500" />
          <span className="truncate max-w-[240px]">{url || label}</span>
        </div>
        <div className="w-10" />
      </div>
      {children}
    </div>
  );
}

/** Flagship composition: optimized desktop preview with overlapping mobile phone. */
export function FlagshipVisual({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -30]);

  return (
    <div ref={ref} className="relative mx-auto max-w-4xl pb-12 md:pb-16">
      {/* Optimized desktop container */}
      <div className="rounded-[20px] bg-secondary/80 p-2.5 sm:p-4 md:p-6 transition-all duration-300">
        <div className="group overflow-hidden rounded-xl">
          <BrowserFrame 
            label="Parkora — Smart Urban Parking" 
            url="parkora-kannur.vercel.app"
          >
            <ParkoraAppVisual />
          </BrowserFrame>
        </div>
      </div>

      {/* Floating mobile mockup with reduced, proportional dimensions */}
      <motion.div
        style={{ y: phoneY }}
        className="absolute -bottom-2 right-2 w-[32%] sm:w-[26%] max-w-[180px] md:right-6 pointer-events-none"
      >
        <div className="overflow-hidden rounded-[20px] border-[4px] border-ink bg-ink shadow-[0_20px_45px_-15px_color-mix(in_oklab,var(--ink)_65%,transparent)]">
          <div className="flex items-center justify-between border-b border-ink-border bg-ink px-2.5 py-1.5 text-[0.55rem] text-ink-muted">
            <span>09:41</span>
            <div className="h-1.5 w-8 rounded-full bg-ink-border" />
            <span>5G</span>
          </div>
          <div className="bg-background p-2.5 space-y-2 text-foreground">
            <div className="flex items-center justify-between">
              <span className="font-display text-[0.65rem] font-bold">PARKORA</span>
              <span className="rounded-full bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 text-[0.5rem] font-medium">Slot Active</span>
            </div>
            <div className="rounded-lg border bg-card p-2 space-y-1">
              <p className="text-[0.55rem] text-muted-foreground">Booking #PK-8842</p>
              <p className="font-display text-[0.65rem] font-semibold">Fort Road Bay B-04</p>
              <div className="flex justify-between items-center pt-1 border-t text-[0.55rem]">
                <span>14:00 - 16:30</span>
                <span className="font-medium text-foreground">₹60.00</span>
              </div>
            </div>
            <div className="flex justify-center py-1">
              <div className="p-1 rounded bg-muted/60 border border-border">
                <QrCode className="size-10 text-foreground" strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-center text-[0.5rem] text-muted-foreground">Scan at gate entry/exit</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/** Real UI reproduction for Parkora Smart Parking Platform */
function ParkoraAppVisual() {
  return (
    <div className="bg-background text-foreground select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-border/70 px-4 py-2.5 bg-background">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-foreground" />
            <span className="font-display text-sm font-bold tracking-tight">PARKORA</span>
          </div>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.6rem] font-medium text-muted-foreground">
            Kannur, Kerala
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[0.65rem] text-muted-foreground">
            <ShieldCheck className="size-3 text-emerald-500" />
            Atomic Tx Active
          </span>
          <span className="rounded-full bg-foreground px-3 py-1 text-[0.65rem] font-medium text-background">
            Customer Portal
          </span>
        </div>
      </div>

      {/* Main UI Body */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
            <Search className="size-3.5" />
            <span>Search Kannur parking facilities (Fort Road, Calicut Airport Rd, Railway Station)...</span>
          </div>
          <div className="flex gap-2 text-xs">
            <button className="rounded-lg bg-foreground px-3 py-2 text-background font-medium text-[0.7rem]">
              Find Slots
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-3">
          {/* Facility 1 */}
          <div className="col-span-12 sm:col-span-7 rounded-xl border border-border bg-card p-3.5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="label-caps text-[0.6rem] text-muted-foreground">Central Facility</span>
                <h4 className="font-display text-base font-semibold">Kannur City Centre Multi-Level</h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="size-3" /> Fort Road, Kannur · 0.4 km away
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 text-[0.65rem] font-semibold">
                34 Available
              </span>
            </div>

            {/* Parking bay matrix visual */}
            <div className="space-y-1.5 pt-1 border-t border-border/60">
              <div className="flex justify-between text-[0.65rem] text-muted-foreground">
                <span>Floor 2 (Standard Bays)</span>
                <span>₹20 / hr</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5 text-center text-[0.6rem]">
                {["A-01", "A-02", "A-03", "A-04", "A-05", "A-06"].map((slot, i) => (
                  <div
                    key={slot}
                    className={cn(
                      "rounded py-1.5 font-mono font-medium transition-colors border",
                      i === 2
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold"
                        : i === 1 || i === 4
                        ? "border-border bg-muted/60 text-muted-foreground line-through opacity-60"
                        : "border-border bg-background text-foreground"
                    )}
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[0.65rem] text-muted-foreground flex items-center gap-1">
                <Clock className="size-3" /> Real-time pricing & reservations
              </span>
              <span className="text-[0.65rem] font-medium text-foreground underline cursor-pointer">
                Reserve Bay A-03 →
              </span>
            </div>
          </div>

          {/* Live Portals Summary Column */}
          <div className="col-span-12 sm:col-span-5 space-y-2.5">
            <div className="rounded-xl border border-border bg-card p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="label-caps text-[0.6rem] text-muted-foreground">Staff Terminal</span>
                <span className="size-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="font-display text-xs font-semibold">Gate 1 Entry Scanner</p>
              <p className="text-[0.65rem] text-muted-foreground">
                Active QR verification: 48 vehicles checked in this shift.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="label-caps text-[0.6rem] text-muted-foreground">Admin Analytics</span>
                <span className="font-mono text-[0.65rem] text-muted-foreground">92%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-foreground rounded-full w-[92%]" />
              </div>
              <p className="text-[0.65rem] text-muted-foreground">
                Peak occupancy tracking with Recharts metric feed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Stand-in for projects with refined, high-fidelity editorial interface mockups */
export function EditorialProjectVisual({ project }: { project: Project }) {
  return (
    <div className="group relative overflow-hidden rounded-[20px] bg-secondary/80 p-2.5 sm:p-4 md:p-6 transition-all duration-300">
      <div className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.015]">
        {project.id === "hirezone" ? <HireZoneVisual /> : <FragranziaVisual />}
      </div>
      <p className="label-caps absolute bottom-3 right-5 text-[0.625rem] text-muted-foreground">
        {project.id === "hirezone" ? "MERN Job Portal UI" : "MERN E-Commerce UI"}
      </p>
    </div>
  );
}

function HireZoneVisual() {
  const jobs = [
    { title: "MERN Stack Developer", company: "TechPulse Labs", loc: "Kannur / Remote", tag: "Full-Time", salary: "₹4.5 - 6.5 LPA", status: "Active" },
    { title: "Frontend React Engineer", company: "Apex Digital", loc: "Calicut, Kerala", tag: "Junior", salary: "₹3.8 - 5.2 LPA", status: "Reviewing" },
    { title: "Node.js Backend Developer", company: "CloudNest Tech", loc: "Kochi / Hybrid", tag: "Full-Time", salary: "₹5.0 - 7.0 LPA", status: "Applied" },
  ];

  return (
    <BrowserFrame label="HireZone — Job Portal Platform" url="hirezone.platform.app">
      <div className="bg-background text-foreground p-4 sm:p-5 space-y-3.5 select-none">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold tracking-tight">HIREZONE</span>
            <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[0.55rem] font-mono">RBAC AUTH</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="rounded-full border px-2.5 py-1 text-[0.625rem] font-medium bg-foreground text-background">
              Student View
            </span>
            <span className="rounded-full border px-2.5 py-1 text-[0.625rem] text-muted-foreground hover:bg-muted">
              Recruiter Studio
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between rounded-lg border bg-card px-3 py-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Search className="size-3.5" />
            <span className="text-[0.7rem]">Filter by role, skills (React, Node, Express), or location...</span>
          </div>
          <span className="text-[0.65rem] font-mono font-medium text-foreground">12 Roles Found</span>
        </div>

        {/* Job Listings */}
        <div className="space-y-2">
          {jobs.map((job) => (
            <div key={job.title} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border bg-card p-3 gap-2 hover:border-foreground/30 transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h5 className="font-display text-xs font-semibold">{job.title}</h5>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[0.6rem] font-medium text-muted-foreground">
                    {job.tag}
                  </span>
                </div>
                <p className="text-[0.65rem] text-muted-foreground">
                  {job.company} · {job.loc} · <span className="font-medium text-foreground">{job.salary}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-[0.6rem] font-medium",
                  job.status === "Applied" 
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {job.status}
                </span>
                <button className="rounded-md bg-foreground px-2.5 py-1 text-[0.65rem] font-medium text-background">
                  View Role
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function FragranziaVisual() {
  const perfumes = [
    { name: "Velvet Amber", type: "Eau de Parfum", notes: "Bergamot · Cedar · Tonka", price: "₹2,499", rating: "4.9" },
    { name: "Mystic Noir", type: "Extrait de Parfum", notes: "Black Pepper · Oud · Leather", price: "₹3,199", rating: "5.0" },
    { name: "Iris Botanica", type: "Eau de Toilette", notes: "White Iris · Vetiver · Citrus", price: "₹1,899", rating: "4.8" },
  ];

  return (
    <BrowserFrame label="Fragranzia — Curated Fragrances" url="fragranzia.store.app">
      <div className="bg-background text-foreground p-4 sm:p-5 space-y-3.5 select-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <span className="serif-em text-xl font-normal tracking-wide">Fragranzia</span>
            <span className="block text-[0.6rem] uppercase tracking-widest text-muted-foreground font-sans">
              Artisanal Perfumery
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-[0.65rem] text-muted-foreground">Collections</span>
            <span className="text-[0.65rem] text-muted-foreground">Wishlist (3)</span>
            <span className="flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-[0.65rem] font-medium text-background">
              <ShoppingBag className="size-3" /> Cart (1)
            </span>
          </div>
        </div>

        {/* Perfume Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {perfumes.map((p, i) => (
            <div key={p.name} className="rounded-lg border bg-card p-2.5 flex flex-col justify-between space-y-2">
              <div className="flex aspect-[4/3] flex-col items-center justify-center rounded bg-secondary/60 relative overflow-hidden">
                {/* Minimalist bottle silhouette */}
                <div className="h-2 w-4 rounded-t-sm bg-foreground/80" />
                <div className="h-1 w-2 bg-foreground/40" />
                <div className={cn(
                  "w-10 rounded-sm border border-foreground/20 flex items-center justify-center",
                  i === 0 ? "h-14 bg-foreground/90 text-background" : i === 1 ? "h-16 bg-muted-foreground/30" : "h-12 bg-secondary"
                )}>
                  <Sparkles className="size-3 opacity-40" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex justify-between items-start">
                  <h6 className="font-display text-[0.7rem] font-medium truncate">{p.name}</h6>
                  <span className="font-mono text-[0.6rem] text-muted-foreground">★ {p.rating}</span>
                </div>
                <p className="text-[0.55rem] text-muted-foreground truncate">{p.notes}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-display text-[0.7rem] font-semibold">{p.price}</span>
                  <span className="text-[0.55rem] uppercase font-mono tracking-wider underline cursor-pointer">
                    + Add
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}
