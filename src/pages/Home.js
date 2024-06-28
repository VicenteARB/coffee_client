import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import banner from "../img/banner.jpg";
import beans from "../img/beans.jpg";
import machinery from "../img/machinery.jpg";
import sucursal from "../img/sucursal.jpg";

function Home() {
  return (
    <div className="container">
      <div className="row position-relative">
        <div className="col mainImage">
          <img src={banner} alt="Imagen principal" />
          <div className="animated-phrase">
            Descubre la magia del café en Coffee
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4 subImage d-flex justify-content-start">
          <div className="card">
            <div className="card-body">
              <img src={machinery} alt="Nuestras maquinas" />
              <h5 className="card-title">Nuestras máquinas</h5>
              <p className="card-text">
                Contamos con la tecnología más avanzada para el procesamiento
                del café. Nuestras máquinas aseguran la máxima calidad en cada
                grano.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 subImage d-flex justify-content-center">
          <div className="card">
            <div className="card-body">
              <img src={sucursal} alt="Nuestras sucursales" />
              <h5 className="card-title">Nuestras sucursales</h5>
              <p className="card-text">
                Visítanos en nuestras diversas sucursales alrededor del país.
                Encuentra el café perfecto cerca de ti y disfruta de una
                experiencia única.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 subImage d-flex justify-content-end">
          <div className="card">
            <div className="card-body">
              <img src={beans} alt="Nuestros granos" />
              <h5 className="card-title">Nuestros granos</h5>
              <p className="card-text">
                Seleccionamos los mejores granos de café de las mejores fincas.
                Cada grano es cuidadosamente seleccionado para garantizar el
                mejor sabor y aroma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Home };
