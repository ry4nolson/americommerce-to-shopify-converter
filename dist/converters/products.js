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
exports.convertProducts = convertProducts;
const csv_utils_1 = require("../utils/csv-utils");
/**
 * Maps an AmeriCommerce product to a Shopify product
 * @param product AmeriCommerce product data
 * @returns Shopify product data
 */
function mapProductToShopify(product) {
    var _a, _b;
    const handle = (0, csv_utils_1.sanitizeHandle)(product.item_name || product.item_number || '');
    const isActive = ((_a = product.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'active' ||
        ((_b = product.status) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'enabled';
    return {
        'Handle': handle,
        'Title': product.item_name || '',
        'Body': product.description || '',
        'Vendor': product.manufacturer_name || '',
        'Type': product.category_name || 'Default',
        'Tags': 'imported-from-americommerce',
        'Published': isActive ? 'TRUE' : 'FALSE',
        'Option1 Name': 'Title',
        'Option1 Value': 'Default',
        'Option2 Name': '',
        'Option2 Value': '',
        'Option3 Name': '',
        'Option3 Value': '',
        'Variant SKU': product.item_number || '',
        'Variant Grams': product.weight ? (parseFloat(product.weight) * 1000).toString() : '0',
        'Variant Inventory Tracker': 'shopify',
        'Variant Inventory Qty': product.inventory_level || '0',
        'Variant Inventory Policy': 'deny',
        'Variant Fulfillment Service': 'manual',
        'Variant Price': product.price ? (0, csv_utils_1.formatPrice)(product.price) : '0.00',
        'Variant Compare At Price': '',
        'Variant Requires Shipping': 'TRUE',
        'Variant Taxable': 'TRUE',
        'Variant Barcode': '',
        'Image Src': '',
        'Image Position': '',
        'Image Alt Text': '',
        'Gift Card': 'FALSE',
        'SEO Title': product.item_name || '',
        'SEO Description': product.description ? product.description.substring(0, 320) : '',
        'Google Shopping / Google Product Category': '',
        'Google Shopping / Gender': '',
        'Google Shopping / Age Group': '',
        'Google Shopping / MPN': '',
        'Google Shopping / AdWords Grouping': '',
        'Google Shopping / AdWords Labels': '',
        'Google Shopping / Condition': '',
        'Google Shopping / Custom Product': '',
        'Google Shopping / Custom Label 0': '',
        'Google Shopping / Custom Label 1': '',
        'Google Shopping / Custom Label 2': '',
        'Google Shopping / Custom Label 3': '',
        'Google Shopping / Custom Label 4': '',
        'Variant Image': '',
        'Variant Weight Unit': 'kg',
        'Variant Tax Code': '',
        'Cost per item': product.cost ? (0, csv_utils_1.formatPrice)(product.cost) : '0.00',
        'Status': isActive ? 'active' : 'draft'
    };
}
/**
 * Converts AmeriCommerce product data to Shopify format
 * @param inputPath Path to AmeriCommerce product CSV
 * @param outputPath Path to save Shopify product CSV
 */
function convertProducts(inputPath, outputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Read AmeriCommerce product data
            const americommerceProducts = yield (0, csv_utils_1.readCsvFile)(inputPath);
            console.log(`Read ${americommerceProducts.length} products from AmeriCommerce export`);
            // Map to Shopify format
            const shopifyProducts = americommerceProducts.map(mapProductToShopify);
            // Define headers for Shopify product import
            const headers = [
                { id: 'Handle', title: 'Handle' },
                { id: 'Title', title: 'Title' },
                { id: 'Body', title: 'Body (HTML)' },
                { id: 'Vendor', title: 'Vendor' },
                { id: 'Type', title: 'Type' },
                { id: 'Tags', title: 'Tags' },
                { id: 'Published', title: 'Published' },
                { id: 'Option1 Name', title: 'Option1 Name' },
                { id: 'Option1 Value', title: 'Option1 Value' },
                { id: 'Option2 Name', title: 'Option2 Name' },
                { id: 'Option2 Value', title: 'Option2 Value' },
                { id: 'Option3 Name', title: 'Option3 Name' },
                { id: 'Option3 Value', title: 'Option3 Value' },
                { id: 'Variant SKU', title: 'Variant SKU' },
                { id: 'Variant Grams', title: 'Variant Grams' },
                { id: 'Variant Inventory Tracker', title: 'Variant Inventory Tracker' },
                { id: 'Variant Inventory Qty', title: 'Variant Inventory Qty' },
                { id: 'Variant Inventory Policy', title: 'Variant Inventory Policy' },
                { id: 'Variant Fulfillment Service', title: 'Variant Fulfillment Service' },
                { id: 'Variant Price', title: 'Variant Price' },
                { id: 'Variant Compare At Price', title: 'Variant Compare At Price' },
                { id: 'Variant Requires Shipping', title: 'Variant Requires Shipping' },
                { id: 'Variant Taxable', title: 'Variant Taxable' },
                { id: 'Variant Barcode', title: 'Variant Barcode' },
                { id: 'Image Src', title: 'Image Src' },
                { id: 'Image Position', title: 'Image Position' },
                { id: 'Image Alt Text', title: 'Image Alt Text' },
                { id: 'Gift Card', title: 'Gift Card' },
                { id: 'SEO Title', title: 'SEO Title' },
                { id: 'SEO Description', title: 'SEO Description' },
                { id: 'Google Shopping / Google Product Category', title: 'Google Shopping / Google Product Category' },
                { id: 'Google Shopping / Gender', title: 'Google Shopping / Gender' },
                { id: 'Google Shopping / Age Group', title: 'Google Shopping / Age Group' },
                { id: 'Google Shopping / MPN', title: 'Google Shopping / MPN' },
                { id: 'Google Shopping / AdWords Grouping', title: 'Google Shopping / AdWords Grouping' },
                { id: 'Google Shopping / AdWords Labels', title: 'Google Shopping / AdWords Labels' },
                { id: 'Google Shopping / Condition', title: 'Google Shopping / Condition' },
                { id: 'Google Shopping / Custom Product', title: 'Google Shopping / Custom Product' },
                { id: 'Google Shopping / Custom Label 0', title: 'Google Shopping / Custom Label 0' },
                { id: 'Google Shopping / Custom Label 1', title: 'Google Shopping / Custom Label 1' },
                { id: 'Google Shopping / Custom Label 2', title: 'Google Shopping / Custom Label 2' },
                { id: 'Google Shopping / Custom Label 3', title: 'Google Shopping / Custom Label 3' },
                { id: 'Google Shopping / Custom Label 4', title: 'Google Shopping / Custom Label 4' },
                { id: 'Variant Image', title: 'Variant Image' },
                { id: 'Variant Weight Unit', title: 'Variant Weight Unit' },
                { id: 'Variant Tax Code', title: 'Variant Tax Code' },
                { id: 'Cost per item', title: 'Cost per item' },
                { id: 'Status', title: 'Status' }
            ];
            // Write to Shopify product import CSV
            yield (0, csv_utils_1.writeCsvFile)(outputPath, shopifyProducts, headers);
            console.log(`Successfully converted ${shopifyProducts.length} products to Shopify format`);
        }
        catch (error) {
            console.error('Error converting products:', error);
            throw error;
        }
    });
}
//# sourceMappingURL=products.js.map