import { SUCCESS } from "@/lib/content";
import { SuccessCard } from "./ui";

export default function SuccessGrid({ limit }: { limit?: number }) {
  return <>{SUCCESS.slice(0, limit).map((st) => <SuccessCard key={st.slug} st={st} />)}</>;
}
