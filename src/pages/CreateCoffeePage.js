import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateCoffeePage.css";
import EditCoffeeModal from "../components/EditCoffeeModal/EditCoffeeModal";
import { toast } from "react-toastify";

function CreateCoffeePage() {
  const [products, setProducts] = useState([
    { id: 1, name: "Café Espresso", description: "Café de alta calidad", price: 2.50, comment: "Popular" },
    { id: 2, name: "Café Americano", description: "Café suave y aromático", price: 2.00, comment: "Ligero" },
    { id: 3, name: "Café Latte", description: "Café con leche cremoso", price: 3.00, comment: "Favorito" },
  ]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = (updatedProduct) => {
    const updatedProducts = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setShowModal(false);
    toast.success('Producto actualizado con éxito');
  };

  return (
    <div className="container mt-5">
      <h1>Productos</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead className="table-custom-header">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
            <th scope="col">Comentario</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.comment}</td>
              <td>
                <button
                  className="btn edit-button btn-sm"
                  onClick={() => handleEditClick(product)}
                >
                  Gestionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProduct && (
        <EditCoffeeModal
          show={showModal}
          handleClose={handleModalClose}
          product={selectedProduct}
          handleSave={handleSaveProduct}
        />
      )}
    </div>
  );
}

export { CreateCoffeePage };
