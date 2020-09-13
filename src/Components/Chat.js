import React, { useEffect, useState } from 'react'
import './Chat.css'

import { Avatar, IconButton } from "@material-ui/core"
import { useParams } from "react-router-dom"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/SearchOutlined'
import AttachIcon from '@material-ui/icons/AttachFile'
import InsertEmojiIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import db from '../firebase'
import { useStateValue } from '../StateProvider'
import firebase from "firebase"

function Chat() {
    const[input, setInput] = useState("");
    const[seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessage] = useState([]);
    const [{ user }, dispath] = useStateValue();

    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name))
            )
            db
                .collection('rooms')
                .doc(roomId).collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => (
                    setMessage(snapshot.docs.map(doc => doc.data()))
                ))
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    },[]);

    //Send message function
    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typed: ' + input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} className="sidebarChat__avatar"></Avatar>

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}{
                        new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>

                <div className="chat__chatHeaderRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div> 

            <div className="chat__body">
                {messages.map(message => (
                <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                    <span className="chat__name">
                        {message.name}
                    </span> 
                        {message.message}
                    <p className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </p>
                </p>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmojiIcon className="material-icon-m chat__footerIcon"/>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Send a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon className="material-icon-m chat__footerIcon"/>
            </div>                
        </div>
    )
}

export default Chat
