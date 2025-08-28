interface PlantThumbnailProps {
  id: number;
  name: string;
  image: string;
  onClick: () => void;
}

const PlantThumbnail = ({ name, image, onClick }: PlantThumbnailProps) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-card rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 overflow-hidden border border-border/30"
    >
      {/* Image Container */}
      <div className="aspect-square bg-muted overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      
      {/* Plant Name */}
      <div className="p-3">
        <h3 className="font-medium text-card-foreground text-sm leading-tight group-hover:text-primary transition-colors">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default PlantThumbnail;