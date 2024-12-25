import { Routes, Route } from 'react-router-dom';
import Offers from './offers';
import Profile from './profile';


export default function Dashboard() {
  return (
    <Routes>
       <Route index element={<Offers />} />
       <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}