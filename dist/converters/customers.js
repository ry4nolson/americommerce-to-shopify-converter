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
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCustomers = convertCustomers;
const csv_utils_1 = require("../utils/csv-utils");
/**
 * Maps an AmeriCommerce customer to a Shopify customer
 * @param customer AmeriCommerce customer data
 * @returns Shopify customer data
 */
function mapCustomerToShopify(customer) {
    return {
        'First Name': customer.first_name || '',
        'Last Name': customer.last_name || '',
        'Email': customer.email || '',
        'Company': customer.company || '',
        'Address1': customer.address1 || '',
        'Address2': customer.address2 || '',
        'City': customer.city || '',
        'Province': customer.state || '',
        'Province Code': customer.state || '',
        'Country': customer.country || '',
        'Country Code': customer.country || '',
        'Zip': customer.zip || '',
        'Phone': customer.phone || '',
        'Accepts Marketing': 'FALSE',
        'Tags': 'imported-from-americommerce'
    };
}
/**
 * Converts AmeriCommerce customer data to Shopify format
 * @param inputPath Path to AmeriCommerce customer CSV
 * @param outputPath Path to save Shopify customer CSV
 */
function convertCustomers(inputPath, outputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Read AmeriCommerce customer data
            const americommerceCustomers = yield (0, csv_utils_1.readCsvFile)(inputPath);
            console.log(`Read ${americommerceCustomers.length} customers from AmeriCommerce export`);
            // Map to Shopify format
            const shopifyCustomers = americommerceCustomers.map(mapCustomerToShopify);
            // Define headers for Shopify customer import
            const headers = [
                { id: 'First Name', title: 'First Name' },
                { id: 'Last Name', title: 'Last Name' },
                { id: 'Email', title: 'Email' },
                { id: 'Company', title: 'Company' },
                { id: 'Address1', title: 'Address1' },
                { id: 'Address2', title: 'Address2' },
                { id: 'City', title: 'City' },
                { id: 'Province', title: 'Province' },
                { id: 'Province Code', title: 'Province Code' },
                { id: 'Country', title: 'Country' },
                { id: 'Country Code', title: 'Country Code' },
                { id: 'Zip', title: 'Zip' },
                { id: 'Phone', title: 'Phone' },
                { id: 'Accepts Marketing', title: 'Accepts Marketing' },
                { id: 'Tags', title: 'Tags' }
            ];
            // Write to Shopify customer import CSV
            yield (0, csv_utils_1.writeCsvFile)(outputPath, shopifyCustomers, headers);
            console.log(`Successfully converted ${shopifyCustomers.length} customers to Shopify format`);
        }
        catch (error) {
            console.error('Error converting customers:', error);
            throw error;
        }
    });
}
//# sourceMappingURL=customers.js.map