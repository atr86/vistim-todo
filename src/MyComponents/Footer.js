import React from 'react'
//import './footer.css'
const Footer = () => {

  let footerstyle=
    {
    /*top: "92vh",*/
    /* left: 0; */
    bottom: "10 vh" ,
    position: "relative",
    width: "100%"
  }
  
  return (
    <footer className = "bg-dark text-light py-3"  style={footerstyle}>
      <p className="text-center">Copyright &copy; visualtimedtodo.com</p>
    </footer>
  )
}

export default Footer
