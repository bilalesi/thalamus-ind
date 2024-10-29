"use client";

import ReactPlayer from 'react-player/youtube'

export default function Video({ link }: { link: string }) {
    return (
        <ReactPlayer
            light
            url={link}
        />
    )
}