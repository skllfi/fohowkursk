import { getProduct, getStaticParams } from '@/lib/products';
import ProductPageClient from '@/components/fohow/ProductPageClient';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getStaticParams();
}

// Inlining the type definition as a last resort
export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
