import React, { useEffect } from 'react'
import useArtists from '../../hooks/artists/useArtists'
import { useParams, useHistory } from 'react-router-dom'
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
import { FixedSizeList } from 'react-window'

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
  },
  paginationContainer: {
    marginTop: 20
  }
}))

const VirtualizedTrackRow = ({ index, style }) => {
  const { artist_top_tracks } = useArtists()
  console.log(artist_top_tracks.tracks.length)
  return (
    <ListItem key={artist_top_tracks.tracks[index].name} style={style}>
      <ListItemIcon>
        <MusicNoteIcon />
      </ListItemIcon>
      <ListItemText
        primary={artist_top_tracks.tracks[index].name}
        secondary={`${artist_top_tracks.tracks[index].listeners} listeners`}
      />
    </ListItem>
  )
}

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
        <>
          <Grid item xs={12}>
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
              <FixedSizeList
                height={500}
                width='100%'
                itemSize={55}
                itemCount={artist_top_tracks.tracks.length}
              >
                {VirtualizedTrackRow}
              </FixedSizeList>
            </div>
          </Grid>
        </>
      )}
    </div>
  )
}

export default ArtistTracks
