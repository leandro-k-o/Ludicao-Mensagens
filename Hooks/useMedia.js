import React from 'react'

const useMedia = (media) => {
  const [match, setMatch] = React.useState(null)

  React.useEffect(()=>{
    function verificarWidth(){
      const {matches} = window.matchMedia(media);
      setMatch(matches);
    }  
    if(match === null) verificarWidth()
    
    window.addEventListener('resize',verificarWidth)

    return ()=>{
      window.removeEventListener('resize',verificarWidth)
    }
  },[match])
  return (
    match
  )
}

export default useMedia