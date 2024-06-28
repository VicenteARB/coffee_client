import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import './EditUserModal.css';

function EditUserModal({ show, handleClose, user, handleSave }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setDisabled(user.disabled);
      setLocked(user.locked);
    }
  }, [user]);

  const saveChanges = () => {
    if (!username || !email) {
      toast.warn("Por favor, completa todos los campos");
      return;
    }
    const updatedUser = {
      ...user,
      username,
      email,
      disabled,
      locked
    };
    handleSave(updatedUser);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDisabled">
            <Form.Check
              type="checkbox"
              label="Deshabilitado"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="formLocked">
            <Form.Check
              type="checkbox"
              label="Bloqueado"
              checked={locked}
              onChange={(e) => setLocked(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button  className ="save-button" variant="primary" onClick={saveChanges}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
