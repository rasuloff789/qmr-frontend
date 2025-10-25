import { getSubdomainRole } from "./getSubdomainRole.js";

/**
 * checkUser - Permission checking utility
 * 
 * Checks if the current user has the required role/permissions
 * Role is determined by subdomain or localStorage fallback
 * 
 * @param {string[]} allowedRoles - Array of roles that have access
 * @param {boolean} [returnRole] - If true, returns the current user's role instead of checking
 * @returns {boolean|string} - Returns true if user has permission, false otherwise, or user role if returnRole is true
 */
export default function checkUser(allowedRoles, returnRole = false) {

    // Get user role - prioritize localStorage, fallback to subdomain
    const userRole = localStorage.getItem("userRole") || getSubdomainRole();

    // If returnRole is true, return the current user's role
    if (returnRole) {
        return userRole || null;
    }

    // If no role found, deny access by default
    if (!userRole) {
        console.warn("⚠️ No user role found in localStorage or subdomain");
        return false;
    }

    // Check if user role is in the allowed roles array
    const hasAccess = allowedRoles.includes(userRole);

    if (!hasAccess) {
        console.warn(`🚫 Access denied. User role '${userRole}' not in allowed roles:`, allowedRoles);
    }

    return hasAccess;
}