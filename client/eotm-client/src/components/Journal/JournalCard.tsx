import { CardContent, useMediaQuery } from "@mui/material";
import type { JournalResponse } from "../../types/response/JournalResponse";

import EchoCount from "./EchoCount";
import Echo from "./Echo";
import { JournalCondition, JournalInfo, JournalLocationCard, JournalText, JournalTitle, JournalWrittenBy, MobileJournalTitle, MobileProfileCard, MobileProfileInfo, ProfileCard, ProfileInfo, ProfileJournalText, ProfileJournalTitle } from "./MuiJournalCards";
import { journalSound, playSound } from "../../sounds";

type JournalCardProps = {
    journal: JournalResponse;
    onSelectJournal?: (journal: JournalResponse) => void;
    mode: string;
}

function JournalCard({ journal, onSelectJournal, mode }: JournalCardProps) {

    const isMobile = useMediaQuery('(max-width:960px)');

    if (mode === "location") {
        return (
            <>

                <JournalLocationCard key={journal.journalId}>
                    <CardContent>
                        <div className="journal-card journal-content-div" onClick={() => {
                          onSelectJournal?.(journal)  
                          playSound(journalSound)
                        }}>
                            <JournalInfo gutterBottom variant="h5">
                                <JournalTitle>
                                    {journal.title}
                                </JournalTitle>
                                <JournalWrittenBy>
                                    written by {journal.username}
                                </JournalWrittenBy>
                            </JournalInfo>
                            <JournalText >
                                {journal.text}
                            </JournalText>
                            <JournalCondition>
                                Condition: {journal.createdStatus}
                            </JournalCondition>
                        </div>
                        <Echo journalId={journal.journalId}><EchoCount journalId={journal.journalId} /></Echo>
                    </CardContent>
                </JournalLocationCard>


            </>
        )
    } else {
        if (isMobile) {
            return (
                <>
                    <MobileProfileCard key={journal.journalId}>
                        <CardContent>
                            <div>
                                <MobileProfileInfo gutterBottom variant="h5">
                                    <MobileJournalTitle>
                                        {journal.title}
                                    </MobileJournalTitle>
                                </MobileProfileInfo>

                            </div>

                            <div className="mobile-echo">
                                <EchoCount journalId={journal.journalId} />
                            </div>

                        </CardContent>

                    </MobileProfileCard>


                </>
            )
        } else {
            return (
                <>
                    <ProfileCard key={journal.journalId} >
                        <CardContent>
                            <div>
                                <ProfileInfo gutterBottom variant="h5">
                                    <ProfileJournalTitle>
                                        {journal.title}
                                    </ProfileJournalTitle>
                                </ProfileInfo>
                                <ProfileJournalText>
                                    {journal.text}
                                </ProfileJournalText>
                            </div>

                            <div style={{ marginTop: 15 }}>
                                <EchoCount journalId={journal.journalId} />
                            </div>

                        </CardContent>

                    </ProfileCard>


                </>
            )
        }

    }

}

export default JournalCard;