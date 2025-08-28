import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PlantThumbnail from '@/components/PlantThumbnail';
import monsteraImg from '@/assets/plants/monstera.jpg';
import snakePlantImg from '@/assets/plants/snake-plant.jpg';
import pothosImg from '@/assets/plants/pothos.jpg';
import fiddleLeafImg from '@/assets/plants/fiddle-leaf.jpg';
import peaceLilyImg from '@/assets/plants/peace-lily.jpg';
import rubberPlantImg from '@/assets/plants/rubber-plant.jpg';

// Mock data for demonstration
const mockPlants = [
  { id: 1, name: 'Monstera Deliciosa', image: monsteraImg, scientificName: 'Monstera deliciosa', dateAdded: '2024-01-15' },
  { id: 2, name: 'Snake Plant', image: snakePlantImg, scientificName: 'Sansevieria trifasciata', dateAdded: '2024-02-10' },
  { id: 3, name: 'Pothos', image: pothosImg, scientificName: 'Epipremnum aureum', dateAdded: '2024-01-28' },
  { id: 4, name: 'Fiddle Leaf Fig', image: fiddleLeafImg, scientificName: 'Ficus lyrata', dateAdded: '2024-03-05' },
  { id: 5, name: 'Peace Lily', image: peaceLilyImg, scientificName: 'Spathiphyllum wallisii', dateAdded: '2024-02-22' },
  { id: 6, name: 'Rubber Plant', image: rubberPlantImg, scientificName: 'Ficus elastica', dateAdded: '2024-01-08' },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name');

  const filteredAndSortedPlants = mockPlants
    .filter(plant =>
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

  const toggleSort = () => {
    setSortBy(prev => prev === 'name' ? 'date' : 'name');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="mb-3">
            <h1 className="text-lg font-semibold text-foreground">My Plants</h1>
          </div>
          
          {/* Search and Sort Row */}
          <div className="flex items-center gap-3">
            {/* Compact Search */}
            <div className="relative flex-1 max-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 h-9 bg-background/60 border-border/30 rounded-full text-sm focus:border-primary/50 transition-colors"
              />
            </div>
            
            {/* Sort Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSort}
              className="h-9 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background/60 rounded-full"
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              {sortBy === 'name' ? 'Name' : 'Date'}
            </Button>
          </div>
        </div>
      </header>

      {/* Plant Grid */}
      <main className="container mx-auto px-4 py-4">
        {filteredAndSortedPlants.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">🌱</div>
            <h2 className="text-xl font-medium text-foreground mb-2">
              {searchQuery ? 'No plants found' : 'No plants yet'}
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              {searchQuery ? 'Try a different search term' : 'Start building your collection!'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground text-sm">
                {filteredAndSortedPlants.length} plant{filteredAndSortedPlants.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {filteredAndSortedPlants.map((plant) => (
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