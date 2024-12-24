import React from 'react';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  Platform: ['Loyalty and Rewards', 'Merchants', 'Redemption Partners'],
  Rewardsweb: ['About', 'News and Blog'],
  Programs: ['LRPM Pass'],
  Legal: ['Terms of Use', 'Privacy Policy', 'Cookie Policy'],
  Security: ['PCI DSS', 'ISO 27001']
};

export default function Footer() {
  return (
    <footer className="bg-[#0A0B1E] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-6 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              Money<span className="text-green-300">Loyal</span>
            </h3>
            <p className="text-gray-400">
              We connect loyalty programs, simplify redemption, and enhance 
              engagement and profitability.
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold mb-4">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-green-300 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Linkedin className="cursor-pointer hover:text-green-300" />
            <Instagram className="cursor-pointer hover:text-green-300" />
            <Twitter className="cursor-pointer hover:text-green-300" />
          </div>
          
          <p className="text-gray-400">© 2024 Created by MoneyLoyal</p>
        </div>
      </div>
    </footer>
  );
}