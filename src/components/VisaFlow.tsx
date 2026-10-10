"use client";
// Visa page: country-aware workflow templates. Template names, stages and required documents
// follow the visa module's Processing Flows and Required Documents settings.
import { useState } from "react";

const BASE = ["Consultation", "Document Collection", "Document Verification", "Payment Completed"];
const END = ["Submission", "Under Review", "Approved", "Delivered", "Case Closed"];

const FLOWS = [
  { name: "Saudi Work", type: "Work", country: "Saudi Arabia", stages: [...BASE, "Medical", "Biometric", ...END], docs: ["Passport", "Photo", "Employment Contract", "Medical Report", "Employer Authorization"] },
  { name: "UK Student", type: "Student", country: "United Kingdom", stages: [...BASE, "Medical", "Biometric", ...END], docs: ["Passport", "IELTS", "CAS Letter", "TB Test Report"] },
  { name: "Canada SDS", type: "Student", country: "Canada", stages: [...BASE, "Medical", "Biometric", ...END], docs: ["Passport", "IELTS", "Offer Letter", "Bank Statement", "GIC Certificate"] },
  { name: "Tourist", type: "Tourist", country: "Any country", stages: [...BASE, ...END], docs: ["Passport", "Photo", "Travel Itinerary", "Hotel Booking", "Bank Statement"] },
];

const ic = (name: string) => <svg className="ic"><use href={`#${name}`} /></svg>;

export default function VisaFlow() {
  const [i, setI] = useState(0);
  const f = FLOWS[i];
  return (
    <section className="section alt vs-flow">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Processing flows</span>
          <h2>The right steps for every country and visa type</h2>
          <p>Pick a country and visa type, and the case gets its own stages and document checklist.</p>
        </div>

        <div className="vs-tabs" role="tablist" aria-label="Workflow templates">
          {FLOWS.map((x, n) => (
            <button key={x.name} type="button" role="tab" aria-selected={n === i} className={n === i ? "on" : undefined} onClick={() => setI(n)}>
              <span className="b">{x.name}</span><small>{x.country}</small>
            </button>
          ))}
        </div>

        <div className="vs-flow-card" role="tabpanel">
          <div className="vs-flow-head">
            <span className="vs-chip">{f.type} visa</span>
            <span>{ic("i-globe")}{f.country}</span>
            <span>{ic("i-layers")}{f.stages.length} stages</span>
            <span>{ic("i-file")}{f.docs.length} required documents</span>
          </div>
          <ol className="vs-stages">
            {f.stages.map((s, n) => <li key={s}><span className="vs-n">{n + 1}</span>{s}</li>)}
          </ol>
          <div className="vs-docs">
            <span className="vs-docs-title">Required documents</span>
            <ul>{f.docs.map((d) => <li key={d}>{ic("i-check")}{d}</li>)}</ul>
          </div>
        </div>
        <p className="hj-note">Templates and checklists from a real TravelSuite setup. Every stage and document list is editable.</p>
      </div>
    </section>
  );
}
