


import React, { useMemo } from 'react';
import { CreativeImage, User, Product } from '../types';
import { Icon } from './Icons';
import { CommentSection } from './CommentSection';

interface ImageDetailProps {
  image: CreativeImage;
  onClose: () => void;
  currentUser: User | null;
  products: Product[];
  onBuyNow: (product: Product) => void;
}

export const ImageDetail: React.FC<ImageDetailProps> = ({ image, onClose, currentUser, products, onBuyNow }) => {

  const product = useMemo(() => {
    if (!image.productId) return null;
    return products.find(p => p.id === image.productId);
  }, [image, products]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
        <div className="relative max-w-6xl w-full max-h-[90vh] flex bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
            <div className="w-2/3 bg-black flex items-center justify-center">
                <img src={image.imageUrl} alt={image.title} className="max-w-full max-h-[90vh] object-contain"/>
            </div>

            <div className="w-1/3 flex flex-col p-6 overflow-y-auto">
                <div className="flex-shrink-0">
                    <h1 className="text-2xl font-bold">{image.title}</h1>
                    <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
                        <div className="flex items-center space-x-3">
                            <img src={image.channel.avatarUrl} alt={image.channel.name} className="w-12 h-12 rounded-full"/>
                            <div>
                                <p className="font-semibold">{image.channel.name}</p>
                            </div>
                        </div>
                         <button className="bg-pink-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-pink-700">
                            Subscribe
                        </button>
                    </div>

                    <div className="flex items-center space-x-2 my-4">
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full">
                        <button className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-full">
                            <Icon name="like" className="w-5 h-5 mr-2"/> {image.likes.toLocaleString()}
                        </button>
                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                        <button className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-full">
                            <Icon name="dislike" className="w-5 h-5 mr-2"/> {image.dislikes.toLocaleString()}
                        </button>
                        </div>
                    </div>

                    {product && (
                        <div className="bg-green-50 border border-green-200 p-4 rounded-xl my-4">
                            <div className="flex items-center mb-2">
                                <Icon name="cart" className="w-6 h-6 text-green-600 mr-2"/>
                                <h3 className="text-lg font-bold text-green-800">Artwork for Sale</h3>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <p className="font-semibold">{product.name}</p>
                                    <p className="text-sm text-gray-600">{product.quantity} available</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-xl font-bold text-gray-800">${product.price.toFixed(2)}</p>
                                    <button 
                                        onClick={() => onBuyNow(product)}
                                        disabled={product.quantity === 0}
                                        className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                                        {product.quantity > 0 ? 'Buy Now' : 'Sold Out'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl mt-4">
                        <p className="text-sm">{image.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {image.tags.map(tag => (
                            <span key={tag} className="text-xs text-pink-600 bg-pink-100 px-2 py-1 rounded-full">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex-grow flex flex-col min-h-0">
                    <CommentSection initialComments={image.comments} currentUser={currentUser} />
                </div>
            </div>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75">
            <Icon name="close" className="w-8 h-8"/>
        </button>
    </div>
  );
};