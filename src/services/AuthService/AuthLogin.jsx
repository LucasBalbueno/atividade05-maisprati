export const login = (username, password) => {
    if (username === 'admin' && password === 'password') {
        const header = { alg: 'HS256', typ: 'JWT' };
        const payload = { username, exp: 300};
        const secret = 'secret-key';
        
        const base64 = (source) => {
            return btoa(String.fromCharCode(...new Uint8Array(source)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        }
        
        const createJWT = (header, payload, secret) => {
            const encodedHeader = base64(new TextEncoder().encode(JSON.stringify(header)));
            const encodedPayload = base64(new TextEncoder().encode(JSON.stringify(payload)));
            const signature = base64(new TextEncoder().encode(`${encodedHeader}.${encodedPayload}.${secret}`)); // Simulação de assinatura
            
            return `${encodedHeader}.${encodedPayload}.${signature}`;
        };
        
        const token = createJWT(header, payload, secret);
        
        localStorage.setItem('token', token);
        return true;
    }

    return false;
}

export const logout = () => {
    localStorage.removeItem('token');
};