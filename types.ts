
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  minOrder: number;
  availableSeeds: string[];
}

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
  selectedSeed: string;
  customText: string;
  uploadedImage?: string | null; // Base64 string do arquivo
  uploadedFileName?: string; // Nome do arquivo para exibição
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  imageUrl: string; // Foto da pessoa (Avatar)
  productImageUrl?: string; // Foto do produto no evento (Opcional)
}

// --- User & Auth Types ---

export type UserType = 'PF' | 'PJ';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  document: string; // CPF ou CNPJ
}

// --- Admin Types ---

export type OrderStatus = 'pending' | 'paid' | 'production' | 'shipped' | 'delivered' | 'cancelled';

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: OrderStatus;
  total: number;
  itemsCount: number;
  paymentMethod: string;
  address?: Address; // Adicionado endereço
  // Integrações
  blingId?: string;
  blingStatus?: 'synced' | 'pending' | 'error';
  // Frete
  trackingCode?: string;
  shippingService?: string; // ex: SEDEX, PAC, JADLOG
  labelGenerated?: boolean;
  // Depoimento
  hasTestimonial?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export enum ViewState {
  HOME = 'HOME',
  ALL_PRODUCTS = 'ALL_PRODUCTS',
  SPECIAL_DATES = 'SPECIAL_DATES',
  QUOTE = 'QUOTE',
  TESTIMONIALS = 'TESTIMONIALS',
  CONTACT = 'CONTACT',
  CART = 'CART',
  CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS',
  ADMIN = 'ADMIN',
  LOGIN = 'LOGIN',
  USER_PROFILE = 'USER_PROFILE',
  PAYMENT = 'PAYMENT'
}
