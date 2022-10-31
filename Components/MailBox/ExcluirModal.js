import React from 'react'
import styles from './ExcluirModal.module.css'
import AlertSvg from './../../Assets/AlertSvg'

const ExcluirModal = ({setModal, setDeleteConfirm}) => {
  
  function fecharModal({target, currentTarget}){
    if(target === currentTarget) setModal(null)
  }

  function cancelar(){
    setModal(null)
  }

  function confirmar(){
    setDeleteConfirm(true)
    setModal(null)
  }

  return (
    <div className={styles.modal} onClick={fecharModal}>
      <div className={styles.modalWindow}>
        <span className={styles.alert}>
        <AlertSvg />
        </span>
        <p className={styles.text}>Tem certeza que  deseja  excluir permanentenmente a mensagem?</p>
        <div className={styles.btnContainer}>
          <button onClick={confirmar}>SIM</button>
          <button onClick={cancelar}>CANCELAR</button>
        </div>
      </div>
    </div>
  )
}

export default ExcluirModal