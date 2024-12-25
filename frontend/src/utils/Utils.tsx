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
  
  export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }
  
  export function formatPoints(points: number): string {
    return new Intl.NumberFormat('en-US').format(points);
  }