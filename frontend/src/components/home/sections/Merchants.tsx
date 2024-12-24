import React from 'react';
import Button from '../common/Button';

export default function Merchants() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?auto=format&fit=crop&w=800"
              alt="Happy Shoppers"
              className="rounded-2xl"
            />
            <div className="absolute -bottom-4 -right-4 flex gap-2">
              <img src="https://logo.clearbit.com/adidas.com" alt="Adidas" className="w-12 h-12 rounded-full bg-white p-2 shadow-lg" />
              <img src="https://logo.clearbit.com/nike.com" alt="Nike" className="w-12 h-12 rounded-full bg-white p-2 shadow-lg" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Merchants</h2>
            <p className="text-gray-600 mb-6">
              Reach a loyal and engaged audience. Attract high-value customers, 
              drive increased spending with targeted incentives, and boost sales.
            </p>
            <Button variant="primary">Learn more</Button>
          </div>
        </div>
      </div>
    </section>
  );
}