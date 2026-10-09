"use client";

import { Fragment, useEffect, useState } from "react";
import { Icon } from "./ui";

type Group = { title: string; items: { id: string; title: string; icon: string }[] };

/** Features page side menu: highlights the feature section currently in view. */
export default function ScrollSpyNav({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px" });
    document.querySelectorAll(".fdetail").forEach((el) => spy.observe(el));
    return () => spy.disconnect();
  }, []);

  return (
    <aside className="fnav" aria-label="Features navigation">
      <div className="fnav-inner">
        {groups.map((g) => (
          <Fragment key={g.title}>
            <p className="fnav-group">{g.title}</p>
            {g.items.map((f) => (
              <a key={f.id} href={`#${f.id}`} className={active === f.id ? "active" : undefined}><Icon name={f.icon} />{f.title}</a>
            ))}
          </Fragment>
        ))}
      </div>
    </aside>
  );
}
