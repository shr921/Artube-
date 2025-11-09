import React from 'react';
import { Order, Product } from '../types';
import { Icon } from './Icons';

interface AdminDashboardProps {
    orders: Order[];
    products: Product[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, products }) => {
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const totalOrders = orders.length;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
                    <h4 className="text-gray-500 dark:text-gray-400 font-semibold">Total Revenue</h4>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
                    <h4 className="text-gray-500 dark:text-gray-400 font-semibold">Total Orders</h4>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalOrders}</p>
                </div>
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
                    <h4 className="text-gray-500 dark:text-gray-400 font-semibold">Total Products</h4>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{products.length}</p>
                </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">Customer Orders</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">Order Date</th>
                                <th scope="col" className="px-6 py-3">Product</th>
                                <th scope="col" className="px-6 py-3">Customer</th>
                                <th scope="col" className="px-6 py-3">Total</th>
                                <th scope="col" className="px-6 py-3">Shipping Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-10">
                                        <Icon name="cart" className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                                        <p className="font-semibold">No orders yet.</p>
                                    </td>
                                </tr>
                            ) : (
                                orders.map(order => (
                                    <tr key={order.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">{order.productName}</td>
                                        <td className="px-6 py-4">{order.buyerEmail}</td>
                                        <td className="px-6 py-4 font-semibold">${order.totalPrice.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            {order.shippingAddress.name}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.zip}, {order.shippingAddress.country.toUpperCase()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};