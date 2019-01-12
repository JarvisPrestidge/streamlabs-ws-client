/**
 * Assert given input is of type array
 *
 * @param {any} input
 * @returns {input is any[]}
 */
export const isArray = (input: any): input is any[] => Array.isArray(input);

/**
 * Remove commas from an input string
 *
 * @param {*} input
 */
export const removeCommas = (input: any) => String(input).replace(/,/g, "");

/**
 * Remove non-numeric characters from an input string
 *
 * @param {*} input
 */
export const removeNonNumeric = (input: any) => String(input).replace(/[^0-9.]/g, "");
