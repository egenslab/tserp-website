// CRM page: everyday agency moments, before and after the TravelSuite CRM.
import { Icon } from "./ui";

const ROWS: [moment: string, before: string, after: string][] = [
  ["An Umrah inquiry arrives on WhatsApp at 11 pm", "Buried in chats by morning, someone else replies first", "Saved as a lead with its source and an owner, reminder set for 10 am"],
  ["A customer asks \u201cwhat did I pay last time?\u201d", "Scroll through old chats, Excel and receipts", "Open the profile: every booking, payment and due amount"],
  ["The staff member handling a family is on leave", "Nobody knows what was promised", "Notes, quotes and follow-ups are on the record for anyone"],
  ["A passport expires before the trip", "Found at the airport, or at the embassy", "Passport-expiry reminder weeks ahead"],
  ["A quote is accepted", "Details typed again into the booking and invoice", "Lead becomes booking and invoice in one click"],
  ["Monthly sales meeting", "Guesses about which channel brings business", "Lead sources, conversion and won bookings on one screen"],
];

export default function CrmCompare() {
  return (
    <section className="section crm-compare" id="compare">
      <div className="container">
        <div className="section-head light">
          <span className="eyebrow">A day at your agency</span>
          <h2>The moments where leads are won or lost</h2>
          <p>Six everyday situations, with WhatsApp and Excel, and with the TravelSuite CRM.</p>
        </div>
        <div className="cc-table cc-2" role="table" aria-label="Everyday agency situations before and after TravelSuite CRM">
          <div className="cc-row cc-head" role="row">
            <span role="columnheader">The moment</span>
            <span role="columnheader">With WhatsApp &amp; Excel</span>
            <span role="columnheader" className="cc-us">With <em>TravelSuite CRM</em></span>
          </div>
          {ROWS.map(([moment, before, after], i) => (
            <div key={moment} className="cc-row" role="row">
              <span role="rowheader" className="cc-task"><span className="cc-n">{String(i + 1).padStart(2, "0")}</span>{moment}</span>
              <span role="cell" data-label="With WhatsApp & Excel" className="cc-no"><Icon name="i-x" />{before}</span>
              <span role="cell" data-label="With TravelSuite CRM" className="cc-us"><Icon name="i-check" />{after}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
