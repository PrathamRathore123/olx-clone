
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

interface OtpVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: () => void;
  mobileNumber: string;
}

const OtpVerificationDialog: React.FC<OtpVerificationDialogProps> = ({
  open,
  onOpenChange,
  onVerify,
  mobileNumber
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleVerify = () => {
    // Reset previous error
    setError("");
    
    // In a real app, you'd validate the OTP against a backend service
    if (otp.length === 6) {
      toast({
        title: "Success",
        description: "Mobile number verified successfully",
      });
      onVerify();
      onOpenChange(false);
    } else {
      setError("Please enter a valid 6-digit OTP");
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
    }
  };

  const handleResendCode = () => {
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your mobile number",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify your phone number</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            We've sent a 6-digit verification code to {mobileNumber}
          </p>
          
          <div className="mx-auto my-4">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {error && <p className="text-xs text-red-500 mt-2 text-center">{error}</p>}
          </div>
          
          <Button onClick={handleVerify} className="w-full">
            Verify
          </Button>

          <div className="text-center text-sm text-gray-500">
            <p>Didn't receive the code?</p>
            <Button variant="link" onClick={handleResendCode} className="p-0 mt-1">
              Resend Code
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpVerificationDialog;
