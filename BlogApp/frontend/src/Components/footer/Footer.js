import React from "react";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  return (
//     <body>
//     <footer>
//         <div class="footer-col">
//             <h4>Contact Us</h4>
//             <ul>
//                 <li><Link className="a">Email:Info@example.com</Link></li>
//                 <li><Link className="a">Phone:+121 56556 565556</Link></li>
//                 <li><Link className="a">Address:Your Address 123 street</Link></li>
              
//             </ul>
//         </div>
//         <div class="footer-col">
//             <h4>Quick Links</h4>
//             <ul>
//                 <li><Link to="" className="a">Home</Link></li>
//                 <li><Link to="" className="a">SingIn</Link></li>
//                 <li><Link to="" className="a">SingUp</Link></li>
//             </ul>
//         </div>
//         <div class="footer-col">
//             <ul>
//             <li><Link to="" className="a">About</Link></li>
//                 <li><Link to="" className="a">Legal</Link></li>
//             </ul>
//         </div>
//         <div class="footer-col">
//             <h4>follow us</h4>
//             <div class="links">
//             <ul class="social-icons">
//              <li ><a  className="a" to=""><i><FaFacebookF /></i></a></li>
//              <li ><a  className="a" to=""><i><FaXTwitter /></i></a></li>
//              <li ><a  className="a" to=""><i><FaInstagram /></i></a></li>
//              <li ><a  className="a" to=""><i><FaLinkedinIn></FaLinkedinIn></i></a></li>
//             </ul>
//             </div>
//         </div>
//     </footer>
//         <div class="bottom-bar">
//         <p>&copy; {new Date().getFullYear()} . All rights reserved</p> 
//     </div>
    
// </body>
<div className="main-footer">
<div className="container">
  <div className="row">
    {/* Column1 */}
    <div class="col">
             <h4>Contact Us</h4>
             <ul className="list-unstyled">
                 <li><Link className="nav-link">Email:blog@example.com</Link></li>
                 <li><Link className="nav-link">Phone:+1234567890</Link></li>
                 <li><Link className="nav-link">Address:Hyderabad</Link></li>
             </ul>
         </div>
    {/* Column2 */}
    <div class="col">
          <h4>Follow us on</h4>
             <div class="links">
             <ul className="list-unstyled">
              <li ><a  className="a" to=""><i><FaFacebookF /></i></a></li>
              <li ><a  className="a" to=""><i><FaXTwitter /></i></a></li>
              <li ><a  className="a" to=""><i><FaInstagram /></i></a></li>
              <li ><a  className="a" to=""><i><FaLinkedinIn></FaLinkedinIn></i></a></li>
            </ul>
        </div>
        </div>
    {/* Column3 */}
    <div class="col">
        <h4>Quick Links</h4>
             <ul>
                 <li><Link to="/Home" className="nav-link">Home</Link></li>
                <li><Link to="/signin" className="nav-link">SingIn</Link></li>
                 <li><Link to="/signup" className="nav-link">SingUp</Link></li>
            </ul>
         </div>
  </div>
  <hr />
  <div className="row">
    <p className="col-sm">
      &copy;{new Date().getFullYear()} THICC MEMES | All rights reserved |
      Terms Of Service | Privacy
    </p>
  </div>
</div>
</div>
  );
}

export default Footer;