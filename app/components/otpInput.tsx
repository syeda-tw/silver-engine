"use client";

import { useState, useRef, useEffect } from "react";

interface OTPInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: string;
}

const OTPInput = ({
  value = "",
  onChange,
  onComplete,
  className = "",
}: OTPInputProps) => {
  const [digits, setDigits] = useState<string[]>(() => {
    if (value) {
      return value.padEnd(5, "").split("").slice(0, 5);
    }
    return Array(5).fill("");
  });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isInternalUpdate, setIsInternalUpdate] = useState(false);

  // Only update from external value prop when it's not an internal update
  useEffect(() => {
    if (!isInternalUpdate && value !== undefined) {
      const currentValue = digits.join("");
      if (value !== currentValue) {
        const newDigits = value.padEnd(5, "").split("").slice(0, 5);
        setDigits(newDigits);
      }
    }
    setIsInternalUpdate(false);
  }, [value, isInternalUpdate]);

  const handleInputChange = (index: number, inputValue: string) => {
    // Only allow single digit
    const digit = inputValue.replace(/\D/g, "").slice(-1);

    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);

    const otpValue = newDigits.join("");
    setIsInternalUpdate(true);
    onChange?.(otpValue);

    // Auto-focus next input
    if (digit && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete (all 5 digits filled)
    const filledDigits = newDigits.filter((d) => d !== "").length;
    if (filledDigits === 5) {
      onComplete?.(otpValue);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle paste
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const pastedDigits = text.replace(/\D/g, "").slice(0, 5).split("");
        const newDigits = Array(5).fill("");

        pastedDigits.forEach((digit, i) => {
          if (i < 5) newDigits[i] = digit;
        });

        setDigits(newDigits);
        const otpValue = newDigits.join("");
        setIsInternalUpdate(true);
        onChange?.(otpValue);

        const filledDigits = newDigits.filter((d) => d !== "").length;
        if (filledDigits === 5) {
          onComplete?.(otpValue);
          inputRefs.current[4]?.focus();
        } else {
          inputRefs.current[Math.min(pastedDigits.length, 4)]?.focus();
        }
      });
    }
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="
            w-12 h-12 text-center text-lg font-medium
            border rounded-md transition-all
            bg-background text-text
            border-text-light/20
            focus:border-primary focus:outline-none focus:shadow-[0px_0px_0px_2px_#2563EB40]
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
