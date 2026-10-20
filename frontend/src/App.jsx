
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import EmployeeList from "./components/EmployeeList";
import StatusMessage from "./components/StatusMessage";
import useDebounce from "./hooks/useDebounce";
import { fetchEmployees } from "./services/employeeService";
import "./App.css";

export default function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 350);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadEmployees() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchEmployees({
          search: debouncedSearch,
          limit: 20,
          offset: 0,
          signal: controller.signal,
        });

        if (active) {
          const list = Array.isArray(data)
            ? data
            : Array.isArray(data?.results)
              ? data.results
              : Array.isArray(data?.employees)
                ? data.employees
                : [];

          setEmployees(list);
        }
      } catch (err) {
        if (err.name === "AbortError") return;

        if (active) {
          setError(
            err.message || "Unable to load employees. Please try again."
          );
          setEmployees([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadEmployees();

    return () => {
      active = false;
      controller.abort();
    };
  }, [debouncedSearch]);

  return (
    <div className="app-shell">
      <header className="topbar">
      <a className="brand" href="/" aria-label="PeopleHub home">
        <span className="brand-logo">P</span>
        <span className="brand-name">PeopleHub</span>
      </a>

        <div className="topbar-right">
          <span className="workspace-label">
            <span className="online-dot" />
            Employee workspace
          </span>
          <div className="profile-avatar" aria-label="Workspace profile">
            PH
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              YOUR TEAM, CONNECTED
            </span>

            <h1>
              Find the right
              <br />
              <span>person, faster.</span>
            </h1>

            <p>
              Get to know your colleagues. Search employees by name
              or department and find the details you need.
            </p>
          </div>

          <div className="hero-illustration" aria-hidden="true">
            <div className="hero-circle circle-back" />
            <div className="hero-circle circle-front" />
            <div className="hero-center">
             
            <div className="hero-center">
              <svg
                viewBox="0 0 48 48"
                width="38"
                height="38"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="24" cy="15" r="7" />
                <path d="M11 38v-4a13 13 0 0 1 26 0v4" />
                <path d="M10 15a6 6 0 0 0 0 12" />
                <path d="M4 35v-3a8 8 0 0 1 5-7" />
                <path d="M38 15a6 6 0 0 1 0 12" />
                <path d="M44 35v-3a8 8 0 0 0-5-7" />
              </svg>
            </div>

            </div>
            <span className="hero-star star-one">✦</span>
            <span className="hero-star star-two">✧</span>
          </div>
        </section>

        <section className="search-section" aria-labelledby="search-title">
          <div className="search-title-row">
            <div className="search-title-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="27"
                height="27"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4.5 4.5" />
              </svg>
            </div>

            <div>
              <h2 id="search-title">Search employees</h2>
              <p>Who are you looking for today?</p>
            </div>
          </div>

          <SearchBar value={search} onChange={setSearch} />

          <div className="search-helper">
            <span className="helper-icon">i</span>
            Search using a colleague’s name or department, such as Finance.
          </div>
        </section>

        <section className="directory-section" aria-labelledby="directory-title">
          <div className="directory-heading">
            <div>
              <span className="eyebrow">PEOPLE DIRECTORY</span>
              <h2 id="directory-title">
                {search.trim() ? "Search results" : "Meet your colleagues"}
              </h2>
              <p>
                {search.trim()
                  ? `Results for “${search.trim()}”`
                  : "Employee details, all in one place."}
              </p>
            </div>

            {!loading && !error && (
              <div className="results-count">
                <span className="online-dot" />
                {employees.length} {employees.length === 1 ? "employee" : "employees"}
              </div>
            )}
          </div>

          {loading && (
            <div className="state-panel">
              <div className="loading-spinner" />
              <h3>Loading employees</h3>
              <p>Please wait while we fetch the directory.</p>
            </div>
          )}

          {!loading && error && (
            <StatusMessage type="error">{error}</StatusMessage>
          )}

          {!loading && !error && employees.length === 0 && (
            <div className="state-panel">
              <div className="empty-search-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <circle cx="10.8" cy="10.8" r="6.8" />
                  <path d="m16 16 4.5 4.5" />
                </svg>
              </div>
              <h3>No employees found</h3>
              <p>
                {search.trim()
                  ? "Try a different name or department."
                  : "There are no employee records available right now."}
              </p>
              {search.trim() && (
                <button
                  type="button"
                  className="clear-search-button"
                  onClick={() => setSearch("")}
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {!loading && !error && employees.length > 0 && (
            <EmployeeList employees={employees} />
          )}
        </section>

        <footer className="footer">
          <span>© PeopleHub · Employee Directory</span>
          <span>Better connections start here.</span>
        </footer>
      </main>
    </div>
  );
}
