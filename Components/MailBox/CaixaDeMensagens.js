import React from 'react'
import AutoRenewSVG from '../../Assets/AutoRenewSVG'
import styles from './CaixaDeMensagens.module.css'
import Mensagem from './Mensagem'
import MensagemModal from './MensagemModal'

const CaixaDeMensagens = ({setToast,redirecionarAction, media, checkboxes:{checkboxes, setCheckboxes, uncheckAll, setUncheckAllHome}, 
  lerMensagem: {lerMensagem, setLerMensagem}, mailBox, setRefresh, newOld, reading, state, dispatch}) => {

  const [titulo, setTitulo] = React.useState('Caixa de Entrada')


  const refresh = React.useCallback((e)=>{
    if(!e) return
    setRefresh((r)=>!r)
    setUncheckAllHome()
  },[])

  React.useEffect(()=>{
    if(lerMensagem === null) refresh(true)
  },[lerMensagem, refresh])

  React.useEffect(()=>{
    if(!media) refresh(true)

    switch(mailBox.type){
      case 'CXENTRADA':
        setTitulo('Caixa de Entrada');
        return
      case 'FAVORITOS':
        setTitulo('Favoritos');
        return
      case 'ARQUIVO':
        setTitulo('Arquivados');
        return
      case 'LIXEIRA':
        setTitulo('Lixeira');
        return
    }
  },[mailBox, media, refresh]) 

  const setMsgChecked = (data) => {
    let checkboxContent
    if(data.action === 'ADD')
      checkboxContent = [...checkboxes.content, data.value]
    else
      checkboxContent = checkboxes.content.filter((e)=>e.id!==data.value.id)

    setCheckboxes({
      content: checkboxContent,
      length: checkboxContent.length,
      empty: checkboxContent.length === 0 ? true : false,
    })
  }
  
  const setLerMensagemClicada = (msg) => {
    setLerMensagem(msg)
    reading.setReading(true)
  }

  React.useEffect(()=>{
    // console.log('state mudou',state)
  },[state])

  return (
  <>
    <main className={`${media ? styles.cxContainerMobile : styles.cxContainer}`}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title} onClick={()=>{console.log(mailBox)}}>{titulo}</h2>
        <abbr title="Atualizar" onClick={refresh}><AutoRenewSVG /></abbr>
      </div>
      <ul className={styles.mensagens}>
        {state.loading && 'Loading'}
        {state.ready ? state.content.map(e=>
          <Mensagem 
            mensagem = {e}
            key={e.id}
            newOld={newOld}
            media={media}
            actions={{
              redirecionarAction: redirecionarAction,
              lerMensagem: setLerMensagemClicada,
              setChecked: setMsgChecked,
              uncheckAll: uncheckAll
            }}
            />) : ''}    
      </ul>
      {lerMensagem && reading.reading && <MensagemModal setToast={setToast} media={media} msgSelecionada={lerMensagem} dispatch={dispatch}/>}
    </main>
  </>
  )
}

export default CaixaDeMensagens