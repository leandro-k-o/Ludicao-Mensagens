import React from 'react'
import styles from './HeaderMensagem.module.css'
import ArrowBackSvg from './../../Assets/ArrowBackSvg'
import ArchiveSvg from './../../Assets/ArchiveSvg'
import MailSvg from './../../Assets/MailSvg'
import TrashSvg from './../../Assets/TrashSvg'
import DraftsSvg from '../../Assets/DraftsSvg'
import ExcluirModal from './ExcluirModal'
import ToMailBoxSVG from '../../Assets/ToMailBoxSVG'

const BTN_DATA = {
  btnVoltar: false,
  btnUpdate: false
}

const HeaderMensagem = ({setToast, mailBox, lerMensagem : {setLerMensagem, lerMensagem}, media, setReading, checkboxes, setAction, setNewOld}) => {
  const [msgNova, setMsgNova] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const [enableButtons, setEnableButtons] = React.useState(BTN_DATA);
  const [deleteConfirm, setDeleteConfirm] = React.useState(null);

  React.useEffect(()=>{
    
    if(lerMensagem || !checkboxes.checkboxes.empty){
      setEnableButtons({btnVoltar: true, btnUpdate: true})
    }else{
      setEnableButtons(BTN_DATA)
    }
  },[checkboxes.checkboxes.empty,lerMensagem])

  React.useEffect(()=>{
      if(checkboxes.checkboxes.length === 1 ){
        setMsgNova(checkboxes.checkboxes.content[0].New)
      }
  },[checkboxes.checkboxes.length])  

  React.useEffect(()=>{
    if(deleteConfirm){
      deletarMensagem()
    }
    setDeleteConfirm(null)
  },[deleteConfirm, setDeleteConfirm, deletarMensagem])  

  function voltar(){
    if(!checkboxes.checkboxes.empty){
      checkboxes.setUncheckAllHome()  
    }  

    
    setReading(false)
    setLerMensagem(null)
    setEnableButtons(BTN_DATA)
  }

  function setNovaMensagem(novaMensagem){
    if(!media && checkboxes.checkboxes.empty && !lerMensagem) return

    const action = {
      action: 'UPDATE',
      data: {
        'New': novaMensagem,
      },
      refresh : (lerMensagem ? true : false) 
    }
    setMsgNova(novaMensagem)
    setNewOld(novaMensagem)
    setAction(action)
  }

  function deletarMensagem(){
    if(!media && checkboxes.checkboxes.empty && !lerMensagem)  return 

    const action = {
      action: 'DELETAR_DEFINITIVO',
      data: {
      }
    }
    setToast({mensagem:'Mensagens removidas permanentemente'})

    setAction(action)
  }

  function moverParaLixeira(){
    if(!media && checkboxes.checkboxes.empty  && !lerMensagem) return 

    if(mailBox.type === 'LIXEIRA'){
      setModal(true)
      return
    } 

    const action = {
      action: 'DELETAR',
      data: {
        'Trash': true,   //criar campo lixeira
        'Archive': false,
      }
    }
    setToast({mensagem:'Mensagem movida para Lixeira'})
    setAction(action)
  }

  function arquivarMensagem(arquivar){
    if(!media && checkboxes.checkboxes.empty  && !lerMensagem) return 
    let action
    if(mailBox.type === 'LIXEIRA'){
      action = {
        action: 'DELETAR',
        data: {
          'Trash': false,
        }
      }
    }else{
      action = {
        action: 'ARQUIVAR',
        data: {
          'Archive': arquivar,
        }
      }
    }
    setAction(action)    
    if(arquivar){
      setToast({mensagem:'Mensagem movida para Arquivados'})
    }else{
      setToast({mensagem:'Mensagem movida para Caixa de Entrada'})
    }
  }

  return (
    <header className={`${media ? styles.headerMobile : styles.header}`}>
      <nav className={styles.nav}>
        {<button className={`${(enableButtons.btnVoltar || media) ? '' : styles.btnHidden} ${styles.btnVoltar}`} onClick={voltar}><abbr title="Voltar"><ArrowBackSvg /></abbr></button>}
        <ul className={styles.ul}>
          {mailBox.type === 'ARQUIVO' || mailBox.type === 'LIXEIRA' ? (
            <li className={`${styles.li} ${enableButtons.btnUpdate ? '' : styles.btnDisabled} `} onClick={()=>arquivarMensagem(false)} >
              <abbr title="Mover para Caixa de Entrada"><ToMailBoxSVG /></abbr>
            </li>
          ):(
            <li className={`${styles.li} ${enableButtons.btnUpdate ? '' : styles.btnDisabled} `}  onClick={()=>arquivarMensagem(true)} >
              <abbr title="Arquivar"><ArchiveSvg /></abbr>
            </li>
          )}
          
          {mailBox.type !== 'LIXEIRA' && mailBox.type !== 'ARQUIVO' && (msgNova ? (
            <li className={`${styles.li} ${enableButtons.btnUpdate ? '' : styles.btnDisabled} `}  onClick={()=>setNovaMensagem(false)}>
              <abbr title="Marcar como lida"><DraftsSvg /></abbr>
            </li>
          ):(
            <li className={`${styles.li} ${enableButtons.btnUpdate ? '' : styles.btnDisabled} `}  onClick={()=>setNovaMensagem(true)}>
              <abbr title="Marcar como não lida"><MailSvg /></abbr>
            </li>
            ))
          }
          
          <li className={`${styles.li} ${enableButtons.btnUpdate ? '' : styles.btnDisabled} `}  onClick={moverParaLixeira}>
            <abbr title={mailBox.type === 'LIXEIRA' ? 'Excluir definitivamente' : 'Mover para Lixeira'}><TrashSvg /></abbr>
          </li>
        </ul>
      </nav>
      {modal && <ExcluirModal setDeleteConfirm={setDeleteConfirm} setModal={setModal}/>}
    </header>
  )
}

export default HeaderMensagem