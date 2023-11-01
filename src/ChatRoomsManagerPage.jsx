import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Menu, MenuItem } from '@mui/material';

function ChatRoomsManagerPage({ chatRooms, setChatRooms }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState('');

    const handleAddChatRoom = () => {
        const newRoom = {
            id: new Date().getTime().toString(),
            name: roomName
        };
        setChatRooms([...chatRooms, newRoom]);
        setRoomName('');
    };

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleNavigateToRoom = (roomId) => {
        navigate(`/chatroom/${roomId}`);
        handleCloseMenu();
    };

    return (
        <Box>
            <Button onClick={handleOpenMenu}>
                채팅방 관리
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                {chatRooms.map(room => (
                    <MenuItem key={room.id} onClick={() => handleNavigateToRoom(room.id)}>
                        {room.name}
                    </MenuItem>
                ))}
            </Menu>
            <Typography variant="h4">채팅방 관리</Typography>
            <TextField value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="채팅방 이름" />
            <Button onClick={handleAddChatRoom}>채팅방 추가</Button>
        </Box>
    );
}

export default ChatRoomsManagerPage;
