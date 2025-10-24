import productsDataSource from '@/lib/products.json';
import ProductPageClient from '@/components/fohow/ProductPageClient';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/products';

export async function generateStaticParams() {
  return productsDataSource.products.map((product) => ({
    id: product.id,
  }));
}

function getProduct(id: string): Product | undefined {
  return productsDataSource.products.find((p: Product) => p.id === id);
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
