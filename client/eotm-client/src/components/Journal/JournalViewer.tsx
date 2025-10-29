import { Box, styled, useMediaQuery } from "@mui/material";
import type { JournalResponse } from "../../types/response/JournalResponse";
import { useEffect, useRef, useState } from "react";


type JournalViewerProps = {
    journal: JournalResponse | null
}

const ViewerContainer = styled(Box)({
    marginTop: '65px',
    display: 'inline-block',
    transform: "translateZ(0)",
    height: 'auto',
    width: '100%'
})

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
    }, [journal]); 


    if (isMobile) {
        if (!journal) {
            return (
                <>
                    <ViewerContainer>

                        <img
                            className="leather background-img"
                            src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040543/journal-background_fxf7af.png"
                            alt="Journal"
                            style={{
                                scale: '1.2'
                            }}
                        />

                    </ViewerContainer>
                </>
            )
        }

        return (
            <>

                <ViewerContainer>

                    <img
                        className="leather background-img"
                        src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040543/journal-background_fxf7af.png"
                        alt="Journal"
                        style={{
                            scale: '1.2'
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
                            width: '100%',  
                        }}
                    >
                        <img
                            onLoad={() => setShowText(true)}
                            src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040531/worn-journal-3-smoothed_rhauhc.png"
                            alt="Journal"
                            className="journal-viewer-page-img"
                            style={{ scale: '.98' }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                top: '-3.2%',
                                left: '52%',
                                transform: 'translate(-50%, 0)',
                                width: '55%',
                            }}
                        >

                            <h3 className="rock-salt journal-viewer-title-mobile" style={{ opacity: showText ? 1 : 0 }}>{journal.title}</h3>
                        </Box>



                        <Box
                            sx={{

                                position: 'absolute',
                                top: '8%',
                                left: '52%',
                                transform: 'translate(-50%, 0)',
                                height: '65%',
                                width: '68%', 

                            }}
                        >
                            <div className="journal-viewer-text caveat" style={{ opacity: showText ? 1 : 0 }}>{journal.text}</div>

                        </Box>

                    </Box>





                </ViewerContainer>


            </>
        )


    } else {
        if (!journal) {
            return (
                <>
                    <ViewerContainer>

                        <img
                            className="leather background-img"
                            src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040543/journal-background_fxf7af.png"
                            alt="Journal"
                            style={{
                                scale: '1.2'
                            }}
                        />

                    </ViewerContainer>
                </>
            )
        }

        return (
            <>

                <ViewerContainer>

                    <img
                        className="leather background-img"
                        src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040543/journal-background_fxf7af.png"
                        alt="Journal"
                        style={{
                            scale: '1.2'
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
                            width: '100%', 

                        }}
                    >
                        <img
                            onLoad={() => setShowText(true)}
                            src="https://res.cloudinary.com/dhucaqc0o/image/upload/v1760040531/worn-journal-3-smoothed_rhauhc.png"
                            alt="Journal"
                            className="journal-viewer-page-img"
                            style={{ scale: '.98' }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                top: '-1%',
                                left: '52%',
                                transform: 'translate(-50%, 0)',
                                width: '55%',
                            }}
                        >

                            <h3 className="rock-salt journal-viewer-title" style={{ opacity: showText ? 1 : 0 }}>{journal.title}</h3>
                        </Box>



                        <Box
                            sx={{

                                position: 'absolute',
                                top: '8%',
                                left: '52%',
                                transform: 'translate(-50%, 0)',
                                height: '65%',
                                width: '68%',

                            }}
                        >
                            <div className="caveat journal-viewer-text" style={{ opacity: showText ? 1 : 0 }}>{journal.text}</div>

                        </Box>

                    </Box>





                </ViewerContainer>


            </>
        )
    }


}

export default JournalViewer;