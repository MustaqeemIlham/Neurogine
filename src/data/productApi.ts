import { request } from './client';
import { Product, ProductsResponse } from './types';

export async function getProducts(limit: number, skip: number): Promise<ProductsResponse> {
  return request<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`)
}

export async function getProductById(id: number): Promise<Product> {
  return request<Product>(`/products/${id}`)
}

export async function searchProducts(
  q: string,
  limit: number,
  skip: number,
): Promise<ProductsResponse> {

  const query = encodeURIComponent(q);// control search object
  return request<ProductsResponse>(`/products/search?q=${query}&limit=${limit}&skip=${skip}`)
}
