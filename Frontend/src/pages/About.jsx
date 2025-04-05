import React from 'react'

const About = () => {
  return (
    <div className='p-5 flex flex-col gap-5'>
      <h1 className='text-3xl mt-5 font-bold text-gray-700 text-center'>About Us</h1>
      <div className='hero-section md:py-5 flex not-md:flex-col justify-center items-center md:gap-5'>
        <div className='h-70 sm:h-90 md:h-80 not-sm:w-screen object-cover'>
          <img className='object-cover' src="https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
        </div>
        <div className='w-full not-md:text-center md:w-100 text-[1.1rem] font-light text-gray-700'>
          <p>StyleHive was born out of a passion for fashion and technology. As a team of fashion enthusiasts and tech geeks, we wanted to create an online shopping experience that is both stylish and user-friendly.</p>
          <br />
          <p>We focus on affordability, quality, and a seamless shopping experience. Our platform is designed to help users discover new trends effortlessly.</p>
        </div>
      </div>  
      <h1 className='text-[1.5rem] text-gray-700 text-center'>What we Offer</h1>
      <div className='flex flex-col gap-5 not-md:gap-3 items-center mt-5'>
        <div className='flex not-md:flex-col gap-5 not-md:gap-3'>
          <h1 className='h-20 w-55 not-md:w-screen border border-gray-300 text-gray-700 flex items-center justify-center'>Wide Range of Products</h1>
          <h1 className='h-20 w-55 not-md:w-screen border border-gray-300 text-gray-700 flex items-center justify-center'>Fast & Secure Checkout</h1>
          <h1 className='h-20 w-55 not-md:w-screen border border-gray-300 text-gray-700 flex items-center justify-center'>Hassle-Free Returns</h1>
        </div>
        <div className='flex not-md:flex-col gap-5 not-md:gap-3'>
          <h1 className='h-20 w-60 not-md:w-screen border border-gray-300 text-gray-700 flex items-center justify-center'>Trending Styles</h1>
          <h1 className='h-20 w-60 not-md:w-screen border border-gray-300 text-gray-700 flex items-center justify-center'>Personalized Recommendations</h1>
        </div>
      </div>
      <p className='text-center text-gray-700'>Thanks for visiting! And if you have any questions, issue or feedback Please <a className='font-semibold hover:text-black' href="/contact">Contact Us</a>. We love to hear you &#10084;</p>
    </div>
  )
}

export default About