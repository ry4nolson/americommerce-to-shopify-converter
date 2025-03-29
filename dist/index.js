#!/usr/bin/env node
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
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const customers_1 = require("./converters/customers");
const orders_1 = require("./converters/orders");
const products_1 = require("./converters/products");
const program = new commander_1.Command();
program
    .name('americommerce-to-shopify')
    .description('Convert AmeriCommerce exports to Shopify imports')
    .version('1.0.0');
program
    .command('customers')
    .description('Convert AmeriCommerce customer exports to Shopify format')
    .requiredOption('-i, --input <path>', 'Path to AmeriCommerce customer export CSV')
    .option('-o, --output <path>', 'Path to save Shopify customer import CSV', './shopify-customers.csv')
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputPath = path_1.default.resolve(options.input);
        const outputPath = path_1.default.resolve(options.output);
        if (!fs_extra_1.default.existsSync(inputPath)) {
            console.error(`Error: Input file ${inputPath} does not exist`);
            process.exit(1);
        }
        console.log(`Converting customers from ${inputPath} to ${outputPath}...`);
        yield (0, customers_1.convertCustomers)(inputPath, outputPath);
        console.log('Conversion completed successfully!');
    }
    catch (error) {
        console.error('Error during conversion:', error);
        process.exit(1);
    }
}));
program
    .command('orders')
    .description('Convert AmeriCommerce order exports to Shopify format')
    .requiredOption('-i, --input <path>', 'Path to AmeriCommerce order export CSV')
    .option('-o, --output <path>', 'Path to save Shopify order import CSV', './shopify-orders.csv')
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputPath = path_1.default.resolve(options.input);
        const outputPath = path_1.default.resolve(options.output);
        if (!fs_extra_1.default.existsSync(inputPath)) {
            console.error(`Error: Input file ${inputPath} does not exist`);
            process.exit(1);
        }
        console.log(`Converting orders from ${inputPath} to ${outputPath}...`);
        yield (0, orders_1.convertOrders)(inputPath, outputPath);
        console.log('Conversion completed successfully!');
    }
    catch (error) {
        console.error('Error during conversion:', error);
        process.exit(1);
    }
}));
program
    .command('products')
    .description('Convert AmeriCommerce product exports to Shopify format')
    .requiredOption('-i, --input <path>', 'Path to AmeriCommerce product export CSV')
    .option('-o, --output <path>', 'Path to save Shopify product import CSV', './shopify-products.csv')
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputPath = path_1.default.resolve(options.input);
        const outputPath = path_1.default.resolve(options.output);
        if (!fs_extra_1.default.existsSync(inputPath)) {
            console.error(`Error: Input file ${inputPath} does not exist`);
            process.exit(1);
        }
        console.log(`Converting products from ${inputPath} to ${outputPath}...`);
        yield (0, products_1.convertProducts)(inputPath, outputPath);
        console.log('Conversion completed successfully!');
    }
    catch (error) {
        console.error('Error during conversion:', error);
        process.exit(1);
    }
}));
program.parse(process.argv);
// If no command is provided, show help
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=index.js.map