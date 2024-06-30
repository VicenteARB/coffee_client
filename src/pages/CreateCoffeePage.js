import React, { useState, useEffect, useContext } from "react";
import { getCoffeeList, addCoffee, updateCoffee, deleteCoffee } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";  
import "./CreateCoffeePage.css";
import EditCoffeeModal from "../components/EditCoffeeModal/EditCoffeeModal";
import AddCoffeeModal from "../components/AddCoffeeModal/AddCoffeeModal";
import { toast } from "react-toastify";
import { AuthContext } from "../auth/AuthContext";

function CreateCoffeePage() {
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsList = await getCoffeeList(token);
        setProducts(productsList);
      } catch (error) {
        setError("Error al obtener la lista de productos");
      }
    };

    fetchProducts();
  }, [token]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = async (updatedProduct) => {
    try {
      await updateCoffee(updatedProduct.idCoffee, updatedProduct, token);
      const updatedProducts = products.map(product =>
        product.idCoffee === updatedProduct.idCoffee ? updatedProduct : product
      );
      setProducts(updatedProducts);
      setShowEditModal(false);
      toast.success('Producto actualizado con éxito');
    } catch (error) {
      toast.error('Error al actualizar el producto. Por favor, intenta de nuevo.');
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const addedProduct = await addCoffee(newProduct, token);
      setProducts([...products, addedProduct]);
      setShowAddModal(false);
      toast.success('Producto agregado con éxito');
    } catch (error) {
      toast.error('Error al agregar el producto. Por favor, intenta de nuevo.');
    }
  };

  const handleDeleteProduct = async (idCoffee) => {
    try {
      await deleteCoffee(idCoffee, token);
      const updatedProducts = products.filter(product => product.idCoffee !== idCoffee);
      setProducts(updatedProducts);
      setShowEditModal(false);
      toast.success('Producto eliminado con éxito');
    } catch (error) {
      toast.error('Error al eliminar el producto. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <h1 className="mr-3">Productos</h1>
        <button className="btn add-coffee ml-3" onClick={handleAddClick}>
          <i className="bi bi-plus-circle"></i> Agregar Producto
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead className="table-custom-header">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.idCoffee}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price.toFixed(0)}</td>
              <td>
                <button
                  className="btn edit-button btn-sm"
                  onClick={() => handleEditClick(product)}
                >
                  <i className="bi bi-pencil"></i> Gestionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProduct && (
        <EditCoffeeModal
          show={showEditModal}
          handleClose={handleModalClose}
          product={selectedProduct}
          handleSave={handleSaveProduct}
          handleDelete={handleDeleteProduct}
          token={token} 
        />
      )}
      <AddCoffeeModal
        show={showAddModal}
        handleClose={handleModalClose}
        handleSave={handleAddProduct}
        token={token} 
      />
    </div>
  );
}

export { CreateCoffeePage };
