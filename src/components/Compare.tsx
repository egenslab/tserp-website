/** Plan comparison table on the pricing page. */
export default function Compare() {
  return (
    <>
      <details className="compare" open>
        <summary>Compare all features <svg className="ic"><use href="#i-chev" /></svg></summary>
        <div className="table-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Starter</th>
                <th>Growth</th>
                <th className="hl-col">Business</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr className="group">
                <td colSpan={5}>Travel services</td>
              </tr>
              <tr>
                <td>Flight, hotel, visa, tours, transport</td>
                <td>2 services</td>
                <td>All</td>
                <td className="hl-col">All</td>
                <td>All</td>
              </tr>
              <tr>
                <td>Hajj & Umrah module</td>
                <td className="no">—</td>
                <td className="yes">✓</td>
                <td className="hl-col yes">✓</td>
                <td className="yes">✓</td>
              </tr>
              <tr>
                <td>GDS / NDC supplier API</td>
                <td className="no">—</td>
                <td className="no">—</td>
                <td className="hl-col">Add-on</td>
                <td className="yes">✓</td>
              </tr>
              <tr className="group">
                <td colSpan={5}>Booking platform</td>
              </tr>
              <tr>
                <td>B2C customer booking</td>
                <td className="yes">✓</td>
                <td className="yes">✓</td>
                <td className="hl-col yes">✓</td>
                <td className="yes">✓</td>
              </tr>
              <tr>
                <td>B2B agent portal, credit & wallet</td>
                <td className="no">—</td>
                <td className="no">—</td>
                <td className="hl-col yes">✓</td>
                <td className="yes">✓</td>
              </tr>
              <tr>
                <td>Markup & pricing rules</td>
                <td>Basic</td>
                <td className="yes">✓</td>
                <td className="hl-col yes">✓</td>
                <td className="yes">✓</td>
              </tr>
              <tr className="group">
                <td colSpan={5}>ERP</td>
              </tr>
              <tr>
                <td>CRM & sales management</td>
                <td className="yes">✓</td>
                <td className="yes">✓</td>
                <td className="hl-col yes">✓</td>
                <td className="yes">✓</td>
              </tr>
              <tr>
                <td>Invoice & payment management</td>
                <td className="yes">✓</td>
                <td className="yes">✓</td>
                <td className="hl-col yes">✓</td>
                <td className="yes">✓</td>
              </tr>
              <tr>
                <td>Finance & accounting, expenses</td>
                <td className="no">—</td>
                <td className="yes">✓</td>
                <td className="hl-col yes">✓</td>
                <td className="yes">✓</td>
              </tr>
              <tr>
                <td>HR, help desk, tasks & workflows</td>
                <td className="no">—</td>
                <td className="no">—</td>
                <td className="hl-col yes">✓</td>
                <td className="yes">✓</td>
              </tr>
              <tr>
                <td>Reports & analytics</td>
                <td>Basic</td>
                <td>Standard</td>
                <td className="hl-col">Advanced</td>
                <td>Custom</td>
              </tr>
              <tr className="group">
                <td colSpan={5}>Website, AI & conversations</td>
              </tr>
              <tr>
                <td>Agency website & CMS</td>
                <td className="yes">✓</td>
                <td className="yes">✓</td>
                <td className="hl-col yes">✓</td>
                <td className="yes">✓</td>
              </tr>
              <tr>
                <td>Omnichannel inbox</td>
                <td>WhatsApp</td>
                <td>+ Messenger, Instagram</td>
                <td className="hl-col">All channels</td>
                <td>All channels</td>
              </tr>
              <tr>
                <td>AI agents & trip planner</td>
                <td className="no">—</td>
                <td className="no">—</td>
                <td className="hl-col yes">✓</td>
                <td className="yes">✓</td>
              </tr>
              <tr className="group">
                <td colSpan={5}>Team & support</td>
              </tr>
              <tr>
                <td>Staff users</td>
                <td>3</td>
                <td>10</td>
                <td className="hl-col">Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Branches</td>
                <td>1</td>
                <td>2</td>
                <td className="hl-col">5</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Support</td>
                <td>Email</td>
                <td>Email & WhatsApp</td>
                <td className="hl-col">Priority</td>
                <td>Dedicated manager</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
      <div className="addons">
        <h3>Add-ons</h3>
        <div className="addon-grid">
          <div className="addon">
            <span className="m-ico dark sm"><svg><use href="#i-plane" /></svg></span>
            <div>
              <b>GDS / NDC connection</b>
              <small>Amadeus, Sabre, Travelport or airline NDC</small>
            </div>
            <em>Quote</em>
          </div>
          <div className="addon">
            <span className="m-ico dark sm"><svg><use href="#i-phone" /></svg></span>
            <div>
              <b>Branded mobile apps</b>
              <small>Android & iOS on your back office</small>
            </div>
            <em>Quote</em>
          </div>
          <div className="addon">
            <span className="m-ico dark sm"><svg><use href="#i-bot" /></svg></span>
            <div>
              <b>Extra AI agent</b>
              <small>Dedicated assistant per channel or team</small>
            </div>
            <em>Quote</em>
          </div>
          <div className="addon">
            <span className="m-ico dark sm"><svg><use href="#i-code" /></svg></span>
            <div>
              <b>Custom development</b>
              <small>Features built to your workflow</small>
            </div>
            <em>Quote</em>
          </div>
        </div>
      </div>
    </>
  );
}
