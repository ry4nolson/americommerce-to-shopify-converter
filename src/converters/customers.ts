import { AmeriCommerceCustomer, ShopifyCustomer } from '../models/types';
import { readCsvFile, writeCsvFile, stringToBoolean } from '../utils/csv-utils';

/**
 * Maps an AmeriCommerce customer to a Shopify customer
 * @param customer AmeriCommerce customer data
 * @returns Shopify customer data
 */
function mapCustomerToShopify(customer: AmeriCommerceCustomer): ShopifyCustomer {
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
export async function convertCustomers(inputPath: string, outputPath: string): Promise<void> {
  try {
    // Read AmeriCommerce customer data
    const americommerceCustomers = await readCsvFile<AmeriCommerceCustomer>(inputPath);
    
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
    await writeCsvFile(outputPath, shopifyCustomers, headers);
    
    console.log(`Successfully converted ${shopifyCustomers.length} customers to Shopify format`);
  } catch (error) {
    console.error('Error converting customers:', error);
    throw error;
  }
}
