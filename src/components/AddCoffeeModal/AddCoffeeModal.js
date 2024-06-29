import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import './AddCoffeeModal.css';

function AddCoffeeModal({ show, handleClose, handleSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image64, setImage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveProduct = () => {
    if (!name || !description || !price) {
      toast.warn("Por favor, completa todos los campos");
      return;
    }
    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      image64
    };
    handleSave(newProduct);
    clearForm();
 
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setImage("");
  };

  const handleCloseModal = () => {
    clearForm();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción del producto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPrice" className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Precio del producto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formImage" className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
            />
            {image64 && (
              <div className="mt-3">
                <img src={image64} alt="Product Preview" className="img-thumbnail" />
              </div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={saveProduct}>
          Guardar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCoffeeModal;
