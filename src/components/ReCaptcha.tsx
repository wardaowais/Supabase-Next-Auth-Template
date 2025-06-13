'use client';

import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
  onChange: (token: string | null) => void;
}

export default function ReCaptcha({ onChange }: ReCaptchaProps) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  return (
    <div className="flex justify-center my-4">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={onChange}
        theme="light"
      />
    </div>
  );
} 