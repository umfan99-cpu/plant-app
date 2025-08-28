import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Import plant images
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

const EditPlant = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const plant = mockPlantData[parseInt(id || '1') as keyof typeof mockPlantData];
  
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    price: '',
    whereBought: '',
    dateAcquired: '',
    notes: ''
  });
  const [photos, setPhotos] = useState<Array<{url: string, dateTaken: string}>>([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  useEffect(() => {
    if (plant) {
      setFormData({
        name: plant.name,
        scientificName: plant.scientificName,
        price: plant.price,
        whereBought: plant.whereBought,
        dateAcquired: plant.dateAcquired,
        notes: plant.notes
      });
      setPhotos(plant.photos);
      setThumbnailIndex(plant.thumbnailIndex);
    }
  }, [plant]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newPhoto = {
              url: event.target!.result as string,
              dateTaken: new Date().toISOString().split('T')[0]
            };
            setPhotos(prev => [...prev, newPhoto]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newPhoto = {
              url: event.target!.result as string,
              dateTaken: new Date().toISOString().split('T')[0]
            };
            setPhotos(prev => [...prev, newPhoto]);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Plant name required",
        description: "Please enter a name for your plant.",
        variant: "destructive"
      });
      return;
    }

    // In real app, this would save to API/database
    console.log('Saving plant:', { ...formData, photos, thumbnailIndex });
    
    toast({
      title: "Plant updated successfully!",
      description: `${formData.name} has been updated.`,
    });
    
    navigate(`/plant/${id}`);
  };

  if (!plant) {
    return <div>Plant not found</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/plant/${id}`)}
              className="hover:bg-background/60 rounded-full h-9 w-9 p-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-medium text-foreground flex-1 truncate">Edit Plant</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <Card className="shadow-soft border-border/20 rounded-2xl">
            <CardHeader className="pb-2 px-3 pt-3">
              <CardTitle className="text-sm text-card-foreground font-medium">Plant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0 px-3 pb-3">
              <div>
                <Label htmlFor="name" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Plant Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 h-9 text-sm"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="scientificName" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Scientific Name
                </Label>
                <Input
                  id="scientificName"
                  name="scientificName"
                  value={formData.scientificName}
                  onChange={handleInputChange}
                  className="mt-1 h-9 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="price" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 h-9 text-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dateAcquired" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Date
                  </Label>
                  <Input
                    id="dateAcquired"
                    name="dateAcquired"
                    type="date"
                    value={formData.dateAcquired}
                    onChange={handleInputChange}
                    className="mt-1 h-9 text-sm"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="whereBought" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Where Bought
                </Label>
                <Input
                  id="whereBought"
                  name="whereBought"
                  value={formData.whereBought}
                  onChange={handleInputChange}
                  className="mt-1 h-9 text-sm"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="mt-1 text-sm resize-none"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card className="shadow-soft border-border/20 rounded-2xl">
            <CardHeader className="pb-2 px-3 pt-3">
              <CardTitle className="text-sm text-card-foreground font-medium">Photos</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-3 pb-3">
              {/* Upload Options */}
              <div className="mb-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCameraCapture}
                    className="h-16 border-2 border-dashed border-border hover:border-primary/50 transition-colors hover:bg-muted/50"
                  >
                    <div className="text-center">
                      <Camera className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                      <p className="text-[10px] text-muted-foreground">Take Photo</p>
                    </div>
                  </Button>
                  
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="h-16 border-2 border-dashed border-border hover:border-primary/50 rounded-lg text-center transition-colors hover:bg-muted/50 flex items-center justify-center">
                      <div>
                        <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                        <p className="text-[10px] text-muted-foreground">Upload</p>
                      </div>
                    </div>
                  </Label>
                </div>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              {/* Photo Preview Grid */}
              {photos.length > 0 && (
                <>
                  <div className="mb-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Select Main Photo
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div 
                          className={`aspect-square bg-muted rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                            index === thumbnailIndex 
                              ? 'border-primary shadow-soft' 
                              : 'border-transparent hover:border-border/50'
                          }`}
                          onClick={() => setThumbnailIndex(index)}
                        >
                          <img
                            src={photo.url}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 w-5 h-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                        {index === thumbnailIndex && (
                          <div className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-md font-medium">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/plant/${id}`)}
              className="flex-1 h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-11 bg-gradient-primary hover:bg-primary-hover text-primary-foreground"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditPlant;