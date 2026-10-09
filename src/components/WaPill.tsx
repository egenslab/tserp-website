/** WhatsApp chat button with the support avatar. */
export default function WaPill() {
  return (
    <a href="https://wa.me/8801325277120" target="_blank" rel="noopener" className="wa-pill">
      <span className="wa-avatar"><img src="/assets/img/support-agent.svg" alt="" width="56" height="56" /><span className="wa-badge"><svg><use href="#i-wa" /></svg></span></span>
      {" "}
      <span className="wa-text"><b>Chat with TravelSuite</b><small><i className="dot" />Available now</small></span>
    </a>
  );
}
