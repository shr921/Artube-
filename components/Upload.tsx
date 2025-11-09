


import React, { useState, useCallback, useRef, useEffect } from 'react';
import { User, Video, CreativeImage, UploadableContent, Product } from '../types';
import { Icon } from './Icons';

interface UploadPageProps {
    currentUser: User;
    onUploadSuccess: (content: UploadableContent, product?: Omit<Product, 'id' | 'imageUrl' | 'sellerEmail'>) => void;
}

type UploadType = 'video' | 'image';

export const UploadPage: React.FC<UploadPageProps> = ({ currentUser, onUploadSuccess }) => {
    const [uploadType, setUploadType] = useState<UploadType>('video');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // E-commerce state
    const [isForSale, setIsForSale] = useState(false);
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Cleanup object URL
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const resetState = () => {
        setFile(null);
        setPreviewUrl(null);
        setTitle('');
        setDescription('');
        setTags('');
        setUploadState('idle');
        setProgress(0);
        setError(null);
        setIsForSale(false);
        setPrice('');
        setQuantity('');
    }
    
    const handleFileChange = (selectedFile: File | null) => {
        if (!selectedFile) return;
        
        const isValid = uploadType === 'video' 
            ? selectedFile.type.startsWith('video/')
            : selectedFile.type.startsWith('image/');

        if (isValid) {
            setFile(selectedFile);
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
            setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
            setError(null);
        } else {
            setError(`Please select a valid ${uploadType} file.`);
        }
    };
    
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('border-pink-500', 'bg-pink-50');
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-pink-500', 'bg-pink-50');
    };
    
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-pink-500', 'bg-pink-50');
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileChange(files[0]);
        }
    };

    const handlePublish = () => {
        if (!title.trim() || !description.trim()) {
            setError('Title and description are required.');
            return;
        }

        if (isForSale && (!price || !quantity || +price <= 0 || +quantity <= 0)) {
            setError('Please enter a valid price and quantity for the item.');
            return;
        }

        setUploadState('uploading');
        setError(null);
        setProgress(0);
        
        const interval = setInterval(() => {
            setProgress(prev => {
                const nextProgress = prev + 10;
                if (nextProgress >= 100) {
                    clearInterval(interval);
                    setUploadState('success');
                    
                    let newContent: UploadableContent;
                    const commonData = {
                        id: `${uploadType}_${Date.now()}`,
                        title,
                        description,
                        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
                        channel: currentUser,
                        likes: 0,
                        dislikes: 0,
                        comments: [],
                    };

                    if (uploadType === 'video') {
                        newContent = {
                            ...commonData,
                            thumbnailUrl: 'https://picsum.photos/seed/newvideo/400/225', // Placeholder
                            videoUrl: previewUrl || '',
                            duration: '0:00', // Placeholder
                            views: '0',
                            uploadedAt: 'Just now',
                        } as Video;
                    } else {
                        newContent = {
                            ...commonData,
                            imageUrl: previewUrl || '',
                        } as CreativeImage;
                    }

                    let newProduct: Omit<Product, 'id' | 'imageUrl' | 'sellerEmail'> | undefined;
                    if (isForSale) {
                        newProduct = {
                            name: title,
                            description,
                            price: parseFloat(price),
                            quantity: parseInt(quantity, 10),
                        };
                    }
                    
                    setTimeout(() => {
                        onUploadSuccess(newContent, newProduct);
                    }, 1500);

                    return 100;
                }
                return nextProgress;
            });
        }, 300);
    };
    
    const renderTabs = () => (
        <div className="flex justify-center border-b border-gray-200 dark:border-gray-700 mb-8">
            <button 
                onClick={() => { setUploadType('video'); resetState(); }} 
                className={`px-6 py-3 font-semibold ${uploadType === 'video' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-gray-500'}`}
            >
                Upload Video
            </button>
            <button 
                onClick={() => { setUploadType('image'); resetState(); }} 
                className={`px-6 py-3 font-semibold ${uploadType === 'image' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-gray-500'}`}
            >
                Upload Image
            </button>
        </div>
    );

    if (!file) {
        return (
            <div className="max-w-4xl mx-auto flex flex-col items-center p-8">
                {renderTabs()}
                <h1 className="text-4xl font-bold mb-4">Upload your {uploadType === 'video' ? 'Video' : 'Image'}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Share your creative work with the world</p>
                <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-80 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                >
                    <Icon name="upload" className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-lg font-semibold">Drag & drop {uploadType} files to upload</p>
                    <p className="text-gray-500 dark:text-gray-400">Your content will be private until you publish it.</p>
                    <button className="bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg mt-6 hover:bg-pink-700 transition">
                        Select File
                    </button>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                    accept={uploadType === 'video' ? 'video/*' : 'image/*'}
                    className="hidden"
                />
                 {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
             <h1 className="text-3xl font-bold mb-6">{uploadType === 'video' ? 'Video' : 'Image'} Details</h1>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 dark:text-gray-200" />
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea id="description" rows={5} value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 dark:text-gray-200" />
                    </div>
                     <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label>
                        <input type="text" id="tags" value={tags} onChange={e => setTags(e.target.value)} className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 dark:text-gray-200" />
                    </div>
                    {/* E-commerce Section */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border dark:border-gray-700">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox" checked={isForSale} onChange={() => setIsForSale(!isForSale)} className="h-5 w-5 rounded text-pink-600 focus:ring-pink-500 bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500" />
                            <span className="font-semibold text-gray-700 dark:text-gray-300">Sell this artwork</span>
                        </label>
                        {isForSale && (
                            <div className="mt-4 space-y-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400">List the physical artwork from your {uploadType} for sale.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
                                        <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g., 49.99" className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 dark:text-gray-200" />
                                    </div>
                                     <div>
                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity Available</label>
                                        <input type="number" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="e.g., 5" className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 dark:text-gray-200" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-4">
                    {previewUrl && (
                        uploadType === 'video' 
                          ? <video src={previewUrl} controls className="w-full rounded-lg aspect-video bg-black"></video>
                          : <img src={previewUrl} alt="Preview" className="w-full rounded-lg object-cover" />
                    )}
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-sm space-y-1">
                        <p><span className="font-semibold">Filename:</span> {file.name}</p>
                        <p><span className="font-semibold">Size:</span> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>

                    {uploadState === 'idle' && (
                        <button onClick={handlePublish} className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition">
                            Publish
                        </button>
                    )}
                    
                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                    {uploadState === 'uploading' && (
                        <div className="w-full">
                            <p className="text-sm font-semibold mb-2">Publishing...</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-pink-600 h-2.5 rounded-full transition-all duration-300" style={{width: `${progress}%`}}></div>
                            </div>
                        </div>
                    )}

                     {uploadState === 'success' && (
                        <div className="text-center bg-green-50 text-green-700 p-4 rounded-lg">
                            <p className="font-bold">Upload Complete!</p>
                            <p className="text-sm">Your content is now live.</p>
                        </div>
                    )}
                </div>
             </div>
        </div>
    )
};