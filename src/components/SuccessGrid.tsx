import { SUCCESS } from "@/lib/content";
import { SuccessCard } from "./ui";

export default function SuccessGrid({ exclude }: { exclude?: string }) {
  return <>{SUCCESS.filter((s) => s.slug !== exclude).map((st) => <SuccessCard key={st.slug} st={st} />)}</>;
}
