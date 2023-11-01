import React, { useState } from 'react';
import { Typography, Button, TextField, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.module.css';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signUp } from './api/auth.service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 스타일 임포트

const theme = createTheme();

const SignUpPage = () => {
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/");
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();

        try {
            const responseData = await signUp(name, email, password);
            if (responseData) {
                toast.success('회원가입 성공!', {
                    onClose: () => {
                        setTimeout( async () => {
                            await navigate("/");
                        }, 1000);
                    }
                });
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            toast.error('회원가입 실패');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer />
            <Grid container justifyContent="center" alignItems="center" className="container" position={"absolute"}>
                <Paper
                    elevation={3}
                    className="paper"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)',}}
                    sx={{
                        width: '400px',
                        padding: 10,
                        margin: 10,
                        borderRadius: 10
                    }}
                >
                    <Typography component="h1" variant="h5" style={{fontFamily: 'Cafe24ssurround'}}>
                        <b>회원가입</b>
                    </Typography>
                    <form onSubmit={handleSignUp}>
                        <TextField
                            label="이름"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            label="이메일"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                        />
                        <TextField
                            label="비밀번호"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                        />
                        <Button type="submit" variant="contained" color="primary" margin="normal" style={{fontFamily: 'Cafe24ssurroundAir'}} fullWidth>
                            가입하기
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={goToLogin} style={{fontFamily: 'Cafe24ssurroundAir'}}>
                                    이미 계정이 있으신가요? 로그인
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </ThemeProvider>
    );
};

export default SignUpPage;
