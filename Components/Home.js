import React from 'react'
import CaixaDeMensagens from './MailBox/CaixaDeMensagens'
import HeaderMensagem from './MailBox/HeaderMensagem'
import Header from './Header'
import MensagemActions from '../Services/MensagemActions'
import useMedia from '../Hooks/useMedia'
import Toast from './MailBox/Toast'

const CHECKBOX_DATA = {
  length: 0,
  content: [],
  empty: true
}

const UPDATE_DATA = {
  action: '',
  data: {
    Nome: '',
    Email: '',
    Mensagem: '',
    Star: false,
    New: false,
    Archive: null
  }
}

const Home = () => {
  const [checkboxes, setCheckboxes] = React.useState(CHECKBOX_DATA);
  const [newOld, setNewOld] = React.useState(null);
  const [lerMensagem, setLerMensagem] = React.useState(null);
  const [uncheckAll, setUncheckAll] = React.useState(false);
  const [action, setAction] = React.useState(UPDATE_DATA);
  const [reading, setReading] = React.useState(false);
  const media = useMedia('(max-width: 720px)');
  const [toast, setToast] = React.useState(null);
  const {dispatch, redirecionarAction, setRefresh, state, mailBox, setMailBox, qtdeMensagens} = MensagemActions();

  React.useEffect(()=>{
    if(uncheckAll){
      setCheckboxes(CHECKBOX_DATA)
      setUncheckAll(false)
    } 

  },[uncheckAll])

  React.useEffect(()=>{
    let timer
    if(toast){
      timer = window.setTimeout(()=>setToast(null), 2000)
    } 

  },[toast])

  React.useEffect(()=>{
    if(lerMensagem) setUncheckAll(true)
  },[lerMensagem])

  React.useEffect(()=>{

    if(!action.action) return
    
    if(checkboxes.empty && lerMensagem){
        redirecionarAction(lerMensagem, action);
        setAction(UPDATE_DATA);
        if(action.action !== "UPDATE") setDefaultMensagem();
    }else{
      if(checkboxes.empty) return
        redirecionarAction(checkboxes.content, action);
        setAction(UPDATE_DATA);
        if(action.action !== "UPDATE") setUncheckAllHome()
    }
  },[action.action, checkboxes.empty,lerMensagem])

  function setUncheckAllHome(){
    setUncheckAll(true)
    setCheckboxes(CHECKBOX_DATA)    
  }

  function setDefaultMensagem(){
    setReading(false)
    setLerMensagem(null)    
  }

  if(media){
    return (
      <main className='mainContainerMobile'>
        {reading || !checkboxes.empty ? (
          <HeaderMensagem 
            media ={media}
            checkboxes={{checkboxes, setCheckboxes, CHECKBOX_DATA, setUncheckAllHome}}
            lerMensagem={{lerMensagem, setLerMensagem}}
            setAction={setAction}
            setNewOld={setNewOld}
            setReading={setReading}
            mailBox={mailBox}
            setToast={setToast}
            />
        ) : (
          <Header media ={media} mailBox={{mailBox, setMailBox}} reading={reading} qtdeMensagens={qtdeMensagens}/> 
        )}
        <CaixaDeMensagens redirecionarAction={redirecionarAction} setToast={setToast} media={media} dispatch={dispatch} state={state} setRefresh={setRefresh} mailBox={mailBox} reading={{reading,setReading}} newOld={{newOld, setNewOld}} checkboxes={{checkboxes, setCheckboxes, uncheckAll, setUncheckAllHome}} lerMensagem={{lerMensagem, setLerMensagem}}/>
        {toast && <Toast mensagem={toast.mensagem} media={media} />}
      </main>
      
    )
  }else{
    return (
    <>
      <main className='mainContainer'>
        <Header mailBox={{mailBox, setMailBox}} reading={reading} qtdeMensagens={qtdeMensagens}/> 
        <div className='dashboard'>
          <HeaderMensagem 
            media = {media}
            checkboxes={{checkboxes, setCheckboxes, CHECKBOX_DATA, setUncheckAllHome}}
            lerMensagem={{lerMensagem, setLerMensagem}}
            setAction={setAction}
            setNewOld={setNewOld}
            setReading={setReading}
            mailBox={mailBox}
            setToast={setToast}
            />
          <CaixaDeMensagens redirecionarAction={redirecionarAction} setToast={setToast} media={media} dispatch={dispatch} state={state} setRefresh={setRefresh} mailBox={mailBox} reading={{reading,setReading}} newOld={{newOld, setNewOld}} checkboxes={{checkboxes, setCheckboxes, uncheckAll, setUncheckAllHome}} lerMensagem={{lerMensagem, setLerMensagem}}/>
          {toast && <Toast mensagem={toast.mensagem} media={media} />}
        </div>
      </main>
    </>
      
    )
  }
}

export default Home

//             Nome: nome,
//             Email: email,
//             Mensagem: msg,
//             DataDeEnvio: dataAtual,
//             Data: dataDMA,  dd/mm/aaaa
//             Hora: time,    hh:mm
//             Star: false,
//             New: true,