


import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { VideoCard } from './components/VideoCard';
import { ShortsCard } from './components/ShortsCard';
import { MOCK_SHORTS } from './constants';
import { Video, User, View, Short, CreativeImage, UploadableContent, Product, Order, Theme } from './types';
import { VideoPlayer } from './components/VideoPlayer';
import { RecommendationEngine } from './components/RecommendationEngine';
import { Icon } from './components/Icons';
import { Modal } from './components/Modal';
import { SignInForm, SignUpForm } from './components/Auth';
import { authService } from './services/authService';
import { productService } from './services/productService';
import { contentService } from './services/contentService';
import { UploadPage } from './components/Upload';
import { ImageCard } from './components/ImageCard';
import { ImageDetail } from './components/ImageDetail';
import { ShortsPlayer } from './components/ShortsPlayer';
import { PurchaseModal } from './components/PurchaseModal';
import { AdminDashboard } from './components/AdminDashboard';


const HomePage: React.FC<{
  videos: Video[];
  images: CreativeImage[];
  shorts: Short[];
  onSelectVideo: (video: Video) => void;
  onSelectImage: (image: CreativeImage) => void;
  onSelectShort: (short: Short) => void;
  onSearch: (topics: string[]) => void;
  searchedTopics: string[];
  clearSearch: () => void;
}> = ({ videos, images, shorts, onSelectVideo, onSelectImage, onSelectShort, onSearch, searchedTopics, clearSearch }) => (
  <div>
    <RecommendationEngine onSearch={onSearch} />

    {searchedTopics.length > 0 && (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">AI Search Results</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {searchedTopics.map(topic => (
            <span key={topic} className="bg-pink-100 text-pink-700 px-3 py-1 text-sm rounded-full">{topic}</span>
          ))}
        </div>
      </div>
    )}

    <div className="flex items-center mb-4">
      <Icon name="shorts" className="w-7 h-7 text-pink-600 mr-3"/>
      <h2 className="text-2xl font-bold">Shorts</h2>
    </div>
    <div className="flex overflow-x-auto space-x-4 pb-4 -mx-8 px-8">
      {shorts.map((short) => (
        <ShortsCard key={short.id} short={short} onSelect={onSelectShort} />
      ))}
    </div>

    <div className="my-12 border-t border-gray-200 dark:border-gray-700"></div>

    <div className="flex items-center mb-4">
      <Icon name="play" className="w-7 h-7 text-pink-600 mr-3" />
      <h2 className="text-2xl font-bold">Videos</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onSelect={onSelectVideo} />
      ))}
    </div>

    {(videos.length === 0 && searchedTopics.length > 0) && (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <p className="text-lg">No videos found for your search.</p>
            <button onClick={clearSearch} className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">Clear Search</button>
        </div>
    )}
    
    <div className="my-12 border-t border-gray-200 dark:border-gray-700"></div>
    
    <div className="flex items-center mb-4">
      <Icon name="image" className="w-7 h-7 text-pink-600 mr-3"/>
      <h2 className="text-2xl font-bold">Creative Images</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
            <ImageCard key={image.id} image={image} onSelect={onSelectImage} />
        ))}
    </div>
  </div>
);

