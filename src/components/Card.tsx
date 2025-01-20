import React from 'react'
import { CardType } from '../utils/Types'

const Card:React.FC<CardType> = ({ title, desc, img, index }) => {
  return (
    <div className='h-[300px] w-[400px] cursor-pointer animate__animated animate__bounce'
    style={{ animationDelay: `${index*0.3}s`}}>
        <img className='bg-[#FFC5F4] h-3/5 w-full object-cover rounded-t-lg' src={img} alt={title} />
        <div className='bg-[#282828] h-2/5 w-full flex-col justify-center items-center flex rounded-b-lg shadow-2xl'>
            <h2 className='text-white font-railway font-bold text-2xl'>{title}</h2>
            <p className='text-yellow-400 font-notoJp'
            style={{ transform: 'rotate(-2deg)' }}>{desc}</p>
        </div>
    </div>
  )
}

export default Card