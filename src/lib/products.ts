
import productInfo from './products.json';
import { StaticImageData } from 'next/image';

// A dynamic map to hold imported image modules
// This map is now empty as we are not using require
const imageMap: { [key: string]: StaticImageData } = {};


export type ChartData = {
  type: 'pie' | 'doughnut' | 'bar' | 'line' | 'radar';
  labels: string[];
  values: number[];
  title: string;
};

export type ProductDetails = {
  composition: string;
  action: string;
  application: string;
  contraindication?: string;
  chartData?: ChartData;
  packaging?: string;
  shelfLife?: string;
  storage?: string;
  dosage?: string;
  effects?: string;
  note?: string;
  quantityInPackage?: string;
  course?: string;
};

export type Product = {
  id: string;
  productCode: string;
  name: string;
  category: string;
  summary: string;
  price: number;
  pricePerUnit?: number;
  unitName?: string;
  image?: string;
  details: ProductDetails;
  isFeatured?: boolean;
};

// This type includes the resolved image object
export type ProductWithImage = Product & {
    imageObj?: StaticImageData;
};

function getProducts(): ProductWithImage[] {
    return productInfo.products.map(p => ({
        ...p,
        // We no longer add imageObj here as it was causing issues.
        // The path from p.image will be used directly.
    }));
}

function getProduct(id: string): ProductWithImage | undefined {
    const products = getProducts();
    return products.find(p => p.id === id);
}

function getStaticParams() {
    return productInfo.products.map((product) => ({
        id: product.id,
    }));
}

export const productsData: Product[] = productInfo.products;
export { getProducts, getProduct, getStaticParams };
