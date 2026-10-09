import LegalPage, { legalMeta } from "@/components/LegalPage";

export const metadata = legalMeta("terms");

export default function Page() {
  return <LegalPage slug="terms" />;
}
