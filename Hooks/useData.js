import React from 'react'

const useData = (data, hora) => {
  const dataHoje = React.useMemo(()=>{
    const datacompleta = new Date();
    const dia = String(datacompleta.getDate()).padStart(2, '0');
    const mes = String(datacompleta.getMonth() + 1).padStart(2, '0');
    const ano = datacompleta.getFullYear();
    return dia + '/' + mes + '/' + ano;
  },[])

  function colocarData(){
    return dataHoje === data ? hora.slice(0,5) : data;  
  }

  return {
    dataHoje, colocarData
  }
}

export default useData