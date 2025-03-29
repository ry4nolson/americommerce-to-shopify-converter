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
exports.convertOrders = convertOrders;
const csv_utils_1 = require("../utils/csv-utils");
/**
 * Maps an AmeriCommerce order to a Shopify order
 * @param order AmeriCommerce order data
 * @returns Shopify order data
 */
function mapOrderToShopify(order) {
    var _a, _b, _c, _d, _e, _f;
    const processedDate = (0, csv_utils_1.formatDate)(order.order_date);
    // Map financial status based on AmeriCommerce order status
    let financialStatus = 'pending';
    if (((_a = order.order_status) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('paid')) ||
        ((_b = order.order_status) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes('complete'))) {
        financialStatus = 'paid';
    }
    else if ((_c = order.order_status) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes('refund')) {
        financialStatus = 'refunded';
    }
    // Map fulfillment status based on AmeriCommerce order status
    let fulfillmentStatus = 'unfulfilled';
    if (((_d = order.order_status) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes('shipped')) ||
        ((_e = order.order_status) === null || _e === void 0 ? void 0 : _e.toLowerCase().includes('delivered'))) {
        fulfillmentStatus = 'fulfilled';
    }
    else if ((_f = order.order_status) === null || _f === void 0 ? void 0 : _f.toLowerCase().includes('partial')) {
        fulfillmentStatus = 'partial';
    }
    return {
        'Name': order.order_number || '',
        'Email': order.customer_email || '',
        'Financial Status': financialStatus,
        'Fulfillment Status': fulfillmentStatus,
        'Currency': 'USD',
        'Buyer Accepts Marketing': 'FALSE',
        'Lineitem quantity': '1', // Default, would need line item data for accurate conversion
        'Lineitem name': 'Product', // Default, would need line item data for accurate conversion
        'Lineitem price': order.grand_total ? (0, csv_utils_1.formatPrice)(order.grand_total) : '0.00',
        'Lineitem compare at price': '',
        'Lineitem sku': '',
        'Lineitem requires shipping': 'TRUE',
        'Lineitem taxable': 'TRUE',
        'Lineitem fulfillment status': fulfillmentStatus,
        'Billing Name': `${order.customer_first_name || ''} ${order.customer_last_name || ''}`.trim(),
        'Billing Street': '',
        'Billing Address1': '',
        'Billing Address2': '',
        'Billing Company': '',
        'Billing City': '',
        'Billing Zip': '',
        'Billing Province': '',
        'Billing Country': '',
        'Billing Phone': '',
        'Shipping Name': `${order.customer_first_name || ''} ${order.customer_last_name || ''}`.trim(),
        'Shipping Street': '',
        'Shipping Address1': '',
        'Shipping Address2': '',
        'Shipping Company': '',
        'Shipping City': '',
        'Shipping Zip': '',
        'Shipping Province': '',
        'Shipping Country': '',
        'Shipping Phone': '',
        'Notes': '',
        'Note Attributes': '',
        'Cancelled at': '',
        'Payment Method': order.payment_method || '',
        'Payment Reference': '',
        'Refunded Amount': '0.00',
        'Vendor': '',
        'Id': order.id || '',
        'Tags': 'imported-from-americommerce',
        'Risk Level': 'normal',
        'Source': 'americommerce-import',
        'Discount Code': '',
        'Discount Amount': order.discount_total ? (0, csv_utils_1.formatPrice)(order.discount_total) : '0.00',
        'Shipping Method': order.shipping_method || '',
        'Created at': processedDate,
        'Processed at': processedDate,
        'Total': order.grand_total ? (0, csv_utils_1.formatPrice)(order.grand_total) : '0.00',
        'Tax': order.tax_total ? (0, csv_utils_1.formatPrice)(order.tax_total) : '0.00',
        'Shipping': order.shipping_total ? (0, csv_utils_1.formatPrice)(order.shipping_total) : '0.00'
    };
}
/**
 * Converts AmeriCommerce order data to Shopify format
 * @param inputPath Path to AmeriCommerce order CSV
 * @param outputPath Path to save Shopify order CSV
 */
