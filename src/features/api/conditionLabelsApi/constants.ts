export const CONDITIONS_LABELS_API_TAG = "ConditionLabels";

const CONDITION_LABELS_BASE_API = "/api/questions/conditionlabels";

export const CONDITIONS_LABELS_API_PATHS = {
  BASE: CONDITION_LABELS_BASE_API,
  BY_ID: (conditionLabelId: string) =>
    `${CONDITION_LABELS_BASE_API}/${conditionLabelId}`,
  BY_CONDITION: (conditionId: string) =>
    `${CONDITION_LABELS_BASE_API}/condition/${conditionId}`,
} as const;
