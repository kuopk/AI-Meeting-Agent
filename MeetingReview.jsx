import { useState, useRef, useEffect } from "react";

/* ─── Palette ─── */
const T = {
  brandBase:     "#010101",
  bgApp:         "#FFFFFF",
  bgSurface:     "#F5F5F5",
  bgSubtle:      "#FAFAFA",
  bgHover:       "#EEEEEE",
  textPrimary:   "#333333",
  textSecondary: "#666666",
  textTertiary:  "#999999",
  textDisabled:  "#BBBBBB",
  textOnBrand:   "#FFFFFF",
  borderSubtle:  "#E8E8E8",
  borderDefault: "#CCCCCC",
  flagGray:      "#555555",
  iconGray:      "#555555",
  avatarGray:    "#888888",
  playerAvatar:  "#C0C0C0",
  playBtn:       "#888888",
  fontFamily:    `"Segoe UI","Segoe UI Variable",system-ui,-apple-system,sans-serif`,
  radiusSm: 4, radiusMd: 6, radiusLg: 8, radiusXl: 12,
};

const PEOPLE = [
  { id: "p1", name: "Sarah Chen", color: T.avatarGray, role: "Host"     },
  { id: "p2", name: "Andy Park",  color: T.avatarGray, role: "Reviewer" },
  { id: "p3", name: "Amy Torres", color: T.avatarGray, role: "Reviewer" },
  { id: "p4", name: "James Liu",  color: T.avatarGray, role: "Reviewer" },
  { id: "p5", name: "Mia Patel",  color: T.avatarGray, role: "Reviewer" },
];

