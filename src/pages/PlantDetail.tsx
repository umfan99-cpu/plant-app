import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Archive, Trash2, Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import PhotoModal from '@/components/PhotoModal';
import { PlantDataService, type Plant } from '@/services/plantData';

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [plant, setPlant] = useState<Plant | null>(null);

  useEffect(() => {
    const plantData = PlantDataService.getPlant(parseInt(id || '1'));
    setPlant(plantData || null);
  }, [id]);

  // Refresh plant data when returning from edit page
  useEffect(() => {
    const handleFocus = () => {
      const plantData = PlantDataService.getPlant(parseInt(id || '1'));
      setPlant(plantData || null);
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [id]);
  
  const defaultPlant = {
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

  const currentPlant = plant || defaultPlant;

  const openPhotoModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsPhotoModalOpen(true);
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex(prev => prev === 0 ? currentPlant.photos.length - 1 : prev - 1);
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex(prev => prev === currentPlant.photos.length - 1 ? 0 : prev + 1);
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
            <h1 className="text-lg font-medium text-foreground flex-1 truncate">{currentPlant.name}</h1>
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
            onClick={() => openPhotoModal(currentPlant.thumbnailIndex)}
          >
            <img
              src={currentPlant.photos[currentPlant.thumbnailIndex].url}
              alt={currentPlant.name}
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
                <p className="text-card-foreground text-xs mt-0.5 leading-tight">{currentPlant.name}</p>
              </div>
              <div>
                <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Scientific</label>
                <p className="text-card-foreground italic text-xs mt-0.5 leading-tight">{currentPlant.scientificName}</p>
              </div>
              <div>
                <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Price</label>
                <p className="text-card-foreground text-xs mt-0.5 font-medium">{currentPlant.price}</p>
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
                <p className="text-card-foreground text-xs mt-0.5 leading-tight">{currentPlant.whereBought}</p>
              </div>
              <div>
                <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Date</label>
                <p className="text-card-foreground text-xs mt-0.5">{new Date(currentPlant.dateAcquired).toLocaleDateString()}</p>
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
            <p className="text-card-foreground leading-relaxed text-xs">{currentPlant.notes}</p>
          </CardContent>
        </Card>

        {/* Photo Gallery */}
        <Card className="shadow-soft border-border/20 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-2 pt-2">
            <CardTitle className="text-xs text-card-foreground font-medium">Photos</CardTitle>
            <Badge variant="secondary" className="bg-secondary/50 text-[10px] rounded-full px-1.5 py-0.5">
              {currentPlant.photos.length}
            </Badge>
          </CardHeader>
          <CardContent className="pt-0 px-2 pb-2">
            <div className="grid grid-cols-3 gap-1.5">
              {currentPlant.photos.map((photo, index) => (
                <div
                  key={index}
                  className={`aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    index === currentPlant.thumbnailIndex
                      ? 'border-primary shadow-soft'
                      : 'border-transparent hover:border-border/50'
                  }`}
                  onClick={() => openPhotoModal(index)}
                >
                  <img
                    src={photo.url}
                    alt={`${currentPlant.name} photo ${index + 1}`}
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
        photos={currentPlant.photos}
        currentIndex={currentPhotoIndex}
        onPrevious={handlePreviousPhoto}
        onNext={handleNextPhoto}
        plantName={currentPlant.name}
      />

      {/* Floating Action Button */}
      <Button
        onClick={() => navigate(`/plant/${id}/edit`)}
        className="fixed bottom-24 right-4 h-14 w-14 rounded-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        size="icon"
      >
        <Camera className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default PlantDetail;