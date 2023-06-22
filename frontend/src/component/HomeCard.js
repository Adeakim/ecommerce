import React from 'react'

const HomeCard = ({image, name, price, category, loading}) => {
  return (
    <div className='bg-white p-2  shadow-md rounded min-w-[150px]'>

    {name ? 
    (<>
    <div className=' w-40 min-h-[150px]'>
        <img src={image} alt='' className='w-full h-full'></img>
    </div>
    <h3 className='font-semibold text-slate-600 text-center capitalize text-lg'>{name}</h3>
    <p className='text-center text-slate-500 font-medium'>{category}</p>
    <p className='text-center font-bold'>₦<span>{price}</span></p>
    </>) : <div className='flex justify-center items-center h-full'>
    <p>{loading}</p>
    </div>
        
    }
    </div>
  )
}

export default HomeCard