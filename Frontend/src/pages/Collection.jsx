import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppProvider'
import Loader from '../components/Loader';
import Item from '../components/Collection/Item';
import api from '../api';
import { UserContext } from '../context/UserProvider';
import { useParams } from 'react-router-dom';

const Collection = () => {

  const {products, getProducts, searchInput} = useContext(AppContext);
  const {user} = useContext(UserContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const {category} = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [selectedType, setSelectedType] = useState([]);

  const [filterBox, setFilterBox] = useState(false);
  const [categoryBox, setCategoryBox] = useState(false);
  const [showDetailedFilter, setShowDetailedFilter] = useState(false);

  const {allTypes} = useContext(AppContext);

  function compareArrays(arr1, arr2) {
    for (const element1 of arr1) {
      for (const element2 of arr2) {
        if(element1.toLowerCase() === element2.toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  }
  useEffect(() => {
    getProducts();
  },[])
  useEffect(() => {
    if (!products || !products?.length) return;

    window.scrollTo(0, 0);
    
    // Start by initializing the filtered list with all products
    let filtered = [...products];

    // Filter based on category
    if (selectedCategory !== 'all') {
        filtered = filtered.filter((item) => item.category?.toLowerCase() === selectedCategory);
    }

    // Filter based on type
    if (selectedType.length) {
        filtered = filtered.filter((item) => compareArrays(item.type, selectedType));
    }

    // Filter based on search input
    if (searchInput !== '') {
        filtered = filtered.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()));
    }

    setFilteredProducts(filtered);
}, [products, selectedCategory, selectedType, searchInput]);


  if(!filteredProducts) {
    return <div className='h-screen w-screen'><Loader/></div>
  }

  return (
      <div className='collection relative flex flex-col lg:flex-row gap-5 p-5'>
        <div className='filter-container lg:sticky top-12 flex lg:flex-col flex-row justify-between lg:justify-start lg:gap-3 lg:w-60 xl:w-70 lg:h-full lg:border-1 border-gray-300 lg:p-2 '>
          <div className='flex items-center gap-2 text-gray-700  text-[0.8rem] md:text-[0.9rem] cursor-pointer'>
            <h1 onClick={() => {setCategoryBox((prev) => !prev)}} className='font-semibold flex gap-2 items-center'>SELECT CATEGORY : <p className='text-[0.9rem]'>{selectedCategory?.toUpperCase()} <i className={`fa-solid fa-chevron-down text-[0.8rem]`}></i></p></h1>
          </div>

          {/* Category dropdown box when click on select category */}
          <div className={`${categoryBox? '': 'hidden'} absolute left-5 lg:left-32 top-12 lg:top-8 list-none bg-white text-gray-700 text-[1rem] w-30 flex flex-col gap-1 border-1 border-gray-300`}>
              <li className={`${selectedCategory === 'all'? 'bg-gray-300': ''} px-2 py-1 cursor-pointer`} onClick={(e) => {setSelectedCategory(e.target.innerText.toLowerCase()); setCategoryBox(false)}}>All</li>
              <li className={`${selectedCategory === 'men'? 'bg-gray-300': ''} px-2 py-1 cursor-pointer`} onClick={(e) => {setSelectedCategory(e.target.innerText.toLowerCase()); setCategoryBox(false)}}>Men</li>
              <li className={`${selectedCategory === 'women'? 'bg-gray-300': ''} px-2 py-1 cursor-pointer`} onClick={(e) => {setSelectedCategory(e.target.innerText.toLowerCase()); setCategoryBox(false)}}>Women</li>
              <li className={`${selectedCategory === 'kids'? 'bg-gray-300': ''} px-2 py-1 cursor-pointer`} onClick={(e) => {setSelectedCategory(e.target.innerText.toLowerCase()); setCategoryBox(false)}}>Kids</li>
          </div>

          {/* Filters for medium and small screen */}
          <div className='cursor-pointer lg:hidden text-gray-700  text-[0.8rem]'  onClick={() => {setFilterBox((prev) => !prev)}}>
            <h1 className='font-semibold text-gray-700'>FILTERS <i className={`fa-solid fa-chevron-${filterBox? 'down':'right'} text-[0.8rem]`}></i></h1>
          </div>

          {/* filter dropdown when click on filter option */}
          <div className={`${filterBox? '': 'hidden'} absolute right-5 top-12 bg-white border-1 border-gray-300 p-2 w-40 md:w-45`}>
            <div className='w-100% flex flex-col gap-1 dropdown-menu'>
                {allTypes.map((type, index) => {
                  return(
                    <div key={index} className='flex gap-2'>
                      <input 
                        id={type} 
                        type="checkbox"
                        value={type} 
                        onChange={(e) => 
                          {
                            if (e.target.checked) {
                                setSelectedType([...selectedType, type]);
                            } else {
                                setSelectedType(selectedType.filter((t) => t !== type));
                            }
                          }
                        }
                      />
                      <label className='font-light cursor-pointer' htmlFor={type}>{type}</label>
                    </div>
                  )
                })}
                <div className='flex gap-2 items-center mt-2'>
                  <button onClick={() => {window.location.reload()}} className='px-2 py-1 bg-gray-200 border-1 border-gray-300 font-semibold text-gray-700 text-[0.8rem]'>Refresh</button>
                  <button onClick={() => {setFilterBox(false)}} className='text-white text-[.9rem] px-2 py-1 bg-black cursor-pointer'>Apply</button>
                </div>
                
              </div>
          </div>

          <div className='w-full text-gray-700 hidden lg:flex flex-col gap-1 '>
            <h1 className='font-semibold mb-1 text-[0.9rem]'>FILTERS:</h1>
            <div className='w-full flex flex-col gap-1'>
              {allTypes.slice(0,4).map((type, index) => {
                return(
                  <div key={index} className='flex gap-2'>
                    <input 
                      id={type+'a'} 
                      type="checkbox"
                      value={type} 
                      onChange={(e) => 
                        {
                          if (e.target.checked) {
                              setSelectedType([...selectedType, type]);
                          } else {
                              setSelectedType(selectedType.filter((t) => t !== type));
                          }
                        }
                      }
                    />
                    <label className='font-light cursor-pointer' htmlFor={type+'a'}>{type}</label>
                  </div>
                );
              })}
            </div>
            <div className='w-full flex flex-col gap-1'>
              {showDetailedFilter && allTypes.slice(4).map((type, index) => {
                return(
                  <div key={index} className='flex gap-2'>
                    <input 
                      id={type+'a'} 
                      type="checkbox"
                      value={type} 
                      onChange={(e) => 
                        {
                          if (e.target.checked) {
                              setSelectedType([...selectedType, type]);
                          } else {
                              setSelectedType(selectedType.filter((t) => t !== type));
                          }
                        }
                      }
                    />
                    <label className='font-light cursor-pointer' htmlFor={type+'a'}>{type}</label>
                  </div>
                );
              })}
            </div>
            <h1 onClick={() => {setShowDetailedFilter((prev) => !prev)}} className='text-[0.9rem] text-center cursor-pointer font-semibold'>{showDetailedFilter? 'Show less' : 'Show more'}</h1>
          </div>
        </div>
        {filteredProducts.length? 
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 2xl:grid-cols-6 justify-center gap-2 md:gap-2 lg:gap-4'>
          {filteredProducts.map((product) => {
            return <Item key={product.id} product={product}/>
          })}
        </div> : 
        <div className='font-semibold text-gray-700 h-[80vh] w-[90vw] flex justify-center items-center'>
          Loading...
        </div>}
      </div>
  )
}

export default Collection
