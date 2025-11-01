import { Card, styled, Typography, type TypographyProps } from "@mui/material"

export const JournalLocationCard = styled(Card)({
    maxWidth: '629px',
    backgroundColor: '#d31c1f73',
    color: 'white'
})

export const JournalInfo = styled(Typography)<TypographyProps>({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: '10px',
    alignItems: 'flex-end'
})

export const JournalTitle = styled(Typography)({
    fontFamily: '"Russo One", sans-serif',
    fontSize: '1.6rem',
    height: '25%',
    width: '50%',
    overflow: 'hidden',
    flex: 1,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
})

export const JournalWrittenBy = styled(Typography)({
    color: '#cfcfd1',
    flexShrink: 0,
    fontFamily: '"Russo One", sans-serif',
    height: '10%',
    width: '50%',
    fontSize: '.7rem',
    textAlign: 'right'
})

export const JournalLocation = styled(Typography)({
    color: '#cfcfd1',
    flexShrink: 0,
    paddingLeft: 10,
    fontFamily: '"Russo One", sans-serif',
    height: '10%',
    width: '50%',
    fontSize: '.7rem',
    textAlign: 'left'
})

export const JournalText = styled(Typography)({
    padding: '16px',
    fontFamily: '"Russo One", sans-serif',
    height: '35px',
    width: '80%',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2, 
    textOverflow: 'ellipsis',
})

export const JournalCondition = styled(Typography)({
    padding: '8px',
    fontFamily: '"Russo One", sans-serif',
    color: '#cfcfd1', fontSize: '.7rem',
    textAlign: 'left',
    height: '20px',
    width: '90%',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2, 
    textOverflow: 'ellipsis',
})

export const MobileProfileCard = styled(Card)({
    maxWidth: '100%',
    height: '100%',
    backgroundColor: '#d31c1f63',
    color: 'white'
})

export const MobileProfileInfo = styled(Typography)<TypographyProps>({
    display: 'flex',
    flexDirection: 'row',
    width: '70%', gap: '10px',
    alignItems: 'flex-end'
})

export const MobileJournalTitle = styled(Typography)({
    fontFamily: '"Russo One", sans-serif',
    fontSize: '1.4vw',
    height: '2%',
    width: '100%',
    overflow: "hidden",
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
})

export const ProfileCard = styled(Card)({
    maxWidth: '100%',
    backgroundColor: '#d31c1f63',
    color: 'white',
    borderRadius: '4px'
})


export const ProfileInfo = styled(Typography)<TypographyProps>({
  display: 'flex',
  flexDirection: 'row',
  width: '70%',
  gap: '10px',
  alignItems: 'flex-end',
});

export const ProfileJournalTitle = styled(Typography)<TypographyProps>({
    fontFamily: '"Russo One", sans-serif',
    fontSize: '1.6rem',
    height: '25%',
    width: '100%',
    overflow: "hidden",
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
})

export const ProfileJournalText = styled(Typography)<TypographyProps>({
    padding: '16px',
    height: '10px',
    width: '80%',
    fontFamily: '"Russo One", sans-serif',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    textOverflow: 'ellipsis',
})