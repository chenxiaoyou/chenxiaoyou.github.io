"use client";

import { useSite } from "@/lib/i18n";

export default function SkipLink() {
  const { t } = useSite();
  return (
    <a className="skip-link" href="#hero">
      {t("skip")}
    </a>
  );
}
