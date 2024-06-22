import React from "react";
import { AuthContext } from "../auth/AuthContext";
import { loginAccount } from "../services/api";

function LoginPage() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { setToken } = React.useContext(AuthContext); // Adjusted this line to destructure the context correctly

    const login = async () => {
        const resp = await loginAccount({ username: username, password: password });

        if (resp) {
            await setToken(resp.token);
        } else {
            console.log(resp);
        }
    }

    return (
        <>
            <h1>Login</h1>
            <input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="Username" />
            <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
            <button onClick={login}>Login</button> {/* Added text inside the button */}
        </>
    );
}

export { LoginPage };
