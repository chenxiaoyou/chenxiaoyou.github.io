"use client";

import { useSite } from "@/lib/i18n";

const DIAGRAM_SPEC = {
  layout: "timeline",
  ground: "none",
  motion: { pulse: "none" },
  size: "band",
  steps: [
    { label: "dgStepCommit", sub: "dgStepCommitSub", icon: "ui:git-commit-horizontal", done: true },
    { label: "dgStepRegression", sub: "dgStepRegressionSub", icon: "python", done: true },
    { label: "dgStepGate", sub: "dgStepGateSub", icon: "jenkins", done: true },
    { label: "dgStepPatrol", sub: "dgStepPatrolSub", icon: "grafana", done: true },
    { label: "dgStepReview", sub: "dgStepReviewSub", icon: "ui:clipboard-check", done: true },
  ],
} as const;

export default function Pipeline() {
  const { t } = useSite();

  const spec = {
    ...DIAGRAM_SPEC,
    alt: t("dgAlt"),
    steps: DIAGRAM_SPEC.steps.map((step) => ({
      ...step,
      label: t(step.label as never),
      sub: t(step.sub as never),
    })),
  };

  return (
    <section className="section ground-inverse" id="pipeline" aria-labelledby="pipeline-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="pipeline-h">{t("pipelineH")} <span className="muted">{t("pipelineMuted")}</span></h2>
        </div>
        <div className="panel pipeline-panel">
          <div
            className="dg"
            data-diagram=""
            data-icon-base="/assets/icons"
          >
            <script type="application/json">{JSON.stringify(spec)}</script>
          </div>
        </div>
      </div>
    </section>
  );
}
