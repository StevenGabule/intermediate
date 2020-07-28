import React from 'react';
import {
    Typography,
    IconButton,
    Avatar,
    makeStyles,
    useMediaQuery
} from '@material-ui/core'

import {
    Delete
} from '@material-ui/icons';

function QueuedSongList() {
    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
    const song = {
        title: "LUNE",
        artist: "MOON",
        thumbnail: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FWMen_MMUs54%2Fmaxresdefault.jpg&f=1&nofb=1"
    }

    return greaterThanMd && (
        <div style={{ margin: '10px 0' }}>
            <Typography variant="button" color="textSecondary">
                QUEUE(5)
            </Typography>
            {Array.from({length: 5}, () => song).map((song, i) => (
                <QueuedSong key={i} song={song} />
            ))}
        </div>
    )
}


const useStyles = makeStyles({
    avatar: {
        width: 44,
        height: 44
    },

    text: {
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },

    container: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 50px',
        gridGap: 12,
        alignItems: 'center',
        marginTop: 10
    },

    songInfoContainer: {
        overflow: 'hidden',
        whiteSpace: 'no-wrap'
    }
})

function QueuedSong({song}) {
    const {thumbnail, artist, title} = song;
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Avatar
                src={thumbnail}
                alt="Song thumbnail"
                className={classes.avatar} />
            <div className={classes.songInfoContainer}>
                <Typography variant="subtitle2" className={classes.text}>
                    {title}
                </Typography>
                <Typography variant="subtitle2" className={classes.text} color="textSecondary">
                    {artist}
                </Typography>
            </div>
            <IconButton>
                <Delete color="error" />
            </IconButton>
        </div>
    );
}

export default QueuedSongList;
