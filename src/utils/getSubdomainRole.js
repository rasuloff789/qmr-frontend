/**
 * getSubdomainRole - Utility to extract role from hostname subdomain
 *
 * Extracts the role from the hostname subdomain for use in authentication
 * and permission checking.
 *
 * @returns {string} The role extracted from subdomain (e.g., 'root', 'admin', 'teacher')
 */
export function getSubdomainRole() {
	const host = window.location.hostname;

	// If localhost, use the environment variable SUB_DOMAIN
	if (host === "localhost") {
		return import.meta.env.SUB_DOMAIN || "admin";
	}

	const parts = host.split(".");

	// If hostname has at least 3 parts (e.g., root.elli.uz)
	if (parts.length >= 3) {
		return parts[0]; // root or admin or teacher
	}

	// Fallback to environment variable for mock/development
	return import.meta.env.VITE_SUBDOMAIN || "root";
}
