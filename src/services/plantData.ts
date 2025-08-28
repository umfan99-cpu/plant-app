// Shared plant data service
import monsteraImg from '@/assets/plants/monstera.jpg';
import monstera2Img from '@/assets/plants/monstera-2.jpg';
import monstera3Img from '@/assets/plants/monstera-3.jpg';
import monstera4Img from '@/assets/plants/monstera-4.jpg';
import monstera5Img from '@/assets/plants/monstera-5.jpg';
import monstera6Img from '@/assets/plants/monstera-6.jpg';

import snakePlantImg from '@/assets/plants/snake-plant.jpg';
import snakePlant2Img from '@/assets/plants/snake-plant-2.jpg';
import snakePlant3Img from '@/assets/plants/snake-plant-3.jpg';
import snakePlant4Img from '@/assets/plants/snake-plant-4.jpg';
import snakePlant5Img from '@/assets/plants/snake-plant-5.jpg';
import snakePlant6Img from '@/assets/plants/snake-plant-6.jpg';

import pothosImg from '@/assets/plants/pothos.jpg';
import pothos2Img from '@/assets/plants/pothos-2.jpg';
import pothos3Img from '@/assets/plants/pothos-3.jpg';
import pothos4Img from '@/assets/plants/pothos-4.jpg';
import pothos5Img from '@/assets/plants/pothos-5.jpg';
import pothos6Img from '@/assets/plants/pothos-6.jpg';

import fiddleLeafImg from '@/assets/plants/fiddle-leaf.jpg';
import fiddleLeaf2Img from '@/assets/plants/fiddle-leaf-2.jpg';
import fiddleLeaf3Img from '@/assets/plants/fiddle-leaf-3.jpg';
import fiddleLeaf4Img from '@/assets/plants/fiddle-leaf-4.jpg';
import fiddleLeaf5Img from '@/assets/plants/fiddle-leaf-5.jpg';
import fiddleLeaf6Img from '@/assets/plants/fiddle-leaf-6.jpg';

import peaceLilyImg from '@/assets/plants/peace-lily.jpg';
import peaceLily2Img from '@/assets/plants/peace-lily-2.jpg';
import peaceLily3Img from '@/assets/plants/peace-lily-3.jpg';
import peaceLily4Img from '@/assets/plants/peace-lily-4.jpg';
import peaceLily5Img from '@/assets/plants/peace-lily-5.jpg';
import peaceLily6Img from '@/assets/plants/peace-lily-6.jpg';

import rubberPlantImg from '@/assets/plants/rubber-plant.jpg';
import rubberPlant2Img from '@/assets/plants/rubber-plant-2.jpg';
import rubberPlant3Img from '@/assets/plants/rubber-plant-3.jpg';
import rubberPlant4Img from '@/assets/plants/rubber-plant-4.jpg';
import rubberPlant5Img from '@/assets/plants/rubber-plant-5.jpg';
import rubberPlant6Img from '@/assets/plants/rubber-plant-6.jpg';

export interface Photo {
  url: string;
  dateTaken: string;
}

export interface Plant {
  id: number;
  name: string;
  scientificName: string;
  price: string;
  whereBought: string;
  dateAcquired: string;
  notes: string;
  photos: Photo[];
  thumbnailIndex: number;
}

