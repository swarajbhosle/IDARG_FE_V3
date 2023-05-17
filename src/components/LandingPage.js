import React from "react";
import '../assets/style/LandingPage.css';

import { logoImage, personImage, shapeImage, registrFormbg } from "../imports.js"

const LandingPage = () => {
    return (
        <div class="big-wrapper light">
            <img src={shapeImage} alt="" class="shape" />
            <header>
                <div class="container">
                    <div class="logo">
                        <a href="/"><img src={logoImage} alt="Logo" /></a>
                        <a href="/"><h3>IDARG</h3></a>
                    </div>

                    <div class="links">
                        <ul>
                            <li><a href="/companylogin">Are you hiring?</a></li>
                            <li><a href="/aboutus">About Us</a></li>
                            <li><a href="/contactus">Contact Us</a></li>
                            {/* change this login button */}
                            <li><a href="/studentlogin" class="btn">Login</a></li>
                            <li>
                                <button class="toggle-btn">
                                    <i class="far fa-moon"></i>
                                    <i class="far fa-sun"></i>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div class="overlay"></div>

                    <div class="hamburger-menu">
                        <div class="bar"></div>
                    </div>
                </div>
            </header>

            <div class="showcase-area">
                <div class="container">
                    <div class="left">
                        <div class="big-title">
                            <h1>Intelligent Document Analysis and </h1>
                            <h1>Report Generation</h1>
                        </div>
                        <p class="text">
                            Just post your resume here to increase your chances of getting noticed by an employer and help the employer to find and hire top talent"
                        </p>
                        <div class="cta">
                            <a href="/uploadresume" class="btn">Upload your resume</a>
                        </div>
                        {/* <div class="pass"><a href="#">go to dashboard</a></div> */}
                        {/* <div class="pass"><a href="/morbhaisite">Mor Bhai Site</a></div> */}
                    </div>

                    <div class="right">
                        <img src={personImage} alt="Person Image" class="person" />
                    </div>
                </div>
            </div>

            {/* <div class="bottom-area">
        <div class="container">
          <button class="toggle-btn">
            <i class="far fa-moon"></i>
            <i class="far fa-sun"></i>
          </button>
        </div>
      </div>  */}
        </div>
    )
}

export default LandingPage