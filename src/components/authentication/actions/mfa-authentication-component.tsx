"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { OTPForm } from "../forms";

export const MFAAuthForm = () => {

    const r = useRouter();
    const s = useSearchParams();
  
    const onSuccess = () => {
      if (s) {
      const from = s.get('from');
  
      if (from) {
        r.push(decodeURIComponent(from));
      } else {
        r.push('/dashboard');
      }
    }
    }
  
    return (
      <OTPForm onSuccess={onSuccess} />
    )
  }

  