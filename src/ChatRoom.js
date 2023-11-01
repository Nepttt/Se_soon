import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import ChatBox from './ChatBox';
import SideAppBar from "./SideAppBar";
import {
    Box,
    IconButton,
    LinearProgress,
    Menu,
    MenuItem,
    Paper,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import './Chat.css';
import './api/message.servive.ts'
import {SendMessageToAI} from "./api/message.servive";

const dayjs = require('dayjs');


function ChatRoom({ chatRooms }) {
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [progress, setProgress] = useState(0); // 진척도 상태
    const imageSrc = "./background-img.jpg"; // 이미지 URL 상태

    const currentRoom = chatRooms.find(room => room.id === roomId);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const [anchorEl, setAnchorEl] = useState(null);
    let now = dayjs();
    let min = now.get('minute');
    let sec = now.get('second');


    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleFeature1 = () => {
        console.log("Feature 1 selected");
        handleMenuClose();
    };

    const handleFeature2 = () => {
        console.log("Feature 2 selected");
        handleMenuClose();
    };

    const fetchProgressFromBackend = async () => {
        // 실제 호감도 값을 가져오는 코드를 작성
        // 여기에서는 임시로 호감도 50% 설정
        const fetchedProgress = 50;
        setProgress(fetchedProgress);
    };


    const handleSendMessage = (content, sender) => {
        const newMessage = {
            content: content, // 실제 메시지 내용
            time: dayjs().format(`HH:mm`), // 메시지가 생성된 시간
            sender: 'user'
        };
        setMessages([...messages, newMessage]);

        // 여기에서 챗봇 API 호출 후, 응답을 받아서 챗봇의 메시지를 보냄.
        if(sender === 'user') {
            fetchChatbotResponse(content).then(response => {
                handleSendMessage(response, 'bot');
            });
        }
    };

    const fetchChatbotResponse = async (userMessage) => {
        return await SendMessageToAI(userMessage);
    };

    const handleBotMessage = (content) => {
        handleSendMessage(content, 'bot');
    };

    return (

        <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#f7f7f7"
            sx={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // 그라데이션 적용
            }}
            position='relative'
        >
            {isDesktop && <SideAppBar />}
            <Paper
                elevation={3}
                style={{
                    width: isMobile ? '90%' : '400px',
                    height: isMobile ? '90%' : '600px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    marginLeft: isMobile ? '0px' : '240px'
                }}
                sx={{
                    background: 'linear-gradient(25deg, #ffd9e2 0%, #f3d0bf 16%, #eeeeee 75%)',
                    borderRadius: '20px',
                }}
            >
                <br></br>
                {isMobile && (
                    <>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                            style={{ position: 'absolute', right: 10, top: 10, margin: '8px' }}
                        >
                            <MenuIcon fontSize={'large'}/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            sx={{
                                borderRadius: '50px',
                            }}
                        >
                            <MenuItem onClick={handleFeature1}><LogoutIcon />&nbsp;Logout</MenuItem>
                            <MenuItem onClick={handleFeature2}>Feature 2</MenuItem>
                        </Menu>
                    </>
                )}
                {/* 메시지 리스트 부분: flexGrow 속성으로 최대한 확장 */}'
                <br></br>
                <Box flexGrow={1} overflow="auto" mb={2} className="message-list" flexDirection="column">
                    {messages.map((message, index) => (
                        <Box key={index} mb={2} display="flex" flexDirection="column"
                             alignItems={message.sender === 'user' ? 'flex-end' : 'flex-start'}>
                            <Box className="message-bubble">
                                <Typography variant="body1" color={"white"}>{message.content}</Typography>
                            </Box>
                            <Typography variant="caption" color={"textSecondary"}>
                                {message.time} {/* 메시지가 생성된 시간을 표시 */}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* 메시지 입력 부분: 항상 아래에 위치 */}
                <ChatBox onSendMessage={handleSendMessage} />
            </Paper>

            <Box display="flex" flexDirection="column" marginLeft="20px" height={"640px"}>
                {/* 프로그레스 바 */}


                {/* 이미지 표시 부분 */}
                <Paper
                    elevation={3}
                    style={{ width: isMobile ? '90%' : '400px', padding: '20px' }}
                    sx={{ background: 'linear-gradient(25deg, #ffd9e2 0%, #f3d0bf 16%, #eeeeee 75%)', borderRadius: '20px' }}
                >
                    <Box width="100%" height="479px" mt={2}>
                        <img src={require(".//images/KakaoTalk_20231024_150637121.png")} alt="displayed-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {/* src에 세순이 캐릭터 넣어주세영 */}
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}

export default ChatRoom;
