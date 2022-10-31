import React from 'react'

const Error = ({error}) => {
  return (
    <p style={{'color':'red'}}>{error.message}</p>
  )
}

export default Error