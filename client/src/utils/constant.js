export const API_URL = "http://localhost:5000";
export const ROLES = {
    ADMIN : "Admin",
    MANAGER : "Manager",
    EMPLOYEE : "Employee"
}

export const formatDate = (dateString) => {
	const date = new Date(dateString);
	if (isNaN(date.getTime())) {
		return "Invalid Date";
	}

	return date.toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};