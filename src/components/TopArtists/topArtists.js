import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import useArtists from '../../hooks/artists/useArtists'
import { arrayHasValue, stringHasValue } from '../../helpers'
import { makeStyles, Typography, Button, Grid } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import ArtistCard from './artistCard'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  inline: {
    display: 'inline'
  },
  paginationContainer: {
    marginTop: 40,
    marginBottom: 40,
    '& ul.MuiPagination-ul': {
      justifyContent: 'center'
    }
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

  const handleBackClick = () => {
    history.goBack()
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
        <Grid container spacing={2} justify='center' className={classes.root}>
          {top_artists.slice(0, 5).map(artist => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={artist.mbid}>
              <ArtistCard artist={artist} />
            </Grid>
          ))}
        </Grid>
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
        <>
          <Typography>No results found, please try again</Typography>
          {history.length > 2 && (
            <Button
              variant='outlined'
              size='small'
              style={{ marginTop: 10 }}
              onClick={handleBackClick}
            >
              Back
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default TopArtists
