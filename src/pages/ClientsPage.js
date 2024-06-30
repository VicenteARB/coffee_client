import React, { useEffect, useState, useContext } from "react";
import { getUserList, updateUser } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";  
import './ClientsPage.css';
import EditUserModal from "../components/EditUserModal/EditUserModal";
import { toast } from "react-toastify";
import { AuthContext } from "../auth/AuthContext";

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { getToken } = useContext(AuthContext);
  const token = getToken();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsList = await getUserList(token);
        setClients(clientsList);
        console.log(clientsList);
      } catch (error) {
        console.error("Error fetching clients list:", error);
        setError("Error fetching clients list");
      }
    };

    fetchClients();
  }, [token]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      await updateUser(updatedUser.username, updatedUser, token);
      const updatedClients = clients.map(client =>
        client.username === updatedUser.username ? updatedUser : client
      );
      setClients(updatedClients);
      setShowModal(false);
      toast.success('Usuario actualizado con éxito');
    } catch (error) {
      toast.error('Error al actualizar el usuario. Por favor, intenta de nuevo.');
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Clientes</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead className="table-custom-header">
          <tr>
            <th scope="col">Usuario</th>
            <th scope="col">Email</th>
            <th scope="col">Deshabilitado</th>
            <th scope="col">Bloqueado</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.username}</td>
              <td>{client.email}</td>
              <td>
                <span className={`badge ${client.disabled ? 'bg-danger' : 'bg-success'}`}>
                  {client.disabled ? 'Sí' : 'No'}
                </span>
              </td>
              <td>
                <span className={`badge ${client.locked ? 'bg-danger' : 'bg-success'}`}>
                  {client.locked ? 'Sí' : 'No'}
                </span>
              </td>
              <td>
                <button 
                  className="btn edit-button btn-sm"
                  onClick={() => handleEditClick(client)}
                >
                  <i className="bi bi-pencil"></i> Gestionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <EditUserModal
          show={showModal}
          handleClose={handleModalClose}
          user={selectedUser}
          handleSave={handleSaveUser}
        />
      )}
    </div>
  );
}

export { ClientsPage };
