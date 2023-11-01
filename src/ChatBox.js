import React, { useState } from 'react';
import {TextField, Button, Box, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { SendMessageToAI } from './api/message.servive';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 스타일 임포트

function ChatBox({ onSendMessage }) {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() === '') {
            // 메시지가 비어있을 때 전송하지 않음
            return;
        }
       try {
        const responseData = await SendMessageToAI(message);
        if (responseData) {
            toast.success('메세지 보내기 성공!', {
            });
        }
    } catch (error) {
        console.error('Error during sign-up:', error);
        toast.error('메세지 보내기 실패');
    }
    };

    return (
        <form >
            <ToastContainer />
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <TextField
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="normal"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                            backgroundColor: 'white',
                            '& fieldset': {
                                borderColor: 'red',
                            },
                            '&:hover fieldset': {
                                borderColor: 'pink',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'purple',
                            },
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        background: "#999999",
                        borderRadius: '100%',
                        transition: '1s cubic-bezier(.47,1.64,.41,.8)',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                        },
                    }}
                    style={{
                        height: '64px',
                        width: '64px',
                        marginLeft: '8px',
                        marginTop: '8px'
                    }}
                >
                    <SendIcon />
                </Button>
            </Box>
        </form>
    );
}

export default ChatBox;
