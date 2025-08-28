import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  plantName: string;
}

const PhotoModal = ({ 
  isOpen, 
  onClose, 
  photos, 
  currentIndex, 
  onPrevious, 
  onNext, 
  plantName 
}: PhotoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 bg-black/95 border-none">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/10 rounded-full h-10 w-10 p-0"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Previous button */}
          {photos.length > 1 && (
            <Button
              onClick={onPrevious}
              variant="ghost"
              size="sm"
              className="absolute left-4 z-10 text-white hover:bg-white/10 rounded-full h-10 w-10 p-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}

          {/* Main image */}
          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={photos[currentIndex]}
              alt={`${plantName} photo ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>

          {/* Next button */}
          {photos.length > 1 && (
            <Button
              onClick={onNext}
              variant="ghost"
              size="sm"
              className="absolute right-4 z-10 text-white hover:bg-white/10 rounded-full h-10 w-10 p-0"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}

          {/* Photo counter */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {photos.length}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoModal;