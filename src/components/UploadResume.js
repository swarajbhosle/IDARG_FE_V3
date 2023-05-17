import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/UploadResume.css"

import { logoImage, shapeImage, PROJECT_NAME } from "../imports";

const UploadResume = () => {

    const navigate = useNavigate();
    const [pdfFile, setPdfFile] = useState(null);
    const [base64Pdf, setBase64Pdf] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(pdfFile)
        setPdfFile(file);
        console.log(pdfFile)
        convertToBase64(file);
    };

    const convertToBase64 = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            console.log(base64Pdf)
            setBase64Pdf(base64String);
        };
        reader.readAsDataURL(file);
    };



    const handleSubmit = (event) => {
        event.preventDefault();

        // Make the POST request to the backend API
        // Replace 'YOUR_BACKEND_ENDPOINT' with the actual endpoint in your backend
        fetch('https://13.234.240.243.nip.io/upload-resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ base64: base64Pdf })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
                localStorage.setItem('data', JSON.stringify(data))
                navigate("/studentresumeinfo")
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    return (
        <div class="big-wrapper light">
            <img src={shapeImage} alt="" class="shape" />

            <header>
                <div class="container">
                    <div class="logo">
                        <a href="/"><img src={logoImage} alt="Logo" /></a>
                        <a href="/">
                            <h3>{PROJECT_NAME}</h3>
                        </a>
                    </div>

                    <div class="links">
                        <ul>
                            <li><a href="/companylogin">Are you hiring?</a></li>
                            <li><a href="/aboutus">About Us</a></li>
                            <li><a href="/contactus">Contact Us</a></li>
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
                <div class="container1">
                    <div class="wrapper">

                        <div class="title"><span>Upload Your Resume</span></div>
                        <form onSubmit={handleSubmit}>
                            <div class="row">
                                <input type="file" id="myfile" name="myfile" onChange={handleFileChange} />
                            </div>
                            <div class="row button">
                                <input type="submit" value="Submit File" />
                            </div>
                            {/* <div class="pass"><a href="/studentresumeinfo">Form</a></div> */}

                            {/* <!-- <div class="signup-link">Not a member? <a href="#">Signup now</a></div> --> */}
                        </form>
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

export default UploadResume

