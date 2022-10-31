import React from 'react'

const TrashSvg = ({stroke="#D9D9D9"}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_158_95" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill={stroke}/>
</mask>
<g mask="url(#mask0_158_95)">
<path d="M6.75 21C6.2 21 5.72933 20.8043 5.338 20.413C4.946 20.021 4.75 19.55 4.75 19V6H3.75V4H8.75V3H14.75V4H19.75V6H18.75V19C18.75 19.55 18.5543 20.021 18.163 20.413C17.771 20.8043 17.3 21 16.75 21H6.75ZM16.75 6H6.75V19H16.75V6ZM8.75 17H10.75V8H8.75V17ZM12.75 17H14.75V8H12.75V17Z" fill="#1C1B1F"/>
</g>
</svg>
  )
}

export default TrashSvg