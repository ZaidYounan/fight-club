import React from 'react'
import './ContactView.css'
import '../App.css'

function ContactView() {
    return (
        <div className="contact-container">
            <div className="row row-margin-bottom info-container">
                <h1>For any enquiries:</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel ligula metus.</p>
                <p>Etiam laoreet ac tortor quis sodales. In vitae efficitur ipsum, et imperdiet tellus.</p>
                <p>Integer id mauris scelerisque lorem commodo rutrum sit amet vel libero. Etiam nec hendrerit lectus.</p>
                <p>Praesent et ante ex. Fusce nibh tellus, consequat nec justo sit amet, scelerisque fringilla leo.</p>
                <p>Cras rhoncus ipsum urna, et pulvinar nibh ornare rhoncus. Donec arcu elit, rutrum vitae turpis ut, cursus vehicula tortor.</p>
            </div>
            <div className="col-md-1 image-container">
            </div>
        </div>
    )
}

export default ContactView
