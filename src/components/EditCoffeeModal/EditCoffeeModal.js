import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './EditCoffeeModal.css';

function EditCoffeeModal({ show, handleClose, product, handleSave, handleDelete, token }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
    }
  }, [product]);

  const saveProduct = () => {
    if (!name || !description || !price) {
      toast.warn("Por favor, completa todos los campos");
      return;
    }
    const updatedProduct = {
      ...product,
      name,
      description,
      price: parseFloat(price)
    };
    handleSave(updatedProduct, token); // Pasar el token al guardar
  };

  const deleteProduct = () => {
    handleDelete(product.idCoffee, token); // Pasar el token al eliminar
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <i className="bi bi-x-circle"></i> Cancelar
        </Button>
        <Button variant="danger" onClick={deleteProduct}>
          <i className="bi bi-trash"></i> Eliminar
        </Button>
        <Button className="edit-coffee" onClick={saveProduct}>
          <i className="bi bi-save"></i> Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCoffeeModal;
