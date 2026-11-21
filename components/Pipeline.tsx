"use client";

import { useSite } from "@/lib/i18n";

export default function Pipeline() {
  const { t } = useSite();

  const steps = [
    { label: t("dgStepCommit"), sub: t("dgStepCommitSub"), icon: null },
    { label: t("dgStepRegression"), sub: t("dgStepRegressionSub"), icon: "python" },
    { label: t("dgStepGate"), sub: t("dgStepGateSub"), icon: "jenkins" },
    { label: t("dgStepPatrol"), sub: t("dgStepPatrolSub"), icon: "grafana" },
    { label: t("dgStepReview"), sub: t("dgStepReviewSub"), icon: null },
  ];

  return (
    <section className="section pipeline" id="pipeline" aria-labelledby="pipeline-h">
      <div className="container">
        <div className="section-head">
          <h2 id="pipeline-h">{t("pipelineH")} <span className="muted">{t("pipelineMuted")}</span></h2>
        </div>
        <div
          className="pipe-rail"
          role="img"
          aria-label={t("dgAlt")}
        >
          {steps.map((step, index) => (
            <div className="pipe-step" key={step.label}>
              <span className="pipe-tile">
                {step.icon
                  ? <img src={`/assets/icons/${step.icon}.svg`} alt="" width="28" height="28" loading="lazy" />
                  : <span className="pipe-num" aria-hidden="true">{`0${index + 1}`}</span>}
              </span>
              <span className="pipe-name">{step.label}</span>
              <span className="pipe-sub">{step.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
