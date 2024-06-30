import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutUs.css";
import companyImage1 from "../img/companyImage.jpg";
import companyImage2 from "../img/companyImage2.jpg";
import creator1Image from "../img/user1.png";
import creator2Image from "../img/user2.jpg";
import { useState, useEffect } from "react";

function AboutUs() {
  const images = [companyImage1, companyImage2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="container about-us-container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Sobre Nuestra Empresa</h2>
          <div className="image-container">
            <div className="image-slider" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
              {images.map((image, index) => (
                <img key={index} src={image} alt="Nuestra Empresa" className="img-fluid mb-3" />
              ))}
            </div>
          </div>
          <p>
            En Coffee, Chile nos dedicamos a proporcionar la mejor experiencia de café. Desde nuestros
            inicios, hemos trabajado arduamente para ofrecer productos de alta calidad, sostenibles y
            deliciosos.
          </p>
          <p>
            Nuestro objetivo es convertirnos en el lugar preferido de los amantes del café, ofreciendo
            un ambiente acogedor y una amplia variedad de productos para satisfacer todos los gustos.
          </p>
        </div>
        <div className="col-md-6">
          <h2>Desarrolladores</h2>
          <div className="card mb-4">
            <div className="row no-gutters">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Vicente Reyes</h5>
                  <p className="card-text">Ingeniero Civil Informático</p>
                  <p className="card-text">
                    <a href="https://github.com/VicenteARB" target="_blank" rel="noopener noreferrer">GitHub</a>
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <img src={creator1Image} alt="Creador 1" className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="card mb-4">
            <div className="row no-gutters">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Carlos Tapia</h5>
                  <p className="card-text">Ingeniero Civil Informático</p>
                  <p className="card-text">
                    <a href="https://github.com/Crlsljndr" target="_blank" rel="noopener noreferrer">GitHub</a>
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <img src={creator2Image} alt="Creador 2" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AboutUs };
