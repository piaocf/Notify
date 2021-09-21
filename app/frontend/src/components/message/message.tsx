import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { getOfflineDb } from "../../services/localdb";
import { MessageType } from "../../types/messagetype";

import { format } from 'timeago.js';

import Chips from 'preact-material-components/Chips';
import 'preact-material-components/Chips/style.css';
import 'preact-material-components/Theme/style.css';

import Elevation from 'preact-material-components/Elevation';
import 'preact-material-components/Elevation/style.css';

import style from "./message.css";

type MessageProps = {
    message: MessageType;
}

function timestampToString(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

const Message: FunctionalComponent<MessageProps> = ({ message }: MessageProps) => {
    const [receiveTimeStamp, setReceiveTimestamp] = useState(format(message.receivedAt));

    useEffect(() => {
        const id = setInterval(() => setReceiveTimestamp(format(message.receivedAt)), 1000);
        return () => clearInterval(id);
    });

    // todo:
    // - add a delete button
    // - add a read status indicator
    // - add a icon option
    // - add a show more option on to many tags

    return (
        <div>
            <Elevation z={1}>
                <div class={style.message}>
                    <h1 class={style.messagetitle}>{message.title}</h1>
                    <p class={style.messagetime} title={timestampToString(message.receivedAt)}>{receiveTimeStamp}</p>
                    <div class={style.messagebody}>{message.body}</div>
                    <Chips class={style.messagetags}>
                        {message.tags.map((tag: string) => (<Chips.Chip>{tag as any}</Chips.Chip>) as any)}
                    </Chips>
                </div>
            </Elevation>
        </div>)
}

export default Message;