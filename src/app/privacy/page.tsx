import LegalPage, { legalMeta } from "@/components/LegalPage";

export const metadata = legalMeta("privacy");

export default function Page() {
  return <LegalPage slug="privacy" />;
}
