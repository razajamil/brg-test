import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import useArtists from '../../hooks/artists/useArtists'
import { arrayHasValue, stringHasValue, objectHasValue } from '../../helpers'
import PageCounter from './pageCounter'
import { makeStyles, Typography } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Pagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  paginationContainer: {
    marginTop: 40
  },
  avatar: {
    cursor: 'pointer'
  }
}))

const TopArtists = () => {
  const {
    top_artists,
    get_top_artists,
    get_top_artists_request,
    get_top_artists_api_status
  } = useArtists()
  const { country, page } = useParams()
  const history = useHistory()

  const onPageClick = (event, page) => {
    if (stringHasValue(country) && page > 0) {
      history.push(`/topartists/${country}/${page}`)
    }
  }

  const handleArtistClick = artist => {
    if (objectHasValue(artist) && stringHasValue(artist.mbid))
      history.push(`/artist/${artist.mbid}`)
  }

  useEffect(() => {
    let page_int = parseInt(page)
    if (stringHasValue(country) && page_int > 0) {
      get_top_artists({ country, page: page_int, resultsPerPage: 5 })
    }
  }, [country, page])

  const classes = useStyles()

  return (
    <div style={{ marginTop: '20px' }}>
      {arrayHasValue(top_artists) && !get_top_artists_api_status.loading && (
        <List className={classes.root}>
          {top_artists.map(artist => (
            <React.Fragment key={artist.name + artist.mbid}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar onClick={() => handleArtistClick(artist)}>
                  <Avatar
                    className={classes.avatar}
                    alt='Remy Sharp'
                    src={artist.image[2]['#text']}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={artist.name}
                  secondary={`${artist.listeners} listeners`}
                />
              </ListItem>
              <Divider variant='inset' component='li' />
            </React.Fragment>
          ))}
        </List>
      )}

      {arrayHasValue(top_artists) && !get_top_artists_api_status.loading && (
        <Pagination
          className={classes.paginationContainer}
          variant='outlined'
          shape='rounded'
          count={parseInt(get_top_artists_request.max_pages)}
          page={parseInt(page)}
          boundaryCount={3}
          onChange={onPageClick}
        />
      )}

      {!arrayHasValue(top_artists) && get_top_artists_api_status.success && (
        <Typography>No results found, please try again</Typography>
      )}
    </div>
  )
}

export default TopArtists
