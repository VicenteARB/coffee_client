import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCoffeeList } from "../services/api";
import CoffeeCard from "../components/CoffeeCard/CoffeeCard";
import "./Coffees.css";
import { AuthContext } from "../auth/AuthContext";

function Coffees() {
  const { getToken } = useContext(AuthContext);
  const token = getToken();

  const [coffees, setCoffees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const coffeeList = await getCoffeeList(token);
        setCoffees(coffeeList);
        console.log(coffeeList);
      } catch (error) {
        setError("Error al cargar la lista de cafés");
      }
    };

    fetchCoffees();
  }, [token]);

  return (
    <div className="container mt-5">
      <h1 id="menu">Nuestros productos</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {coffees.map((coffee) => (
          <div className="col-md-3" key={coffee.idCoffee}>
            <CoffeeCard coffee={coffee} />
          </div>
        ))}
      </div>
    </div>
  );
}

export { Coffees };
