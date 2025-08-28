import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PlantThumbnail from '@/components/PlantThumbnail';

// Mock data for demonstration
const mockPlants = [
  { id: 1, name: 'Monstera Deliciosa', image: '/placeholder.svg', scientificName: 'Monstera deliciosa' },
  { id: 2, name: 'Snake Plant', image: '/placeholder.svg', scientificName: 'Sansevieria trifasciata' },
  { id: 3, name: 'Pothos', image: '/placeholder.svg', scientificName: 'Epipremnum aureum' },
  { id: 4, name: 'Fiddle Leaf Fig', image: '/placeholder.svg', scientificName: 'Ficus lyrata' },
  { id: 5, name: 'Peace Lily', image: '/placeholder.svg', scientificName: 'Spathiphyllum wallisii' },
  { id: 6, name: 'Rubber Plant', image: '/placeholder.svg', scientificName: 'Ficus elastica' },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlants = mockPlants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border/50 shadow-soft sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-foreground">My Plant Collection</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search plants by name or scientific name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 bg-background border-border/50 focus:border-primary/50 transition-colors"
            />
          </div>
        </div>
      </header>

      {/* Plant Grid */}
      <main className="container mx-auto px-4 py-6">
        {filteredPlants.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌱</div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {searchQuery ? 'No plants found' : 'No plants yet'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search term' : 'Start building your plant collection!'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredPlants.length} plant{filteredPlants.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {filteredPlants.map((plant) => (
                <PlantThumbnail
                  key={plant.id}
                  id={plant.id}
                  name={plant.name}
                  image={plant.image}
                  onClick={() => navigate(`/plant/${plant.id}`)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;