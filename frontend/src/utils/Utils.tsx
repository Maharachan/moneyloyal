import { toast } from "react-toastify";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const handleSuccess = (msg:string)=> {
    toast.success(msg,{
        position: "top-right",
    })
}

export const handleError = (msg:string)=> {
    toast.error(msg,{
        position: "top-right",
    })
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  
  export function formatDate(date: string | Date): string {
    try {
      const d = typeof date === 'string' ? new Date(date) : date;
      
      if (isNaN(d.getTime())) {
        return 'Invalid date';
      }
      
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  }
  
  export function formatPoints(points: number): string {
    return new Intl.NumberFormat('en-US').format(points);
  }