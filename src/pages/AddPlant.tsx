import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { compressImageToDataURL } from '@/utils/imageCompression';

const AddPlant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    price: '',
    whereBought: '',
    dateAcquired: '',
    notes: ''
  });
  const [photos, setPhotos] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (const file of Array.from(files)) {
        try {
          const compressedDataURL = await compressImageToDataURL(file);
          setPhotos(prev => [...prev, compressedDataURL]);
        } catch (error) {
          console.error('Error compressing image:', error);
          toast({
            title: "Image compression failed",
            description: "Unable to compress the image. Please try again.",
            variant: "destructive"
          });
        }
      }
    }
  };

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const compressedDataURL = await compressImageToDataURL(file);
          setPhotos(prev => [...prev, compressedDataURL]);
        } catch (error) {
          console.error('Error compressing image:', error);
          toast({
            title: "Image compression failed",
            description: "Unable to compress the image. Please try again.",
            variant: "destructive"
          });
        }
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
    console.log('Saving plant:', { ...formData, photos });
    
    toast({
      title: "Plant added successfully!",
      description: `${formData.name} has been added to your collection.`,
    });
    
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 shadow-soft sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/home')}
              className="hover:bg-secondary/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Add New Plant</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="shadow-soft border-border/30">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Plant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                  Plant Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Monstera Deliciosa"
                  className="mt-1 border-border/50 focus:border-primary/50"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="scientificName" className="text-sm font-medium text-muted-foreground">
                  Scientific Name
                </Label>
                <Input
                  id="scientificName"
                  name="scientificName"
                  value={formData.scientificName}
                  onChange={handleInputChange}
                  placeholder="e.g., Monstera deliciosa"
                  className="mt-1 border-border/50 focus:border-primary/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="text-sm font-medium text-muted-foreground">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="$0.00"
                    className="mt-1 border-border/50 focus:border-primary/50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dateAcquired" className="text-sm font-medium text-muted-foreground">
                    Date Acquired
                  </Label>
                  <Input
                    id="dateAcquired"
                    name="dateAcquired"
                    type="date"
                    value={formData.dateAcquired}
                    onChange={handleInputChange}
                    className="mt-1 border-border/50 focus:border-primary/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="whereBought" className="text-sm font-medium text-muted-foreground">
                  Where Bought
                </Label>
                <Input
                  id="whereBought"
                  name="whereBought"
                  value={formData.whereBought}
                  onChange={handleInputChange}
                  placeholder="e.g., Green Thumb Nursery"
                  className="mt-1 border-border/50 focus:border-primary/50"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm font-medium text-muted-foreground">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional notes about your plant..."
                  className="mt-1 border-border/50 focus:border-primary/50 resize-none"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card className="shadow-soft border-border/30">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Photos (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Upload Options */}
              <div className="mb-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCameraCapture}
                    className="h-20 border-2 border-dashed border-border hover:border-primary/50 transition-colors hover:bg-muted/50"
                  >
                    <div className="text-center">
                      <Camera className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Take Photo</p>
                    </div>
                  </Button>
                  
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="h-20 border-2 border-dashed border-border hover:border-primary/50 rounded-lg text-center transition-colors hover:bg-muted/50 flex items-center justify-center">
                      <div>
                        <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Upload</p>
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
                <div className="grid grid-cols-3 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-muted rounded-xl overflow-hidden">
                        <img
                          src={photo}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-medium"
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
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/home')}
              className="flex-1 border-border/50 hover:bg-secondary/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:bg-primary-hover text-primary-foreground shadow-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Plant
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddPlant;