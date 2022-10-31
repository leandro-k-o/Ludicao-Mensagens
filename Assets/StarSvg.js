import React from 'react'

const StarSvg = ({color='none', stroke='#D7B9EE'}) => {
  return (
    <svg width="20" height="19" viewBox="0 0 14 13" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1L8.34708 5.1459H12.7063L9.17963 7.7082L10.5267 11.8541L7 9.2918L3.47329 11.8541L4.82037 7.7082L1.29366 5.1459H5.65292L7 1Z" stroke={stroke} strokeWidth="0.7"/>
    </svg>
  )
}

export default StarSvg