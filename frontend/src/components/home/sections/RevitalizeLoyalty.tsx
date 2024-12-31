import Button from '../common/Button';

export default function RevitalizeLoyalty() {
  return (
    <section className="py-20 bg-[#F2FFE8]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Revitalize your Loyalty Program</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're not just an earn and redeem platform; we're a catalyst for program evolution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="font-bold mb-2">Unlimited redemption options</h3>
              <p className="text-gray-600">
                Expand your members' horizons with instant access to a vast network of partner 
                merchants. From online giants to local favorites, we offer the choices they crave, 
                both online and in-store.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Cashback and shopping rewards</h3>
              <p className="text-gray-600">
                Give your customers more opportunities to earn loyalty currency or earn cashback 
                while shopping at their favorite stores.
              </p>
            </div>
            <Button variant="primary">Learn more</Button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df" 
              alt="Loyalty Program Interface"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}