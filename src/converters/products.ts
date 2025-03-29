import { AmeriCommerceProduct, ShopifyProduct } from '../models/types';
import { readCsvFile, writeCsvFile, sanitizeHandle, formatPrice } from '../utils/csv-utils';

/**
 * Combines multiple description fields into a single HTML description with headings
 * @param product AmeriCommerce product data
 * @returns Combined HTML description
 */
function combineDescriptions(product: AmeriCommerceProduct): string {
  let combinedDescription = '';
  
  // Add main description with heading
  if (product.LongDescription1 && product.LongDescription1.trim()) {
    combinedDescription += '<h3>Description</h3>';
    combinedDescription += product.LongDescription1;
  }
  
  // Add ingredients (usually in LongDescription2)
  if (product.LongDescription2 && product.LongDescription2.trim()) {
    // Add a separator if there's already content
    if (combinedDescription.trim()) {
      combinedDescription += '<hr>';
    }
    
    combinedDescription += '<h3>Ingredients</h3>';
    combinedDescription += product.LongDescription2;
  }
  
  // If there are additional descriptions, add them with generic headings
  if (product.LongDescription3 && product.LongDescription3.trim()) {
    combinedDescription += '<hr>';
    const heading = product.LongDescriptionName3 || 'Additional Information';
    combinedDescription += `<h3>${heading}</h3>`;
    combinedDescription += product.LongDescription3;
  }
  
  if (product.LongDescription4 && product.LongDescription4.trim()) {
    combinedDescription += '<hr>';
    const heading = product.LongDescriptionName4 || 'More Details';
    combinedDescription += `<h3>${heading}</h3>`;
    combinedDescription += product.LongDescription4;
  }
  
  if (product.LongDescription5 && product.LongDescription5.trim()) {
    combinedDescription += '<hr>';
    const heading = product.LongDescriptionName5 || 'Additional Information';
    combinedDescription += `<h3>${heading}</h3>`;
    combinedDescription += product.LongDescription5;
  }
  
  return combinedDescription;
}

/**
 * Maps an AmeriCommerce product to a Shopify product
 * @param product AmeriCommerce product data
 * @returns Shopify product data
 */
function mapProductToShopify(product: AmeriCommerceProduct): ShopifyProduct {
  const handle = sanitizeHandle(product.ProductUrl || product.ItemName || product.ItemNumber || '');
  const isActive = product.ProductStatus?.toLowerCase() === 'in stock';
  const weightInGrams = product.Weight ? Math.round(parseFloat(product.Weight) * 28.3495).toString() : '0';
  
  // Combine all description fields into a single HTML description with headings
  const combinedDescription = combineDescriptions(product);
  
  return {
    'Title': product.ItemName || '',
    'URL handle': handle,
    'Description': combinedDescription,
    'Vendor': product.Manufacturer || '',
    'Product category': product.CategoryList?.split('|')[0] || '',
    'Type': product.CategoryList?.split('|')[0]?.split(' > ').pop() || 'Default',
    'Tags': product.CategoryList?.replace(/\s*>\s*/g, ',').replace(/\|/g, ',') || 'imported-from-americommerce',
    'Published on online store': isActive ? 'true' : 'false',
    'Status': isActive ? 'active' : 'draft',
    'SKU': product.ItemNumber || '',
    'Barcode': '',
    'Option1 name': 'Title',
    'Option1 value': 'Default',
    'Option2 name': '',
    'Option2 value': '',
    'Option3 name': '',
    'Option3 value': '',
    'Price': product.BasePrice ? formatPrice(product.BasePrice) : '0.00',
    'Price / International': '',
    'Compare-at price': product.RetailPrice && product.RetailPrice !== product.BasePrice ? formatPrice(product.RetailPrice) : '',
    'Compare-at price / International': '',
    'Cost per item': product.Cost ? formatPrice(product.Cost) : '0.00',
    'Charge tax': 'true',
    'Tax code': '',
    'Inventory tracker': 'shopify',
    'Inventory quantity': product.InventoryLevel || '0',
    'Continue selling when out of stock': 'deny',
    'Weight value (grams)': weightInGrams,
    'Weight unit for display': 'g',
    'Requires shipping': 'true',
    'Fulfillment service': 'manual',
    'Product image URL': product.ItemPrimaryImageUrl || '',
    'Image position': '1',
    'Image alt text': product.ItemPrimaryImageAltText || product.ItemName || '',
    'Variant image URL': '',
    'Gift card': 'false',
    'SEO title': product.ItemName || '',
    'SEO description': product.ShortDescriptionForCategoryList || 
                     (product.LongDescription1 ? product.LongDescription1.substring(0, 320).replace(/<[^>]*>/g, '') : ''),
    'Google Shopping / Google product category': '',
    'Google Shopping / Gender': '',
    'Google Shopping / Age group': '',
    'Google Shopping / MPN': product.ManufacturerPartNumber || '',
    'Google Shopping / AdWords Grouping': '',
    'Google Shopping / AdWords labels': '',
    'Google Shopping / Condition': 'new',
    'Google Shopping / Custom product': '',
    'Google Shopping / Custom label 0': '',
    'Google Shopping / Custom label 1': '',
    'Google Shopping / Custom label 2': '',
    'Google Shopping / Custom label 3': '',
    'Google Shopping / Custom label 4': ''
  };
}

