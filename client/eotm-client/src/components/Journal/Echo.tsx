import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { createEcho, deleteEcho, findEchoById, findEchoForJournalAndUser } from "../../api/EchoAPI";
import type { EchoCreateRequest } from "../../types/create/EchoCreateRequest";
import { Button } from "@mui/material";
import type { EchoResponse } from "../../types/response/EchoResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type EchoProps = {
    journalId: number;
    children?: React.ReactNode;
}

function Echo({ journalId, children }: EchoProps) {

    const [echoed, setEchoed] = useState(false);
    const [echoId, setEchoId] = useState<number | null>(null);

    const { appUser } = useAuth();
    const queryClient = useQueryClient();
    const { mutate } = useMutation<EchoResponse, Error, EchoCreateRequest>({
        mutationFn: createEcho,
        onSuccess: (data) => {
            setEchoed(true);
            setEchoId(data.echoId);
            queryClient.invalidateQueries({ queryKey: ['echoCount', journalId] });
        },
        onError: (err) => {
            console.error(err);
        }
    })

    const { mutate: mutantDelete } = useMutation<void, Error, number>({
        mutationFn: deleteEcho,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['echoCount', journalId] });
            setEchoed(false);
        },
        onError: (err) => {
            console.error(err);
        }
    })

    useEffect(() => {
        checkEcho(journalId);
    }, [])

    const handleEchoPress = async () => {
        if (echoed && appUser && echoId) {
            try {
                mutantDelete(echoId);
                console.log(echoed)
            } catch (e) {
                console.error(e)
            }
        } else if (!echoed && appUser) {
            const echoCreate: EchoCreateRequest = {
                journalId: journalId,
                appUserId: appUser?.appUserId
            }
            try {
                    mutate(echoCreate);
                    console.log(echoed)
                
            } catch (e) {
                console.error(e)
            }

        }
    }


    const checkEcho = async (journalId: number) => {

        try {
            if (appUser) {

                try {
                    const response = await findEchoForJournalAndUser(journalId, appUser.appUserId)

                    if (response !== null) {
                        setEchoed(true)
                        console.log(journalId + "TRUE")
                        setEchoId(response.echoId);
                    }
                } catch (e) {
                    setEchoed(false)
                    console.log(journalId + "FALSE")
                }

            }
        } catch (e) {
            console.error(e)
        }
    }



    if (echoed) {
        return <Button variant="contained" onClick={handleEchoPress}>{children}</Button>
    } else {
        return <Button variant="outlined" onClick={handleEchoPress}>{children}</Button>
    }
}

export default Echo;