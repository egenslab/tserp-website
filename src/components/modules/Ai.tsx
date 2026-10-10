// AI Automation page sections. The AI visuals stay qualitative (no model names or scores).
// The automation rules in the Bottom section follow real CRM and Conversations settings.
// All names and values are example data.
import { Icon } from "../ui";

const STAGES = [
  { t: "Enquiries arrive", d: "Website forms and messaging channels", ic: "i-chat" },
  { t: "Common questions answered", d: "Package details, documents, next steps", ic: "i-bot" },
  { t: "Needs captured", d: "Destination, dates, travellers, budget", ic: "i-tasks" },
  { t: "Warm leads to your team", d: "A consultant takes over the conversation", ic: "i-users" },
];

/** Top 1: an enquiry funnel next to a lead qualification card. */
export function AiTop1() {
  return (
    <section className="section alt au-funnel">
      <div className="container au-fn-grid">
        <div className="au-fn-intro">
          <span className="eyebrow">Lead qualification</span>
          <h2>Let AI sort the enquiries, let people close the bookings</h2>
          <p>AI handles the first questions and collects what a consultant needs to quote. Enquiries that are ready move to your team with the details already filled in.</p>
          <ol className="au-fn" aria-label="How enquiries are filtered">
            {STAGES.map((s, n) => (
              <li key={s.t} style={{ width: `${100 - n * 11}%` }}>
                <Icon name={s.ic} />
                <span><span className="b">{s.t}</span><small>{s.d}</small></span>
              </li>
            ))}
          </ol>
        </div>

        <div className="au-lead" aria-label="Example qualified enquiry">
          <div className="au-lead-head">
            <span className="au-lead-av">01</span>
            <span><span className="b">Customer 01</span><small>New enquiry · Messaging channel</small></span>
            <span className="au-badge">Warm lead</span>
          </div>
          <p className="au-quote">“Looking for a family holiday by the sea in December, two adults and two kids, nothing too expensive.”</p>
          <span className="au-lead-t"><Icon name="i-spark" />Captured from the conversation</span>
          <ul className="au-slots">
            <li><Icon name="i-globe" /><small>Destination</small><span className="b">Beach, flexible</span></li>
            <li><Icon name="i-calendar" /><small>Dates</small><span className="b">December</span></li>
            <li><Icon name="i-users" /><small>Travellers</small><span className="b">2 adults, 2 children</span></li>
            <li className="miss"><Icon name="i-wallet" /><small>Budget</small><span className="b">Ask consultant</span></li>
          </ul>
          <div className="au-handoff">
            <Icon name="i-headset" />
            <span>Handed to <span className="b">Consultant A</span> with the chat history</span>
            <Icon name="i-right" />
          </div>
        </div>
      </div>
      <div className="container"><p className="hj-note">Example data.</p></div>
    </section>
  );
}

/** Top 2: an itinerary draft on paper with a draft stamp and a consultant review bar. */
export function AiTop2() {
  return (
    <section className="section au-draft">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Trip planner</span>
          <h2>A first draft in front of your consultant, not your customer</h2>
          <p>The trip planner turns a short brief into a draft built from your own packages and content. A consultant edits and approves it before anything is sent.</p>
        </div>

        <div className="au-desk">
          <div className="au-brief">
            <span className="au-brief-t"><Icon name="i-file" />Brief</span>
            <ul>
              <li><span>Where</span><span className="b">Example coast</span></li>
              <li><span>How long</span><span className="b">5 nights</span></li>
              <li><span>Who</span><span className="b">Family of 4</span></li>
              <li><span>Style</span><span className="b">Relaxed, beach</span></li>
            </ul>
            <span className="au-arrow" aria-hidden="true"><Icon name="i-right" /></span>
          </div>

          <article className="au-paper" aria-label="Example draft itinerary">
            <span className="au-stamp">Draft</span>
            <header>
              <small>Sky Travels · Proposal draft</small>
              <h3>Family beach week</h3>
              <p>5 nights · 2 adults, 2 children · December</p>
            </header>
            <div className="au-blocks">
              <section><Icon name="i-bed" /><span><span className="b">Stay</span><small>Beachfront family room from your hotel list</small></span></section>
              <section><Icon name="i-map" /><span><span className="b">Activities</span><small>Two half-day tours from your tour packages</small></span></section>
              <section><Icon name="i-car" /><span><span className="b">Transfers</span><small>Airport pick-up and drop-off</small></span></section>
              <section className="au-note"><Icon name="i-bell" /><span><span className="b">For the consultant</span><small>Confirm budget and child ages before quoting</small></span></section>
            </div>
            <footer className="au-review">
              <span className="au-rv-who"><Icon name="i-headset" />Consultant review</span>
              <span className="au-rv-btn">Edit</span>
              <span className="au-rv-btn on"><Icon name="i-check" />Approve</span>
            </footer>
          </article>
        </div>
        <p className="hj-note">Example data. Drafts are suggestions; your team decides what is sent.</p>
      </div>
    </section>
  );
}

const RULES = [
  { when: "A customer enquiry arrives", then: ["Create a CRM lead automatically", "Assign the lead to staff automatically"], where: "CRM settings", ic: "i-target" },
  { when: "A message arrives outside business hours", then: ["Run your after-hours automation"], where: "Conversation settings", ic: "i-clock" },
  { when: "A lead follow-up is due", then: ["Send a reminder by email or SMS"], where: "CRM follow-up defaults", ic: "i-bell" },
  { when: "A customer replies to a closed chat", then: ["Reopen the conversation in the inbox"], where: "Inbox behavior", ic: "i-chat" },
];

/** Bottom: when/then automation rule cards with an automation report strip. */
export function AiBottom() {
  return (
    <section className="section alt mod-after au-rules">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Everyday automation</span>
          <h2>Rules that run on their own, with a report to prove it</h2>
          <p>Alongside AI, TravelSuite ERP automates routine steps in the CRM and the inbox. You switch each rule on in settings.</p>
        </div>

        <div className="au-rule-grid">
          {RULES.map((r, n) => (
            <div key={r.when} className="au-rule">
              <span className="au-rule-n">Rule {n + 1}</span>
              <div className="au-when">
                <span className="au-ico"><Icon name={r.ic} /></span>
                <span><small>When</small><span className="b">{r.when}</span></span>
              </div>
              <ul className="au-then">
                {r.then.map((t) => <li key={t}><small>Then</small>{t}</li>)}
              </ul>
              <span className="au-where"><Icon name="i-layers" />{r.where}</span>
            </div>
          ))}
        </div>

        <div className="au-report">
          <span className="au-report-t"><Icon name="i-chart" /><span className="b">Inbox automation report</span></span>
          <span className="au-meter" aria-hidden="true"><i style={{ flexGrow: 47 }} /><i className="bad" style={{ flexGrow: 3 }} /></span>
          <span className="au-report-v"><span className="b">50</span> executed</span>
          <span className="au-report-v ok"><span className="b">47</span> successful</span>
          <span className="au-report-v bad"><span className="b">3</span> failed</span>
        </div>
        <p className="hj-note">Example data.</p>
      </div>
    </section>
  );
}
