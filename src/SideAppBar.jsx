import React from 'react';
import {
    AppBar,
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery, Box, Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {createTheme} from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";
import { SvgIconComponent } from "@mui/icons-material"

const theme = createTheme();
function SideAppBar() {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (isMobile) {
        return null; // 모바일 환경에서는 아무 것도 반환하지 않음
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: '240px',
                height: '100vh',
                flexDirection: 'column',
                top: 0,
                left: 0,
                background: 'linear-gradient(25deg, #ffd9e2 0%, #f3d0bf 26%, #eeeeee 75%)',
            }}
        >
            <Toolbar>
                <Typography
                    variant="h4"
                    sx={{fontWeight: "bold"}}
                    style={{
                        marginTop: '20px',
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // 그라데이션 설정
                        '-webkit-background-clip': 'text',
                        'background-clip': 'text',
                        '-webkit-text-fill-color': 'transparent', // 웹킷 기반의 브라우저를 위해
                        color: 'transparent', // 텍스트 색상을 투명하게 하여 그라데이션만 보이게 함
                        fontFamily: 'Cafe24ssurround'
                    }}
                >
                    Se_soon
                </Typography>
            </Toolbar>
            <Toolbar>
                <Typography
                    variant={"h6"}
                    noWrap
                    style={{
                        marginTop: '20px',
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // 그라데이션 설정
                        '-webkit-background-clip': 'text',
                        'background-clip': 'text',
                        '-webkit-text-fill-color': 'transparent', // 웹킷 기반의 브라우저를 위해
                        color: 'transparent', // 텍스트 색상을 투명하게 하여 그라데이션만 보이게 함
                    }}
                >
                    <svg width="24" height="18">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{stopColor: "#FE6B8B"}} />
                                <stop offset="100%" style={{stopColor: "#FF8E53"}} />
                            </linearGradient>
                        </defs>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z" fill="url(#gradient)"/>
                    </svg>

                    &nbsp;&nbsp;User
                </Typography>
            </Toolbar>
            <Toolbar>
                <Button
                    sx
                >
                    <LogoutIcon />
                    <td></td>
                    <td></td>
                    LogOut
                </Button>
            </Toolbar>
            {/* 추가로 필요한 메뉴 아이템들은 이곳에 추가 */}
        </AppBar>
    );
}

export default SideAppBar;
