
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("Employee service loaded");
console.log("API_BASE_URL:", API_BASE_URL);

export async function fetchEmployees({
  search = "",
  limit = 20,
  offset = 0,
  signal,
} = {}) {
  if (!API_BASE_URL) {
    throw new Error("The backend API URL is not configured.");
  }

  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  if (search.trim()) {
    params.set("search", search.trim());
  }

  const response = await fetch(
    `${API_BASE_URL}/employees/?${params.toString()}`,
    { signal }
  );

  if (!response.ok) {
    if (response.status === 503) {
      throw new Error(
        "Employee data is temporarily unavailable. Please try again."
      );
    }

    if (response.status === 422) {
      throw new Error(
        "The search request is invalid. Please check your input."
      );
    }

    throw new Error("Unable to load employees. Please try again.");
  }

  return response.json();
}
