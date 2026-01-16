import { IProductConditions } from "@features/api/productsApi/types";

export interface ISortedConditionsByPage {
  page: number;
  conditions: IExtendedCondition[];
}

export interface IExtendedCondition extends IProductConditions {
  isSelected: {
    selected: boolean;
    selectedLabel: string | null;
  };
}
