import React from 'react'

function Alert(props) {
    const Captilize = (word)=>{
      if(word==="danger"){
        word = "error"
      }
        const lower = word.toLowerCase()
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    <div style = {{height:'50px'}}>
    {props.alert && <div className={`alert alert-${props.alert.typ} alert-dismissible fade show`} role="alert">
  <strong>{Captilize(props.alert.typ)}</strong>:{props.alert.msg}
</div>}
</div>
  )
}

export default Alert



