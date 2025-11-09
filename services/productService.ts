import { Product, Order } from '../types';
import { MOCK_PRODUCTS } from '../constants';

const PRODUCTS_KEY = 'creatiTubeProducts';
const ORDERS_KEY = 'creatiTubeOrders';

const initializeMockData = () => {
    if (!localStorage.getItem(PRODUCTS_KEY)) {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(MOCK_PRODUCTS));
    }
    if (!localStorage.getItem(ORDERS_KEY)) {
        localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
    }
};

initializeMockData();

const getProductsFromStorage = (): Product[] => {
    const data = localStorage.getItem(PRODUCTS_KEY);
    return data ? JSON.parse(data) : [];
};

const saveProductsToStorage = (products: Product[]) => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

const getOrdersFromStorage = (): Order[] => {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
};

const saveOrdersToStorage = (orders: Order[]) => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};


export const productService = {
    getProducts: async (): Promise<Product[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getProductsFromStorage());
            }, 200);
        });
    },

    getProductById: async (id: string): Promise<Product | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const products = getProductsFromStorage();
                resolve(products.find(p => p.id === id));
            }, 100);
        });
    },

    addProduct: async (product: Product): Promise<Product> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const products = getProductsFromStorage();
                products.push(product);
                saveProductsToStorage(products);
                resolve(product);
            }, 300);
        });
    },

    updateProductQuantity: async (productId: string, quantityChange: number): Promise<Product> => {
         return new Promise((resolve, reject) => {
            setTimeout(() => {
                const products = getProductsFromStorage();
                const productIndex = products.findIndex(p => p.id === productId);
                if (productIndex === -1) {
                    return reject(new Error('Product not found.'));
                }
                const updatedProduct = { ...products[productIndex] };
                updatedProduct.quantity += quantityChange;
                products[productIndex] = updatedProduct;
                saveProductsToStorage(products);
                resolve(updatedProduct);
            }, 100);
        });
    },
    
    getOrders: async (): Promise<Order[]> => {
         return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getOrdersFromStorage());
            }, 200);
        });
    },

    addOrder: async (order: Order): Promise<Order> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const orders = getOrdersFromStorage();
                orders.unshift(order); // Add to the top of the list
                saveOrdersToStorage(orders);
                resolve(order);
            }, 300);
        });
    },
};
