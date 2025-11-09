

import { Video, Short, MusicTrack, CreativeImage, Product, User } from './types';

export const USERS = {
  craftyChloe: { name: 'Crafty Chloe', avatarUrl: 'https://picsum.photos/seed/chloe/40/40', email: 'chloe@test.com' },
  pixelPete: { name: 'Pixel Pete', avatarUrl: 'https://picsum.photos/seed/pete/40/40', email: 'pete@test.com' },
  sculptingSarah: { name: 'Sculpting Sarah', avatarUrl: 'https://picsum.photos/seed/sarah/40/40', email: 'sarah@test.com' },
  diyDan: { name: 'DIY Dan', avatarUrl: 'https://picsum.photos/seed/dan/40/40', email: 'dan@test.com' },
  artfulAmy: { name: 'Artful Amy', avatarUrl: 'https://picsum.photos/seed/amy/40/40', email: 'amy@test.com' },
  commenter1: { name: 'RandomViewer1', avatarUrl: 'https://picsum.photos/seed/viewer1/40/40', email: 'viewer1@test.com' },
  commenter2: { name: 'CreativeFan22', avatarUrl: 'https://picsum.photos/seed/viewer2/40/40', email: 'viewer2@test.com' },
  adminUser: { name: 'App Owner', avatarUrl: 'https://picsum.photos/seed/admin/40/40', email: 'admin@creati.tube' },
};

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'prod1',
        name: 'Handcrafted Miniature Cabin',
        description: 'A beautiful, detailed miniature cabin, handmade from real wood. Perfect for collectors or as a unique decor piece.',
        price: 189.99,
        quantity: 3,
        imageUrl: 'https://picsum.photos/seed/video1/400/225',
        sellerEmail: 'chloe@test.com'
    },
    {
        id: 'prod2',
        name: 'Set of 3 Clay Mushrooms',
        description: 'A whimsical set of three mushroom sculptures, hand-painted and crafted from durable polymer clay.',
        price: 45.50,
        quantity: 15,
        imageUrl: 'https://picsum.photos/seed/img3/800/600',
        sellerEmail: 'sarah@test.com'
    }
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    thumbnailUrl: 'https://picsum.photos/seed/video1/400/225',
    title: 'Building a Miniature Wooden Cabin from Scratch',
    channel: USERS.craftyChloe,
    views: '1.2M',
    uploadedAt: '3 weeks ago',
    duration: '15:32',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Watch me build a detailed miniature cabin using only natural materials. A relaxing and satisfying woodworking project.',
    tags: ['woodworking', 'miniatures', 'crafting', 'diy'],
    likes: 125000,
    dislikes: 1200,
    comments: [
      { user: USERS.commenter1, text: 'This is incredible! The level of detail is amazing.', likes: 250 },
      { user: USERS.pixelPete, text: 'Wow, such patience! Inspiring work.', likes: 180 },
    ],
    productId: 'prod1',
  },
  {
    id: '2',
    thumbnailUrl: 'https://picsum.photos/seed/video2/400/225',
    title: 'Creating a Retro Pixel Art Animation',
    channel: USERS.pixelPete,
    views: '850K',
    uploadedAt: '1 month ago',
    duration: '10:05',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'A step-by-step tutorial on how I create my pixel art characters and animate a short loop in Aseprite.',
    tags: ['pixel art', 'animation', 'tutorial', 'aseprite'],
    likes: 92000,
    dislikes: 500,
    comments: [
      { user: USERS.artfulAmy, text: 'Your tutorials are always so helpful! Thanks Pete!', likes: 400 },
    ],
  },
  {
    id: '3',
    thumbnailUrl: 'https://picsum.photos/seed/video3/400/225',
    title: 'Time-lapse: Sculpting a Realistic Dragon Head',
    channel: USERS.sculptingSarah,
    views: '3.5M',
    uploadedAt: '2 months ago',
    duration: '20:18',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Join me for a full time-lapse of sculpting a dragon head from polymer clay. The process took over 40 hours!',
    tags: ['sculpting', 'polymer clay', 'dragon', 'art'],
    likes: 450000,
    dislikes: 3400,
    comments: [
        { user: USERS.commenter2, text: 'Absolutely breathtaking! You are a master of your craft.', likes: 1200 },
    ],
  },
  {
    id: '4',
    thumbnailUrl: 'https://picsum.photos/seed/video4/400/225',
    title: 'DIY Concrete Planters - Modern Home Decor',
    channel: USERS.diyDan,
    views: '500K',
    uploadedAt: '1 week ago',
    duration: '08:45',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Learn how to make these simple and stylish concrete planters for your home. A great weekend project!',
    tags: ['diy', 'home decor', 'concrete', 'crafting'],
    likes: 34000,
    dislikes: 800,
    comments: [],
  },
  {
    id: '5',
    thumbnailUrl: 'https://picsum.photos/seed/video5/400/225',
    title: 'Digital Painting a Fantasy Landscape in Procreate',
    channel: USERS.artfulAmy,
    views: '2.1M',
    uploadedAt: '1 month ago',
    duration: '25:00',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'A full narrated tutorial on my process for painting epic fantasy landscapes on the iPad with Procreate.',
    tags: ['digital painting', 'procreate', 'art', 'tutorial'],
    likes: 210000,
    dislikes: 2100,
    comments: [],
  },
  {
    id: '6',
    thumbnailUrl: 'https://picsum.photos/seed/video6/400/225',
    title: 'Making a Stained Glass Window Panel',
    channel: USERS.craftyChloe,
    views: '780K',
    uploadedAt: '2 months ago',
    duration: '18:12',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Discover the beautiful art of stained glass. In this video, I show you the entire process from cutting glass to soldering.',
    tags: ['stained glass', 'crafting', 'art', 'diy'],
    likes: 89000,
    dislikes: 1500,
    comments: [],
  },
];

