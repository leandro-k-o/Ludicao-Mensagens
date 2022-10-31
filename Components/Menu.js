import React from 'react'
import styles from './Menu.module.css'
import InboxSvg from '../Assets/InboxSvg'
import StarSvg from '../Assets/StarSvg'
import ArchiveSvg from '../Assets/ArchiveSvg'
import TrashSvg from '../Assets/TrashSvg'
import LogoutSVG from '../Assets/LogoutSVG'
import { AuthUserContext } from '../AuthUserContext'

const Menu = ({setMobileMenu, mobileMenu, media, mailBox, dataMailBox, setMailBox, qtdeMensagens}) => {

  const [mobileMenuClose, setMobileMenuClose] = React.useState(false);
  const {logout} = React.useContext(AuthUserContext)

  const nav = React.useRef();

  const fecharMenu = React.useCallback((e)=>{
    if(!media) return
    if(e){
      if(e.target === e.currentTarget){
        setMobileMenuClose(true)
        window.setTimeout(()=>{
          setMobileMenuClose(false)
          setMobileMenu(mob=>!mob)}, 200)
      } 
    }else{
      setMobileMenuClose(true)
        window.setTimeout(()=>{
          setMobileMenuClose(false)
          setMobileMenu(mob=>!mob)}, 280)
    }
  },[setMobileMenuClose])

  React.useEffect(()=>{
    const navBar = nav.current

    if(navBar){
      navBar.addEventListener('click',fecharMenu)
    }else return

    return ()=> navBar.removeEventListener('click',fecharMenu) 
  },[mobileMenu, fecharMenu])

  function caixaDeEntrada(){
    setMailBox({type:'CXENTRADA'})
    fecharMenu()
    dataMailBox.current = {
      cxentrada: true,
      favoritos: false,
      arquivados: false,
      lixeira: false
    }
  }
  
  function favoritos(){
    setMailBox({type:'FAVORITOS'})
    fecharMenu()
    dataMailBox.current = {
      cxentrada: false,
      favoritos: true,
      arquivados: false,
      lixeira: false
    }
  }

  function arquivo(){
    setMailBox({type:'ARQUIVO'})
    fecharMenu()
    dataMailBox.current = {
      cxentrada: false,
      favoritos: false,
      arquivados: true,
      lixeira: false
    }
  }

  function lixeira(){
    setMailBox({type:'LIXEIRA'})
    fecharMenu()
    dataMailBox.current = {
      cxentrada: false,
      favoritos: false,
      arquivados: false,
      lixeira: true
    }
  }

  return (
    <div className={`${mobileMenu ? styles.navActive : ''} ${media ? styles.navContainerMobile : styles.navContainer}`} ref={nav}>
      <nav className={`${mobileMenuClose ? styles.closeMenu : ''} ${mobileMenu ? styles.mobileMenuActive : ''} ${media ? styles.mobileMenu : styles.menu }`}>
        <span className={styles.navTitle}>Ludicão</span>
        <ul>
          <li className={`${mailBox.type === 'CXENTRADA' ? styles.active : ''}`} onClick={caixaDeEntrada}>
            <InboxSvg />Caixa de entrada<span>{qtdeMensagens ? qtdeMensagens.cxEntrada : ''}</span>
          </li>
          <li className={`${mailBox.type === 'FAVORITOS' ? styles.active : ''}`} onClick={favoritos}>
            <StarSvg stroke="#525252"/> Com estrela<span>{qtdeMensagens ? qtdeMensagens.favoritos : ''}</span>
          </li>
          <li className={`${mailBox.type === 'ARQUIVO' ? styles.active : ''}`} onClick={arquivo}>
            <ArchiveSvg /> Arquivados<span>{qtdeMensagens  ? qtdeMensagens.arquivados : ''}</span>
          </li>
          <li className={`${mailBox.type === 'LIXEIRA' ? styles.active : ''}`} onClick={lixeira}>
            <TrashSvg  /> Lixeira<span>{qtdeMensagens  ? qtdeMensagens.lixeira : ''}</span>
          </li>
        </ul>
        <div className={styles.logout} onClick={logout}>
          <LogoutSVG /> Sair
        </div>
      </nav>
    </div>   
  )
}

export default Menu