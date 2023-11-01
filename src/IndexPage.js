import React, { useState } from 'react';
import { Typography, Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { styled } from '@mui/material/styles'; // styled 함수를 가져옵니다.
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // react-router-dom에서 Link 컴포넌트 가져오기
import './App.module.css';
import { signIn } from './api/auth.service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 스타일 임포트
import './api/auth.service'

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 20, // 테두리를 둥글게 설정합니다.
        boxShadow: theme.shadows[24], // 테두리 그림자 효과를 적용합니다.
    },
}));

const IndexPage = () => {
    const navigate = useNavigate();
    const goToSign = () => {
        navigate("/sign_up")
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (event) => {
        event.preventDefault();

        try {
            const responseData = await signIn(email, password);
            console.log(responseData);
            if (responseData || responseData.status === 200) {
                // 백엔드에서 200 응답이 오면 로그인 성공으로 처리
                // 여기서는 responseData가 존재하고 응답 상태가 200일 때 성공으로 간주합니다.
                toast.success('로그인 성공!', {
                    onClose: () => {
                        setTimeout(async () => {
                            await navigate("/chat");
                        }, 1000);
                    }
                });
            } else {
                // responseData가 null이거나 응답 상태가 200이 아닌 경우 로그인 실패로 처리
                toast.error('로그인 실패');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            toast.error('로그인 실패');
        }
    };
    // 상태 변수 darkMode를 생성하고 기본값을 false로 설정합니다.
    const [darkMode, setDarkMode] = useState(false);
    const [open, setOpen] = useState(false);

    // 다크 모드와 라이트 모드를 위한 테마를 생성합니다.
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    // darkMode가 true이면 darkTheme을 사용하고, false이면 lightTheme을 사용합니다.
    const theme = darkMode ? darkTheme : lightTheme;

    // 다크 모드 토글 함수를 작성합니다.
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // 모달을 열고 닫는 함수
    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    // 모달 밖의 영역 클릭 시 모달 닫기 방지 함수
    const handleBackdropClick = (event) => {
        event.stopPropagation();
    };

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer />
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    height: '500px',
                    width: '1000px',
                    borderRadius: '40px',
                }}
            >
                <Typography
                    varient={"h1"}
                    style={{
                        fontSize: '40px',
                        fontWeight: 'bold',
                        fontFamily: 'Cafe24ssurround'
                    }}
                >
                    Welcome to Sesoon!
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    style={{
                        color: 'black'
                    }}
                >
                    <p style={{fontFamily: 'Cafe24ssurround'}}>여러분의 믿음직한 AI 연애 도우미 세순이입니다!</p>
                    <p style={{fontFamily: 'Cafe24ssurroundAir'}}>
                        <p>세순이와 함께 연애 스킬을 연습해보세요. 여러분의 행동에 따라 세순이의 성격이 변화됩니다.</p>
                        <p>여러분의 선택에 따라 어쩌면 사이가 더 돈독해질 수도, 더 나빠질 수도 있습니다.</p>
                        <p>로그인해서 여러분의 연애 스킬을 테스트하고 향상시켜보세요!</p>
                    </p>
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleModalOpen}
                    style={{
                        color: 'black', // Or whichever color you have set
                        width: '150px',            // Set your desired width here.
                        height: '50px',             // Set your desired height/length here.
                        background: 'linear-gradient(45deg, #88c3ff 44%, #db9cff 88%)',
                        borderRadius: '20px',
                        border: '3px solid',
                        borderColor: 'white',
                        fontFamily: 'Cafe24ssurroundAir'
                    }}
                    sx={{
                        m: 1
                    }}
                >
                    로그인
                </Button>
            </Box>
            <StyledDialog
                open={open}
                disableBackdropClick={true}  // Prevent closing the modal by clicking outside of it.
                disableEscapeKeyDown={true}  // Prevent closing the modal by pressing the escape key.
                BackdropProps={{
                    sx: {
                        background: `transparent`, // 배경에 그라데이션 적용
                        opacity: 0.5, // 그라데이션의 투명도 설정
                    },
                    onClick: handleBackdropClick,
                }}
                sx={{
                    borderRadius: 500, // 원하는 값으로 둥근 정도를 설정합니다.
                }}
            >
                <DialogContent sx={{ background: 'transparent' }}>
                    <Button onClick={handleModalClose} style={{ position: 'absolute', right: '10px', top: '10px' }}>X</Button>
                    <Typography component="h1" variant="h5" style={{fontFamily: 'Cafe24ssurround'}}>
                        로그인
                    </Typography>
                    <form onSubmit={handleSignIn} sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="사용자 이메일"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </form>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="로그인 유지"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSignIn}
                        style={{fontFamily: 'Cafe24ssurroundAir'}}
                    >
                        로그인
                    </Button> {/* 일단 로그인 버튼 누르면 채팅방으로 바로 넘어가게 설정했는데 나중에 토큰 받아서 넘기게 만들어주세요 */}
                    <Grid container>
                        <Grid item xs>
                            <Link href="" variant="body2" style={{fontFamily: 'Cafe24ssurroundAir'}}>
                                비밀번호 찾기
                            </Link>
                        </Grid>
                        <Grid item>
                            <Button onClick={goToSign} style={{fontFamily: 'Cafe24ssurroundAir'}}>
                                회원가입
                            </Button>
                        </Grid>
                    </Grid>
                    {/* 다크 모드 토글 스위치 */}
                    <FormControlLabel
                        className="custom-switch"
                        control={
                            <Switch
                                checked={darkMode}
                                onChange={toggleDarkMode}
                                name="darkModeToggle"
                                color="primary"
                                icon={
                                    <div
                                        sx={{
                                            fontSize: 20,
                                            width: 36,
                                            height: 18,
                                            borderRadius: 10,
                                            background: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`, // 그라데이션 적용
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Brightness4Icon sx={{ color: '#000' }} />
                                    </div>
                                }
                                checkedIcon={
                                    <div
                                        sx={{
                                            fontSize: 20,
                                            width: 36,
                                            height: 18,
                                            borderRadius: 10,
                                            background: `linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)`, // 그라데이션 적용
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Brightness7Icon sx={{ color: '#fff' }} />
                                    </div>
                                }
                            />
                        }
                        label={darkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
                        sx = {{ width: 'auto' }}
                    />
                </DialogContent>
            </StyledDialog>
        </ThemeProvider>
    );
};

export default IndexPage;