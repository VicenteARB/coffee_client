import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';  // Importa el archivo CSS para el Footer

function Footer() {
    return (
        <footer className="footer mt-auto py-3">
            <div className="container">
                <span>© 2024 Coffee, Chile.</span>
            </div>
        </footer>
    );
}

export { Footer };
