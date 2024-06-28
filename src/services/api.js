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

export const getUserList = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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


export const updateUser = async (username, userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/update/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
