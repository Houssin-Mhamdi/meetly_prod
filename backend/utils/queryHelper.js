/**
 * Generates a MongoDB search query object for multiple fields.
 * @param {string} search - The search term.
 * @param {string[]} fields - Array of fields to search in.
 * @returns {Object[]|null} - An array of query objects for $or, or null if no search term.
 */
const getSearchQuery = (search, fields = ["title", "description"]) => {
    if (!search) return null;

    return fields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
    }));
};

/**
 * Calculates skip and limit for pagination.
 * @param {number|string} page - Current page number.
 * @param {number|string} limit - Items per page.
 * @returns {Object} - { skip, limit, page, limitNum }
 */
const getPaginationOptions = (page = 1, limit = 10) => {
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 10);
    const skip = (pageNum - 1) * limitNum;

    return { skip, limit: limitNum, page: pageNum };
};

/**
 * Formats a paginated response.
 * @param {Array} data - The data for the current page.
 * @param {number} total - Total number of items across all pages.
 * @param {number} page - Current page number.
 * @param {number} limit - Items per page.
 * @returns {Object} - Formatted response object.
 */
const formatPagedResponse = (data, total, page, limit) => {
    return {
        data,
        pagination: {
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            itemsPerPage: limit,
        },
    };
};

module.exports = { getSearchQuery, getPaginationOptions, formatPagedResponse };
