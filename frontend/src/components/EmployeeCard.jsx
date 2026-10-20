
export default function EmployeeCard({ employee }) {
  const joiningDate = new Date(
    `${employee.date_of_joining}T00:00:00`
  );

  const formattedDate = joiningDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="employee-card">
      <div className="employee-heading">
        <div className="avatar" aria-hidden="true">
          {employee.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3>{employee.name}</h3>
          <p>{employee.designation}</p>
        </div>
      </div>

      <div className="employee-details">
        <p>
          <strong>Department:</strong> {employee.department}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${employee.email}`}>
            {employee.email}
          </a>
        </p>
        <p>
          <strong>Joined:</strong> {formattedDate}
        </p>
        <p>
          <strong>Employee ID:</strong> {employee.id}
        </p>
      </div>
    </article>
  );
}
