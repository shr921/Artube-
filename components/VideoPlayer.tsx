import React, { useState, useEffect, useMemo } from 'react';
import { Video, User, Product } from '../types';
import { Icon } from './Icons';
import { getVideoHighlights, UNAVAILABLE_MSG, ERROR_MSG } from '../services/geminiService';
import { CommentSection } from './CommentSection';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
  currentUser: User | null;
  products: Product[];
  onBuyNow: (product: Product) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose, currentUser, products, onBuyNow }) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const product = useMemo(() => {
    if (!video.productId) return null;
    return products.find(p => p.id === video.productId);
  }, [video, products]);

  useEffect(() => {
    if (!video) return;

    const fetchSummary = async () => {
      setIsSummaryLoading(true);
      setSummaryError(null);
      setAiSummary(null);
      
      const result = await getVideoHighlights(video.title, video.description);
      
      if (result.startsWith(UNAVAILABLE_MSG) || result.startsWith(ERROR_MSG)) {
        setSummaryError(result);
      } else {
        setAiSummary(result);
      }
      setIsSummaryLoading(false);
    };

    fetchSummary();
  }, [video]);
  
  const handleShare = () => {
    const videoUrl = `${window.location.origin}/video/${video.id}`;
    navigator.clipboard.writeText(videoUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000); // Reset after 2 seconds
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="flex justify-end mb-4">
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <Icon name="close" className="w-8 h-8"/>
            </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              <video src={video.videoUrl} controls autoPlay className="w-full h-full"></video>
            </div>
            <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
            <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
              <div className="flex items-center space-x-3">
                <img src={video.channel.avatarUrl} alt={video.channel.name} className="w-12 h-12 rounded-full"/>
                <div>
                  <p className="font-semibold">{video.channel.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{video.views} views &bull; {video.uploadedAt}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full">
                  <button className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-full">
                    <Icon name="like" className="w-5 h-5 mr-2"/> {video.likes.toLocaleString()}
                  </button>
                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                  <button className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-full">
                    <Icon name="dislike" className="w-5 h-5 mr-2"/> {video.dislikes.toLocaleString()}
                  </button>
                </div>
                 <button onClick={handleShare} className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                    {isCopied ?
                        <>
                            <Icon name="ai" className="w-5 h-5 mr-2 text-green-600"/>
                            <span className="text-green-600 font-semibold">Copied!</span>
                        </> :
                        <>
                            <Icon name="share" className="w-5 h-5 mr-2"/>
                            <span>Share</span>
                        </>
                    }
                </button>
                <button className="bg-pink-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-pink-700">
                  Subscribe
                </button>
              </div>
            </div>

            {product && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-xl mt-4">
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

            {/* AI Highlights Section */}
            {(isSummaryLoading || summaryError || aiSummary) && (
              <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800/50 p-4 rounded-xl mt-4">
                <div className="flex items-center mb-2">
                  <Icon name="ai" className="w-6 h-6 text-pink-500 mr-2"/>
                  <h3 className="text-lg font-bold text-pink-700 dark:text-pink-400">AI Highlights</h3>
                </div>
                {isSummaryLoading && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generating a sneak peek...</span>
                  </div>
                )}
                {summaryError && <p className="text-red-500 text-sm">{summaryError}</p>}
                {aiSummary && (
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {aiSummary.split('\n').filter(line => line.trim() !== '').map((line, index) => {
                      if (line.trim().startsWith('*')) {
                        return <p key={index} className="pl-2">&bull; {line.trim().substring(1).trim()}</p>;
                      }
                      return <p key={index}>{line}</p>;
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mt-4">
              <p className="text-sm">{video.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {video.tags.map(tag => (
                  <span key={tag} className="text-xs text-pink-600 bg-pink-100 px-2 py-1 rounded-full">#{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <CommentSection initialComments={video.comments} currentUser={currentUser} />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-4">Up Next</h3>
            {/* Placeholder for related videos */}
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">Related videos would appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};