import "./Footer.css";
import React from 'react'

function Footer() {
  return (
    <footer>
        <div className="container">
            <div className='footer-text'>
                <div>
                <span className="symbol-color">&lt; </span> 
                <span>PassKee</span>
                <span className="symbol-color">per / &gt;</span>  
                </div>
            </div>
            <div className="copyright1">
                <span>Copyright &copy; 2024 PassKeeper</span>
            </div>
            <ul className="icons">
              <li className="li-icon"><a href="https://github.com/parashar365D" target="blank"><lord-icon src="https://cdn.lordicon.com/uvqdhrsk.json" trigger="hover" stroke="bold"></lord-icon></a></li>
              <li className="li-icon"><a href="https://in.linkedin.com/in/chetan-parashar-374a64243" target="blank"><lord-icon src="https://cdn.lordicon.com/mdyiqybm.json" trigger="hover" stroke="bold"></lord-icon></a></li>
            </ul>
            <div className="copyright2">
                <span>Copyright &copy; 2024 PassKeeper</span>
            </div>
        </div>
    </footer>
  )
}

export default Footer
