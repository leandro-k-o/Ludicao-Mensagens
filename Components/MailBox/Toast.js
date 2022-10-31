import React from 'react'

const Toast = ({mensagem, media}) => {
  return (
    <div className={`${media ? 'toastMobile' : 'toast'}`}>{mensagem}</div>
  )
}

export default Toast