/**
 * Converts AmeriCommerce product data to Shopify format
 * @param inputPath Path to AmeriCommerce product CSV
 * @param outputPath Path to save Shopify product CSV
 */
export async function convertProducts(inputPath: string, outputPath: string): Promise<void> {
  try {
    // Read AmeriCommerce product data
    const americommerceProducts = await readCsvFile<AmeriCommerceProduct>(inputPath);
    
    console.log(`Read ${americommerceProducts.length} products from AmeriCommerce export`);
    
    // Map to Shopify format
    const shopifyProducts = americommerceProducts.map(mapProductToShopify);
    
    // Define headers for Shopify product import
    const headers = [
      { id: 'Title', title: 'Title' },
      { id: 'URL handle', title: 'URL handle' },
      { id: 'Description', title: 'Description' },
      { id: 'Vendor', title: 'Vendor' },
      { id: 'Product category', title: 'Product category' },
      { id: 'Type', title: 'Type' },
      { id: 'Tags', title: 'Tags' },
      { id: 'Published on online store', title: 'Published on online store' },
      { id: 'Status', title: 'Status' },
      { id: 'SKU', title: 'SKU' },
      { id: 'Barcode', title: 'Barcode' },
      { id: 'Option1 name', title: 'Option1 name' },
      { id: 'Option1 value', title: 'Option1 value' },
      { id: 'Option2 name', title: 'Option2 name' },
      { id: 'Option2 value', title: 'Option2 value' },
      { id: 'Option3 name', title: 'Option3 name' },
      { id: 'Option3 value', title: 'Option3 value' },
      { id: 'Price', title: 'Price' },
      { id: 'Price / International', title: 'Price / International' },
      { id: 'Compare-at price', title: 'Compare-at price' },
      { id: 'Compare-at price / International', title: 'Compare-at price / International' },
      { id: 'Cost per item', title: 'Cost per item' },
      { id: 'Charge tax', title: 'Charge tax' },
      { id: 'Tax code', title: 'Tax code' },
      { id: 'Inventory tracker', title: 'Inventory tracker' },
      { id: 'Inventory quantity', title: 'Inventory quantity' },
      { id: 'Continue selling when out of stock', title: 'Continue selling when out of stock' },
      { id: 'Weight value (grams)', title: 'Weight value (grams)' },
      { id: 'Weight unit for display', title: 'Weight unit for display' },
      { id: 'Requires shipping', title: 'Requires shipping' },
      { id: 'Fulfillment service', title: 'Fulfillment service' },
      { id: 'Product image URL', title: 'Product image URL' },
      { id: 'Image position', title: 'Image position' },
      { id: 'Image alt text', title: 'Image alt text' },
      { id: 'Variant image URL', title: 'Variant image URL' },
      { id: 'Gift card', title: 'Gift card' },
      { id: 'SEO title', title: 'SEO title' },
      { id: 'SEO description', title: 'SEO description' },
      { id: 'Google Shopping / Google product category', title: 'Google Shopping / Google product category' },
      { id: 'Google Shopping / Gender', title: 'Google Shopping / Gender' },
      { id: 'Google Shopping / Age group', title: 'Google Shopping / Age group' },
      { id: 'Google Shopping / MPN', title: 'Google Shopping / MPN' },
      { id: 'Google Shopping / AdWords Grouping', title: 'Google Shopping / AdWords Grouping' },
      { id: 'Google Shopping / AdWords labels', title: 'Google Shopping / AdWords labels' },
      { id: 'Google Shopping / Condition', title: 'Google Shopping / Condition' },
      { id: 'Google Shopping / Custom product', title: 'Google Shopping / Custom product' },
      { id: 'Google Shopping / Custom label 0', title: 'Google Shopping / Custom label 0' },
      { id: 'Google Shopping / Custom label 1', title: 'Google Shopping / Custom label 1' },
      { id: 'Google Shopping / Custom label 2', title: 'Google Shopping / Custom label 2' },
      { id: 'Google Shopping / Custom label 3', title: 'Google Shopping / Custom label 3' },
      { id: 'Google Shopping / Custom label 4', title: 'Google Shopping / Custom label 4' }
    ];
    
    // Write to Shopify product import CSV
    await writeCsvFile(outputPath, shopifyProducts, headers);
    
    console.log(`Successfully converted ${shopifyProducts.length} products to Shopify format`);
  } catch (error) {
    console.error('Error converting products:', error);
    throw error;
  }
}
