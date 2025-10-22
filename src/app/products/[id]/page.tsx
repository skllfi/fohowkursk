
import { getProduct, getStaticParams, Product } from '@/lib/products';
import ProductPageClient from '@/components/fohow/ProductPageClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return getStaticParams();
}

interface ProductPageProps {
    params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
