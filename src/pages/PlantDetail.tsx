import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Archive, Trash2, Camera, Image as ImageIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import PhotoModal from '@/components/PhotoModal';
import { useToast } from '@/hooks/use-toast';
import { PlantDataService, type Plant, type Photo } from '@/services/plantData';
import { compressImageToDataURL } from '@/utils/imageCompression';

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [plant, setPlant] = useState<Plant | null>(null);
  const [isPhotoOptionsOpen, setIsPhotoOptionsOpen] = useState(false);

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

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await processPhotoUpload(file);
      }
    };
    input.click();
    setIsPhotoOptionsOpen(false);
  };

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = false;
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await processPhotoUpload(file);
      }
    };
    input.click();
    setIsPhotoOptionsOpen(false);
  };

  const processPhotoUpload = async (file: File) => {
    try {
      const compressedDataURL = await compressImageToDataURL(file);
      const newPhoto: Photo = {
        url: compressedDataURL,
        dateTaken: new Date().toISOString().split('T')[0]
      };
      
      const plantId = parseInt(id || '1');
      const currentPlant = PlantDataService.getPlant(plantId);
      if (currentPlant) {
        const updatedPhotos = [...currentPlant.photos, newPhoto];
        PlantDataService.updatePlant(plantId, {
          ...currentPlant,
          photos: updatedPhotos
        });
        
        // Refresh plant data
        const updatedPlant = PlantDataService.getPlant(plantId);
        setPlant(updatedPlant);
        
        toast({
          title: "Photo added!",
          description: "Your new photo has been saved successfully.",
        });
      }
    } catch (error) {
      console.error('Error compressing image:', error);
      toast({
        title: "Upload failed",
        description: "Unable to process the image. Please try again.",
        variant: "destructive"
      });
    }
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

      {/* Floating Action Button with Photo Options */}
      <Sheet open={isPhotoOptionsOpen} onOpenChange={setIsPhotoOptionsOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-24 right-4 h-14 w-14 rounded-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 z-50"
            size="icon"
          >
            <Camera className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-auto">
          <SheetHeader>
            <SheetTitle>Add Photo</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
            <Button
              onClick={handleCameraCapture}
              variant="outline"
              className="h-20 flex-col gap-2 border-2 border-dashed hover:border-primary/50"
            >
              <Camera className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm">Take Photo</span>
            </Button>
            <Button
              onClick={handlePhotoUpload}
              variant="outline"
              className="h-20 flex-col gap-2 border-2 border-dashed hover:border-primary/50"
            >
              <Upload className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm">Upload Photo</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PlantDetail;