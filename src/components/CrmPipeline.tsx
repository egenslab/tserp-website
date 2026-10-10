// CRM page: the lead pipeline stages used in the TravelSuite ERP CRM module.
import { Icon } from "./ui";

const STAGES = [
  { icon: "i-bell", title: "New", text: "Inquiry arrives, owner assigned" },
  { icon: "i-phone", title: "Contacted", text: "First call logged, follow-up set" },
  { icon: "i-target", title: "Qualified", text: "Dates, budget and travellers confirmed" },
  { icon: "i-file", title: "Proposal Sent", text: "Quote sent, tracked until it expires" },
  { icon: "i-chat", title: "Negotiation", text: "Changes noted, quote updated" },
  { icon: "i-check", title: "Converted", text: "Booking and invoice in one click" },
];

export default function CrmPipeline() {
  return (
    <section className="section alt crm-pipe" id="pipeline">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">The lead pipeline</span>
          <h2>Six stages, each with a clear next step</h2>
          <p>Every lead follows the same path, in a list or on a Kanban board.</p>
        </div>
        <ol className="cp-board">
          {STAGES.map((s, i) => (
            <li key={s.title} className={i === STAGES.length - 1 ? "cp-col won" : "cp-col"} style={{ "--p": `${((i + 1) / STAGES.length) * 100}%` } as React.CSSProperties}>
              <span className="cp-bar" aria-hidden="true"><i /></span>
              <div className="cp-top">
                <span className="cp-ico"><Icon name={s.icon} /></span>
                <span className="cp-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="cp-lost"><Icon name="i-x" /><span><span className="b">Lost leads</span> stay on record, so you can win them back next season.</span></p>
      </div>
    </section>
  );
}
