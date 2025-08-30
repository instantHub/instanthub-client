import { FlexBox, Typography } from "@components/general";
import { TOperation } from "@features/api/productsApi/types";

export type PriceDropChangeType = "priceDrop" | "operation";

type OperationSelectorProps = {
  value: TOperation; // currently selected operation
  onChange: (operation: TOperation, name: PriceDropChangeType) => void;
  label?: string; // optional heading text
};

export const OperationSelector: React.FC<OperationSelectorProps> = ({
  value,
  onChange,
  label,
}) => {
  return (
    <FlexBox className="gap-4 max-sm:flex-col max-sm:gap-1">
      {label && (
        <Typography
          className={`${
            value === "Subtrack" ? "bg-red-200" : "bg-blue-200"
          } px-2 font-bold py-1 rounded`}
        >
          {label}
        </Typography>
      )}

      <select
        name="operation"
        className="border rounded px-1 w-fit"
        value={value}
        onChange={(e) => {
          const val = e.target.value as TOperation;
          if (val) onChange(val, e.target.name as PriceDropChangeType);
        }}
      >
        <option value="Subtrack">Subtrack</option>
        <option value="Add">Add</option>
      </select>
    </FlexBox>
  );
};
