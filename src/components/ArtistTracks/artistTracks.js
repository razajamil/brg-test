import React, { useEffect } from 'react'
import useArtists from '../../hooks/artists/useArtists'
import { useParams, useHistory } from 'react-router-dom'
import { S_PageHeading } from '../Styles/pageHeading'
import { objectHasValue } from '../../helpers'
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  ListItemText,
  Button
} from '@material-ui/core'
import MusicNoteIcon from '@material-ui/icons/MusicNote'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}))

const ArtistTracks = () => {
  const { artist_top_tracks, get_artist_top_tracks } = useArtists()

  const { artistID } = useParams()

  const history = useHistory()

  const handleBackClick = () => {
    history.goBack()
  }

  useEffect(() => {
    get_artist_top_tracks({ artistID })
  }, [artistID])

  const classes = useStyles()

  return (
    <div>
      {objectHasValue(artist_top_tracks) && (
        <Grid item xs={12} md={6}>
          <Typography variant='h6' className={classes.title}>
            <Button
              variant='outlined'
              size='small'
              style={{ float: 'left' }}
              onClick={handleBackClick}
            >
              Back
            </Button>
            {artist_top_tracks.name}
          </Typography>
          <div className={classes.demo}>
            <List>
              {artist_top_tracks.tracks.map(track => (
                <ListItem>
                  <ListItemIcon>
                    <MusicNoteIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={track.name}
                    secondary={`${track.listeners} listeners`}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      )}
    </div>
  )
}

export default ArtistTracks
