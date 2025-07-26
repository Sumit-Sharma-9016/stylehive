import React, { useContext, useEffect } from 'react'
import HeroSection from '../components/Home/HeroSection';
import CategorySection from '../components/Home/CategorySection';
import Highlights from '../components/Home/Highlights';
import Assurance from '../components/Home/Assurance'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <HeroSection/>
      <CategorySection/>
      <Highlights onClick={() => navigate('/collection/women')} url={'https://cdn.anscommerce.com/live/image/catalog/brandstore/vastrado/Final-Website-03.jpg'}/>
      <Highlights onClick={() => navigate('/collection/men')} url={'https://cdn.anscommerce.com/live/image/catalog/brandstore/vastrado/Final-Website-06.jpg'}/>
      <Highlights onClick={() => navigate('/collection/kids')} url={'https://cdn.anscommerce.com/live/image/catalog/brandstore/vastrado/Final-Website-12.jpg'}/>
      <Highlights url={'https://cdn.anscommerce.com/live/image/catalog/brandstore/vastrado/Final-Website-14.jpg'}/>
      <Assurance/>
    </div>
  )
}

export default Home