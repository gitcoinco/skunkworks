import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import ContentGraphic from './ContentGraphic'
import Button from '@material-ui/core/Button';


const styles = theme => ({
	paper: {
		margin: 'auto',
		overflow: 'hidden',
		[theme.breakpoints.up('sm')]: {
			minWidth: 600,
		},
		[theme.breakpoints.up('lg')]: {
			minWidth: 936,
		},
	},
	searchBar: {
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
	block: {
		display: 'block',
	},
	addUser: {
		marginRight: theme.spacing.unit,
	},
	contentWrapper: {
		height: 368,
	},
	container: {
		padding: '48px 36px 48px',
	},
})

/** @dev main page - default home page */
function Content({ classes }) {
	return (
		<div className={classes.container}>
			<Paper className={classes.paper}>
				<Grid
					container
					spacing={16}
					className={classes.contentWrapper}
					wrap
					alignItems="center"
					justify="center"
				>
					<Grid lg={6} xs={12} item align="center">
						<ContentGraphic />
					</Grid>
					<Grid lg={6} xs={12} item>
						<Typography component="h2" variant="display1" color="textSecondary" align="center">
							Manage your new project
						</Typography>						
					</Grid>
					<Grid>
					<Button variant="contained" 
								color="primary"
						>Get Started</Button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	)
}

Content.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Content)