const MyCreationsPage: React.FC<{
    currentUser: User;
    allVideos: Video[];
    allImages: CreativeImage[];
    onSelectVideo: (video: Video) => void;
    onSelectImage: (image: CreativeImage) => void;
}> = ({ currentUser, allVideos, allImages, onSelectVideo, onSelectImage }) => {
    const [activeTab, setActiveTab] = useState<'videos' | 'images'>('videos');

    const userVideos = useMemo(() => allVideos.filter(video => video.channel.email === currentUser.email), [allVideos, currentUser.email]);
    const userImages = useMemo(() => allImages.filter(image => image.channel.email === currentUser.email), [allImages, currentUser.email]);

    return (
    <div>
        <h2 className="text-3xl font-bold mb-6">My Creations</h2>
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-8">
                <button onClick={() => setActiveTab('videos')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'videos' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'}`}>
                    Videos ({userVideos.length})
                </button>
                <button onClick={() => setActiveTab('images')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'images' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'}`}>
                    Images ({userImages.length})
                </button>
            </nav>
        </div>
        
        {activeTab === 'videos' && (
             <div>
                <div className="flex items-center gap-3 mb-6">
                    <Icon name="play" className="w-8 h-8 text-pink-600" />
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Your Uploaded Videos</h3>
                </div>
                {userVideos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">
                        {userVideos.map((video) => (
                            <VideoCard key={video.id} video={video} onSelect={onSelectVideo} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <Icon name="upload" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-lg font-semibold">You haven't uploaded any videos yet.</p>
                        <p className="text-sm mt-1">Click the upload button to share your first creation.</p>
                    </div>
                )}
            </div>
        )}

        {activeTab === 'images' && (
             <div>
                <div className="flex items-center gap-3 mb-6">
                    <Icon name="image" className="w-8 h-8 text-pink-600" />
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Your Uploaded Images</h3>
                </div>
                 {userImages.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {userImages.map((image) => (
                            <ImageCard key={image.id} image={image} onSelect={onSelectImage} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <Icon name="upload" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-lg font-semibold">You haven't uploaded any images yet.</p>
                        <p className="text-sm mt-1">Click the upload button to share your first creation.</p>
                    </div>
                )}
            </div>
        )}
    </div>
    )
};


const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedImage, setSelectedImage] = useState<CreativeImage | null>(null);
  const [selectedShort, setSelectedShort] = useState<Short | null>(null);
  const [searchedTopics, setSearchedTopics] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authModal, setAuthModal] = useState<'signIn' | 'signUp' | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [videos, setVideos] = useState<Video[]>([]);
  const [images, setImages] = useState<CreativeImage[]>([]);
  const [shorts, setShorts] = useState<Short[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [productToBuy, setProductToBuy] = useState<Product | null>(null);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('creatiTubeTheme') as Theme | null;
    if (savedTheme) {
        setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('creatiTubeTheme', theme);
  }, [theme]);

  useEffect(() => {
    const checkUser = async () => {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
    };
    const loadData = async () => {
        setShorts(MOCK_SHORTS); // Shorts are static for now
        const [loadedVideos, loadedImages, loadedProducts, loadedOrders] = await Promise.all([
            contentService.getVideos(),
            contentService.getImages(),
            productService.getProducts(),
            productService.getOrders()
        ]);
        setVideos(loadedVideos);
        setImages(loadedImages);
        setProducts(loadedProducts);
        setOrders(loadedOrders);
    };
    checkUser();
    loadData();
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setAuthModal(null);
  };

  const handleSignOut = async () => {
    await authService.signOut();
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleUploadSuccess = async (newCreation: UploadableContent, newProduct?: Omit<Product, 'id' | 'imageUrl' | 'sellerEmail'>) => {
    let finalCreation = { ...newCreation };
    
    if (newProduct && currentUser?.email) {
        const productToAdd: Product = {
            ...newProduct,
            id: `prod_${Date.now()}`,
            imageUrl: 'imageUrl' in newCreation ? newCreation.imageUrl : newCreation.thumbnailUrl,
            sellerEmail: currentUser.email,
        };
        await productService.addProduct(productToAdd);
        finalCreation.productId = productToAdd.id;
        setProducts(prev => [...prev, productToAdd]);
    }

    if ('videoUrl' in finalCreation) {
      const addedVideo = await contentService.addVideo(finalCreation as Video);
      setVideos(prev => [addedVideo, ...prev]);
    } else if ('imageUrl' in finalCreation) {
      const addedImage = await contentService.addImage(finalCreation as CreativeImage);
      setImages(prev => [addedImage, ...prev]);
    }
    setCurrentView('myCreations');
  };

  const handlePurchaseConfirm = async (orderData: Omit<Order, 'id' | 'orderDate'>) => {
      const newOrder: Order = {
          ...orderData,
          id: `order_${Date.now()}`,
          orderDate: new Date().toISOString()
      };
      await productService.addOrder(newOrder);
      const updatedProduct = await productService.updateProductQuantity(orderData.productId, -orderData.quantity);
      
      setOrders(prev => [newOrder, ...prev]);
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));

      setProductToBuy(null);
      // Optionally show a success message
      alert('Purchase successful!');
  };
  
  const handleNavigate = (view: View) => {
    if ((view === 'myCreations' || view === 'upload') && !currentUser) {
        setAuthModal('signIn');
    } else {
        setCurrentView(view);
    }
    setSidebarOpen(false);
  }

  const filteredVideos = useMemo(() => {
    if (searchedTopics.length === 0) {
      return videos;
    }
    return videos.filter(video => 
      video.tags.some(tag => 
        searchedTopics.some(topic => tag.toLowerCase().includes(topic.toLowerCase()))
      )
    );
  }, [searchedTopics, videos]);

  const renderContent = () => {
      switch (currentView) {
          case 'home':
              return <HomePage 
                videos={filteredVideos} 
                images={images}
                shorts={shorts}
                onSelectVideo={setSelectedVideo}
                onSelectImage={setSelectedImage} 
                onSelectShort={setSelectedShort}
                onSearch={setSearchedTopics}
                searchedTopics={searchedTopics}
                clearSearch={() => setSearchedTopics([])}
              />;
          case 'upload':
              if (!currentUser) return null; // Should not happen due to guard
              return <UploadPage currentUser={currentUser} onUploadSuccess={handleUploadSuccess} />;
          case 'myCreations':
              if (!currentUser) return null; // Guard
              return <MyCreationsPage 
                currentUser={currentUser}
                allVideos={videos}
                allImages={images}
                onSelectVideo={setSelectedVideo}
                onSelectImage={setSelectedImage} 
              />;
            case 'admin':
                if (currentUser?.email !== 'admin@creati.tube') return <div className="text-center py-20">Access Denied</div>;
                return <AdminDashboard orders={orders} products={products} />;
          default:
              return <div className="text-center py-20">Coming soon!</div>;
      }
  };
  
  const closeAllPlayers = () => {
      setSelectedVideo(null);
      setSelectedImage(null);
      setSelectedShort(null);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Header 
        toggleSidebar={toggleSidebar} 
        currentUser={currentUser}
        onSignInClick={() => setAuthModal('signIn')}
        onSignUpClick={() => setAuthModal('signUp')}
        onSignOut={handleSignOut}
        onUploadClick={() => handleNavigate('upload')}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        currentView={currentView}
        onNavigate={handleNavigate}
        currentUser={currentUser}
      />
      
      <main className={`pt-20 transition-all duration-300 ${isSidebarOpen ? 'pl-72' : 'pl-8'} pr-8`}>
        {!(selectedVideo || selectedImage || selectedShort) && renderContent()}
      </main>

      {selectedVideo && <VideoPlayer video={selectedVideo} onClose={closeAllPlayers} currentUser={currentUser} products={products} onBuyNow={setProductToBuy} />}
      {selectedImage && <ImageDetail image={selectedImage} onClose={closeAllPlayers} currentUser={currentUser} products={products} onBuyNow={setProductToBuy} />}
      {selectedShort && <ShortsPlayer short={selectedShort} onClose={closeAllPlayers} currentUser={currentUser}/>}
      
      <Modal 
        isOpen={authModal === 'signIn'} 
        onClose={() => setAuthModal(null)}
        title="Sign In to CreatiTube"
      >
        <SignInForm 
            onSuccess={handleAuthSuccess}
            switchToSignUp={() => setAuthModal('signUp')}
        />
      </Modal>

      <Modal 
        isOpen={authModal === 'signUp'} 
        onClose={() => setAuthModal(null)}
        title="Create your Account"
      >
        <SignUpForm
            onSuccess={handleAuthSuccess}
            switchToSignIn={() => setAuthModal('signIn')}
        />
      </Modal>

      {productToBuy && currentUser && (
        <PurchaseModal
            isOpen={!!productToBuy}
            onClose={() => setProductToBuy(null)}
            product={productToBuy}
            currentUser={currentUser}
            onConfirmPurchase={handlePurchaseConfirm}
        />
      )}
       {productToBuy && !currentUser && (
        <Modal
            isOpen={!!productToBuy}
            onClose={() => setProductToBuy(null)}
            title="Please Sign In"
        >
            <p className="text-center mb-4">You need to be signed in to purchase an item.</p>
            <button onClick={() => { setProductToBuy(null); setAuthModal('signIn'); }} className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition">
                Sign In
            </button>
        </Modal>
      )}
    </div>
  );
};

export default App;