import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Archive, Trash2, Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import PhotoModal from '@/components/PhotoModal';

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

// Mock data - in real app this would come from API/state
const mockPlantData = {
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

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  const plant = mockPlantData[parseInt(id || '1') as keyof typeof mockPlantData] || {
    id: parseInt(id || '1'),
    name: 'Unknown Plant',
    scientificName: 'Unknown species',
    price: '$0.00',
    whereBought: 'Unknown',
    dateAcquired: '2024-01-01',
    notes: 'No notes available.',
    photos: [{ url: '/placeholder.svg', dateTaken: '2024-01-01' }],
    thumbnailIndex: 0
  };

  const openPhotoModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsPhotoModalOpen(true);
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex(prev => prev === 0 ? plant.photos.length - 1 : prev - 1);
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex(prev => prev === plant.photos.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/home')}
              className="hover:bg-background/60 rounded-full h-9 w-9 p-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-medium text-foreground flex-1 truncate">{plant.name}</h1>
            <Button
              onClick={() => navigate(`/plant/${id}/edit`)}
              className="bg-gradient-primary hover:bg-primary-hover text-primary-foreground rounded-full h-8 px-3"
              size="sm"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-3 max-w-4xl">
        {/* Main Photo */}
        <div className="mb-3">
          <div 
            className="aspect-[5/4] bg-muted rounded-2xl overflow-hidden shadow-soft cursor-pointer"
            onClick={() => openPhotoModal(plant.thumbnailIndex)}
          >
            <img
              src={plant.photos[plant.thumbnailIndex].url}
              alt={plant.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
        </div>

        {/* Plant Information */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {/* Basic Info */}
          <Card className="shadow-soft border-border/20 rounded-xl">
            <CardHeader className="pb-1 px-2 pt-2">
              <CardTitle className="text-xs text-card-foreground font-medium">Plant Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 pt-0 px-2 pb-2">
              <div>
                <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Name</label>
                <p className="text-card-foreground text-xs mt-0.5 leading-tight">{plant.name}</p>
              </div>
              <div>
                <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Scientific</label>
                <p className="text-card-foreground italic text-xs mt-0.5 leading-tight">{plant.scientificName}</p>
              </div>
              <div>
                <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Price</label>
                <p className="text-card-foreground text-xs mt-0.5 font-medium">{plant.price}</p>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Info */}
          <Card className="shadow-soft border-border/20 rounded-xl">
            <CardHeader className="pb-1 px-2 pt-2">
              <CardTitle className="text-xs text-card-foreground font-medium">Purchase</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 pt-0 px-2 pb-2">
              <div>
                <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Store</label>
                <p className="text-card-foreground text-xs mt-0.5 leading-tight">{plant.whereBought}</p>
              </div>
              <div>
                <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Date</label>
                <p className="text-card-foreground text-xs mt-0.5">{new Date(plant.dateAcquired).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        <Card className="shadow-soft border-border/20 mb-3 rounded-xl">
          <CardHeader className="pb-1 px-2 pt-2">
            <CardTitle className="text-xs text-card-foreground font-medium">Notes</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-2 pb-2">
            <p className="text-card-foreground leading-relaxed text-xs">{plant.notes}</p>
          </CardContent>
        </Card>

        {/* Photo Gallery */}
        <Card className="shadow-soft border-border/20 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-2 pt-2">
            <CardTitle className="text-xs text-card-foreground font-medium">Photos</CardTitle>
            <Badge variant="secondary" className="bg-secondary/50 text-[10px] rounded-full px-1.5 py-0.5">
              {plant.photos.length}
            </Badge>
          </CardHeader>
          <CardContent className="pt-0 px-2 pb-2">
            <div className="grid grid-cols-3 gap-1.5">
              {plant.photos.map((photo, index) => (
                <div
                  key={index}
                  className={`aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    index === plant.thumbnailIndex
                      ? 'border-primary shadow-soft'
                      : 'border-transparent hover:border-border/50'
                  }`}
                  onClick={() => openPhotoModal(index)}
                >
                  <img
                    src={photo.url}
                    alt={`${plant.name} photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <PhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        photos={plant.photos}
        currentIndex={currentPhotoIndex}
        onPrevious={handlePreviousPhoto}
        onNext={handleNextPhoto}
        plantName={plant.name}
      />
    </div>
  );
};

export default PlantDetail;