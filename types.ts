


export type View = 'home' | 'upload' | 'myCreations' | 'subscriptions' | 'shorts' | 'admin';
export type Theme = 'light' | 'dark';

export interface User {
  name: string;
  avatarUrl: string;
  email: string;
}

export interface Comment {
  user: User;
  text: string;
  likes: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  sellerEmail: string;
}

export interface Order {
    id: string;
    productId: string;
    productName: string;
    buyerEmail: string;
    quantity: number;
    totalPrice: number;
    shippingAddress: {
        name: string;
        address: string;
        city: string;
        zip: string;
        country: string;
    };
    paymentDetails: {
        cardHolderName: string;
        cardNumberLast4: string;
    };
    orderDate: string;
}

export interface Video {
  id: string;
  thumbnailUrl: string;
  title: string;
  channel: User;
  views: string;
  uploadedAt: string;
  duration: string;
  videoUrl: string;
  description: string;
  tags: string[];
  comments: Comment[];
  likes: number;
  dislikes: number;
  productId?: string;
}

export interface Short {
  id: string;
  thumbnailUrl: string;
  title: string;
  channel: User;
  views: string;
  videoUrl: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}

export interface CreativeImage {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  channel: User;
  tags: string[];
  likes: number;
  dislikes: number;
  comments: Comment[];
  productId?: string;
}


export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

export type UploadableContent = Video | CreativeImage;