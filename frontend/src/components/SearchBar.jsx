
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <label htmlFor="employee-search">
        Search by name or department
      </label>

      <input
        id="employee-search"
        type="search"
        placeholder="Try Someone Name or Department..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
