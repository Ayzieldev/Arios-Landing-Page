// Use localhost for testing, fallback to production
//const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://arios-back-end-server-production.up.railway.app/api';
// Debug logging
console.log('🔍 Environment Variables:');
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('API_BASE_URL:', API_BASE_URL);

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand?: string;
  images: string[];
  stock: number;
  rating: number;
  numReviews: number;
  isActive: boolean;
  featured: boolean;
  tags: string[];
  createdAt: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    current: number;
    pages: number;
    total: number;
  };
}

export const api = {
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    featured?: boolean;
  }): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.category) searchParams.append('category', params.category);
    
    const url = `${API_BASE_URL}/products?${searchParams.toString()}`;
    console.log('🔍 Fetching products from:', url);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('🔍 Products received:', data);
      return data;
    } catch (error) {
      console.error('🔍 API Error:', error);
      throw error;
    }
  },

  async getCategories(): Promise<string[]> {
    const url = `${API_BASE_URL}/products/categories`;
    console.log('🔍 Fetching categories from:', url);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('🔍 Categories received:', data);
      return data;
    } catch (error) {
      console.error('🔍 API Error:', error);
      throw error;
    }
  }
}; 