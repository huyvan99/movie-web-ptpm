import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // Sử dụng useState để quản lý trạng thái email và password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Xử lý sự kiện khi người dùng submit form
    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn form được gửi đi theo cách mặc định

        // Gửi yêu cầu đăng nhập đến API
        try {
            const response = await axios.post('/api/login', {
                email,
                password,
            });

            // Xử lý phản hồi từ API
            if (response.status === 200) {
                // Nếu đăng nhập thành công, điều hướng người dùng đến trang mong muốn
                navigate('/dashboard');
            } else {
                console.log('Login failed:', response.data.message);
            }
        } catch (error) {
            console.log('An error occurred during login:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
