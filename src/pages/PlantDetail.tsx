import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Archive, Trash2, Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    photos: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
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
            <h1 className="text-xl font-semibold text-foreground flex-1">{plant.name}</h1>
            <Button
              onClick={() => navigate(`/plant/${id}/edit`)}
              className="bg-gradient-primary hover:bg-primary-hover text-primary-foreground shadow-medium"
              size="sm"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Main Photo */}
        <div className="mb-8">
          <div className="aspect-video bg-muted rounded-3xl overflow-hidden shadow-medium">
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
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Basic Info */}
          <Card className="shadow-soft border-border/30">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Plant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Common Name</label>
                <p className="text-card-foreground font-medium">{plant.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Scientific Name</label>
                <p className="text-card-foreground italic">{plant.scientificName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Price</label>
                <p className="text-card-foreground">{plant.price}</p>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Info */}
          <Card className="shadow-soft border-border/30">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Purchase Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Where Bought</label>
                <p className="text-card-foreground">{plant.whereBought}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date Acquired</label>
                <p className="text-card-foreground">{new Date(plant.dateAcquired).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        <Card className="shadow-soft border-border/30 mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-card-foreground leading-relaxed">{plant.notes}</p>
          </CardContent>
        </Card>

        {/* Photo Gallery */}
        <Card className="shadow-soft border-border/30">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-card-foreground">Photo Gallery</CardTitle>
            <Badge variant="secondary" className="bg-secondary/50">
              {plant.photos.length} photo{plant.photos.length !== 1 ? 's' : ''}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {plant.photos.map((photo, index) => (
                <div
                  key={index}
                  className={`aspect-square bg-muted rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    index === plant.thumbnailIndex
                      ? 'border-primary shadow-medium scale-105'
                      : 'border-transparent hover:border-border hover:scale-105'
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