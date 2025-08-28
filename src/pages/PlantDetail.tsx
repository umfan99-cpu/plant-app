import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Archive, Trash2, Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import monsteraImg from '@/assets/plants/monstera.jpg';
import snakePlantImg from '@/assets/plants/snake-plant.jpg';
import pothosImg from '@/assets/plants/pothos.jpg';
import fiddleLeafImg from '@/assets/plants/fiddle-leaf.jpg';
import peaceLilyImg from '@/assets/plants/peace-lily.jpg';
import rubberPlantImg from '@/assets/plants/rubber-plant.jpg';

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
    photos: [monsteraImg, monsteraImg, monsteraImg],
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
    photos: [snakePlantImg, snakePlantImg],
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
    photos: [pothosImg, pothosImg, pothosImg, pothosImg],
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
    photos: [fiddleLeafImg, fiddleLeafImg],
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
    photos: [peaceLilyImg, peaceLilyImg, peaceLilyImg],
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
    photos: [rubberPlantImg, rubberPlantImg],
    thumbnailIndex: 0
  }
};

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const plant = mockPlantData[parseInt(id || '1') as keyof typeof mockPlantData] || {
    id: parseInt(id || '1'),
    name: 'Unknown Plant',
    scientificName: 'Unknown species',
    price: '$0.00',
    whereBought: 'Unknown',
    dateAcquired: '2024-01-01',
    notes: 'No notes available.',
    photos: ['/placeholder.svg'],
    thumbnailIndex: 0
  };

  return (
    <div className="min-h-screen bg-background">
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
              className="bg-gradient-primary hover:bg-primary-hover text-primary-foreground rounded-full h-9 px-4"
              size="sm"
            >
              <Edit className="w-4 h-4 mr-1.5" />
              Edit
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 max-w-4xl">
        {/* Main Photo */}
        <div className="mb-6">
          <div className="aspect-square bg-muted rounded-3xl overflow-hidden shadow-medium">
            <img
              src={plant.photos[plant.thumbnailIndex]}
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
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Basic Info */}
          <Card className="shadow-soft border-border/20 rounded-3xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-card-foreground font-medium">Plant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Common Name</label>
                <p className="text-card-foreground font-medium text-sm mt-1">{plant.name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Scientific Name</label>
                <p className="text-card-foreground italic text-sm mt-1">{plant.scientificName}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Price</label>
                <p className="text-card-foreground text-sm mt-1 font-medium">{plant.price}</p>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Info */}
          <Card className="shadow-soft border-border/20 rounded-3xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-card-foreground font-medium">Purchase Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Where Bought</label>
                <p className="text-card-foreground text-sm mt-1">{plant.whereBought}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date Acquired</label>
                <p className="text-card-foreground text-sm mt-1">{new Date(plant.dateAcquired).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        <Card className="shadow-soft border-border/20 mb-6 rounded-3xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-card-foreground font-medium">Notes</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-card-foreground leading-relaxed text-sm">{plant.notes}</p>
          </CardContent>
        </Card>

        {/* Photo Gallery */}
        <Card className="shadow-soft border-border/20 rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base text-card-foreground font-medium">Photo Gallery</CardTitle>
            <Badge variant="secondary" className="bg-secondary/50 text-xs rounded-full">
              {plant.photos.length} photo{plant.photos.length !== 1 ? 's' : ''}
            </Badge>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {plant.photos.map((photo, index) => (
                <div
                  key={index}
                  className={`aspect-square bg-muted rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                    index === plant.thumbnailIndex
                      ? 'border-primary shadow-medium scale-105'
                      : 'border-transparent hover:border-border/50 hover:scale-105'
                  }`}
                  onClick={() => {
                    // In real app, this would update the thumbnail index
                    console.log('Set as thumbnail:', index);
                  }}
                >
                  <img
                    src={photo}
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
    </div>
  );
};

export default PlantDetail;