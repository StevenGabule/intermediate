import React from 'react';
import {
    TextField,
    Button,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    makeStyles
} from '@material-ui/core';
import {Link, AddBoxOutlined} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    urlInput: {
        margin: theme.spacing(1)
    },
    addSongButton: {
        margin: theme.spacing(1)
    },
    dialog: {
        textAlign: 'center'
    },
    thumbnail: {
        width: '90%'
    }
}));


function AddSong() {
    const classes = useStyles();
    const [dialog, setDialog] = React.useState(false);

    function handleCloseDialog() {
        setDialog(false);
    }

    return (
        <div className={classes.container}>
            <Dialog className={classes.dialog} open={dialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img
                    className={classes.thumbnail}
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.B2U1HRhbAY1f7r6FmbOupQHaEo%26pid%3DApi&f=1"
                    alt="Song Thumbnail"/>
                    <TextField margin="dense" fullWidth name="title" label="Title" />
                    <TextField margin="dense" fullWidth name="artist" label="Artist" />
                    <TextField margin="dense" fullWidth name="thumbnail" label="Thumbnail" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button variant="outlined" color="primary">
                        Add Song
                    </Button>
                </DialogActions>
            </Dialog>
            <TextField
                className={classes.urlInput}
                placeholder="Add Youtube or SoundCloud url"
                fullWidth
                margin="normal"
                type="url"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Link />
                        </InputAdornment>
                    )
                }}
             />
             <Button
                className={classes.addSongButton}
                variant="contained"
                color="primary"
                onClick={e => setDialog(true)}
                endIcon={<AddBoxOutlined />}>
                 Add
             </Button>
        </div>
    )
}

export default AddSong;