/* ─── Icons ─── */
const IconSearch = ({ color = T.textTertiary, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="7" cy="7" r="5" stroke={color} strokeWidth="1.4"/>
    <path d="M11 11l3 3" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconAlert = ({ color = T.iconGray, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8 1.5L1 14h14L8 1.5z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6v4" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="8" cy="11.5" r="0.75" fill={color}/>
  </svg>
);
const IconFlag = ({ color = T.flagGray, size = 13, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3 2v12M3 2h9l-2.5 4L12 10H3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={filled ? color + "30" : "none"}/>
  </svg>
);
const IconFilter = ({ color = T.iconGray, size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M2 4h12M4 8h8M6 12h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconLink = ({ color = T.iconGray, size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5L7.5 3.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5L8.5 12.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconShare = ({ color = T.iconGray, size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M13.5 2.5L7 8.5M13.5 2.5L9 13.5l-2-5-5-2 11.5-4z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CONFIDENCE = {
  high:   { Icon: null,      dot: "#888" },
  medium: { Icon: null,      dot: "#777" },
  low:    { Icon: IconAlert, dot: T.flagGray },
};

const TRANSCRIPT = [
  { ts: "0:05:11", secs: 311,  speaker: "Sarah Chen", text: "Alright, let's get started. Today we're reviewing the Q3 product roadmap and aligning on priorities." },
  { ts: "0:11:30", secs: 690,  speaker: "James Liu",  text: "I think we should prioritize the onboarding flow rewrite — users are dropping off at step three consistently." },
  { ts: "0:13:33", secs: 813,  speaker: "Sarah Chen", text: "Andy, can you confirm your team has bandwidth for the API refactor before the end of the month?" },
  { ts: "0:15:46", secs: 946,  speaker: "Andy Park",  text: "Yeah, we can take it on. Amy mentioned she'd handle the design system audit too, targeting October 12th." },
  { ts: "0:31:00", secs: 1860, speaker: "Mia Patel",  text: "We should delay the mobile release until the accessibility review is fully complete." },
  { ts: "0:55:33", secs: 3333, speaker: "Sarah Chen", text: "Agreed. Let's freeze feature requests for Q3 and focus purely on stability and performance improvements." },
  { ts: "0:58:10", secs: 3490, speaker: "Andy Park",  text: "I'll lead the API refactor and coordinate with the backend team on schema changes." },
  { ts: "0:58:21", secs: 3501, speaker: "James Liu",  text: "And we need to get the staging environment updated before the next sprint demo." },
  { ts: "1:02:03", secs: 3723, speaker: "Sarah Chen", text: "Great. So to summarise — stability-first for Q3, three major initiatives, and we'll track everything here." },
];
const TOTAL_SECS = 4680;

const BOOKMARKS = [
  { id: "b1", speaker: "James Liu",  ts: "0:11:30", secs: 690,  quote: "Users are dropping off at step three consistently." },
  { id: "b2", speaker: "Sarah Chen", ts: "0:13:33", secs: 813,  quote: "Can you confirm your team has bandwidth for the API refactor before the end of the month?" },
  { id: "b3", speaker: "Andy Park",  ts: "0:15:46", secs: 946,  quote: "Amy mentioned she'd handle the design system audit too, targeting October 12th." },
  { id: "b4", speaker: "Mia Patel",  ts: "0:31:00", secs: 1860, quote: "We should delay the mobile release until the accessibility review is fully complete." },
  { id: "b5", speaker: "Sarah Chen", ts: "0:55:33", secs: 3333, quote: "Let's freeze feature requests for Q3 and focus purely on stability and performance improvements." },
];

const mk = (base) => ({ flagged: false, flaggedBy: null, confirmedBy: null, confirmedAt: null, ts: null, secs: null, ...base });
const INITIAL_DATA = {
  summary: [
    mk({ id: "s1", confidence: "high",   confirmedBy: "you",       confirmedAt: "10:05 · 5/10",
         ts: "1:02:03", secs: 3723,
         text: "The team aligned on a stability-first approach for Q3, freezing all new feature requests to focus purely on performance improvements and bug fixes." }),
    mk({ id: "s2", confidence: "medium", confirmedBy: "Mia Patel", confirmedAt: "09:42 · 5/10", flagged: true, flaggedBy: "James Liu",
         ts: "0:06:37", secs: 397,
         text: "Three major initiatives were identified and will be tracked closely throughout the quarter." }),
    mk({ id: "s3", confidence: "low",    confirmedBy: null, flagged: true, flaggedBy: "Mia Patel",
         ts: "1:13:00", secs: 4380,
         text: "The mobile release timeline was updated to accommodate the accessibility review, ensuring compliance before July 18th." }),
  ],
  decisions: [
    mk({ id: "d1", confidence: "high", confirmedBy: "James Liu", confirmedAt: "09:15 · 5/10", ts: "0:55:33", secs: 3333, text: "Freeze feature requests for Q3" }),
    mk({ id: "d2", confidence: "high", confirmedBy: "Andy Park",  confirmedAt: "10:24 · 5/10", ts: "0:31:00", secs: 1860, text: "Delay mobile release until accessibility review complete" }),
    mk({ id: "d3", confidence: "low",  confirmedBy: null, ts: "0:11:30", secs: 690,  flagged: true, flaggedBy: "James Liu", text: "Prioritize onboarding flow rewrite first" }),
  ],
  actions: [
    mk({ id: "a1", assignee: "Andy", confidence: "high",   confirmedBy: "you",        confirmedAt: "11:30 · 5/10", ts: "0:58:10", secs: 3490, text: "Lead API refactor and coordinate with backend team" }),
    mk({ id: "a2", assignee: "Amy",  confidence: "medium", confirmedBy: "Amy Torres", confirmedAt: "14:35 · 5/10", ts: "0:15:46", secs: 946,  flagged: true, flaggedBy: "Andy Park",  text: "Complete design system audit by Oct 12" }),
    mk({ id: "a3", assignee: "Andy", confidence: "low",    confirmedBy: null,         ts: "0:58:21", secs: 3501, flagged: true, flaggedBy: "Sarah Chen", text: "Update staging environment before next sprint demo" }),
  ],
};

/* ─── Filter helper ─── */
const passesFilter = (item, filters) => {
  if (filters.length === 0) return true;
  const dc = filters.includes("double-check") && item.confidence === "low";
  const fl = filters.includes("flagged") && item.flagged;
  return dc || fl;
};

const secsToTs = s => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
  return h > 0 ? `${h}:${String(m).padStart(2,"0")}:${String(ss).padStart(2,"0")}` : `${m}:${String(ss).padStart(2,"0")}`;
};

/* ─── Shared tooltip bubble ─── */
const TBG = "rgba(51,51,51,0.88)";
function TooltipBubble({ text, maxWidth = 200 }) {
  return (
    <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: TBG, color: "#fff", fontSize: 11, fontFamily: T.fontFamily, fontWeight: 500, padding: "5px 10px", borderRadius: 6, whiteSpace: "normal", maxWidth, textAlign: "center", lineHeight: 1.45, pointerEvents: "none", zIndex: 300, letterSpacing: "0.01em" }}>
      <div style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: `5px solid ${TBG}` }} />
      {text}
    </div>
  );
}

/* ─── Generic tooltip wrapper (icon buttons) ─── */
function Tooltip({ label, children, maxWidth = 120 }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-flex" }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && <TooltipBubble text={label} maxWidth={maxWidth} />}
    </div>
  );
}

/* ─── Icon button ─── */
const IconBtn = ({ icon: Icon, tooltip, onClick, active = false }) => (
  <Tooltip label={tooltip}>
    <button onClick={onClick}
      style={{ width: 30, height: 30, borderRadius: T.radiusMd, border: `1px solid ${active ? T.borderDefault : T.borderSubtle}`, background: active ? T.bgHover : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.13s" }}
      onMouseEnter={e => { e.currentTarget.style.background = T.bgHover; e.currentTarget.style.borderColor = T.borderDefault; }}
      onMouseLeave={e => { e.currentTarget.style.background = active ? T.bgHover : "transparent"; e.currentTarget.style.borderColor = active ? T.borderDefault : T.borderSubtle; }}>
      <Icon color={active ? T.textPrimary : T.textSecondary} size={15} />
    </button>
  </Tooltip>
);

/* ─── Count badge ─── */
const CountBadge = ({ n }) => (
  <span style={{ minWidth: 18, height: 18, borderRadius: 9, background: T.bgHover, border: `1px solid ${T.borderSubtle}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: T.textTertiary, padding: "0 5px", lineHeight: 1, fontFamily: T.fontFamily }}>{n}</span>
);

/* ─── Flag badge with tooltip ─── */
function FlagBadge({ flaggedBy }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex", verticalAlign: "middle" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10, color: T.flagGray, background: "rgba(0,0,0,0.05)", border: `0.5px solid rgba(0,0,0,0.18)`, borderRadius: T.radiusSm, padding: "1px 5px", flexShrink: 0, fontFamily: T.fontFamily, cursor: "default" }}>
        <IconFlag color={T.flagGray} size={10} filled />
      </span>
      {hovered && <TooltipBubble text="Flagged in the meeting" maxWidth={480} />}
    </span>
  );
}

/* ─── Timestamp chip — low-confidence shows tooltip ─── */
function TsChip({ item, highlighted, onHighlight }) {
  const cfg = CONFIDENCE[item.confidence];
  return (
    <span style={{ position: "relative", display: "inline-flex", verticalAlign: "middle", top: "-1px" }}>
      <span onClick={e => { e.stopPropagation(); onHighlight(item.ts, item.secs); }}
        style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontVariantNumeric: "tabular-nums", color: highlighted ? T.textPrimary : T.textTertiary, background: highlighted ? T.bgHover : "transparent", border: `0.5px solid ${highlighted ? T.borderDefault : T.borderSubtle}`, borderRadius: T.radiusSm, padding: "1px 6px", cursor: "pointer", fontFamily: T.fontFamily, transition: "background 0.15s", flexShrink: 0, lineHeight: "18px" }}>
        {item.ts}
      </span>
    </span>
  );
}

const BookmarkTsChip = ({ ts, secs, highlighted, onHighlight }) => (
  <span onClick={e => { e.stopPropagation(); onHighlight(ts, secs); }}
    style={{ display: "inline-flex", alignItems: "center", fontSize: 11, fontVariantNumeric: "tabular-nums", color: highlighted ? T.textPrimary : T.textTertiary, background: highlighted ? T.bgHover : "transparent", border: `0.5px solid ${highlighted ? T.borderDefault : T.borderSubtle}`, borderRadius: T.radiusSm, padding: "2px 8px", cursor: "pointer", fontFamily: T.fontFamily, transition: "background 0.15s", flexShrink: 0, whiteSpace: "nowrap" }}>
    {ts}
  </span>
);

/* ─── Section header — ALL CAPS ─── */
const SectionHeader = ({ children, count }) => (
  <div style={{ fontSize: 11, fontWeight: 700, color: T.textSecondary, textTransform: "uppercase", letterSpacing: "0.07em", padding: "0 0 8px", marginBottom: 8, fontFamily: T.fontFamily, display: "flex", alignItems: "center", gap: 7 }}>
    {children}
    {count != null && <CountBadge n={count} />}
  </div>
);

/* ─── Collaborator cursor (Google-Docs-style inline cursor) ─── */
function CollabCursor({ initials, name, color = T.avatarGray }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex", verticalAlign: "middle", userSelect: "none", marginLeft: 1 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Initials label — only on hover */}
      {hovered && (
        <span style={{ position: "absolute", bottom: "100%", left: 0, background: color, color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: "3px 3px 3px 0", fontFamily: T.fontFamily, whiteSpace: "nowrap", lineHeight: 1.5, marginBottom: 1, pointerEvents: "none" }}>
          {initials}
        </span>
      )}
      {/* Vertical cursor bar */}
      <span style={{ display: "inline-block", width: 2, height: "1.1em", background: color, borderRadius: 1, verticalAlign: "middle" }} />
    </span>
  );
}

/* ─── Paragraph summary — all sentences inline, ONE chip at end (low-confidence) ─── */
function ParagraphSummary({ items, onHighlight, highlightedTs }) {
  const chipItem = items.find(i => i.confidence === "low");
  const hi = chipItem && highlightedTs === chipItem.ts;
  return (
    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: T.textPrimary, fontFamily: T.fontFamily }}>
      {items.map((item, idx) => (
        <span key={item.id}>
          {item.text}
          {idx === 0 && <CollabCursor initials="SC" name="Sarah Chen" color="#888888" />}
          {" "}
        </span>
      ))}
      {chipItem?.ts && <TsChip item={chipItem} highlighted={hi} onHighlight={onHighlight} />}
    </p>
  );
}

/* ─── Thumbs-up icon — outlined or filled ─── */
const IconThumbUp = ({ filled = false, color = T.textTertiary, size = 13 }) => filled ? (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M9 2H8.5L5 7v7h7.17a1 1 0 00.98-.8l1-5A1 1 0 0013.17 7H10V3a1 1 0 00-1-1z" fill={color}/>
    <rect x="2" y="7" width="3" height="7" rx="1" fill={color}/>
  </svg>
) : (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M5 14H3a1 1 0 01-1-1V8a1 1 0 011-1h2m0 7V7m0 7h7.17a1 1 0 00.98-.8l1-5A1 1 0 0015.17 7H10V3a1 1 0 00-1-1H8.5L5 7" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Looks Right button — per-item confirmation ─── */
function LooksRightBtn({ initialConfirmed = false, confirmerName = "you", confirmedAt = null }) {
  const [confirmed, setConfirmed] = useState(initialConfirmed);
  const [timeStr, setTimeStr]     = useState(confirmedAt);
  const [hovered, setHovered]     = useState(false);

  const isOwn      = confirmerName === "you";
  const canUndo    = isOwn; // only "You" can undo
  const firstName  = isOwn ? "You" : confirmerName.split(" ")[0];
  const label      = confirmed ? firstName : "Looks right";
  const color      = confirmed ? T.textSecondary : T.textTertiary;

  return (
    <span style={{ position: "relative", display: "inline-flex", verticalAlign: "middle" }}>
      <button
        onClick={e => {
          e.stopPropagation();
          if (confirmed && !canUndo) return; // locked — not your confirmation
          if (!confirmed) {
            const now = new Date();
            const h = now.getHours().toString().padStart(2, "0");
            const m = now.getMinutes().toString().padStart(2, "0");
            setTimeStr(`${h}:${m} · ${now.getMonth() + 1}/${now.getDate()}`);
          }
          setConfirmed(c => !c);
        }}
        onMouseEnter={e => { setHovered(true); if (!confirmed) { e.currentTarget.style.background = T.bgHover; e.currentTarget.style.color = T.textSecondary; } }}
        onMouseLeave={e => { setHovered(false); if (!confirmed) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.textTertiary; } }}
        style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "transparent", border: "none", cursor: confirmed && !canUndo ? "default" : "pointer", padding: "2px 7px", borderRadius: T.radiusSm, color, fontFamily: T.fontFamily, fontSize: 12, fontWeight: confirmed ? 500 : 400, flexShrink: 0, whiteSpace: "nowrap", transition: "color 0.15s" }}>
        <IconThumbUp filled={confirmed} color={color} size={13} />
        <span>{label}</span>
      </button>
      {confirmed && hovered && timeStr && <TooltipBubble text={timeStr} maxWidth={200} />}
    </span>
  );
}

/* ─── Filtered summary bullet (hover + click) ─── */
function SummaryBullet({ item, highlighted, onHighlight }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={() => item.ts && onHighlight(item.ts, item.secs)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", gap: 8, padding: "6px 8px", borderRadius: T.radiusMd, background: highlighted ? T.bgHover : hovered ? T.bgSurface : "transparent", border: `1px solid ${highlighted ? T.borderDefault : "transparent"}`, transition: "background 0.15s", marginBottom: 2, alignItems: "flex-start", cursor: item.ts ? "pointer" : "default" }}>
      <span style={{ fontSize: 18, lineHeight: "22px", color: T.textTertiary, flexShrink: 0, userSelect: "none" }}>·</span>
      <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 14, color: T.textPrimary, lineHeight: 1.55, fontFamily: T.fontFamily }}>{item.text}</span>
          <LooksRightBtn initialConfirmed={!!item.confirmedBy} confirmerName={item.confirmedBy || "you"} confirmedAt={item.confirmedAt} />
        </div>
        <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
          {item.ts && <TsChip item={item} highlighted={highlighted} onHighlight={onHighlight} />}
        </div>
      </div>
    </div>
  );
}

/* ─── Edit configs per low-confidence item ─── */
const EDIT_CONFIGS = {
  d3: {
    highlight: "first",
    question: "When should the onboarding rewrite happen? I heard it's the top priority — let me know if that's shifted.",
    options: ["After Q3", "After mobile release"],
    placeholder: "e.g. End of Q3",
  },
  a3: {
    highlight: "next sprint demo",
    question: "What should the timeline be? I heard next sprint demo, but correct me if I'm wrong.",
    options: ["Nov 1", "End of month"],
    placeholder: "e.g. Nov 15",
  },
};

const getHighlightedHtml = (text, highlight) => {
  const esc = text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  if (!highlight) return esc;
  const re = new RegExp(highlight.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"), "i");
  return esc.replace(re, m =>
    `<span data-highlight="true" style="text-decoration:underline;text-decoration-color:#E07000;text-decoration-thickness:2px;text-underline-offset:2px">${m}</span>`
  );
};

const AIRobotIcon = () => (
  <div style={{ width: 28, height: 28, borderRadius: T.radiusMd, background: T.bgHover, border: `1px solid ${T.borderDefault}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="5" width="12" height="9" rx="2" stroke={T.textSecondary} strokeWidth="1.3"/>
      <path d="M5 5V4a3 3 0 016 0v1" stroke={T.textSecondary} strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="5.5" cy="9.5" r="1" fill={T.textSecondary}/>
      <circle cx="10.5" cy="9.5" r="1" fill={T.textSecondary}/>
      <path d="M6 12h4" stroke={T.textSecondary} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  </div>
);

/* ─── Speech bubble with dynamic arrow ─── */
function SpeechBubble({ config, editRef, onSelect, onSave, onCancel }) {
  const containerRef              = useRef();
  const [arrowLeft, setArrowLeft] = useState(80);
  const [custom, setCustom]       = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      const hl        = editRef.current?.querySelector("[data-highlight]");
      const container = containerRef.current;
      if (hl && container) {
        const hlRect = hl.getBoundingClientRect();
        const cRect  = container.getBoundingClientRect();
        const left   = hlRect.left - cRect.left + hlRect.width / 2;
        setArrowLeft(Math.max(20, Math.min(left, cRect.width - 20)));
      }
    }, 30);
    return () => clearTimeout(id);
  }, [editRef]);

  const parts = config?.highlight && config.question.includes(config.highlight)
    ? config.question.split(config.highlight)
    : null;

  return (
    <div ref={containerRef} style={{ position: "relative", marginTop: 6, marginBottom: 2 }}>
      {/* Arrow pointing up toward the orange text */}
      <div style={{ position: "absolute", top: 0, left: arrowLeft - 8, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: `8px solid ${T.bgSurface}` }} />
      {/* Bubble card */}
      <div style={{ marginTop: 8, background: T.bgSurface, borderRadius: T.radiusLg, padding: "14px 16px" }}>
        {/* AI icon + question */}
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
          <AIRobotIcon />
          <p style={{ margin: 0, fontSize: 13, color: T.textPrimary, fontFamily: T.fontFamily, lineHeight: 1.55 }}>
            {parts ? <>{parts[0]}<strong>{config.highlight}</strong>{parts[1]}</> : config?.question}
          </p>
        </div>
        {/* Options + custom input on same line */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", paddingLeft: 38 }}>
          {config?.options.map(opt => (
            <button key={opt} onClick={() => onSelect(opt)}
              style={{ padding: "5px 14px", borderRadius: 20, border: `1px solid ${T.borderDefault}`, background: "transparent", fontSize: 13, cursor: "pointer", color: T.textSecondary, fontFamily: T.fontFamily, flexShrink: 0, transition: "background 0.12s" }}
              onMouseEnter={e => e.currentTarget.style.background = T.bgHover}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              {opt}
            </button>
          ))}
          <input value={custom} onChange={e => setCustom(e.target.value)}
            onKeyDown={e => e.key === "Enter" && custom.trim() && onSelect(custom)}
            placeholder={config?.placeholder}
            style={{ flex: 1, border: `1px solid ${T.borderSubtle}`, borderRadius: 20, padding: "5px 12px", fontSize: 13, fontFamily: T.fontFamily, outline: "none", color: T.textPrimary, background: T.bgApp }} />
        </div>
        {/* Divider */}
        <div style={{ height: 1, background: T.borderSubtle, margin: "14px -16px 12px" }} />
        {/* Save / Cancel */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={onSave}
            style={{ padding: "6px 18px", borderRadius: T.radiusMd, border: "none", background: T.brandBase, color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: T.fontFamily, cursor: "pointer" }}>
            Save
          </button>
          <button onClick={onCancel}
            style={{ padding: "6px 10px", border: "none", background: "transparent", color: T.textSecondary, fontSize: 13, fontFamily: T.fontFamily, cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Decision item ─── */
function DecisionItem({ item, highlighted, onHighlight, editingId, onEdit, cursor }) {
  const [hovered, setHovered]   = useState(false);
  const [editText, setEditText] = useState(item.text);
  const editRef                 = useRef();
  const isEditing               = editingId === item.id;
  const isLow                   = item.confidence === "low";
  const config                  = EDIT_CONFIGS[item.id];

  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(editRef.current);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges(); sel?.addRange(range);
    }
  }, [isEditing]);

  if (isEditing) return (
    <div style={{ marginBottom: 2 }}>
      <div style={{ display: "flex", gap: 8, padding: "6px 8px", borderRadius: T.radiusMd, background: T.bgSurface, border: `1px solid transparent`, alignItems: "flex-start" }}>
        <span style={{ fontSize: 18, lineHeight: "22px", color: T.textTertiary, flexShrink: 0, userSelect: "none" }}>·</span>
        <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
            <div ref={editRef} contentEditable suppressContentEditableWarning
              onInput={e => setEditText(e.currentTarget.textContent)}
              style={{ fontSize: 14, color: T.textPrimary, fontFamily: T.fontFamily, lineHeight: 1.55, outline: "none", textDecoration: "underline", textDecorationColor: T.borderDefault, textDecorationThickness: "1px", textUnderlineOffset: "3px", cursor: "text" }}
              dangerouslySetInnerHTML={{ __html: getHighlightedHtml(editText, config?.highlight) }} />
            <LooksRightBtn initialConfirmed={!!item.confirmedBy} confirmerName={item.confirmedBy || "you"} confirmedAt={item.confirmedAt} />
          </div>
          <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
            <TsChip item={item} highlighted={highlighted} onHighlight={onHighlight} />
          </div>
        </div>
      </div>
      {config && (
        <SpeechBubble config={config} editRef={editRef}
          onSelect={val => {
            const re = config.highlight ? new RegExp(config.highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") : null;
            const newText = re ? editText.replace(re, val) : val;
            setEditText(newText);
            if (editRef.current) editRef.current.innerText = newText;
            onEdit(null);
          }}
          onSave={() => onEdit(null)}
          onCancel={() => { setEditText(item.text); if (editRef.current) editRef.current.innerText = item.text; onEdit(null); }}
        />
      )}
    </div>
  );

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", gap: 8, padding: "6px 8px", borderRadius: T.radiusMd, background: highlighted ? T.bgHover : hovered ? T.bgSurface : "transparent", border: `1px solid ${highlighted ? T.borderDefault : "transparent"}`, transition: "background 0.15s", marginBottom: 2, alignItems: "flex-start" }}>
      <span style={{ fontSize: 18, lineHeight: "22px", color: T.textTertiary, flexShrink: 0, userSelect: "none" }}>·</span>
      <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 14, color: T.textPrimary, lineHeight: 1.55, fontFamily: T.fontFamily }}>
                  {editText}
                  {cursor && <CollabCursor initials={cursor.initials} name={cursor.name} color={cursor.color} />}
                </span>
          <LooksRightBtn initialConfirmed={!!item.confirmedBy} confirmerName={item.confirmedBy || "you"} confirmedAt={item.confirmedAt} />
        </div>
        <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
          {isLow && hovered && (
            <button onClick={e => { e.stopPropagation(); onEdit(item.id); }}
              style={{ fontSize: 12, color: T.textTertiary, fontFamily: T.fontFamily, background: "transparent", border: "none", cursor: "pointer", padding: "1px 6px", borderRadius: T.radiusSm }}
              onMouseEnter={e => { e.currentTarget.style.color = T.textSecondary; e.currentTarget.style.background = T.bgHover; }}
              onMouseLeave={e => { e.currentTarget.style.color = T.textTertiary; e.currentTarget.style.background = "transparent"; }}>
              Edit
            </button>
          )}
          <TsChip item={item} highlighted={highlighted} onHighlight={onHighlight} />
        </div>
      </div>
    </div>
  );
}

/* ─── Action item — avatar + "Name · task" inline ─── */
function ActionItem({ item, highlighted, onHighlight, editingId, onEdit }) {
  const [hovered, setHovered]   = useState(false);
  const [editText, setEditText] = useState(item.text);
  const editRef                 = useRef();
  const isEditing               = editingId === item.id;
  const isLow                   = item.confidence === "low";
  const config                  = EDIT_CONFIGS[item.id];
  const person                  = PEOPLE.find(p => p.name.startsWith(item.assignee));
  const initials                = person
    ? person.name.split(" ").map(w => w[0]).join("").slice(0, 2)
    : item.assignee.slice(0, 2).toUpperCase();

  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(editRef.current);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges(); sel?.addRange(range);
    }
  }, [isEditing]);

  if (isEditing) return (
    <div style={{ marginBottom: 2 }}>
      <div style={{ display: "flex", gap: 10, padding: "6px 8px", borderRadius: T.radiusMd, background: T.bgSurface, border: `1px solid transparent`, alignItems: "center" }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.avatarGray, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff", flexShrink: 0, fontFamily: T.fontFamily }}>{initials}</div>
        <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 14, color: T.textPrimary, lineHeight: 1.55, fontFamily: T.fontFamily, display: "inline-flex", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: T.textSecondary }}>{item.assignee}</span>
              <span style={{ color: T.textTertiary, margin: "0 5px", fontWeight: 400 }}>·</span>
              <span ref={editRef} contentEditable suppressContentEditableWarning
                onInput={e => setEditText(e.currentTarget.textContent)}
                style={{ outline: "none", textDecoration: "underline", textDecorationColor: T.borderDefault, textDecorationThickness: "1px", textUnderlineOffset: "3px", cursor: "text" }}
                dangerouslySetInnerHTML={{ __html: getHighlightedHtml(editText, config?.highlight) }} />
            </span>
            <LooksRightBtn initialConfirmed={!!item.confirmedBy} confirmerName={item.confirmedBy || "you"} confirmedAt={item.confirmedAt} />
          </div>
          <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
            {item.flagged && <FlagBadge flaggedBy={item.flaggedBy} />}
            <TsChip item={item} highlighted={highlighted} onHighlight={onHighlight} />
          </div>
        </div>
      </div>
      {config && (
        <SpeechBubble config={config} editRef={editRef}
          onSelect={val => {
            const re = config.highlight ? new RegExp(config.highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") : null;
            const newText = re ? editText.replace(re, val) : val;
            setEditText(newText);
            if (editRef.current) editRef.current.innerText = newText;
            onEdit(null);
          }}
          onSave={() => onEdit(null)}
          onCancel={() => { setEditText(item.text); if (editRef.current) editRef.current.innerText = item.text; onEdit(null); }}
        />
      )}
    </div>
  );

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", gap: 10, padding: "6px 8px", borderRadius: T.radiusMd, background: highlighted ? T.bgHover : hovered ? T.bgSurface : "transparent", border: `1px solid ${highlighted ? T.borderDefault : "transparent"}`, transition: "background 0.15s", marginBottom: 2, alignItems: "center" }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.avatarGray, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff", flexShrink: 0, fontFamily: T.fontFamily }}>{initials}</div>
      <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 14, color: T.textPrimary, lineHeight: 1.55, fontFamily: T.fontFamily }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: T.textSecondary }}>{item.assignee}</span>
            <span style={{ color: T.textTertiary, margin: "0 5px", fontWeight: 400 }}>·</span>
            {editText}
          </span>
          <LooksRightBtn initialConfirmed={!!item.confirmedBy} confirmerName={item.confirmedBy || "you"} confirmedAt={item.confirmedAt} />
        </div>
        <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
          {isLow && hovered && (
            <button onClick={e => { e.stopPropagation(); onEdit(item.id); }}
              style={{ fontSize: 12, color: T.textTertiary, fontFamily: T.fontFamily, background: "transparent", border: "none", cursor: "pointer", padding: "1px 6px", borderRadius: T.radiusSm }}
              onMouseEnter={e => { e.currentTarget.style.color = T.textSecondary; e.currentTarget.style.background = T.bgHover; }}
              onMouseLeave={e => { e.currentTarget.style.color = T.textTertiary; e.currentTarget.style.background = "transparent"; }}>
              Edit
            </button>
          )}
          {item.flagged && <FlagBadge flaggedBy={item.flaggedBy} />}
          <TsChip item={item} highlighted={highlighted} onHighlight={onHighlight} />
        </div>
      </div>
    </div>
  );
}

