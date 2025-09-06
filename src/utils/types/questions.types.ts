import { IConditions } from "@features/api/productsApi/types";

export interface ISortedConditionsByPage {
  page: number;
  conditions: IExtendedCondition[];
}

export interface IExtendedCondition extends IConditions {
  isSelected: {
    selected: boolean;
    selectedLabel: string | null;
  };
}
