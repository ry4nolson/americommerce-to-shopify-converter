#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import { convertCustomers } from './converters/customers';
import { convertOrders } from './converters/orders';
import { convertProducts } from './converters/products';

const program = new Command();

program
  .name('americommerce-to-shopify')
  .description('Convert AmeriCommerce exports to Shopify imports')
  .version('1.0.0');

program
  .command('customers')
  .description('Convert AmeriCommerce customer exports to Shopify format')
  .requiredOption('-i, --input <path>', 'Path to AmeriCommerce customer export CSV')
  .option('-o, --output <path>', 'Path to save Shopify customer import CSV', './shopify-customers.csv')
  .action(async (options) => {
    try {
      const inputPath = path.resolve(options.input);
      const outputPath = path.resolve(options.output);
      
      if (!fs.existsSync(inputPath)) {
        console.error(`Error: Input file ${inputPath} does not exist`);
        process.exit(1);
      }
      
      console.log(`Converting customers from ${inputPath} to ${outputPath}...`);
      await convertCustomers(inputPath, outputPath);
      console.log('Conversion completed successfully!');
    } catch (error) {
      console.error('Error during conversion:', error);
      process.exit(1);
    }
  });

program
  .command('orders')
  .description('Convert AmeriCommerce order exports to Shopify format')
  .requiredOption('-i, --input <path>', 'Path to AmeriCommerce order export CSV')
  .option('-o, --output <path>', 'Path to save Shopify order import CSV', './shopify-orders.csv')
  .action(async (options) => {
    try {
      const inputPath = path.resolve(options.input);
      const outputPath = path.resolve(options.output);
      
      if (!fs.existsSync(inputPath)) {
        console.error(`Error: Input file ${inputPath} does not exist`);
        process.exit(1);
      }
      
      console.log(`Converting orders from ${inputPath} to ${outputPath}...`);
      await convertOrders(inputPath, outputPath);
      console.log('Conversion completed successfully!');
    } catch (error) {
      console.error('Error during conversion:', error);
      process.exit(1);
    }
  });

program
  .command('products')
  .description('Convert AmeriCommerce product exports to Shopify format')
  .requiredOption('-i, --input <path>', 'Path to AmeriCommerce product export CSV')
  .option('-o, --output <path>', 'Path to save Shopify product import CSV', './shopify-products.csv')
  .action(async (options) => {
    try {
      const inputPath = path.resolve(options.input);
      const outputPath = path.resolve(options.output);
      
      if (!fs.existsSync(inputPath)) {
        console.error(`Error: Input file ${inputPath} does not exist`);
        process.exit(1);
      }
      
      console.log(`Converting products from ${inputPath} to ${outputPath}...`);
      await convertProducts(inputPath, outputPath);
      console.log('Conversion completed successfully!');
    } catch (error) {
      console.error('Error during conversion:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);

// If no command is provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
