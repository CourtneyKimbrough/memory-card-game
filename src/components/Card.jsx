import { useState } from 'react'

export default function Card({imgSrc, onClick}){
    
        
    return(
        <>
        <div className="drop-shadow-md aspect-square flex items-center justify-center bg-[#ffde00] hover:bg-[#e6c200] w-full border-2 border-[#b3a125] rounded-sm " onClick={onClick}>
            <img src={imgSrc} className="w-full h-full object-contain" />
        </div>
        </>
    )
}