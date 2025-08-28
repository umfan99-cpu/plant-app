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
      className="group cursor-pointer bg-card rounded-3xl shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-[1.02] overflow-hidden border border-border/20"
    >
      {/* Image Container */}
      <div className="aspect-square bg-muted overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      
      {/* Plant Name */}
      <div className="p-2.5">
        <h3 className="font-medium text-card-foreground text-xs leading-tight group-hover:text-primary transition-colors truncate">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default PlantThumbnail;