import React from 'react'
import styles from './MensagemModal.module.css'
import ContentCopySvg from '../../Assets/ContentCopySvg'
import useData from '../../Hooks/useData';
import useFirstLetter from '../../Hooks/useFirstLetter';
import StarSvg from './../../Assets/StarSvg'
import MensagemActions from '../../Services/MensagemActions'

const MensagemModal = ({setToast, msgSelecionada, media}) => {
  const {
    Mensagem: msg, 
    Nome: nome, 
    Email: email, 
    Star: star,
    Timestamp: timestamp
  } = msgSelecionada;
  const firstLetter = useFirstLetter();
  const {colocarData} = useData(timestamp.toDate().toLocaleDateString('pt-BR'),
    timestamp.toDate().toLocaleTimeString('pt-BR'));
  const [favorito, setFavorito] = React.useState(star);
  const {redirecionarAction} = MensagemActions()

  React.useEffect(()=>{
    async function updateNovaMsg(){
        const action = {
          action: 'UPDATE',
          data: {
            'New': false,
          }
        }
        await redirecionarAction(msgSelecionada, action)
    }
    updateNovaMsg()
  },[])


React.useEffect(()=>{
  async function updateFavorito(){
    if(favorito !== star){
      const action = {
        action: 'UPDATE',
        data: {
          'Star': favorito,
        }
      }
      await redirecionarAction(msgSelecionada, action)
      // console.log('FAVORITOFINAL',favorito,'STAR',star)

    }
  }
  updateFavorito()
},[favorito])

function copiarEmail(){
  window.navigator.clipboard.writeText(email)
  setToast({mensagem: 'Email copiado'})
}

  return (
    <>
      <section className={`${media ? styles.msgSectionMobile : styles.msgSection}`}>
      <header className={styles.msgHeader}>
        <span className={styles.msgLogo}>{firstLetter(nome)}</span>
        <div className={styles.msgInfo}>
          <p className={styles.msgNome} >{nome}</p>
          <p onClick={copiarEmail} className={styles.msgEmail}>{email} <ContentCopySvg /></p>
          <span className={styles.msgData}>{colocarData()}</span>
        </div>
        <span className={styles.msgStar} onClick={()=>setFavorito(!favorito)}>
          {favorito ? 
            <StarSvg color='#9C77B8' /> 
            : 
            <StarSvg/>
          }
        </span>
      </header>
      <div className={styles.msgBody}>
        {msg}
      </div>
    </section>
    </>
    
  )
}

export default MensagemModal