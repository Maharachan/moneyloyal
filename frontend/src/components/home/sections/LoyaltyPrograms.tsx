import React from 'react';
import Button from '../common/Button';

export default function LoyaltyPrograms() {
  return (
    <section className="py-20 bg-[#F3F0FF]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Loyalty Programs</h2>
            <p className="text-gray-600 mb-6">
              Revolutionize how users engage with your rewards. Simplify redemption, 
              tap into an extensive affiliate network, and increase program satisfaction.
            </p>
            <Button variant="primary">Learn more</Button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800"
              alt="Loyalty Program Interface"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}