export const MOCK_SHORTS: Short[] = [
  { id: 's1', thumbnailUrl: 'https://picsum.photos/seed/short1/300/500', title: 'Quick Pottery Spin', channel: USERS.sculptingSarah, views: '5.2M', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', likes: 520000, dislikes: 5000, comments: [{ user: USERS.commenter1, text: 'So satisfying!', likes: 10 }] },
  { id: 's2', thumbnailUrl: 'https://picsum.photos/seed/short2/300/500', title: 'Pixel Art Drip Effect', channel: USERS.pixelPete, views: '10.1M', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', likes: 1100000, dislikes: 10000, comments: [] },
  { id: 's3', thumbnailUrl: 'https://picsum.photos/seed/short3/300/500', title: 'Satisfying wood carving', channel: USERS.craftyChloe, views: '8.8M', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', likes: 950000, dislikes: 8000, comments: [] },
  { id: 's4', thumbnailUrl: 'https://picsum.photos/seed/short4/300/500', title: 'Pouring Epoxy Resin', channel: USERS.diyDan, views: '12.5M', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', likes: 1300000, dislikes: 12000, comments: [] },
  { id: 's5', thumbnailUrl: 'https://picsum.photos/seed/short5/300/500', title: 'Watercolor splash technique', channel: USERS.artfulAmy, views: '7.1M', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', likes: 800000, dislikes: 7500, comments: [] },
];

export const MOCK_IMAGES: CreativeImage[] = [
    {
        id: 'img1',
        imageUrl: 'https://picsum.photos/seed/img1/800/600',
        title: 'Finished Oakwood Chair',
        description: 'A handcrafted chair made from solid oak, finished with a natural oil. The joinery is all traditional mortise and tenon.',
        channel: USERS.craftyChloe,
        tags: ['woodworking', 'furniture', 'diy', 'handmade'],
        likes: 12000,
        dislikes: 50,
        comments: [
            { user: USERS.diyDan, text: 'Beautiful work, the grain is gorgeous!', likes: 15 },
        ]
    },
    {
        id: 'img2',
        imageUrl: 'https://picsum.photos/seed/img2/800/600',
        title: 'Cyberpunk Cityscape',
        description: 'A detailed pixel art piece of a futuristic city at night.',
        channel: USERS.pixelPete,
        tags: ['pixel art', 'artwork', 'cyberpunk'],
        likes: 25000,
        dislikes: 120,
        comments: []
    },
    {
        id: 'img3',
        imageUrl: 'https://picsum.photos/seed/img3/800/600',
        title: 'Clay Mushroom Sculptures',
        description: 'A collection of small, whimsical mushroom sculptures made from polymer clay and painted with acrylics.',
        channel: USERS.sculptingSarah,
        tags: ['sculpting', 'polymer clay', 'art'],
        likes: 18000,
        dislikes: 80,
        comments: [
            { user: USERS.artfulAmy, text: 'These are adorable!', likes: 22 },
            { user: USERS.commenter2, text: 'I want a whole forest of these!', likes: 18 },
        ],
        productId: 'prod2',
    }
];

export const MOCK_MUSIC_LIBRARY: MusicTrack[] = [
  { id: 'm1', title: 'Uplifting Journey', artist: 'SynthWavePro', duration: '2:45' },
  { id: 'm2', title: 'Chill Lo-fi Beats', artist: 'BeatMaster', duration: '3:12' },
  { id: 'm3', title: 'Epic Cinematic Score', artist: 'OrchestraMax', duration: '4:05' },
  { id: 'm4', title: 'Acoustic Folk Vibes', artist: 'GuitarGentle', duration: '2:58' },
  { id: 'm5', title: 'Happy Upbeat Pop', artist: 'PopStarz', duration: '3:30' },
  { id: 'm6', title: 'Ambient Dreams', artist: 'CloudSounds', duration: '5:10' },
];