// New sections for the module feature pages: Top1 and Top2 render after the overview, Bottom after the workflow.
import type { ComponentType } from "react";
import { SalesBottom, SalesTop1, SalesTop2 } from "./Sales";
import { ProposalsBottom, ProposalsTop1, ProposalsTop2 } from "./Proposals";
import { FinanceBottom, FinanceTop1, FinanceTop2 } from "./Finance";
import { VendorsBottom, VendorsTop1, VendorsTop2 } from "./Vendors";
import { HrBottom, HrTop1, HrTop2 } from "./Hr";
import { HelpdeskBottom, HelpdeskTop1, HelpdeskTop2 } from "./Helpdesk";
import { ReportsBottom, ReportsTop1, ReportsTop2 } from "./Reports";
import { MarketingBottom, MarketingTop1, MarketingTop2 } from "./Marketing";
import { B2bBottom, B2bTop1, B2bTop2 } from "./B2b";
import { WebsiteBottom, WebsiteTop1, WebsiteTop2 } from "./Website";
import { CmsBottom, CmsTop1, CmsTop2 } from "./Cms";
import { AiBottom, AiTop1, AiTop2 } from "./Ai";
import { DocIntelBottom, DocIntelTop1, DocIntelTop2 } from "./DocIntel";
import { OmnichannelBottom, OmnichannelTop1, OmnichannelTop2 } from "./Omnichannel";

export const MODULE_SECTIONS: Record<string, { Top1: ComponentType; Top2: ComponentType; Bottom: ComponentType }> = {
  "sales": { Top1: SalesTop1, Top2: SalesTop2, Bottom: SalesBottom },
  "proposals": { Top1: ProposalsTop1, Top2: ProposalsTop2, Bottom: ProposalsBottom },
  "finance": { Top1: FinanceTop1, Top2: FinanceTop2, Bottom: FinanceBottom },
  "vendors": { Top1: VendorsTop1, Top2: VendorsTop2, Bottom: VendorsBottom },
  "hr": { Top1: HrTop1, Top2: HrTop2, Bottom: HrBottom },
  "helpdesk": { Top1: HelpdeskTop1, Top2: HelpdeskTop2, Bottom: HelpdeskBottom },
  "reports": { Top1: ReportsTop1, Top2: ReportsTop2, Bottom: ReportsBottom },
  "marketing": { Top1: MarketingTop1, Top2: MarketingTop2, Bottom: MarketingBottom },
  "b2b": { Top1: B2bTop1, Top2: B2bTop2, Bottom: B2bBottom },
  "website": { Top1: WebsiteTop1, Top2: WebsiteTop2, Bottom: WebsiteBottom },
  "cms": { Top1: CmsTop1, Top2: CmsTop2, Bottom: CmsBottom },
  "ai": { Top1: AiTop1, Top2: AiTop2, Bottom: AiBottom },
  "document-intelligence": { Top1: DocIntelTop1, Top2: DocIntelTop2, Bottom: DocIntelBottom },
  "omnichannel": { Top1: OmnichannelTop1, Top2: OmnichannelTop2, Bottom: OmnichannelBottom },
};
