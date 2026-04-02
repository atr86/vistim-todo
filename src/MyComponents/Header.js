import React from 'react'
import {
  Link
} from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" >
      {/*style={{borderTop: "4px solid purple" , borderBottom: "4px solid purple", backgroundColor: "transparent" // This ensures the background doesn't hide the border
}} */}
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Vistim Todo</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
