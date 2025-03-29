"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCsvFile = readCsvFile;
exports.writeCsvFile = writeCsvFile;
exports.sanitizeHandle = sanitizeHandle;
exports.formatDate = formatDate;
exports.stringToBoolean = stringToBoolean;
exports.formatPrice = formatPrice;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const csv_writer_1 = require("csv-writer");
/**
 * Reads a CSV file and returns its contents as an array of objects
 * @param filePath Path to the CSV file
 * @returns Promise that resolves to an array of objects
 */
function readCsvFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const results = [];
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    });
}
/**
 * Writes data to a CSV file
 * @param filePath Path to save the CSV file
 * @param data Array of objects to write
 * @param headers Array of header objects with id and title properties
 * @returns Promise that resolves when the file is written
 */
function writeCsvFile(filePath, data, headers) {
    return __awaiter(this, void 0, void 0, function* () {
        const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
            path: filePath,
            header: headers
        });
        return csvWriter.writeRecords(data);
    });
}
/**
 * Sanitizes a string for use as a Shopify handle
 * @param input String to sanitize
 * @returns Sanitized string
 */
function sanitizeHandle(input) {
    if (!input)
        return '';
    return input
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with a single one
        .trim();
}
/**
 * Formats a date string to ISO format
 * @param dateStr Date string in various formats
 * @returns ISO formatted date string or empty string if invalid
 */
function formatDate(dateStr) {
    if (!dateStr)
        return '';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime()))
            return '';
        return date.toISOString();
    }
    catch (error) {
        return '';
    }
}
/**
 * Converts a string to a boolean value
 * @param value String value to convert
 * @returns 'TRUE' or 'FALSE' string
 */
function stringToBoolean(value) {
    if (!value)
        return 'FALSE';
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
function formatPrice(value) {
    if (value === undefined || value === null || value === '')
        return '0.00';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num))
        return '0.00';
    return num.toFixed(2);
}
//# sourceMappingURL=csv-utils.js.map