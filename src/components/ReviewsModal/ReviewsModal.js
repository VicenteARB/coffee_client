import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";  
import "./ReviewsModal.css";
import { addTestimonial } from "../../services/api";
import { AuthContext } from "../../auth/AuthContext"; 

function ReviewsModal({ show, handleClose, coffee }) {
  const [newTestimonial, setNewTestimonial] = useState("");
  const { getRoleAndUsername } = useContext(AuthContext);
  const userInfo = getRoleAndUsername();

  const handleAddTestimonial = async () => {
    if (!userInfo) {
      toast.warn("Debe iniciar sesión para dejar reseñas");
      return;
    }

    if (!newTestimonial) {
      toast.warn("Por favor, escribe una reseña antes de enviar.");
      return;
    }

    const testimonialData = {
      testimonial: newTestimonial,
      username: userInfo.username,
      idCoffee: coffee.idCoffee,
    };

    try {
      await addTestimonial(testimonialData);
      toast.success("Reseña agregada exitosamente");
      coffee.testimonials.push(testimonialData); // Actualiza las reseñas localmente
      setNewTestimonial("");
    } catch (error) {
      toast.error("Error al agregar la reseña. Por favor, intenta de nuevo.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Reseñas de {coffee.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {coffee.testimonials && coffee.testimonials.length > 0 ? (
          coffee.testimonials.map((testimonial, index) => (
            <div key={index} className="review-card mb-3">
              <div className="review-card-body d-flex">
                <i className="bi bi-person-circle me-3 review-icon" style={{ fontSize: "2rem" }}></i>
                <div>
                  <h5 className="review-card-title">{testimonial.username}</h5>
                  <p className="review-card-text">{testimonial.testimonial}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aún no hay reseñas, deja la tuya!</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Form.Control
          type="text"
          placeholder="Deja tu reseña aquí"
          value={newTestimonial}
          onChange={(e) => setNewTestimonial(e.target.value)}
        />
        <Button className="review-coffee" onClick={handleAddTestimonial}>
          <i className="bi bi-send"></i> Enviar
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          <i className="bi bi-x-circle"></i> Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewsModal;
