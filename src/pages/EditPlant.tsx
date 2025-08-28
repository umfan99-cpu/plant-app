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
    photos: [monsteraImg, monsteraImg, monsteraImg, monsteraImg, monsteraImg, monsteraImg],
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
    photos: [snakePlantImg, snakePlantImg, snakePlantImg, snakePlantImg, snakePlantImg, snakePlantImg],
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
    photos: [pothosImg, pothosImg, pothosImg, pothosImg, pothosImg, pothosImg],
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
    photos: [fiddleLeafImg, fiddleLeafImg, fiddleLeafImg, fiddleLeafImg, fiddleLeafImg, fiddleLeafImg],
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
    photos: [peaceLilyImg, peaceLilyImg, peaceLilyImg, peaceLilyImg, peaceLilyImg, peaceLilyImg],
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
    photos: [rubberPlantImg, rubberPlantImg, rubberPlantImg, rubberPlantImg, rubberPlantImg, rubberPlantImg],
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
  const [photos, setPhotos] = useState<string[]>([]);

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
            setPhotos(prev => [...prev, event.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
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
    console.log('Saving plant:', { ...formData, photos });
    
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
              {/* Upload Button */}
              <div className="mb-3">
                <Label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-xl p-4 text-center transition-colors hover:bg-muted/50">
                    <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Add more photos</p>
                  </div>
                </Label>
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
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-muted rounded-xl overflow-hidden">
                        <img
                          src={photo}
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
                    </div>
                  ))}
                </div>
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