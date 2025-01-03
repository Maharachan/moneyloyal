// http://localhost:3000/api/auth/send-email

import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export function useSignupEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async (email: string) => {
    setLoading(true);
    setError(null);

 try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-email`, 
            { email }, // Send email directly in the body
            {
                headers: {
                    'Authorization': localStorage.getItem('token') || '',
                    'Content-Type': 'application/json'
                }
            }
        );
        if(response.status === 200){
            toast.success('Email sent successfully');
        }
    }
    catch(err){
        setError(err instanceof Error ? err.message : 'Failed to send email');
        toast.error('Failed to send email');
    }
    finally{
        setLoading(false);
    }
  }

  return { sendEmail, loading, error };
}
