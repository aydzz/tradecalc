import React from 'react'
import testimonialImg from "../assets/img/testimonials-1.jpg"

export default function Testimonial(props) {
  return (
        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
            <img className="img-fluid rounded-circle mb-3" src={props.data.imageSrc} alt="..." />
            <h5>{props.data.name}</h5>
            <p className="font-weight-light mb-0">{props.data.text}</p>
        </div>         
  )
}
Testimonial.defaultProps = {
    data: {
        imageSrc: testimonialImg,
        name: "John D.",
        text: "This is fantastic! Thanks so much guys!"
    }
}
