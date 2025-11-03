import { Box, Button, CardContent, styled, useMediaQuery } from "@mui/material";
import type { JournalResponse } from "../../types/response/JournalResponse";

import EchoCount from "./EchoCount";
import Echo from "./Echo";
import { JournalCondition, JournalInfo, JournalLocation, JournalLocationCard, JournalText, JournalTitle, JournalWrittenBy, MobileJournalTitle, MobileProfileCard, MobileProfileInfo, ProfileCard, ProfileInfo, ProfileJournalText, ProfileJournalTitle } from "./MuiJournalCards";
import { journalSound, onClickSound, playSound } from "../../sounds";
import { useAuth } from "../../hooks/AuthContext";
import { deleteJournal } from "../../api/JournalAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

type JournalCardProps = {
    journal: JournalResponse;
    onSelectJournal?: (journal: JournalResponse) => void;
    mode: string;
}

const JournalsButton = styled(Button)({
    minWidth: '0px',
    borderRadius: '0px',
    fontFamily: '"Russo One", sans-serif',
    backgroundColor: '#d31c1fa6',
    fontSize: '1vw',
})

function JournalCard({ journal, onSelectJournal, mode }: JournalCardProps) {

    const isMobile = useMediaQuery('(max-width:960px)');
    const { appUser } = useAuth();
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const { mutate } = useMutation<void, Error, number>({
        mutationFn: deleteJournal,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profileJournals', appUser?.appUserId] });
            queryClient.invalidateQueries({ queryKey: ['journals', journal.locationId] })
            enqueueSnackbar(`'${journal.title}' Journal Deleted Succesfully`, { autoHideDuration: 3000 });
        },

        onError: (err) => {
            console.log(err);
        }
    })

    const handleDelete = async (journalId: number) => {
        playSound(onClickSound)
        if (appUser) {
            try {
                mutate(journalId);
            } catch (error) {
                console.error(error);
            }
        }
    }



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
                        <CardContent style={{ position: "relative" }}>
                            <div>
                                <MobileProfileInfo gutterBottom variant="h5">
                                    <MobileJournalTitle>
                                        {journal.title}
                                    </MobileJournalTitle>

                                </MobileProfileInfo>
                                <JournalLocation style={{ paddingLeft: 0, fontSize: '.5rem' }}>
                                    written at {journal.locationName}
                                </JournalLocation>
                            </div>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                                <JournalsButton onClick={() => handleDelete(journal.journalId)} variant="contained">Trash</JournalsButton>
                            </Box>

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
                                <JournalLocation>
                                    written at {journal.locationName}
                                </JournalLocation>
                                <ProfileJournalText>
                                    {journal.text}
                                </ProfileJournalText>
                            </div>

                            <div style={{ marginTop: 15 }}>
                                <EchoCount journalId={journal.journalId} />
                            </div>
                            <div>

                            </div>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0 }}>
                                <JournalsButton onClick={() => handleDelete(journal.journalId)} variant="contained">Trash</JournalsButton>
                            </Box>

                        </CardContent>

                    </ProfileCard>


                </>
            )
        }

    }

}

export default JournalCard;