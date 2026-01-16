export interface ICondition {
  _id: string;
  category: { _id: string; name: string };
  conditionName: string;
  page: number;
  keyword: string;
  description: string;
  isMandatory: boolean;
  multiSelect: boolean;
  isYesNoType: boolean;
  showLabelsImage: boolean;
  conditionLabels: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
