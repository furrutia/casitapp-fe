import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

export const Login = ({ onLogin }) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user && pass) onLogin({ user });
    };

    // Decodifica el JWT manualmente para obtener el nombre
    const getNameFromJWT = (jwt) => {
        try {
            const payload = jwt.split('.')[1];
            const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
            return decoded.name || decoded.email || 'GoogleUser';
        } catch {
            return 'GoogleUser';
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: 400 }}>
            <h3 className="mb-4">Iniciar sesión</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        value={user}
                        onChange={e => setUser(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-2">Ingresar</button>
            </form>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    const name = getNameFromJWT(credentialResponse.credential);
                    onLogin({ user: name });
                }}
                onError={() => {
                    alert('Error al iniciar sesión con Google');
                }}
                width="100%"
            />
        </div>
    );
};