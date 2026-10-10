// CRM page: spreadsheet vs a general CRM vs the TravelSuite travel CRM.
import { Icon } from "./ui";

const ROWS: [task: string, sheet: string, general: string, travel: string][] = [
  ["Capturing inquiries", "Typed in by hand, often late", "Web forms and email", "Website, WhatsApp, Facebook and walk-ins in one pipeline"],
  ["Traveller details", "Free text in a cell", "Custom fields you build yourself", "Passports, family and travel history on every profile"],
  ["Quotes and bookings", "Separate Word files", "Notes or an integration project", "Lead to quotation to booking in one click"],
  ["Follow-ups", "Memory and sticky notes", "Generic tasks", "Reminders by notification and email, overdue highlighted"],
  ["Payments due", "Another sheet", "A separate finance tool", "Due amount on the customer, linked to invoices"],
  ["Reports", "Counted by hand", "Sales pipeline only", "Lead sources, conversion, bookings and profit"],
];

export default function CrmCompare() {
  return (
    <section className="section crm-compare" id="compare">
      <div className="container">
        <div className="section-head light">
          <span className="eyebrow">Compare approaches</span>
          <h2>Spreadsheet, general CRM or a travel CRM</h2>
          <p>Most agencies start with a spreadsheet and an inbox. Here is what changes at each step.</p>
        </div>
        <div className="cc-table" role="table" aria-label="Spreadsheet, general CRM and TravelSuite CRM compared">
          <div className="cc-row cc-head" role="row">
            <span role="columnheader">Task</span>
            <span role="columnheader">Spreadsheet &amp; inbox</span>
            <span role="columnheader">General sales CRM</span>
            <span role="columnheader" className="cc-us">Travel CRM <em>TravelSuite</em></span>
          </div>
          {ROWS.map(([task, sheet, general, travel]) => (
            <div key={task} className="cc-row" role="row">
              <span role="rowheader" className="cc-task">{task}</span>
              <span role="cell" data-label="Spreadsheet & inbox" className="cc-no">{sheet}</span>
              <span role="cell" data-label="General sales CRM" className="cc-mid">{general}</span>
              <span role="cell" data-label="TravelSuite CRM" className="cc-us"><Icon name="i-check" />{travel}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
