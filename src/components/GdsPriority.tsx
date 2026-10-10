// Flights page: how the multi-GDS priority search falls back from one GDS to the next.
import { Icon } from "./ui";

const GDS = [
  { name: "Amadeus", state: "down", note: "Not responding" },
  { name: "Sabre", state: "ok", note: "Fares found" },
  { name: "Travelport", state: "wait", note: "Standby" },
  { name: "Galileo", state: "wait", note: "Standby" },
];

const POINTS = [
  { icon: "i-tasks", title: "You set the order", text: "Choose which GDS is searched first, second, third and fourth." },
  { icon: "i-shield", title: "Automatic fallback", text: "If a GDS doesn't respond, the next one is searched without anyone stepping in." },
  { icon: "i-lock", title: "Your own credentials", text: "Connect each GDS with your own PCC or Office ID and contracts." },
];

export default function GdsPriority() {
  return (
    <section className="section gds-prio" id="gds">
      <div className="container">
        <div className="section-head light">
          <span className="eyebrow">Multi-GDS priority search</span>
          <h2>Four GDS, searched in the order you choose</h2>
          <p>Amadeus, Sabre, Travelport and Galileo work as one search. If one doesn&apos;t answer, the next takes over, so your customers always see fares.</p>
        </div>
        <div className="gp-flow" aria-label="Example: Amadeus is not responding, so the search falls back to Sabre">
          <div className="gp-search">
            <span className="gp-ico"><Icon name="i-search" /></span>
            <span><small>Search</small><span className="b">DAC → DXB · 14 Nov</span></span>
          </div>
          <ol>
            {GDS.map((g, i) => (
              <li key={g.name} className={`gp-node is-${g.state}`}>
                <span className="gp-num">{i + 1}</span>
                <span className="b">{g.name}</span>
                <small><i />{g.note}</small>
                {g.state === "down" && <em className="gp-fallback">Fallback <Icon name="i-arrow" /></em>}
              </li>
            ))}
          </ol>
        </div>
        <div className="gp-points">
          {POINTS.map((p) => (
            <div key={p.title}>
              <span className="gp-ico"><Icon name={p.icon} /></span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
