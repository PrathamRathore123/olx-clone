import React from 'react';

interface DetailsSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  errors: Record<string, string>;
  validateField: (field: string) => void;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ 
  formData, 
  updateFormData,
  errors,
  validateField 
}) => {
  const bedroomOptions = [1, 2, 3, 4, '5+'];
  const bathroomOptions = [1, 2, 3, 4, '5+'];
  const furnishingOptions = ['Furnished', 'Semi Furnished', 'Unfurnished'];
  const listedByOptions = ['Builder', 'Dealer', 'Owner'];

  return (
    <div className="border-b py-4">
      <h2 className="font-medium mb-4">INCLUDE SOME DETAILS</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Type <span className="text-red-500">*</span>
        </label>
        <select 
          className={`border w-full p-2 rounded-sm ${errors.type ? 'border-red-500' : ''}`}
          value={formData.type}
          onChange={(e) => updateFormData('type', e.target.value)}
          onBlur={() => validateField('type')}
          required
        >
          <option value="">Select Type</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>
        {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Item Type
        </label>
        <select 
          className="border w-full p-2 rounded-sm"
          value={formData.itemType}
          onChange={(e) => updateFormData('itemType', e.target.value)}
        >
          <option value="Flat / Apartment">Flat / Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Condition / Sub Category
        </label>
        <select 
          className="border w-full p-2 rounded-sm"
          value={formData.condition}
          onChange={(e) => updateFormData('condition', e.target.value)}
        >
          <option value="To Be Decided / Not Applicable">To Be Decided / Not Applicable</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Beds
        </label>
        <div className="flex">
          {bedroomOptions.map((option) => (
            <button 
              key={option}
              type="button"
              onClick={() => updateFormData('bedrooms', option)}
              className={`flex-1 py-2 border ${formData.bedrooms === option ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Baths
        </label>
        <div className="flex">
          {bathroomOptions.map((option) => (
            <button 
              key={option}
              type="button"
              onClick={() => updateFormData('bathrooms', option)}
              className={`flex-1 py-2 border ${formData.bathrooms === option ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Furnishing
        </label>
        <div className="flex">
          {furnishingOptions.map((option) => (
            <button 
              key={option}
              type="button"
              onClick={() => updateFormData('furnishing', option)}
              className={`flex-1 py-2 border text-sm ${formData.furnishing === option ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Listed by
        </label>
        <div className="flex">
          {listedByOptions.map((option) => (
            <button 
              key={option}
              type="button"
              onClick={() => updateFormData('listedBy', option)}
              className={`flex-1 py-2 border ${formData.listedBy === option ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Name (Building name etc.) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className={`border w-full p-2 rounded-sm ${errors.name ? 'border-red-500' : ''}`}
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          onBlur={() => validateField('name')}
          required
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Project Name
        </label>
        <input
          type="text"
          className="border w-full p-2 rounded-sm"
          value={formData.projectName}
          onChange={(e) => updateFormData('projectName', e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Super Buildup Area
        </label>
        <input
          type="text"
          placeholder="Enter area in sq. ft."
          className="border w-full p-2 rounded-sm"
          value={formData.superBuiltupArea}
          onChange={(e) => updateFormData('superBuiltupArea', e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Carpet Area
        </label>
        <div className="flex">
          <input
            type="number"
            className="border w-full p-2 rounded-sm"
            value={formData.carpetArea}
            onChange={(e) => updateFormData('carpetArea', e.target.value)}
            placeholder="Enter area in sq. ft."
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Ad title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className={`border w-full p-2 rounded-sm ${errors.title ? 'border-red-500' : ''}`}
          value={formData.title}
          onChange={(e) => updateFormData('title', e.target.value)}
          onBlur={() => validateField('title')}
          maxLength={70}
          required
        />
        <div className="flex justify-between items-center">
          <div>{errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}</div>
          <div className="text-xs text-gray-500">{formData.title.length} / 70</div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          className={`border w-full p-2 rounded-sm h-24 ${errors.description ? 'border-red-500' : ''}`}
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          onBlur={() => validateField('description')}
          maxLength={4096}
          required
        ></textarea>
        <div className="flex justify-between items-center">
          <div>{errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}</div>
          <div className="text-xs text-gray-500">{formData.description.length} / 4,096</div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
