import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";  
import "./CoffeeCard.css";
import ReviewsModal from "../ReviewsModal/ReviewsModal";

function CoffeeCard({ coffee }) {
  const [showReviewsModal, setShowReviewsModal] = useState(false);

  const handleShowReviews = () => setShowReviewsModal(true);
  const handleCloseReviews = () => setShowReviewsModal(false);

  return (
    <>
      <div className="card mb-4 coffee-card">
        <img src={coffee.image64} alt={coffee.name} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{coffee.name}</h5>
          <p className="card-text">{coffee.description}</p>
          <span className="badge badge-pill badge-primary price-label">${coffee.price.toFixed(0)}</span>
          <button className="btn testimonials-button" onClick={handleShowReviews}>
            <i className="bi bi-star"></i> Reseñas
          </button>
        </div>
      </div>
      <ReviewsModal show={showReviewsModal} handleClose={handleCloseReviews} coffee={coffee} />
    </>
  );
}

export default CoffeeCard;
