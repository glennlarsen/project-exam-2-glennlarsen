import React from 'react'
import "./socialmedia.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const SocialMedia = ({ borderColor, color, size }) => {
    const style = {
        borderColor: borderColor,
        color: color,
        height: size + "px",
        width: size + "px",
    }

    return (
    <div className="social-media___content">
          <div style={style} className="social-media___content--circle"><FontAwesomeIcon icon={faFacebookF} /></div>
          <div style={style} className="social-media___content--circle"><FontAwesomeIcon icon={faInstagram} /></div>
          <div style={style} className="social-media___content--circle"><FontAwesomeIcon icon={faTwitter} /></div>
          <div style={style} className="social-media___content--circle"><FontAwesomeIcon icon={faLinkedinIn} /></div>
        </div>
        );
}

export default SocialMedia;