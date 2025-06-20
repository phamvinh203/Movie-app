/**
 * Utility functions for text processing
 */

/**
 * Decode HTML entities to normal text
 * @param {string} str - String containing HTML entities
 * @returns {string} - Decoded string
 */
export const decodeHtmlEntities = (str) => {
  if (!str || typeof str !== "string") return str;

  // Create a temporary element to decode entities
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
};

/**
 * Clean and format movie title
 * @param {string} title - Movie title
 * @returns {string} - Cleaned title
 */
export const cleanMovieTitle = (title) => {
  if (!title) return "";

  return decodeHtmlEntities(title).trim().replace(/\s+/g, " "); // Replace multiple spaces with single space
};

/**
 * Format episode text
 * @param {string} episode - Episode text
 * @returns {string} - Formatted episode
 */
export const formatEpisode = (episode) => {
  if (!episode) return "";

  return decodeHtmlEntities(episode).trim();
};

/**
 * Clean category name
 * @param {string} category - Category name
 * @returns {string} - Cleaned category
 */
export const cleanCategory = (category) => {
  if (!category) return "";

  return decodeHtmlEntities(category)
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special chars except word chars, spaces, and hyphens
    .replace(/\s+/g, " ");
};
