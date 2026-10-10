// CRM page: the lead pipeline stages used in the TravelSuite ERP CRM module.
import { Icon } from "./ui";

const STAGES = [
  { icon: "i-bell", title: "New", when: "An inquiry arrives from your website, WhatsApp, Facebook, a call or a walk-in.", then: "Assign an owner and set a priority, so the lead doesn't wait in a shared inbox." },
  { icon: "i-phone", title: "Contacted", when: "Your staff member has spoken to the traveller for the first time.", then: "Log the call or chat and schedule the next follow-up with a reminder." },
  { icon: "i-target", title: "Qualified", when: "Destination, dates, budget and travellers are confirmed.", then: "Tag the lead (Hajj, Corporate, VIP) and start preparing options." },
  { icon: "i-file", title: "Proposal Sent", when: "A priced quotation or package has gone to the customer.", then: "Keep each version on the record and follow up before it expires." },
  { icon: "i-chat", title: "Negotiation", when: "The customer is comparing, asking for changes or a better price.", then: "Note what changed, update the quote and keep the deadline in view." },
  { icon: "i-check", title: "Converted", when: "The customer accepts and pays a deposit or the full amount.", then: "Turn it into a booking and invoice in one click, with no retyping." },
];

export default function CrmPipeline() {
  return (
    <section className="section alt crm-pipe" id="pipeline">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">The lead pipeline</span>
          <h2>Six stages, each with a clear next step</h2>
          <p>Every lead moves through the same stages in the CRM, so your whole team knows what has happened and what to do next. Work in a list or drag cards across the Kanban board.</p>
        </div>
        <ol className="cp-stages">
          {STAGES.map((s, i) => (
            <li key={s.title} className={i === STAGES.length - 1 ? "cp-stage won" : "cp-stage"}>
              <div className="cp-head">
                <span className="cp-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="cp-line" aria-hidden="true" />
              </div>
              <h3><Icon name={s.icon} />{s.title}</h3>
              <span className="cp-label">Moves in when</span>
              <p className="cp-when">{s.when}</p>
              <span className="cp-label">Then</span>
              <p className="cp-then">{s.then}</p>
            </li>
          ))}
        </ol>
        <p className="cp-lost"><Icon name="i-x" /><span><span className="b">Lost leads</span> stay on record with their history, so you can see where deals slip and win them back next season.</span></p>
      </div>
    </section>
  );
}
