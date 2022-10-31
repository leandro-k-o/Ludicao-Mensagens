const useFirstLetter = () => {
  function firstLetter(name){
    if(name){
      return name.charAt(0).toUpperCase();
    }
  }

  return (
    firstLetter
  )
}

export default useFirstLetter