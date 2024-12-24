import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="py-32 text-center bg-gradient-to-b from-[#7000FF] to-[#6000FF]">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Unlock the full potential of rewards
        </h1>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Rewardsweb connects loyalty programs, merchants, and users in a 
          win-win-win ecosystem
        </p>
        <Button onClick={() => navigate('/signup')} variant="white">Get Started</Button>
      </div>
    </section>
  );
}