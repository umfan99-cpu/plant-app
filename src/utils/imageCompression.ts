import imageCompression from 'browser-image-compression';

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  quality?: number;
}

const defaultOptions: CompressionOptions = {
  maxSizeMB: 0.5, // Compress to max 500KB
  maxWidthOrHeight: 1024, // Max width/height of 1024px
  useWebWorker: true,
  quality: 0.8, // 80% quality
};

export const compressImage = async (
  file: File, 
  options: CompressionOptions = {}
): Promise<File> => {
  const compressOptions = { ...defaultOptions, ...options };
  
  try {
    console.log(`Original file size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    
    const compressedFile = await imageCompression(file, compressOptions);
    
    console.log(`Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Compression ratio: ${((1 - compressedFile.size / file.size) * 100).toFixed(1)}%`);
    
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    // Return original file if compression fails
    return file;
  }
};

export const compressImageToDataURL = async (
  file: File, 
  options: CompressionOptions = {}
): Promise<string> => {
  const compressedFile = await compressImage(file, options);
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read compressed file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(compressedFile);
  });
};