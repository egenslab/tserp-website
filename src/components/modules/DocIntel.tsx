// Document Intelligence (OCR) page sections. Labels follow the module's dashboard, scan history,
// OCR logs and settings screens. The passport and all values below are fictional example data.
import { Icon } from "../ui";

const FIELDS = [
  { n: 1, label: "Surname", parsed: "TRAVELLER", value: "TRAVELLER" },
  { n: 2, label: "Given names", parsed: "SAMPLE ONE", value: "SAMPLE ONE" },
  { n: 3, label: "Passport number", parsed: "A0O00000", value: "A0000000", fixed: true },
  { n: 4, label: "Date of birth", parsed: "01 JAN 1990", value: "01 JAN 1990" },
  { n: 5, label: "Date of expiry", parsed: "01 JAN 2032", value: "01 JAN 2032" },
];

/** Top 1: a passport scan with highlighted fields flowing into a Visa applicant form. */
export function DocIntelTop1() {
  return (
    <section className="section alt di-scan">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How a scan works</span>
          <h2>From passport photo to filled form, checked by your staff</h2>
          <p>OCR reads the document and proposes values for the form. Staff compare, correct anything wrong and apply. The parsed and the reviewed result are both kept.</p>
        </div>

        <div className="di-flow">
          <figure className="di-pass" aria-label="Example passport scan">
            <div className="di-pass-top"><span>PASSPORT</span><span>Type P · UTO</span></div>
            <div className="di-pass-body">
              <span className="di-photo"><Icon name="i-users" /></span>
              <dl>
                <div className="di-hl" data-n="1"><dt>Surname</dt><dd>TRAVELLER</dd></div>
                <div className="di-hl" data-n="2"><dt>Given names</dt><dd>SAMPLE ONE</dd></div>
                <div className="di-hl" data-n="3"><dt>Passport no.</dt><dd>A0000000</dd></div>
                <div className="di-hl" data-n="4"><dt>Date of birth</dt><dd>01 JAN 1990</dd></div>
                <div><dt>Nationality</dt><dd>UTOPIAN</dd></div>
                <div className="di-hl" data-n="5"><dt>Date of expiry</dt><dd>01 JAN 2032</dd></div>
              </dl>
            </div>
            <div className="di-mrz" aria-hidden="true">
              <span>P&lt;UTOTRAVELLER&lt;&lt;SAMPLE&lt;ONE&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>
              <span>A0000000&lt;0UTO9001011F3201014&lt;&lt;&lt;&lt;&lt;&lt;</span>
            </div>
            <span className="di-beam" aria-hidden="true" />
          </figure>

          <div className="di-engine" aria-hidden="true">
            <span className="di-engine-chip"><Icon name="i-eye" />OCR</span>
            <span className="di-engine-line" />
            <small>Tesseract · eng+ben</small>
          </div>

          <div className="di-form" aria-label="Example applicant form after the scan">
            <div className="di-form-head">
              <span><Icon name="i-passport" /><span className="b">Visa applicant</span></span>
              <span className="di-pill rev">Reviewed</span>
            </div>
            <ul>
              {FIELDS.map((f) => (
                <li key={f.n} className={f.fixed ? "fixed" : undefined}>
                  <span className="di-n">{f.n}</span>
                  <label>{f.label}</label>
                  <span className="di-val">
                    {f.fixed ? <s>{f.parsed}</s> : null}
                    <span className="b">{f.value}</span>
                    {f.fixed ? <em>Corrected by staff</em> : <Icon name="i-check" />}
                  </span>
                </li>
              ))}
            </ul>
            <div className="di-form-foot">
              <span>Confidence <span className="b">88%</span></span>
              <span className="di-btn">Apply to form</span>
            </div>
          </div>
        </div>
        <p className="hj-note">Example data. The passport shown is a fictional specimen.</p>
      </div>
    </section>
  );
}

const PROVIDERS = [
  { name: "Tesseract (self-hosted)", on: true },
  { name: "Google Vision" },
  { name: "Azure AI Vision" },
  { name: "AWS Textract" },
  { name: "Custom provider" },
];
const TOGGLES = [
  { t: "Enable OCR", d: "Turn off to hide Scan buttons and block new scans everywhere.", on: true },
  { t: "Manual review required", d: "Staff review and edit extracted fields before they apply to a form.", on: true },
  { t: "Auto fill enabled", d: "Fill form fields once a scan is reviewed and applied.", on: true },
  { t: "Store raw OCR text", d: "Keep the full text the engine read.", on: false },
  { t: "Store OCR logs", d: "Keep a diagnostic log of every scan attempt.", on: true },
];

/** Top 2: the OCR settings console with engine, language, threshold and behaviour switches. */
export function DocIntelTop2() {
  return (
    <section className="section di-settings">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">You stay in control</span>
          <h2>One settings page decides how OCR behaves</h2>
          <p>Pick the engine and language, set a confidence threshold and decide what is stored. The same rules apply in Visa, Hotel, Tour and CRM.</p>
        </div>

        <div className="di-console">
          <nav className="di-tabs" aria-label="Settings tabs (example)">
            <span className="on"><Icon name="i-layers" />Engine</span>
            <span><Icon name="i-file" />Document types</span>
            <span><Icon name="i-globe" />Providers</span>
            <span><Icon name="i-tasks" />General</span>
          </nav>

          <div className="di-pane di-pane-engine">
            <span className="di-pane-t">Active provider</span>
            <ul className="di-prov">
              {PROVIDERS.map((p) => (
                <li key={p.name} className={p.on ? "on" : undefined}>
                  <span className="di-radio" />
                  {p.name}
                  <em>{p.on ? "Active" : "Coming soon"}</em>
                </li>
              ))}
            </ul>

            <span className="di-pane-t">Language</span>
            <div className="di-seg">
              <span>eng</span><span>ben</span><span className="on">eng+ben</span>
            </div>

            <span className="di-pane-t">Confidence threshold</span>
            <div className="di-range">
              <span className="di-track"><i style={{ width: "70%" }} /><b style={{ left: "70%" }} /></span>
              <span className="di-range-v">70%</span>
            </div>
          </div>

          <div className="di-pane di-pane-beh">
            <span className="di-pane-t">Behavior</span>
            <ul className="di-toggles">
              {TOGGLES.map((x) => (
                <li key={x.t}>
                  <span><span className="b">{x.t}</span><small>{x.d}</small></span>
                  <span className={x.on ? "di-sw on" : "di-sw"} aria-label={x.on ? "On" : "Off"}><i /></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="hj-note">Example settings. Tesseract is the engine available today; the other providers are on the roadmap.</p>
      </div>
    </section>
  );
}

const MODS = [
  { k: "Visa", v: 55, c: "a" },
  { k: "CRM", v: 20, c: "b" },
  { k: "Tour", v: 15, c: "c" },
  { k: "Hotel", v: 10, c: "d" },
];
const DONUT: Record<string, string> = { a: "var(--forest)", b: "var(--lime)", c: "var(--forest-2)", d: "#b6c3bc" };
const HISTORY = [
  { m: "Visa", d: "Passport", s: "Reviewed", c: "94%" },
  { m: "CRM", d: "NID", s: "Completed", c: "81%" },
  { m: "Hotel", d: "Passport", s: "Processing", c: "-" },
  { m: "Tour", d: "Driving license", s: "Failed", c: "-" },
];

/** Bottom: OCR dashboard with module donut, status tiles, scan history and a log entry. */
export function DocIntelBottom() {
  const stops = MODS.reduce<{ acc: number; parts: string[] }>((o, m) => {
    const col = DONUT[m.c];
    o.parts.push(`${col} ${o.acc}% ${o.acc + m.v}%`);
    o.acc += m.v;
    return o;
  }, { acc: 0, parts: [] }).parts.join(", ");

  return (
    <section className="section alt mod-after di-dash">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Dashboard, history and logs</span>
          <h2>Every scan is on record</h2>
          <p>See OCR use by module, follow each scan from pending to reviewed, and open the logs when a scan fails.</p>
        </div>

        <div className="di-board">
          <div className="di-card di-donut-card">
            <span className="di-card-t">Scans by module</span>
            <div className="di-donut" style={{ background: `conic-gradient(${stops})` }}>
              <span><span className="b">200</span><small>Total scans</small></span>
            </div>
            <ul className="di-legend">
              {MODS.map((m) => <li key={m.k}><i className={`di-c-${m.c}`} />{m.k}<span className="b">{m.v}%</span></li>)}
            </ul>
          </div>

          <div className="di-mid">
            <div className="di-stats">
              <span><Icon name="i-file" /><span className="b">200</span>Total scans</span>
              <span><Icon name="i-check" /><span className="b">46</span>Completed</span>
              <span className="rev"><Icon name="i-eye" /><span className="b">148</span>Reviewed</span>
              <span className="bad"><Icon name="i-x" /><span className="b">6</span>Failed</span>
            </div>

            <div className="di-card di-hist">
              <div className="di-hist-head">
                <span className="di-card-t">Scan history</span>
                <span className="di-chips"><span>All modules</span><span>All document types</span><span>All statuses</span></span>
              </div>
              <div className="di-tbl-wrap">
                <table className="di-tbl">
                  <thead><tr><th>Module</th><th>Document type</th><th>Status</th><th>Confidence</th></tr></thead>
                  <tbody>
                    {HISTORY.map((h) => (
                      <tr key={h.m + h.d}>
                        <td>{h.m}</td><td>{h.d}</td>
                        <td><span className={`di-pill ${h.s.toLowerCase()}`}>{h.s}</span></td>
                        <td>{h.c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="di-side">
            <div className="di-card di-types">
              <span className="di-card-t">Document types</span>
              <ul>
                <li><Icon name="i-passport" />Passport</li>
                <li><Icon name="i-idcard" />NID</li>
                <li><Icon name="i-car" />Driving license</li>
                <li><Icon name="i-file" />Generic</li>
              </ul>
            </div>
            <div className="di-card di-log">
              <span className="di-card-t">OCR log</span>
              <span className="di-pill failed">Failed</span>
              <p><span className="b">Tour · Driving license</span></p>
              <code>Error: check the Tesseract path in settings</code>
            </div>
          </div>
        </div>
        <p className="hj-note">Example data.</p>
      </div>
    </section>
  );
}
