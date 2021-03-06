import React from 'react';
import QueuedSongList from './QueuedSongList';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Slider,
    makeStyles
 } from '@material-ui/core'

import {
    SkipPrevious,
    SkipNext,
    Pause,
    PlayArrow
} from '@material-ui/icons'

import { SongContext } from '../App';
import { GET_QUEUED_SONGS } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 15px'
    },
    content: {
        flex: '1 0 auto'
    },
    thumbnail: {
        width: 150
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38
    }
}))



function SongPlayer() {
    const classes = useStyles();
    const { data = [] } = useQuery(GET_QUEUED_SONGS);
    const {state, dispatch} = React.useContext(SongContext);

    function handleTogglePlay() {
        dispatch(state.isPlaying ? { type: 'PAUSE_SONG'} :  { type: 'PLAY_SONG'});
    }

    return (
        <React.Fragment>
            <Card variant="outlined" className={classes.container}>
                <div className={classes.details}>
                   <CardContent className={classes.content}>
                       <Typography variant="h5" component="h3">
                           {state.song.title}
                       </Typography>
                       <Typography variant="subtitle1" component="p" color="textSecondary">
                           {state.song.artist}
                       </Typography>
                   </CardContent>
                    <div className={classes.controls}>
                        <IconButton>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={handleTogglePlay}>
                            {state.isPlaying ? <Pause className={classes.playIcon} /> : <PlayArrow className={classes.playIcon} />}
                        </IconButton>
                        <IconButton>
                            <SkipNext />
                        </IconButton>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                           00:01:30
                       </Typography>
                    </div>
                    <Slider type="range" min={0} max={1} step={0.01} />
                </div>
                <CardMedia
                    className={classes.thumbnail}
                    image={state.song.thumbnail} />
            </Card>
            <QueuedSongList queue={data.queue} />
        </React.Fragment>
    )
}

export default SongPlayer;
