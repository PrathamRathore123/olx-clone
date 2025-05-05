
import React from 'react';

interface LocationSectionProps {
  location: string;
  state: string;
  updateFormData: (field: string, value: any) => void;
  error?: string;
  validateField: () => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({ 
  location, 
  state, 
  updateFormData, 
  error, 
  validateField 
}) => {
  return (
    <div className="border-b py-4">
      <h2 className="font-medium mb-4">CONFIRM YOUR LOCATION</h2>
      
      <div className="flex border-b">
        <button
          type="button"
          onClick={() => updateFormData('location', 'List')}
          className={`flex-1 py-2 text-center border-b-2 ${location === 'List' ? 'border-blue-500 text-blue-500' : 'border-transparent'}`}
        >
          LIST
        </button>
        <button
          type="button"
          onClick={() => updateFormData('location', 'Current Location')}
          className={`flex-1 py-2 text-center border-b-2 ${location === 'Current Location' ? 'border-blue-500 text-blue-500' : 'border-transparent'}`}
        >
          CURRENT LOCATION
        </button>
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">
          State <span className="text-red-500">*</span>
        </label>
        <select
          className={`border w-full p-2 rounded-sm ${error ? 'border-red-500' : ''}`}
          value={state}
          onChange={(e) => updateFormData('state', e.target.value)}
          onBlur={validateField}
          required
        >
          <option value="">Select state</option>
          <option value="Delhi">Delhi</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
        </select>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
      
      <p className="text-xs text-gray-500 mt-2">* Fields are mandatory</p>
    </div>
  );
};

export default LocationSection;
