
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import OtpVerificationDialog from './OtpVerificationDialog';

interface ReviewSectionProps {
  formData: {
    name: string;
    email: string;
    mobileNumber: string;
    mobileVerified: boolean;
  };
  updateFormData: (field: string, value: any) => void;
  errors: Record<string, string>;
  validateField: (field: string) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  formData, 
  updateFormData, 
  errors,
  validateField
}) => {
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    updateFormData('email', email);
    setEmailValid(validateEmail(email));
  };

  const handleSendOtp = () => {
    if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid mobile number",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you'd send an OTP to the mobile number
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your mobile number",
    });
    setOtpDialogOpen(true);
  };

  const handleVerifySuccess = () => {
    setMobileVerified(true);
    updateFormData('mobileVerified', true);
  };

  return (
    <div className="border-b py-4">
      <h2 className="font-medium mb-4">REVIEW YOUR DETAILS</h2>
      
      <div className="flex mb-4 items-start">
        <div className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
          P
        </div>
        <div className="w-full">
          <div className="mb-1">Name</div>
          <Input
            type="text"
            className={`w-full ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Full name"
            value={formData.name || ''}
            onChange={(e) => updateFormData('name', e.target.value)}
            onBlur={() => validateField('name')}
            required
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
      </div>
      
      <h3 className="font-medium mb-2">Let's verify your account</h3>
      <p className="text-sm text-gray-600 mb-4">
        We will send you a verification code by SMS on the phone number.
      </p>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          className={`w-full ${errors.email || (formData.email && !emailValid) ? 'border-red-500' : ''}`}
          value={formData.email || ''}
          onChange={handleEmailChange}
          onBlur={() => validateField('email')}
          placeholder="Enter your email address"
          required
        />
        {errors.email ? (
          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
        ) : formData.email && !emailValid ? (
          <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
        ) : emailValid ? (
          <p className="text-xs text-green-500 mt-1">Email address is valid</p>
        ) : null}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Mobile Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="tel"
              className={`w-full ${errors.mobileNumber ? 'border-red-500' : ''}`}
              value={formData.mobileNumber || ''}
              onChange={(e) => updateFormData('mobileNumber', e.target.value)}
              onBlur={() => validateField('mobileNumber')}
              placeholder="Enter your phone number"
              required
              disabled={mobileVerified}
            />
            {errors.mobileNumber && <p className="text-xs text-red-500 mt-1">{errors.mobileNumber}</p>}
          </div>
          <Button 
            onClick={handleSendOtp} 
            variant={mobileVerified ? "outline" : "default"}
            disabled={mobileVerified}
            type="button"
          >
            {mobileVerified ? "Verified ✓" : "Verify"}
          </Button>
        </div>
        {mobileVerified && !errors.mobileVerified && (
          <p className="text-xs text-green-500 mt-1">Mobile number verified successfully</p>
        )}
        {errors.mobileVerified && (
          <p className="text-xs text-red-500 mt-1">{errors.mobileVerified}</p>
        )}
      </div>

      <OtpVerificationDialog
        open={otpDialogOpen}
        onOpenChange={setOtpDialogOpen}
        onVerify={handleVerifySuccess}
        mobileNumber={formData.mobileNumber}
      />
    </div>
  );
};

export default ReviewSection;
