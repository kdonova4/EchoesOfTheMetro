import { Box, useMediaQuery } from "@mui/material";
import type { JournalResponse } from "../../types/response/JournalResponse";
import './journal.css'
import { useEffect, useRef, useState } from "react";


type JournalViewerProps = {
    journal: JournalResponse | null
}

function JournalViewer({ journal }: JournalViewerProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [showText, setShowText] = useState(false);
    const isMobile = useMediaQuery('(max-width:960px)');
    useEffect(() => {
        if (!journal) return;

        const elements = [imageRef.current, titleRef.current, contentRef.current];

        elements.forEach((el) => {
            if (!el) return;

            // Remove class to reset animation
            el.classList.remove("paper");

            // Trigger reflow to restart animation
            void el.offsetWidth;

            // Add class to play animation
            el.classList.add("paper");
        });
    }, [journal]); // runs every time journal prop changes


    if(isMobile) {
        if (!journal) {
        return (
            <>
                <Box sx={{ marginTop: 10, display: 'inline-block', transform: "translateZ(0)", height: 'auto', width: '100%' }}>

                <img
                    className="leather"
                    src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040543/journal-background_fxf7af.png"
                    alt="Journal"
                    style={{
                        scale: '1.2',
                        display: 'block',
                        borderRadius: 20,
                        maxWidth: '100%', // responsive scaling
                        height: 'auto',
                    }}
                />

                </Box>
            </>
        )
    }

    return (
        <>

            <Box sx={{ marginTop: 10, display: 'inline-block', transform: "translateZ(0)", height: 'auto', width: '100%', }}>

                <img
                    className="leather"
                    src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040543/journal-background_fxf7af.png"
                    alt="Journal"
                    style={{
                        scale: '1.2',
                        display: 'block',
                        borderRadius: 20,
                        maxWidth: '100%', // responsive scaling
                        height: 'auto',
                    }}
                />
                <Box
                    className="paper"
                    ref={imageRef}
                    sx={{
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        height: '100%',
                        width: '100%',  // percentage of the image width

                    }}
                >
                    <img

                        onLoad={() => setShowText(true)}
                        src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040531/worn-journal-3-smoothed_rhauhc.png"
                        alt="Journal"
                        style={{
                            position: 'absolute',

                            top: '-2%',
                            left: '1%',
                            scale: '.98',
                            display: 'block',
                            borderRadius: 20,
                            maxWidth: '100%', // responsive scaling
                            height: 'auto',
                        }}
                    />

                    <Box
                        sx={{
                            position: 'absolute',
                            top: '-3.2%',
                            left: '52%',
                            transform: 'translate(-50%, 0)',
                            width: '55%',  // percentage of the image width
                        }}
                    >

                        <h3 style={{
                            fontFamily: '"Rock Salt", cursive',
                            position: 'absolute',
                            top: '5%',
                            color: 'black',
                            opacity: showText ? 1 : 0,
                            left: '1%',
                            width: '100%',
                            height: '100%',
                            textAlign: 'center',
                            fontSize: '3vw'
                        }}>{journal.title}</h3>
                    </Box>



                    <Box
                        sx={{

                            position: 'absolute',
                            top: '8%',
                            left: '52%',
                            transform: 'translate(-50%, 0)',
                            height: '65%',
                            width: '68%',  // percentage of the image width

                        }}
                    >
                        <div style={{
                            fontFamily: '"Caveat", cursive',
                            position: 'absolute',
                            width: '100%',
                            opacity: showText ? 1 : 0,
                            height: '100%',
                            overflowY: 'auto',       // <--- makes it scrollable
                            background: 'transparent',
                            fontSize: '1.5rem',
                            color: '#000',
                            lineHeight: '1.5',
                            whiteSpace: 'pre-wrap',  // preserves line breaks
                            wordWrap: 'break-word',  // optional for spacing like notebook lines
                        }}>{journal.text}</div>

                    </Box>

                </Box>





            </Box>


        </>
    )


    } else {
        if (!journal) {
        return (
            <>
                <Box sx={{ marginTop: 10, display: 'inline-block', transform: "translateZ(0)", height: 'auto', width: '100%' }}>

                <img
                    className="leather"
                    src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040543/journal-background_fxf7af.png"
                    alt="Journal"
                    style={{
                        scale: '1.2',
                        display: 'block',
                        borderRadius: 20,
                        maxWidth: '100%', // responsive scaling
                        height: 'auto',
                    }}
                />

                </Box>
            </>
        )
    }

    return (
        <>

            <Box sx={{ marginTop: 10, display: 'inline-block', transform: "translateZ(0)", height: 'auto', width: '100%' }}>

                <img
                    className="leather"
                    src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040543/journal-background_fxf7af.png"
                    alt="Journal"
                    style={{
                        scale: '1.2',
                        display: 'block',
                        borderRadius: 20,
                        maxWidth: '100%', // responsive scaling
                        height: 'auto',
                    }}
                />
                <Box
                    className="paper"
                    ref={imageRef}
                    sx={{
                        position: 'absolute',
                        top: '0%',
                        left: '0%',
                        height: '100%',
                        width: '100%',  // percentage of the image width

                    }}
                >
                    <img

                        onLoad={() => setShowText(true)}
                        src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040531/worn-journal-3-smoothed_rhauhc.png"
                        alt="Journal"
                        style={{
                            position: 'absolute',

                            top: '-2%',
                            left: '1%',
                            scale: '.98',
                            display: 'block',
                            borderRadius: 20,
                            maxWidth: '100%', // responsive scaling
                            height: 'auto',
                        }}
                    />

                    <Box
                        sx={{
                            position: 'absolute',
                            top: '-1%',
                            left: '52%',
                            transform: 'translate(-50%, 0)',
                            width: '55%',  // percentage of the image width
                        }}
                    >

                        <h3 style={{
                            fontFamily: '"Rock Salt", cursive',
                            position: 'absolute',
                            top: '5%',
                            color: 'black',
                            opacity: showText ? 1 : 0,
                            left: '1%',
                            width: '100%',
                            height: '100%',
                            textAlign: 'center',
                            fontSize: '1rem'
                        }}>{journal.title}</h3>
                    </Box>



                    <Box
                        sx={{

                            position: 'absolute',
                            top: '8%',
                            left: '52%',
                            transform: 'translate(-50%, 0)',
                            height: '65%',
                            width: '68%',  // percentage of the image width

                        }}
                    >
                        <div style={{
                            fontFamily: '"Caveat", cursive',
                            position: 'absolute',
                            width: '100%',
                            opacity: showText ? 1 : 0,
                            height: '100%',
                            overflowY: 'auto',       // <--- makes it scrollable
                            background: 'transparent',
                            fontSize: '1.5rem',
                            color: '#000',
                            lineHeight: '1.5',
                            whiteSpace: 'pre-wrap',  // preserves line breaks
                            wordWrap: 'break-word',  // optional for spacing like notebook lines
                        }}>{journal.text}</div>

                    </Box>

                </Box>





            </Box>


        </>
    )
    }

    
}

export default JournalViewer;