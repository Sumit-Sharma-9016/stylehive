import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function HeroSection() {

    const images = ['https://cdn1.staticans.com/catalog/brandstore/vastrado/6-1737138600-rd_bannerdesktop.jpg', 'https://cdn1.staticans.com/catalog/brandstore/vastrado/114-1732041000-diwalidesktopbanner1.jpg', 'https://cdn1.staticans.com/catalog/brandstore/vastrado/114-1731263400-raddesktop.jpg', 'https://cdn1.staticans.com/catalog/brandstore/vastrado/114-1726425000-textureddestop.jpg', 'https://cdn1.staticans.com/catalog/vastrado/22Nov2023/114-1708367400-banner-dsktop1.jpg']

    const [currentIndex, setCurrentIndex] = useState(0);

    let interval;

    useEffect(()=> {
        interval = setInterval(()=> {
            setCurrentIndex((prevIndex)=> { return prevIndex===images.length-1? 0: prevIndex+1 });
        },5000)

        return () => {clearInterval(interval)}
    },[images.length])

    let handleNext = () => {
        setCurrentIndex((prevIndex)=> { return prevIndex===images.length-1? 0: prevIndex+1 });
        clearInterval(interval);
    }

    let handlePrev = () => {
        setCurrentIndex((prevIndex)=> { return prevIndex===0? images.length-1: prevIndex-1 });
        clearInterval(interval);
    }

    return (
        <div className='w-full h-[55vw]  flex shrink-0 justify-around items-center overflow-hidden'>
            <div onClick={handlePrev} className='hidden md:block cursor-pointer'>
                <i className="fa-solid fa-angle-left text-gray-700 md:text-5xl text-2xl "></i>
            </div>
            
            <Link className='md:w-[90%] overflow-hidden' to='/collection'>
            <img className='cover hover:scale-105 transition-all ease-in-out duration-200' src={`${images[currentIndex]}`} alt="" />
            </Link>
            <div onClick={handleNext} className='hidden md:block cursor-pointer'>
                <i className="fa-solid fa-angle-right text-gray-700 md:text-5xl text-2xl "></i>
            </div>
        </div>
    )
}

export default HeroSection