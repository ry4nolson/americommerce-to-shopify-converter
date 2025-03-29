import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

/**
 * Reads a CSV file and returns its contents as an array of objects
 * @param filePath Path to the CSV file
 * @returns Promise that resolves to an array of objects
 */
export async function readCsvFile<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data as T))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

/**
 * Writes data to a CSV file
 * @param filePath Path to save the CSV file
 * @param data Array of objects to write
 * @param headers Array of header objects with id and title properties
 * @returns Promise that resolves when the file is written
 */
export async function writeCsvFile<T extends Record<string, any>>(
  filePath: string, 
  data: T[], 
  headers: { id: string; title: string }[]
): Promise<void> {
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: headers
  });
  
  return csvWriter.writeRecords(data);
}

/**
 * Sanitizes a string for use as a Shopify handle
 * @param input String to sanitize
 * @returns Sanitized string
 */
export function sanitizeHandle(input: string): string {
  if (!input) return '';
  
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with a single one
    .trim();
}

/**
 * Formats a date string to ISO format
 * @param dateStr Date string in various formats
 * @returns ISO formatted date string or empty string if invalid
 */
export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '';
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return date.toISOString();
  } catch (error) {
    return '';
  }
}

/**
 * Converts a string to a boolean value
 * @param value String value to convert
 * @returns 'TRUE' or 'FALSE' string
 */
export function stringToBoolean(value: string | undefined): string {
  if (!value) return 'FALSE';
  
  const lowercaseValue = value.toLowerCase().trim();
  if (['true', 'yes', '1', 'y'].includes(lowercaseValue)) {
    return 'TRUE';
  }
  return 'FALSE';
}

/**
 * Formats a number as a string with two decimal places
 * @param value Number or string to format
 * @returns Formatted string
 */
export function formatPrice(value: string | number | undefined): string {
  if (value === undefined || value === null || value === '') return '0.00';
  
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0.00';
  
  return num.toFixed(2);
}
