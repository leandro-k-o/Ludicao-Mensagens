import React from 'react'
import { deleteMensagem, deleteMensagens, updateMensagem, updateMensagens, contarMensagens, cxEntrada, favoritos, arquivados, lixeira } from './firebaseDataBase.js'

const INITIAL_STATE = {
  loading: false,
  error: null,
  content: [],
  ready: false
}

const MAILBOX_STATE = {
  type: 'CXENTRADA',
  action: cxEntrada
}

const MensagemActions = () => {
  const [state, dispatch] = React.useReducer(reducer,INITIAL_STATE)
  const [mailBox, setMailBox] = React.useReducer(mailBoxes, MAILBOX_STATE)
  const [refresh, setRefresh] = React.useState(true)
  const [qtdeMensagens, setQtdeMensages] = React.useState(null);
  
  React.useEffect(()=>{
    async function baixarMensagens(){
      if(qtdeMensagens === null){
        setQtdeMensages(await contarMensagens())
      }
    }
    baixarMensagens();
  },[qtdeMensagens,setQtdeMensages])
  
 
  React.useEffect(()=>{
    let isCancelled = false;
    async function pegarMensagens(){
      dispatch({type:'LOADING'})
      if(!isCancelled){
        const docs = await mailBox.action()
        let auxMensagens = []
        docs.forEach(element => {
          auxMensagens = [...auxMensagens, {
            'id': element.id,
            ...element.data()}]
        });
        dispatch({type:'SUCCESS', payload: auxMensagens})
      }      
    }
    pegarMensagens();
    return ()=>{
      isCancelled = true     
    }
  },[refresh, mailBox.action])

  async function redirecionarAction(mensagem, action){
      if(!mensagem) return
      switch(action.action) {
      case 'UPDATE':
        await updateMsg(mensagem, action.data)
        if(Object.keys(action.data).includes('Star')) setQtdeMensages(null);
        if(action.refresh) setRefresh(!refresh);
        return
      case 'ARQUIVAR':
        await updateMsg(mensagem, action.data);
        setQtdeMensages(null)
        setRefresh(!refresh);
        return
      case 'DELETAR':
        await updateMsg(mensagem, action.data);
        setQtdeMensages(null)
        setRefresh(!refresh);
        return
      case 'DELETAR_DEFINITIVO':
        await deletarMsg(mensagem);
        setQtdeMensages(null)
        setRefresh(!refresh);
        return
      default:
        console.log('Não fiz nada')
    }
  }

  async function deletarMsg(mensagem){
    if(!mensagem) return;
    let deleteMsg = deleteMensagem;
    let ID = mensagem;

    if(Array.isArray(mensagem)){ //Se tiver mais de 1 msg selecionada
      if(mensagem.length === 1) 
        ID = mensagem[0].id;
      else
      deleteMsg = deleteMensagens;
    }else{
      ID = mensagem.id
    }

    try{
      await deleteMsg(ID);
    }catch(e){
      dispatch({type:'ERROR', error: e})
    }
  }

  async function updateMsg(mensagem, data){
    if(!mensagem) return;
    let updateData = updateMensagem;
    let ID = mensagem;

    if(Array.isArray(mensagem)){ //Se tiver mais de 1 msg selecionada
      if(mensagem.length === 1) 
        ID = mensagem[0].id;
      else
        updateData = updateMensagens;
    }else{
      ID = mensagem.id
    }

    try{
      await updateData(ID, data);
    }catch(e){
      dispatch({type:'ERROR', error: e})
    }
  }

  function mailBoxes(state, action){
    switch (action.type) {
      case 'CXENTRADA':
        return {
          action: cxEntrada,
          type: 'CXENTRADA'
        };
      case 'FAVORITOS':
        return {
          action: favoritos,
          type: 'FAVORITOS'
        };
      case 'LIXEIRA':
        return {
          action: lixeira,
          type: 'LIXEIRA'
        };
      case 'ARQUIVO':
        return {
          action: arquivados,
          type: 'ARQUIVO'
        };
      default:
        return state
    }
  }

  function reducer(state, action){
    switch (action.type) {
      case 'LOADING':
        return {
          loading: true,
          error: null,
          content: null,
          ready: false
        };
      case 'SUCCESS':
        return {
          loading: false,
          error: null,
          content: action.payload,
          ready: true
        };
      case 'ERROR':
        return {
          loading: false,
          error: action.error,
          content: [],
          ready: false
        };
      default:
        return state
    }
  }
  
  return {state, dispatch, redirecionarAction, qtdeMensagens, refresh, setRefresh, setMailBox, mailBox}
}

export default MensagemActions