function convertOrders(inputPath, outputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Read AmeriCommerce order data
            const americommerceOrders = yield (0, csv_utils_1.readCsvFile)(inputPath);
            console.log(`Read ${americommerceOrders.length} orders from AmeriCommerce export`);
            // Map to Shopify format
            const shopifyOrders = americommerceOrders.map(mapOrderToShopify);
            // Define headers for Shopify order import
            const headers = [
                { id: 'Name', title: 'Name' },
                { id: 'Email', title: 'Email' },
                { id: 'Financial Status', title: 'Financial Status' },
                { id: 'Fulfillment Status', title: 'Fulfillment Status' },
                { id: 'Currency', title: 'Currency' },
                { id: 'Buyer Accepts Marketing', title: 'Buyer Accepts Marketing' },
                { id: 'Lineitem quantity', title: 'Lineitem quantity' },
                { id: 'Lineitem name', title: 'Lineitem name' },
                { id: 'Lineitem price', title: 'Lineitem price' },
                { id: 'Lineitem compare at price', title: 'Lineitem compare at price' },
                { id: 'Lineitem sku', title: 'Lineitem sku' },
                { id: 'Lineitem requires shipping', title: 'Lineitem requires shipping' },
                { id: 'Lineitem taxable', title: 'Lineitem taxable' },
                { id: 'Lineitem fulfillment status', title: 'Lineitem fulfillment status' },
                { id: 'Billing Name', title: 'Billing Name' },
                { id: 'Billing Street', title: 'Billing Street' },
                { id: 'Billing Address1', title: 'Billing Address1' },
                { id: 'Billing Address2', title: 'Billing Address2' },
                { id: 'Billing Company', title: 'Billing Company' },
                { id: 'Billing City', title: 'Billing City' },
                { id: 'Billing Zip', title: 'Billing Zip' },
                { id: 'Billing Province', title: 'Billing Province' },
                { id: 'Billing Country', title: 'Billing Country' },
                { id: 'Billing Phone', title: 'Billing Phone' },
                { id: 'Shipping Name', title: 'Shipping Name' },
                { id: 'Shipping Street', title: 'Shipping Street' },
                { id: 'Shipping Address1', title: 'Shipping Address1' },
                { id: 'Shipping Address2', title: 'Shipping Address2' },
                { id: 'Shipping Company', title: 'Shipping Company' },
                { id: 'Shipping City', title: 'Shipping City' },
                { id: 'Shipping Zip', title: 'Shipping Zip' },
                { id: 'Shipping Province', title: 'Shipping Province' },
                { id: 'Shipping Country', title: 'Shipping Country' },
                { id: 'Shipping Phone', title: 'Shipping Phone' },
                { id: 'Notes', title: 'Notes' },
                { id: 'Note Attributes', title: 'Note Attributes' },
                { id: 'Cancelled at', title: 'Cancelled at' },
                { id: 'Payment Method', title: 'Payment Method' },
                { id: 'Payment Reference', title: 'Payment Reference' },
                { id: 'Refunded Amount', title: 'Refunded Amount' },
                { id: 'Vendor', title: 'Vendor' },
                { id: 'Id', title: 'Id' },
                { id: 'Tags', title: 'Tags' },
                { id: 'Risk Level', title: 'Risk Level' },
                { id: 'Source', title: 'Source' },
                { id: 'Discount Code', title: 'Discount Code' },
                { id: 'Discount Amount', title: 'Discount Amount' },
                { id: 'Shipping Method', title: 'Shipping Method' },
                { id: 'Created at', title: 'Created at' },
                { id: 'Processed at', title: 'Processed at' },
                { id: 'Total', title: 'Total' },
                { id: 'Tax', title: 'Tax' },
                { id: 'Shipping', title: 'Shipping' }
            ];
            // Write to Shopify order import CSV
            yield (0, csv_utils_1.writeCsvFile)(outputPath, shopifyOrders, headers);
            console.log(`Successfully converted ${shopifyOrders.length} orders to Shopify format`);
        }
        catch (error) {
            console.error('Error converting orders:', error);
            throw error;
        }
    });
}
//# sourceMappingURL=orders.js.map