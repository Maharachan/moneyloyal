import React from 'react';

const features = [
  {
    icon: '👤',
    title: 'Users',
    description: 'Flexible redemptions, exclusive offers, and earn extra rewards through merchant-funded rewards',
    bgColor: 'bg-[#E8FFF7]'
  },
  {
    icon: '🎁',
    title: 'Reward Programs',
    description: 'Revolutionize how users engage with your rewards and increase program satisfaction',
    bgColor: 'bg-[#F0F7FF]'
  },
  {
    icon: '🛍️',
    title: 'Merchants',
    description: 'Attract high-value customers, drive increased spending with targeted incentives, and boost brand loyalty',
    bgColor: 'bg-[#F2FFE8]'
  }
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`${feature.bgColor} p-8 rounded-2xl text-center`}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}