import { Video, CreativeImage } from '../types';
import { MOCK_VIDEOS, MOCK_IMAGES } from '../constants';

const VIDEOS_KEY = 'creatiTubeVideos';
const IMAGES_KEY = 'creatiTubeImages';

const initializeMockData = () => {
    if (!localStorage.getItem(VIDEOS_KEY)) {
        localStorage.setItem(VIDEOS_KEY, JSON.stringify(MOCK_VIDEOS));
    }
    if (!localStorage.getItem(IMAGES_KEY)) {
        localStorage.setItem(IMAGES_KEY, JSON.stringify(MOCK_IMAGES));
    }
};

initializeMockData();

const getVideosFromStorage = (): Video[] => {
    const data = localStorage.getItem(VIDEOS_KEY);
    return data ? JSON.parse(data) : [];
};

const saveVideosToStorage = (videos: Video[]) => {
    localStorage.setItem(VIDEOS_KEY, JSON.stringify(videos));
};

const getImagesFromStorage = (): CreativeImage[] => {
    const data = localStorage.getItem(IMAGES_KEY);
    return data ? JSON.parse(data) : [];
};

const saveImagesToStorage = (images: CreativeImage[]) => {
    localStorage.setItem(IMAGES_KEY, JSON.stringify(images));
};

export const contentService = {
    getVideos: async (): Promise<Video[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getVideosFromStorage());
            }, 200);
        });
    },

    addVideo: async (video: Video): Promise<Video> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const videos = getVideosFromStorage();
                videos.unshift(video);
                saveVideosToStorage(videos);
                resolve(video);
            }, 300);
        });
    },

    getImages: async (): Promise<CreativeImage[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getImagesFromStorage());
            }, 200);
        });
    },

    addImage: async (image: CreativeImage): Promise<CreativeImage> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const images = getImagesFromStorage();
                images.unshift(image);
                saveImagesToStorage(images);
                resolve(image);
            }, 300);
        });
    },
};
