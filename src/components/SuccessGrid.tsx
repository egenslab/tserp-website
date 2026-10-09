import { SUCCESS } from "@/lib/content";
import { SuccessCard } from "./ui";

export default function SuccessGrid({ exclude, limit }: { exclude?: string; limit?: number }) {
  return <>{SUCCESS.filter((s) => s.slug !== exclude).slice(0, limit).map((st) => <SuccessCard key={st.slug} st={st} />)}</>;
}
