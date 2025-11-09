import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { Product, User, Order } from '../types';
import { Icon } from './Icons';

interface PurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
    currentUser: User;
    onConfirmPurchase: (orderData: Omit<Order, 'id' | 'orderDate'>) => void;
}

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }> = ({ icon, ...props }) => (
    <div className="relative">
        <input 
            {...props}
            className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 ${icon ? 'pr-10' : ''}`}
        />
        {icon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{icon}</div>}
    </div>
);

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, product, currentUser, onConfirmPurchase }) => {
    // Shipping State
    const [name, setName] = useState(currentUser.name);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');

    // Payment State
    const [cardHolderName, setCardHolderName] = useState(currentUser.name);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');

    const [error, setError] = useState('');

    const cardType = useMemo(() => {
        if (cardNumber.startsWith('4')) return 'visa';
        if (cardNumber.startsWith('5')) return 'mastercard';
        return null;
    }, [cardNumber]);

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        setExpiryDate(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        // Validation
        if (!name.trim() || !address.trim() || !city.trim() || !zip.trim() || !country.trim()) {
            setError('Please fill out all shipping fields.');
            return;
        }
        if (!cardHolderName.trim() || cardNumber.replace(/\s/g, '').length !== 16 || expiryDate.length !== 5 || cvc.length !== 3) {
            setError('Please enter valid payment details.');
            return;
        }

        onConfirmPurchase({
            productId: product.id,
            productName: product.name,
            buyerEmail: currentUser.email,
            quantity: 1, // Assuming quantity of 1 for simplicity
            totalPrice: product.price,
            shippingAddress: { name, address, city, zip, country },
            paymentDetails: {
                cardHolderName,
                cardNumberLast4: cardNumber.slice(-4),
            }
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Complete Your Purchase">
            <div className="mb-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <img src={product.imageUrl} alt={product.name} className="w-20 h-20 rounded-md object-cover flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-lg font-bold text-pink-600">${product.price.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                 {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg -mt-2 mb-4">{error}</p>}
                
                {/* Shipping Section */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg border-b dark:border-gray-600 pb-2">Shipping Information</h4>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <InputField id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street Address</label>
                        <InputField id="address" type="text" placeholder="123 Creative Lane" value={address} onChange={e => setAddress(e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                            <InputField id="city" type="text" value={city} onChange={e => setCity(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP Code</label>
                            <InputField id="zip" type="text" value={zip} onChange={e => setZip(e.target.value)} required />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                        <InputField id="country" type="text" value={country} onChange={e => setCountry(e.target.value)} required />
                    </div>
                </div>

                {/* Payment Section */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg border-b dark:border-gray-600 pb-2">Payment Details</h4>
                    <div>
                        <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name on Card</label>
                        <InputField id="cardHolderName" type="text" value={cardHolderName} onChange={e => setCardHolderName(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
                        <InputField 
                            id="cardNumber" 
                            type="text" 
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber} 
                            onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))} 
                            required 
                            icon={cardType ? <Icon name={cardType} className="w-6 h-5" /> : <Icon name="credit-card" className="w-6 h-5 text-gray-400" />}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiration</label>
                            <InputField id="expiry" type="text" placeholder="MM/YY" value={expiryDate} onChange={handleExpiryDateChange} required />
                        </div>
                        <div>
                            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVC</label>
                            <InputField id="cvc" type="text" placeholder="123" value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))} required />
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition mt-4">
                    Confirm Purchase
                </button>
            </form>
        </Modal>
    );
};