// Initial plant data
const initialPlantData: Record<number, Plant> = {
  1: {
    id: 1,
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    price: '$45.00',
    whereBought: 'Green Thumb Nursery',
    dateAcquired: '2024-01-15',
    notes: 'Beautiful specimen with fenestrated leaves. Growing well in bright indirect light.',
    photos: [
      { url: monsteraImg, dateTaken: '2024-01-15' },
      { url: monstera2Img, dateTaken: '2024-02-20' },
      { url: monstera3Img, dateTaken: '2024-03-10' },
      { url: monstera4Img, dateTaken: '2024-04-05' },
      { url: monstera5Img, dateTaken: '2024-05-15' },
      { url: monstera6Img, dateTaken: '2024-06-22' }
    ],
    thumbnailIndex: 0
  },
  2: {
    id: 2,
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    price: '$25.00',
    whereBought: 'Home Depot',
    dateAcquired: '2024-02-10',
    notes: 'Low maintenance plant perfect for beginners. Tolerates low light conditions.',
    photos: [
      { url: snakePlantImg, dateTaken: '2024-02-10' },
      { url: snakePlant2Img, dateTaken: '2024-03-15' },
      { url: snakePlant3Img, dateTaken: '2024-04-20' },
      { url: snakePlant4Img, dateTaken: '2024-05-25' },
      { url: snakePlant5Img, dateTaken: '2024-06-30' },
      { url: snakePlant6Img, dateTaken: '2024-07-14' }
    ],
    thumbnailIndex: 0
  },
  3: {
    id: 3,
    name: 'Pothos',
    scientificName: 'Epipremnum aureum',
    price: '$18.00',
    whereBought: 'Local Plant Shop',
    dateAcquired: '2024-01-28',
    notes: 'Fast-growing trailing plant. Great for hanging baskets or shelves.',
    photos: [
      { url: pothosImg, dateTaken: '2024-01-28' },
      { url: pothos2Img, dateTaken: '2024-02-28' },
      { url: pothos3Img, dateTaken: '2024-03-28' },
      { url: pothos4Img, dateTaken: '2024-04-28' },
      { url: pothos5Img, dateTaken: '2024-05-28' },
      { url: pothos6Img, dateTaken: '2024-06-28' }
    ],
    thumbnailIndex: 0
  },
  4: {
    id: 4,
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    price: '$65.00',
    whereBought: 'Botanical Garden Shop',
    dateAcquired: '2024-03-05',
    notes: 'Statement plant with large glossy leaves. Requires bright indirect light.',
    photos: [
      { url: fiddleLeafImg, dateTaken: '2024-03-05' },
      { url: fiddleLeaf2Img, dateTaken: '2024-04-05' },
      { url: fiddleLeaf3Img, dateTaken: '2024-05-05' },
      { url: fiddleLeaf4Img, dateTaken: '2024-06-05' },
      { url: fiddleLeaf5Img, dateTaken: '2024-07-05' },
      { url: fiddleLeaf6Img, dateTaken: '2024-08-05' }
    ],
    thumbnailIndex: 0
  },
  5: {
    id: 5,
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum wallisii',
    price: '$32.00',
    whereBought: 'Green Thumb Nursery',
    dateAcquired: '2024-02-22',
    notes: 'Elegant flowering plant that indicates when it needs water by drooping.',
    photos: [
      { url: peaceLilyImg, dateTaken: '2024-02-22' },
      { url: peaceLily2Img, dateTaken: '2024-03-22' },
      { url: peaceLily3Img, dateTaken: '2024-04-22' },
      { url: peaceLily4Img, dateTaken: '2024-05-22' },
      { url: peaceLily5Img, dateTaken: '2024-06-22' },
      { url: peaceLily6Img, dateTaken: '2024-07-22' }
    ],
    thumbnailIndex: 0
  },
  6: {
    id: 6,
    name: 'Rubber Plant',
    scientificName: 'Ficus elastica',
    price: '$38.00',
    whereBought: 'Plant Paradise',
    dateAcquired: '2024-01-08',
    notes: 'Classic houseplant with glossy burgundy leaves. Very resilient and forgiving.',
    photos: [
      { url: rubberPlantImg, dateTaken: '2024-01-08' },
      { url: rubberPlant2Img, dateTaken: '2024-02-08' },
      { url: rubberPlant3Img, dateTaken: '2024-03-08' },
      { url: rubberPlant4Img, dateTaken: '2024-04-08' },
      { url: rubberPlant5Img, dateTaken: '2024-05-08' },
      { url: rubberPlant6Img, dateTaken: '2024-06-08' }
    ],
    thumbnailIndex: 0
  }
};

// Load data from localStorage or use initial data
const loadPlantData = (): Record<number, Plant> => {
  try {
    const saved = localStorage.getItem('plantData');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading plant data:', error);
  }
  return { ...initialPlantData };
};

// Save data to localStorage
const savePlantData = (data: Record<number, Plant>) => {
  try {
    localStorage.setItem('plantData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving plant data:', error);
  }
};

let plantData = loadPlantData();

// Plant data service
export const PlantDataService = {
  // Get a plant by ID
  getPlant: (id: number): Plant | undefined => {
    return plantData[id];
  },

  // Get all plants
  getAllPlants: (): Plant[] => {
    return Object.values(plantData);
  },

  // Update a plant
  updatePlant: (id: number, updates: Partial<Plant>): void => {
    if (plantData[id]) {
      plantData[id] = { ...plantData[id], ...updates };
      savePlantData(plantData);
    }
  },

  // Update plant thumbnail index
  updateThumbnailIndex: (id: number, thumbnailIndex: number): void => {
    if (plantData[id]) {
      plantData[id].thumbnailIndex = thumbnailIndex;
      savePlantData(plantData);
    }
  },

  // Update plant photos
  updatePhotos: (id: number, photos: Photo[]): void => {
    if (plantData[id]) {
      plantData[id].photos = photos;
      savePlantData(plantData);
    }
  },

  // Reset to initial data (for testing)
  reset: (): void => {
    plantData = { ...initialPlantData };
    localStorage.removeItem('plantData');
  }
};