/* ─── Filter dropdown ─── */
const FILTER_OPTIONS = [
  { key: "double-check", label: "Need double-checking", count: 3 },
  { key: "flagged",      label: "Flagged",              count: 5 },
];
function FilterDropdown({ selected, onChange, onClose, counts = {} }) {
  const ref = useRef();
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: T.bgApp, border: `1px solid ${T.borderDefault}`, borderRadius: T.radiusLg, boxShadow: "0 4px 18px rgba(0,0,0,0.10)", width: 228, zIndex: 400, padding: "6px 0" }}>
      <div style={{ padding: "5px 12px 6px", fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: T.fontFamily }}>Filter by</div>
      {FILTER_OPTIONS.map(opt => {
        const checked = selected.includes(opt.key);
        return (
          <div key={opt.key} onClick={() => onChange(opt.key)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.background = T.bgHover}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${checked ? T.brandBase : T.borderDefault}`, background: checked ? T.brandBase : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.13s" }}>
              {checked && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span style={{ flex: 1, fontSize: 13, color: T.textPrimary, fontFamily: T.fontFamily }}>{opt.label}</span>
            <CountBadge n={counts[opt.key] ?? opt.count} />
          </div>
        );
      })}
    </div>
  );
}

/* ─── Recording player ─── */
function RecordingPlayer({ currentSecs, onSeek, highlightSecs }) {
  const [playing, setPlaying] = useState(false);
  const [local, setLocal] = useState(currentSecs);
  const iRef = useRef();
  useEffect(() => setLocal(currentSecs), [currentSecs]);
  useEffect(() => {
    if (playing) iRef.current = setInterval(() => setLocal(s => Math.min(s + 1, TOTAL_SECS - 1)), 1000);
    else clearInterval(iRef.current);
    return () => clearInterval(iRef.current);
  }, [playing]);
  const hlPct = highlightSecs != null ? (highlightSecs / TOTAL_SECS) * 100 : null;
  const GRID = [
    { name: "Sarah Chen", speaking: playing && local % 15 < 6 },
    { name: "Andy Park",  speaking: playing && local % 15 >= 6 && local % 15 < 11 },
    { name: "Amy Torres", speaking: playing && local % 15 >= 11 && local % 15 < 14 },
    { name: "James Liu",  speaking: false },
  ];
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, padding: 2, background: T.bgHover, borderRadius: T.radiusLg, overflow: "hidden" }}>
        {GRID.map(p => (
          <div key={p.name} style={{ aspectRatio: "16/9", background: T.bgApp, borderRadius: 4, border: p.speaking ? `2px solid ${T.brandBase}` : "2px solid transparent", transition: "border-color 0.3s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, position: "relative" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: T.playerAvatar, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#fff", fontFamily: T.fontFamily }}>
              {p.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </div>
            <span style={{ fontSize: 10, color: T.textSecondary, fontFamily: T.fontFamily }}>{p.name}</span>
            {p.speaking && <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.brandBase, position: "absolute", bottom: 6, right: 6 }} />}
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 0" }}>
        <div style={{ position: "relative", marginBottom: 6 }}>
          <input type="range" min={0} max={TOTAL_SECS - 1} value={local}
            onChange={e => { const v = +e.target.value; setLocal(v); onSeek(v); }}
            style={{ width: "100%", accentColor: T.playBtn, cursor: "pointer" }} />
          {hlPct != null && (
            <div title={secsToTs(highlightSecs)} style={{ position: "absolute", top: "50%", left: `${hlPct}%`, transform: "translate(-50%, -50%)", width: 9, height: 9, borderRadius: "50%", background: T.avatarGray, border: "2px solid #fff", pointerEvents: "none", marginTop: -10 }} />
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => setPlaying(p => !p)} style={{ width: 30, height: 30, borderRadius: "50%", background: T.playBtn, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {playing
              ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2" y="1" width="3" height="10" rx="1" fill="#fff"/><rect x="7" y="1" width="3" height="10" rx="1" fill="#fff"/></svg>
              : <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 1.5L10.5 6 2 10.5V1.5z" fill="#fff"/></svg>}
          </button>
          <span style={{ fontSize: 12, color: T.textSecondary, fontFamily: T.fontFamily, fontVariantNumeric: "tabular-nums" }}>{secsToTs(local)} / {secsToTs(TOTAL_SECS)}</span>
          {highlightSecs != null && (
            <button onClick={() => { setLocal(highlightSecs); onSeek(highlightSecs); }}
              style={{ marginLeft: "auto", fontSize: 11, fontFamily: T.fontFamily, padding: "3px 9px", borderRadius: T.radiusSm, border: `1px solid ${T.borderDefault}`, background: "transparent", color: T.textSecondary, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.avatarGray, display: "inline-block" }} />
              Jump to {secsToTs(highlightSecs)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Ask AI modal ─── */
const ASK_SUGGESTIONS = [
  "What were the main decisions made?",
  "Summarize the action items for Andy",
  "Are there any conflicting decisions?",
  "What topics had the most uncertainty?",
  "Who is responsible for the API work?",
];
function AskAiModal({ onClose, initialQuery = "" }) {
  const [query, setQuery]   = useState(initialQuery);
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  useEffect(() => { inputRef.current?.focus(); }, []);
  const submit = async (q) => {
    const text = q || query;
    if (!text.trim()) return;
    setQuery(text); setLoading(true); setAnswer(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 300,
          messages: [{ role: "user", content: `You are reviewing a meeting "Q3 Roadmap Sync". Context:\nSummary: Stability-first Q3. Three initiatives. Mobile timeline updated.\nDecisions: Freeze Q3 feature requests. Delay mobile release. Prioritize onboarding rewrite.\nActions: Andy leads API refactor. Amy completes design audit by Oct 12. Andy updates staging.\nAnswer concisely (2-3 sentences): ${text}` }] })
      });
      const data = await res.json();
      setAnswer(data.content?.[0]?.text || "No response.");
    } catch { setAnswer("Unable to connect. Please try again."); }
    setLoading(false);
  };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.bgApp, border: `1px solid ${T.borderDefault}`, borderRadius: T.radiusXl, width: "100%", maxWidth: 520, boxShadow: "0 16px 48px rgba(0,0,0,0.12)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 12px", borderBottom: `1px solid ${T.borderSubtle}` }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary, fontFamily: T.fontFamily }}>Ask about this meeting</span>
          <button onClick={onClose} style={{ width: 26, height: 26, borderRadius: "50%", border: `1px solid ${T.borderSubtle}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke={T.textTertiary} strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.borderSubtle}` }}>
          <div style={{ display: "flex", gap: 8 }}>
            <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
              placeholder="What would you like to know?"
              style={{ flex: 1, fontFamily: T.fontFamily, fontSize: 14, color: T.textPrimary, background: T.bgSurface, border: `1px solid ${T.borderDefault}`, borderRadius: T.radiusMd, padding: "8px 12px", outline: "none" }} />
            <button onClick={() => submit()} style={{ padding: "0 16px", borderRadius: T.radiusMd, border: "none", background: T.brandBase, color: "#fff", fontFamily: T.fontFamily, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Ask</button>
          </div>
        </div>
        {(loading || answer) && (
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.borderSubtle}` }}>
            {loading
              ? <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${T.textSecondary}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} /><span style={{ fontSize: 13, color: T.textTertiary, fontFamily: T.fontFamily }}>Thinking…</span></div>
              : <p style={{ margin: 0, fontSize: 13, color: T.textPrimary, fontFamily: T.fontFamily, lineHeight: 1.65 }}>{answer}</p>}
          </div>
        )}
        {!answer && !loading && (
          <div style={{ padding: "14px 20px" }}>
            <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 600, color: T.textTertiary, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: T.fontFamily }}>Try asking</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {ASK_SUGGESTIONS.map(q => (
                <button key={q} onClick={() => submit(q)}
                  style={{ textAlign: "left", padding: "8px 12px", borderRadius: T.radiusMd, border: `1px solid ${T.borderSubtle}`, background: T.bgSurface, color: T.textSecondary, fontFamily: T.fontFamily, fontSize: 13, cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.bgHover}
                  onMouseLeave={e => e.currentTarget.style.background = T.bgSurface}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeInOut { from { opacity: 0; transform: translateX(-50%) translateY(4px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`}</style>
    </div>
  );
}

/* ════════════════════════════════ App ════════════════════════════════ */
export default function App() {
  const [activeTab, setActiveTab]             = useState("report");
  const [askAiOpen, setAskAiOpen]             = useState(false);
  const [searchQuery, setSearchQuery]         = useState("");
  const [searchOpen, setSearchOpen]           = useState(false);
  const [data]                                = useState(INITIAL_DATA);
  const [highlightedTs, setHighlightedTs]     = useState(null);
  const [highlightedSecs, setHighlightedSecs] = useState(null);
  const [playerSecs, setPlayerSecs]           = useState(0);
  const [panelOpen, setPanelOpen]             = useState(false);
  const [panelStripHovered, setPanelStripHovered] = useState(false);
  const [step, setStep]                       = useState(0);
  const [filterOpen, setFilterOpen]           = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [editingId, setEditingId]             = useState(null);
  const [linkCopied, setLinkCopied]           = useState(false);
  const transcriptRef                         = useRef({});
  const searchRef                             = useRef();

  const allItems = [...data.summary, ...data.decisions, ...data.actions];
  const tsFlagged = {};
  data.actions.forEach(i => { if (i.ts && i.flagged) tsFlagged[i.ts] = true; });

  const toggleFilter = key =>
    setSelectedFilters(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

  useEffect(() => {
    const handler = e => { if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Toggle highlight — clicking same item deselects */
  const handleHighlight = (ts, secs) => {
    if (!ts) return;
    if (highlightedTs === ts) { setHighlightedTs(null); setHighlightedSecs(null); return; }
    setHighlightedTs(ts); setHighlightedSecs(secs);
    if (!panelOpen) {
      setPanelOpen(true);
      setTimeout(() => transcriptRef.current[ts]?.scrollIntoView({ behavior: "smooth", block: "center" }), 280);
    } else {
      transcriptRef.current[ts]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const TAB_PAD = 16;

  /* ── Filtered lists ── */
  const isFiltered        = selectedFilters.length > 0;
  const onlyDC            = i => !isFiltered || (selectedFilters.includes("double-check") && i.confidence === "low");
  const filteredSummary   = data.summary.filter(onlyDC);
  const filteredDecisions = data.decisions.filter(onlyDC);
  const filteredActions   = data.actions.filter(i => passesFilter(i, selectedFilters));

  const filterCounts = {
    "double-check": [...data.decisions, ...data.actions].filter(i => i.confidence === "low").length,
    "flagged":      data.actions.filter(i => i.flagged).length,
  };

  if (step === 1) return (
    <div style={{ background: T.bgApp, minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ background: T.bgSurface, borderRadius: T.radiusXl, padding: "40px 48px", textAlign: "center", maxWidth: 400, border: `1px solid ${T.borderSubtle}` }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.bgHover, border: `2px solid ${T.borderDefault}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={T.textPrimary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 style={{ fontFamily: T.fontFamily, fontSize: 18, fontWeight: 600, margin: "0 0 8px", color: T.textPrimary }}>Review submitted</h2>
        <p style={{ fontFamily: T.fontFamily, fontSize: 14, color: T.textSecondary, margin: "0 0 28px", lineHeight: 1.6 }}>Saved and reviewers notified.</p>
        <button onClick={() => { setStep(0); setHighlightedTs(null); setHighlightedSecs(null); }}
          style={{ fontFamily: T.fontFamily, fontSize: 14, fontWeight: 600, padding: "6px 20px", borderRadius: T.radiusMd, border: "none", background: T.brandBase, color: "#fff", cursor: "pointer" }}>
          Start new review
        </button>
      </div>
    </div>
  );

  if (step === 99) return (
    <div style={{ background: T.bgApp, minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ background: T.bgSurface, borderRadius: T.radiusXl, padding: "40px 48px", textAlign: "center", maxWidth: 380, border: `1px solid ${T.borderSubtle}` }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: T.bgHover, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <h2 style={{ fontFamily: T.fontFamily, fontSize: 17, fontWeight: 600, margin: "0 0 8px", color: T.textPrimary }}>Exit without submitting?</h2>
        <p style={{ fontFamily: T.fontFamily, fontSize: 14, color: T.textSecondary, margin: "0 0 24px", lineHeight: 1.6 }}>Your edits will be saved as a draft. Come back anytime.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => setStep(0)} style={{ fontFamily: T.fontFamily, fontSize: 14, fontWeight: 600, padding: "6px 16px", borderRadius: T.radiusMd, border: `1.5px solid ${T.brandBase}`, background: "transparent", color: T.brandBase, cursor: "pointer" }}>Go back</button>
          <button onClick={() => { setStep(0); setHighlightedTs(null); setHighlightedSecs(null); }} style={{ fontFamily: T.fontFamily, fontSize: 14, fontWeight: 600, padding: "6px 16px", borderRadius: T.radiusMd, border: "none", background: T.brandBase, color: "#fff", cursor: "pointer" }}>Exit</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: T.bgApp, fontFamily: T.fontFamily, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {askAiOpen && <AskAiModal initialQuery={searchQuery} onClose={() => { setAskAiOpen(false); setSearchQuery(""); }} />}

      {/* ── Title bar ── */}
      <div style={{ background: "#DEDEDE", display: "flex", alignItems: "center", padding: "0 16px", height: 48, gap: 12, borderBottom: `1px solid ${T.borderDefault}`, flexShrink: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="8" height="8" rx="2" fill={T.textPrimary}/>
          <rect x="13" y="3" width="8" height="8" rx="2" fill={T.textPrimary} opacity="0.45"/>
          <rect x="3" y="13" width="8" height="8" rx="2" fill={T.textPrimary} opacity="0.45"/>
          <rect x="13" y="13" width="8" height="8" rx="2" fill={T.textPrimary} opacity="0.18"/>
        </svg>
        <span style={{ color: T.textPrimary, fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}>Meeting Review</span>
        <span style={{ color: T.textDisabled }}>·</span>
        <span style={{ color: T.textTertiary, fontSize: 13, whiteSpace: "nowrap" }}>Q3 Roadmap Sync — 1h 18m</span>

        {/* ── Search bar — far right ── */}
        <div ref={searchRef} style={{ marginLeft: "auto", maxWidth: 600, position: "relative" }}>
          <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 1 }}>
            <IconSearch color={T.textTertiary} size={14} />
          </div>
          <input
            ref={el => { if (el && searchOpen) el.focus(); }}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={e => { if (e.key === "Enter" && searchQuery.trim()) { setSearchOpen(false); setAskAiOpen(true); } if (e.key === "Escape") setSearchOpen(false); }}
            placeholder="Ask anything"
            style={{ width: "100%", boxSizing: "border-box", fontFamily: T.fontFamily, fontSize: 13, color: T.textPrimary, background: "#FFFFFF", border: "none", borderRadius: 20, padding: "6px 14px 6px 32px", outline: "none", cursor: "text" }}
          />

          {/* ── Dropdown card — below search bar, full container width ── */}
          {searchOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, width: "100%", background: "#FFFFFF", borderRadius: 14, boxShadow: "0 8px 40px rgba(0,0,0,0.16)", zIndex: 600, overflow: "hidden" }}>
              {/* Try asking label */}
              <div style={{ padding: "16px 16px 6px", fontSize: 11, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: T.fontFamily }}>
                Try asking
              </div>
              {/* Suggestions */}
              {ASK_SUGGESTIONS.map(q => (
                <button key={q}
                  onClick={() => { setSearchQuery(q); setSearchOpen(false); setAskAiOpen(true); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "13px 16px", background: "transparent", border: "none", color: T.textSecondary, fontFamily: T.fontFamily, fontSize: 15, cursor: "pointer", transition: "background 0.12s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.bgSurface}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  {q}
                </button>
              ))}
              <div style={{ height: 8 }} />
            </div>
          )}
        </div>

      </div>

      {/* ── Body — grid: left panel | right panel ── */}
      <div style={{ display: "grid", gridTemplateColumns: panelOpen ? "1fr 340px" : "1fr 27px", transition: "grid-template-columns 0.25s ease", flex: 1, overflow: "hidden" }}>

        {/* ── LEFT column ── */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", borderRight: `1px solid ${T.borderSubtle}` }}>
          {/* Tab bar */}
          <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: `12px ${TAB_PAD}px 0`, borderBottom: `1px solid ${T.borderSubtle}`, flexShrink: 0, background: T.bgApp }}>
            {linkCopied && (
              <div style={{ position: "absolute", bottom: -16, left: "50%", transform: "translateX(-50%)", background: "rgba(51,51,51,0.88)", color: "#fff", fontSize: 12, fontFamily: T.fontFamily, fontWeight: 500, padding: "4px 14px", borderRadius: 20, whiteSpace: "nowrap", zIndex: 200, pointerEvents: "none", animation: "fadeInOut 0.2s ease" }}>
                Link copied
              </div>
            )}
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              {[
                { key: "report",    label: "Full Report",  badge: null },
                { key: "bookmarks", label: "My bookmarks", badge: BOOKMARKS.length },
              ].map((tab, ti) => {
                const active = activeTab === tab.key;
                return (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                    style={{ fontFamily: T.fontFamily, fontSize: 15, fontWeight: active ? 600 : 500, color: active ? T.textPrimary : T.textTertiary, background: "transparent", border: "none", borderBottom: active ? `2px solid ${T.brandBase}` : "2px solid transparent", padding: `12px ${ti === 0 ? 0 : TAB_PAD}px 10px ${ti === 0 ? 0 : TAB_PAD}px`, marginRight: ti === 0 ? TAB_PAD : 0, cursor: "pointer", transition: "color 0.15s", marginBottom: -1, display: "flex", alignItems: "center", gap: 6 }}>
                    {tab.label}
                    {tab.badge != null && <CountBadge n={tab.badge} />}
                  </button>
                );
              })}
            </div>
            {activeTab === "report" && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, paddingBottom: 10 }}>
                <Tooltip label="2 reviewing" maxWidth={160}>
                  <div style={{ display: "flex", alignItems: "center", marginRight: 2 }}>
                    {PEOPLE.map((p, i) => {
                      const active = p.id === "p1" || p.id === "p2";
                      return (
                        <div key={p.id} style={{ marginLeft: i === 0 ? 0 : -5, zIndex: PEOPLE.length - i, width: 22, height: 22, borderRadius: "50%", background: T.avatarGray, opacity: active ? 1 : 0.5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff", border: `1.5px solid ${T.bgApp}`, boxSizing: "border-box", cursor: "default" }}>
                          {p.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                        </div>
                      );
                    })}
                  </div>
                </Tooltip>
                <div style={{ width: 1, height: 14, background: T.borderSubtle }} />
                <div style={{ position: "relative" }}>
                  <IconBtn icon={IconFilter} tooltip="Filter" active={filterOpen || selectedFilters.length > 0} onClick={() => setFilterOpen(o => !o)} />
                  {filterOpen && <FilterDropdown selected={selectedFilters} onChange={toggleFilter} onClose={() => setFilterOpen(false)} counts={filterCounts} />}
                </div>
                <IconBtn icon={IconLink} tooltip="Copy link" onClick={() => { setLinkCopied(true); setTimeout(() => setLinkCopied(false), 5000); }} />
                <IconBtn icon={IconShare} tooltip="Share" onClick={() => setStep(1)} />
              </div>
            )}
          </div>
          {/* Left content */}
          <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", padding: "20px 16px" }}>
            {activeTab === "report" && (
              <>
                {(!isFiltered || filteredSummary.length > 0) && (
                  <div style={{ marginBottom: 48 }}>
                    <SectionHeader>Summary</SectionHeader>
                    {isFiltered
                      ? filteredSummary.map(item => (
                          <SummaryBullet key={item.id} item={item} highlighted={highlightedTs === item.ts} onHighlight={handleHighlight} />
                        ))
                      : <ParagraphSummary items={data.summary} onHighlight={handleHighlight} highlightedTs={highlightedTs} />
                    }
                  </div>
                )}
                {(!isFiltered || filteredDecisions.length > 0) && (
                  <div style={{ marginBottom: 48 }}>
                    <SectionHeader count={data.decisions.length}>Decisions</SectionHeader>
                    {filteredDecisions.map(item => (
                      <DecisionItem key={item.id} item={item} highlighted={highlightedTs === item.ts} onHighlight={handleHighlight} editingId={editingId} onEdit={setEditingId}
                        cursor={item.id === "d2" ? { initials: "AP", name: "Andy Park", color: "#777777" } : null} />
                    ))}
                  </div>
                )}
                {(!isFiltered || filteredActions.length > 0) && (
                  <div style={{ marginBottom: 28 }}>
                    <SectionHeader count={data.actions.length}>Action items</SectionHeader>
                    {filteredActions.map(item => (
                      <ActionItem key={item.id} item={item} highlighted={highlightedTs === item.ts} onHighlight={handleHighlight} editingId={editingId} onEdit={setEditingId} />
                    ))}
                  </div>
                )}
                {isFiltered && filteredSummary.length === 0 && filteredDecisions.length === 0 && filteredActions.length === 0 && (
                  <p style={{ fontSize: 13, color: T.textTertiary, padding: "20px 4px", fontFamily: T.fontFamily }}>No items match the current filter.</p>
                )}
              </>
            )}
            {activeTab === "bookmarks" && (
              <>
                <p style={{ margin: "0 0 20px", fontSize: 12, color: T.textTertiary, fontFamily: T.fontFamily, lineHeight: 1.6 }}>
                  Moments you flagged during the meeting — just for you, not shared with the group.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {BOOKMARKS.map(bm => {
                    const hi = highlightedTs === bm.ts;
                    return (
                      <div key={bm.id}
                        style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "8px 6px", borderRadius: T.radiusMd, background: hi ? T.bgHover : "transparent", border: `1px solid ${hi ? T.borderDefault : "transparent"}`, transition: "background 0.15s", cursor: "pointer" }}
                        onClick={() => handleHighlight(bm.ts, bm.secs)}
                        onMouseEnter={e => { if (!hi) e.currentTarget.style.background = T.bgSurface; }}
                        onMouseLeave={e => { if (!hi) e.currentTarget.style.background = "transparent"; }}>
                        <span style={{ fontSize: 18, lineHeight: "22px", color: T.textTertiary, flexShrink: 0, userSelect: "none", alignSelf: "flex-start", marginTop: 1 }}>·</span>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: 14, color: T.textPrimary, fontFamily: T.fontFamily, lineHeight: 1.55 }}>"{bm.quote}"</span>
                          <span style={{ display: "block", fontSize: 11, color: T.textTertiary, fontFamily: T.fontFamily, marginTop: 3 }}>— {bm.speaker}</span>
                        </div>
                        <BookmarkTsChip ts={bm.ts} secs={bm.secs} highlighted={hi} onHighlight={handleHighlight} />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── RIGHT column (side panel) ── */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", background: T.bgSubtle, borderLeft: `1px solid ${T.borderSubtle}`, overflow: "hidden" }}
          onMouseEnter={() => { if (!panelOpen) setPanelStripHovered(true); }}
          onMouseLeave={() => setPanelStripHovered(false)}>

          {/* Tooltip — centered on full panel height, left side, only when collapsed */}
          {!panelOpen && panelStripHovered && (
            <div style={{ position: "absolute", top: "50%", right: "calc(100% + 8px)", transform: "translateY(-50%)", background: "rgba(51,51,51,0.88)", color: "#fff", fontSize: 11, fontFamily: T.fontFamily, fontWeight: 500, padding: "5px 10px", borderRadius: 6, whiteSpace: "nowrap", zIndex: 300, pointerEvents: "none" }}>
              Recording &amp; Transcript
              <div style={{ position: "absolute", top: "50%", left: "100%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "5px solid rgba(51,51,51,0.88)" }} />
            </div>
          )}

          {/* Panel header */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: panelOpen ? "space-between" : "center", padding: panelOpen ? "24px 12px 10px" : "24px 0 10px", borderBottom: panelOpen ? `1px solid ${T.borderSubtle}` : "none", flexShrink: 0, background: T.bgSubtle }}>
            {panelOpen ? (
              <>
                <span style={{ fontSize: 15, fontWeight: 600, color: T.textPrimary, fontFamily: T.fontFamily }}>Recording &amp; Transcript</span>
                <button onClick={() => setPanelOpen(false)}
                  style={{ width: 24, height: 24, borderRadius: T.radiusSm, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4 2l4 4-4 4" stroke={T.textSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </>
            ) : (
              <button onClick={() => setPanelOpen(true)}
                style={{ width: 24, height: 24, borderRadius: T.radiusSm, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: "rotate(180deg)" }}>
                  <path d="M4 2l4 4-4 4" stroke={T.textSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>

          {/* Transcript content */}
          {panelOpen && (
            <div style={{ padding: "10px 12px", overflowY: "auto", flex: 1, scrollbarWidth: "none" }}>
              <RecordingPlayer currentSecs={playerSecs} onSeek={setPlayerSecs} highlightSecs={highlightedSecs} />
              {(() => {
                let lastSpeaker = null;
                return TRANSCRIPT.map(entry => {
                  const hi = highlightedTs === entry.ts;
                  const isNew = entry.speaker !== lastSpeaker;
                  lastSpeaker = entry.speaker;
                  return (
                    <div key={entry.ts} ref={el => transcriptRef.current[entry.ts] = el}
                      onClick={() => { setHighlightedTs(entry.ts); setHighlightedSecs(entry.secs); setPlayerSecs(entry.secs); }}
                      style={{ marginBottom: isNew ? 14 : 4, cursor: "pointer", padding: "4px 6px", borderRadius: T.radiusMd, background: hi ? T.bgHover : "transparent", border: `1px solid ${hi ? T.borderDefault : "transparent"}`, transition: "background 0.2s" }}>
                      <div style={{ flex: 1 }}>
                        {isNew && (
                          <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginBottom: 3 }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: T.textPrimary, fontFamily: T.fontFamily }}>{entry.speaker}</span>
                            <span style={{ fontSize: 10, color: T.textTertiary, fontFamily: T.fontFamily, fontVariantNumeric: "tabular-nums" }}>{entry.ts}</span>
                            {tsFlagged[entry.ts] && <FlagBadge />}
                          </div>
                        )}
                        {!isNew && (
                          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                            <span style={{ fontSize: 10, color: T.textTertiary, fontFamily: T.fontFamily, fontVariantNumeric: "tabular-nums" }}>{entry.ts}</span>
                            {tsFlagged[entry.ts] && <FlagBadge />}
                          </div>
                        )}
                        <div style={{ borderRadius: "4px 10px 10px 10px", padding: "7px 10px", display: "inline-block", maxWidth: "100%", boxSizing: "border-box" }}>
                          <p style={{ margin: 0, fontSize: 12, color: T.textPrimary, lineHeight: 1.55, fontFamily: T.fontFamily }}>{entry.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>

      </div>    </div>
  );
}
