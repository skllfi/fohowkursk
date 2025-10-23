import productsDataSource from '@/lib/products.json';
import ProductPageClient from '@/components/fohow/ProductPageClient';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/products'; // Use 'import type' for type-only imports

// This function generates the static paths for each product page at build time.
export async function generateStaticParams() {
  // The function must return an array of objects, where each object has an 'id' property
  // corresponding to a product's ID. This tells Next.js which pages to pre-render.
  return productsDataSource.products.map((product) => ({
    id: product.id,
  }));
}

// Helper function to find a specific product by its ID from the imported JSON data.
function getProduct(id: string): Product | undefined {
  return productsDataSource.products.find((p: Product) => p.id === id);
}

// The main component for the product page.
// It's a server component that fetches data and passes it to a client component.
export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = getProduct(id);

  if (!product) {
    // If a product with the given ID isn't found, Next.js will render the 404 page.
    notFound();
  }

  // Renders the client component, passing the fetched product data as a prop.
  return <ProductPageClient product={product} />;
}
