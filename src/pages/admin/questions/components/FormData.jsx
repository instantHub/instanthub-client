export const FormData = ({ label, value, type, handleChange }) => {
  return (
    <div className="flex items-center gap-1">
      <label>{label}:</label>
      <input
        type={type}
        name="name"
        className="border mx-2 py-1 px-2 rounded text-sm max-sm:text-xs"
        placeholder={`Enter ${label}`}
        value={value}
        onChange={(event) => handleChange(event, "name", "conditionName")}
        required
      />
    </div>
  );
};
