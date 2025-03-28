/**
 * Poster templates utility module
 * 
 * This module provides a unified interface for generating poster templates
 * with any dimensions. It imports all individual template functions and
 * exports a single function that can generate any template with any dimensions.
 */

import poster1Template from './poster-1-template.js';
import poster2Template from './poster-2-template.js';
import poster3Template from './poster-3-template.js';
import poster4Template from './poster-4-template.js';

/**
 * Generate a poster template with specified type and dimensions
 * @param {string} type - The poster type ('poster-1', 'poster-2', 'poster-3', or 'poster-4')
 * @param {number} width - Width of the poster in pixels
 * @param {number} height - Height of the poster in pixels
 * @returns {string} HTML template with the specified dimensions
 */
export function generatePosterTemplate(type, width, height) {
  switch (type) {
    case 'poster-1':
      return poster1Template(width, height);
    case 'poster-2':
      return poster2Template(width, height);
    case 'poster-3':
      return poster3Template(width, height);
    case 'poster-4':
      return poster4Template(width, height);
    default:
      throw new Error(`Unknown poster type: ${type}`);
  }
}

/**
 * Get common aspect ratios for posters
 * @returns {Array<Object>} Array of aspect ratio objects with name, width, and height
 */
export const commonAspectRatios = [
  { name: 'Square (1:1)', width: 1000, height: 1000 },
  { name: 'Landscape (2:1)', width: 1000, height: 500 },
  { name: 'Portrait (4:5)', width: 1080, height: 1350 },
  { name: 'Original Poster-1', width: 1000, height: 1000 },
  { name: 'Original Poster-2', width: 1200, height: 675 },
  { name: 'Original Poster-3', width: 750, height: 1000 },
  { name: 'Original Poster-4', width: 750, height: 1000 }
];

/**
 * Get all available poster types
 * @returns {Array<Object>} Array of poster type objects with id and name
 */
export const posterTypes = [
  { id: 'poster-1', name: 'Poster 1' },
  { id: 'poster-2', name: 'Poster 2' },
  { id: 'poster-3', name: 'Poster 3' },
  { id: 'poster-4', name: 'Poster 4' }
];

export default {
  generatePosterTemplate,
  commonAspectRatios,
  posterTypes
};
