
export default function StatusMessage({
  type = "info",
  children,
}) {
  return (
    <div
      className={`status-message status-${type}`}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      {children}
    </div>
  );
}
