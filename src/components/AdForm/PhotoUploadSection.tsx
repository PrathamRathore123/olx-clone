
import React from 'react';
import { Camera } from 'lucide-react';

interface PhotoUploadSectionProps {
  photos: any[];
  updateFormData: (field: string, value: any) => void;
  error?: string;
  validateField: () => void;
}

const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({ 
  photos, 
  updateFormData, 
  error,
  validateField 
}) => {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      updateFormData('photos', [...photos, ...newPhotos]);
      validateField();
    }
  };

  // Create a grid of 20 upload boxes
  const renderUploadBoxes = () => {
    const boxes = [];
    const totalBoxes = 20;
    
    for (let i = 0; i < totalBoxes; i++) {
      boxes.push(
        <div key={i} className="border flex items-center justify-center w-full h-24 relative">
          {photos[i] ? (
            <img src={photos[i]} alt={`Uploaded ${i}`} className="w-full h-full object-cover" />
          ) : (
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <Camera size={24} className="text-gray-400" />
              {i === 0 && <span className="text-xs mt-1">Add Photos</span>}
              <input 
                type="file" 
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
          )}
        </div>
      );
    }
    
    return boxes;
  };

  return (
    <div className="border-b py-4">
      <h2 className="font-medium mb-4">UPLOAD UP TO 20 PHOTOS</h2>
      
      <div className="grid grid-cols-3 gap-2">
        {renderUploadBoxes()}
      </div>
      
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      {!error && <p className="text-xs text-red-500 mt-2">* First image is mandatory</p>}
    </div>
  );
};

export default PhotoUploadSection;
