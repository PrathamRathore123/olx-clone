
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import CategorySection from './CategorySection';
import DetailsSection from './DetailsSection';
import PriceSection from './PriceSection';
import PhotoUploadSection from './PhotoUploadSection';
import LocationSection from './LocationSection';
import ReviewSection from './ReviewSection';

const AdForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    category: 'Furniture & Appliances',
    type: '',
    itemType: 'Flat / Apartment',
    condition: 'To Be Decided / Not Applicable',
    bedrooms: 1,
    bathrooms: 1,
    furnishing: 'Furnished',
    listedBy: 'Builder',
    name: '',
    email: '',
    projectName: '',
    superBuiltupArea: '',
    carpetArea: '',
    bachelorsAllowed: false,
    description: '',
    title: '',
    price: '',
    photos: [],
    location: 'List',
    state: '',
    mobileNumber: '',
    mobileVerified: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user updates a field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateField = (field: string) => {
    let newErrors = { ...errors };
    
    // Mark field as touched
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));

    switch (field) {
      case 'type':
        if (!formData.type) {
          newErrors.type = 'Type is required';
        } else {
          delete newErrors.type;
        }
        break;
      case 'name':
        if (!formData.name) {
          newErrors.name = 'Name is required';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'title':
        if (!formData.title) {
          newErrors.title = 'Title is required';
        } else {
          delete newErrors.title;
        }
        break;
      case 'description':
        if (!formData.description) {
          newErrors.description = 'Description is required';
        } else {
          delete newErrors.description;
        }
        break;
      case 'price':
        if (!formData.price) {
          newErrors.price = 'Price is required';
        } else {
          delete newErrors.price;
        }
        break;
      case 'photos':
        if (!formData.photos || formData.photos.length === 0) {
          newErrors.photos = 'At least one photo is required';
        } else {
          delete newErrors.photos;
        }
        break;
      case 'state':
        if (!formData.state) {
          newErrors.state = 'State is required';
        } else {
          delete newErrors.state;
        }
        break;
      case 'mobileNumber':
        if (!formData.mobileNumber) {
          newErrors.mobileNumber = 'Mobile number is required';
        } else if (formData.mobileNumber.length < 10) {
          newErrors.mobileNumber = 'Enter a valid mobile number';
        } else {
          delete newErrors.mobileNumber;
        }
        break;
      case 'mobileVerified':
        if (!formData.mobileVerified) {
          newErrors.mobileVerified = 'Mobile verification is required';
        } else {
          delete newErrors.mobileVerified;
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const fieldsToValidate = [
      'type', 'name', 'email', 'title', 'description', 
      'price', 'photos', 'state', 'mobileNumber', 'mobileVerified'
    ];
    
    let isValid = true;
    let newTouchedFields = { ...touchedFields };
    
    // Mark all fields as touched
    fieldsToValidate.forEach(field => {
      newTouchedFields[field] = true;
      if (!validateField(field)) {
        isValid = false;
      }
    });
    
    setTouchedFields(newTouchedFields);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Check mobile verification specifically
    if (!formData.mobileVerified) {
      toast({
        title: "Verification Required",
        description: "Please verify your mobile number before proceeding",
        variant: "destructive",
      });
      return;
    }
    
    console.log('Form submitted with data:', formData);
    
    // Show success message
    toast({
      title: "Ad Posted Successfully",
      description: "Your ad has been submitted for review",
    });
    
    // Here you would typically send the data to your backend
  };

  return (
    <div className="max-w-2xl mx-auto bg-white min-h-screen">
      <div className="sticky top-0 bg-white p-4 flex items-center border-b">
        <button className="mr-4">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-center flex-grow font-semibold">POST YOUR AD</h1>
      </div>

      <form onSubmit={handleSubmit} className="px-4 pb-6">
        <CategorySection 
          category={formData.category} 
          updateFormData={updateFormData} 
        />
        
        <DetailsSection 
          formData={formData} 
          updateFormData={updateFormData} 
          errors={errors}
          validateField={validateField}
        />
        
        <PriceSection 
          price={formData.price} 
          updateFormData={updateFormData} 
          error={errors.price}
          validateField={() => validateField('price')}
        />
        
        <PhotoUploadSection 
          photos={formData.photos}
          updateFormData={updateFormData}
          error={errors.photos}
          validateField={() => validateField('photos')}
        />
        
        <LocationSection 
          location={formData.location} 
          state={formData.state}
          updateFormData={updateFormData} 
          error={errors.state}
          validateField={() => validateField('state')}
        />
        
        <ReviewSection 
          formData={formData}
          updateFormData={updateFormData}
          errors={errors}
          validateField={validateField}
        />

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2.5 rounded-sm w-full"
          >
            Post Now
          </button>
        </div>
      </form>
      
      <footer className="bg-blue-900 text-white p-4 mt-8 flex justify-around">
        <div className="text-xs">Car@India</div>
        <div className="text-xs">OLX</div>
        <div className="text-xs">Cardekho</div>
        <div className="text-xs">Bikewale</div>
        <div className="text-xs">CarTrade</div>
        <div className="text-xs">M3M India</div>
      </footer>
    </div>
  );
};

export default AdForm;
