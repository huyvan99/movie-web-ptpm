import React from "react"
import { homeData } from "../../dummyData"
import "./footer.css"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container'>
          <div className='box'>
            <ul className='flex'>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li><a href="#">Privacy-Policy</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Watch List</a></li>
            </ul>
            <p style={{ fontSize: '14px' }}>© 2024 <span style={{ color: 'red', fontSize: '14px' }}>HUS Film Recommender</span>. All Rights Reserved. All content on this platform is for educational purposes only. No copyright infringement intended. All materials used are for educational and demonstration purposes. Any similarity to real companies or products is purely coincidental.</p>
          </div>
          <div className='box'>
            <h3>Follow Us</h3>
            <i className='fab fa-facebook-f'></i>
            <i className='fab fa-twitter'></i>
            <i className='fab fa-github'></i>
            <i className='fab fa-instagram'></i>
          </div>
          <div className='box'>
            <h3>App Market</h3>
            <div className='img flexSB'>
              <img src='https://img.icons8.com/color/48/000000/apple-app-store--v3.png' />
              <span>App Store</span>
              <img src='https://img.icons8.com/fluency/48/000000/google-play.png' />
              <span>Google Play Store</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
