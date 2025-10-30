import { useQuery } from "@tanstack/react-query";
import { findByLocationOrdered } from "../../api/JournalAPI";
import { useParams } from "react-router-dom";
import type { JournalResponse } from "../../types/response/JournalResponse";
import JournalCard from "./JournalCard";
import { useState } from "react";
import { Pagination, Stack } from "@mui/material";
import { onClickSound, playSound } from "../../sounds";

type JournalListProps = {
    onSelectJournal: (journal: JournalResponse) => void;
}


const ITEMS_PER_PAGE = 5;


function JournalList({ onSelectJournal }: JournalListProps) {

    const { id } = useParams();
    const locationId = Number(id);
    const [page, setPage] = useState(1);
    const { data, error, isSuccess } = useQuery({
        queryKey: ["journals", locationId],
        queryFn: () => findByLocationOrdered(locationId),
        enabled: !isNaN(locationId)
    })

    if (!isSuccess) return <div>Loading...</div>;
    if (error) return <div>Error loading journals</div>;

    if (data.length === 0) {
        return (<p className="journal-results russo">No Journals Found</p>)
    }

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const currentPageData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    return (
        <><Stack sx={{ height: '90%' }} spacing={2} alignItems="center" marginTop={2}>
            {/*---------------> Clean this up <-----------------*/}
            <span className="journal-results russo">{data.length} Journals Found</span>
            <div className="journal-list">
                {currentPageData.map((journal) => (

                    <div style={{ padding: 15 }}>
                        <JournalCard mode="location" onSelectJournal={onSelectJournal} journal={journal} />
                    </div>

                ))}
            </div>

            <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => {
                  setPage(value)  
                  playSound(onClickSound)
                } }
                color="primary"
                showFirstButton
                showLastButton
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: '#d31c20',             
                        fontFamily: '"Russo One", sans-serif',
                        fontSize: '1rem',
                        border: '1px solid #cfcfd1',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        '&.Mui-selected': {
                            backgroundColor: '#d31c20', 
                            color: '#cfcfd1',
                        },
                        '&:hover': {
                            backgroundColor: '#d31c1f79',
                        },
                    },
                }}
            />
        </Stack>

        </>


    )


}

export default JournalList;