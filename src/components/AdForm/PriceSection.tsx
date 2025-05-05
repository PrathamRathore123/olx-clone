
import React from 'react';
import { Input } from "@/components/ui/input";

interface PriceSectionProps {
  price: string;
  updateFormData: (field: string, value: any) => void;
  error?: string;
  validateField: () => void;
}

const PriceSection: React.FC<PriceSectionProps> = ({ 
  price, 
  updateFormData, 
  error, 
  validateField 
}) => {
  return (
    <div className="border-b py-4">
      <h2 className="font-medium mb-4">SET A PRICE</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Price <span className="text-red-500">*</span>
        </label>
        <div className={`flex items-center border rounded-sm ${error ? 'border-red-500' : ''}`}>
          <span className="px-3 text-gray-500">₹</span>
          <Input
            type="number"
            className="w-full p-2 outline-none border-0"
            value={price}
            onChange={(e) => updateFormData('price', e.target.value)}
            onBlur={validateField}
            placeholder="Price"
            required
          />
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default PriceSection;
