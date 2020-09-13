import React, { useEffect, useState } from 'react';
import './Sidebar.css'
import '../App.css'

import SidebarChat from "./SidebarChat"

import { useStateValue } from '../StateProvider'
import { IconButton } from "@material-ui/core"
import AvatarIcon from '@material-ui/icons/AccountCircle';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/SearchOutlined'
import db from '../firebase';

function Sidebar() {
        const [rooms, setRooms] = useState([]);
        const [{ user }, dispatch] = useStateValue();

        useEffect(() => {
            const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => 
                setRooms(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            );

            return () => {
                unsubscribe();
            }
        }, []);

        return (
            <div className="sidebar">
                    <div className="sidebar__header">
                        <IconButton><AvatarIcon src={user?.photoURL} className="material-icon-m" fontSize="large"/></IconButton>
                        <div className="sidebar__headerRight">
                            <IconButton><DonutLargeIcon className="material-icon-m"/></IconButton>
                            <IconButton><ChatIcon className="material-icon-m"/></IconButton>
                            <IconButton><MoreVertIcon className="material-icon-m"/></IconButton>
                        </div>
                    </div>
                    <div className="searchbar">
                    <div className="sidebar__searchContainer">
                        <SearchIcon className="material-icon-m"/>
                        <input placeholder="Search or start new chat" type="text" className="sidebar_input" />
                    </div>
                </div>
                <div className="sidebar__chats">
                        <SidebarChat addNewChat className="sidebarChat"/>
                        {rooms.map((room) => (
                            <SidebarChat key={room.id} id={room.id}
                            name={room.data.name} />
                        ))}
                </div>
            </div>
        );
}

export default Sidebar;