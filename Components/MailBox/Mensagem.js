import React from 'react'
import CheckSvg from '../../Assets/CheckSvg';
import StarSvg from '../../Assets/StarSvg'
import styles from './Mensagem.module.css'
import useFirstLetter from './../../Hooks/useFirstLetter'
import useData from '../../Hooks/useData';

const Mensagem = ({media, mensagem, actions:{lerMensagem, setChecked, uncheckAll, redirecionarAction},newOld}) => {
  const {
    Mensagem: msg, 
    Nome: nome, 
    Email: email, 
    Star: star, 
    New: newMsg,
    Timestamp: timestamp
  } = mensagem;
  const currentMessage = React.useRef(mensagem)
  const [favorito, setFavorito] = React.useState(star);
  const [novaMsg, setNovaMsg] = React.useState(newMsg);
  const [selected, setSelected] = React.useState(false);
  const [rotateBack, setRotateBack] = React.useState(false);
  const checkbox = React.useRef();
  const {colocarData} = useData(timestamp.toDate().toLocaleDateString('pt-BR'),
    timestamp.toDate().toLocaleTimeString('pt-BR'));
  const idUnico = gerarId();
  const firstLetter = useFirstLetter();

  React.useEffect(()=>{
    if(newOld.newOld !== null && selected){
      setNovaMsg(newOld.newOld)
      currentMessage.current.New = newOld.newOld
      newOld.setNewOld(null)
    }
  },[newOld.newOld, selected])

  React.useEffect(()=>{
    if(uncheckAll){
      let dados = {}
      if(selected){
        dados.action = 'REMOVE'
        dados.value = currentMessage.current
        checkbox.current.checked = false;
        setSelected(!selected)
        setRotateBack(true)
        setChecked(dados)
      }
    }
  },[uncheckAll, selected, setChecked])

  React.useEffect(()=>{
    async function updateFavorito(){
      if(favorito !== currentMessage.current.Star){
        const action = {
          action: 'UPDATE',
          data: {
          'Star': favorito,
          }
        }
        await redirecionarAction(currentMessage.current, action)
        currentMessage.current = {
          ...currentMessage.current,
          ...action.data
        }
      }
    }
    updateFavorito()
  },[favorito, star])
  
  
  function check() { 
    let dados = {}
    if(selected){
      dados.action = 'REMOVE'
      dados.value = currentMessage.current
    }else{
      dados.action = 'ADD'
      dados.value = currentMessage.current
    }
    setSelected(!selected)
    setChecked(dados)
  }

  function handleClick(){
    setNovaMsg(false)
    lerMensagem(currentMessage.current)
  }

  function trechoMsg(){
    return msg.slice(0,22) + '...'
    // return msg.slice(0,32) + '...'
  
  }

  function gerarId(){
    return (Math.random()*1000).toFixed() + (Math.random()*1000).toFixed()
  }

  function rotateCheckbox(){
    if(selected){
      setRotateBack(true)
    }else{
      setRotateBack(false)
    }
  }

  return (
    <>
      <input type="checkbox" ref={checkbox} className={styles.check} id={idUnico} onChange={check}/>
      <li className={`${novaMsg ? styles.newMsg : ''} ${styles.msgContainer}`}>
        <label onClick={rotateCheckbox} className={`${rotateBack ? styles.reverse : ''} ${selected ? styles.rotate : ''}  ${styles.logoMsg}`} htmlFor={idUnico}>{selected ? <CheckSvg /> : firstLetter(nome)} </label>
        <h3 onClick={handleClick} className={`${novaMsg ? styles.newText : ''} ${styles.nameTitle}`}>{nome}</h3>
        <span onClick={handleClick} className={`${novaMsg ? styles.newText : ''} ${styles.data}`}>{colocarData()}</span>
        <p onClick={handleClick} className={`${novaMsg ? styles.newText : ''} ${styles.email}`}>{email}</p>
        <span className={styles.star} onClick={()=>setFavorito(!favorito)}>
          {favorito ? 
            <StarSvg color='#9C77B8' /> 
            : 
            <StarSvg/>
          }
        </span>
        <p onClick={handleClick} className={styles.msg}>{trechoMsg()}</p>
      </li>
    </>
    
  )
}

export default Mensagem
