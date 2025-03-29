#!/usr/bin/env node

import path from 'path';
import { convertProducts } from './converters/products';

async function testProductConverter() {
  try {
    const inputPath = path.resolve(__dirname, 'example_files/americommerce.csv');
    const outputPath = path.resolve(__dirname, 'example_files/converted-products.csv');
    
    console.log(`Testing product converter with input: ${inputPath}`);
    console.log(`Output will be saved to: ${outputPath}`);
    
    await convertProducts(inputPath, outputPath);
    
    console.log('Conversion test completed successfully!');
    console.log('Please compare the output file with the example Shopify CSV to verify the conversion.');
  } catch (error) {
    console.error('Error during test conversion:', error);
    process.exit(1);
  }
}

// Run the test
testProductConverter();
