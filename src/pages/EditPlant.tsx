import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PlantDataService, type Plant, type Photo } from '@/services/plantData';

// Remove old mock plant data section and imports since we're using the service

const EditPlant = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [plant, setPlant] = useState<Plant | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    price: '',
    whereBought: '',
    dateAcquired: '',
    notes: ''
  });
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  useEffect(() => {
    const plantData = PlantDataService.getPlant(parseInt(id || '1'));
    if (plantData) {
      setPlant(plantData);
      setFormData({
        name: plantData.name,
        scientificName: plantData.scientificName,
        price: plantData.price,
        whereBought: plantData.whereBought,
        dateAcquired: plantData.dateAcquired,
        notes: plantData.notes
      });
      setPhotos(plantData.photos);
      setThumbnailIndex(plantData.thumbnailIndex);
    }
  }, [id]);

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
            const newPhoto: Photo = {
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
            const newPhoto: Photo = {
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

    // Update the plant data using the service
    const plantId = parseInt(id || '1');
    PlantDataService.updatePlant(plantId, {
      ...formData,
      photos,
      thumbnailIndex
    });
    
    toast({
      title: "Plant updated successfully!",
      description: `${formData.name} has been updated.`,
    });
    
    navigate(`/plant/${id}`);
  };

  if (!plant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>Plant not found</div>
      </div>
    );
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