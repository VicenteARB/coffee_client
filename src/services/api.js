const API_BASE_URL = 'http://localhost:8080/api';

export async function loginAccount(login) {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(login),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getUserList = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener la lista de usuarios');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user list:', error);
        throw error;
    }
};

export const registerAccount = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Error al crear la cuenta');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering account:', error);
        throw error;
    }
};

export const updateUser = async (username, userData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/update/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const addCoffee = async (coffeeData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/coffee/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(coffeeData),
        });

        if (!response.ok) {
            throw new Error('Error al crear el coffee');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error gestionando su solicitud', error);
        throw error;
    }
};

export const getCoffeeList = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/coffee/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener la lista de coffees');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error gestionando su solicitud', error);
        throw error;
    }
};

export const updateCoffee = async (id, userData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/coffee/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating coffee:', error);
        throw error;
    }
};

export const deleteCoffee = async (idCoffee, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/coffee/delete/${idCoffee}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }

        return response.text(); 
    } catch (error) {
        console.error('Error deleting coffee:', error);
        throw error;
    }
};

export const addTestimonial = async (testimonialData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/testimonials/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(testimonialData),
        });

        if (!response.ok) {
            throw new Error('Error al crear el reseña');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error gestionando su reseña', error);
        throw error;
    }
};
