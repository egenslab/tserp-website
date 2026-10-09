import { COUNTRIES } from "@/lib/content";
import { Icon } from "./ui";

/** "Where we work" section with country flags and office badges. */
export default function Markets() {
  return (
    <section className="section markets-wrap" id="markets">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Where we work</span>
          <h2>Serving travel businesses across the GCC, Southeast Asia and beyond</h2>
          <p>Local teams in the USA, Malaysia and Bangladesh support agencies in every market we serve.</p>
        </div>
        <ul className="markets">
          {COUNTRIES.map((c) => (
            <li key={c.code} className={c.office ? "market has-office" : "market"}>
              <img src={`/assets/img/flags/${c.code}.svg`} alt="" width={36} height={27} />
              <span><b>{c.name}</b><small>{c.region}</small></span>
              {c.office && <em className="office-badge"><Icon name="i-building" />Office</em>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
