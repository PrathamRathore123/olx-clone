
import React from 'react';

interface CategorySectionProps {
  category: string;
  updateFormData: (field: string, value: any) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, updateFormData }) => {
  return (
    <div className="border-b py-4">
      <div className="font-medium pb-2">SELECTED CATEGORY</div>
      <div className="text-sm text-gray-500">
        Selected <span className="mx-1">›</span> {category} <span className="mx-1">›</span> Property for Sale <span className="text-blue-500 ml-2">Change</span>
      </div>
    </div>
  );
};

export default CategorySection;
