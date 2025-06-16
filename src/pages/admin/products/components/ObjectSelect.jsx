export const ObjectSelect = ({
  label,
  options,
  displayKey = "name",
  onSelect,
  selectedOption,
  placeholder = "Select an option",
  required = false,
}) => {
  return (
    <div className="flex flex-col">
      <label>{label} :</label>
      <select
        className="border rounded-sm p-2 max-md:p-1"
        value={selectedOption ? JSON.stringify(selectedOption) : ""}
        onChange={(e) => {
          const value = e.target.value;
          if (value) {
            const parsed = JSON.parse(value);
            onSelect(parsed);
          } else {
            onSelect(null);
          }
        }}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={JSON.stringify(option)}>
            {option[displayKey]}
          </option>
        ))}
      </select>
    </div>
  );
};
