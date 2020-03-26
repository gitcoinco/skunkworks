import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Refresh'
import TabBar from 'components/TabBar'

const styles = theme => ({
	paper: {
		maxWidth: 936,
		margin: 'auto',
		overflow: 'hidden',
	},
	searchBar: {
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
	searchInput: {
		fontSize: theme.typography.fontSize,
	},
	block: {
		display: 'block',
	},
	addUser: {
		marginRight: theme.spacing.unit,
	},
	contentWrapper: {
		margin: '40px 16px',
	},
	container: {
		padding: '48px 36px 0',
	},
})

const tabNames = ['Users', 'Sign-in method', 'Templates', 'Usage', 'Tokens', 'Token Holders']

function addUser() {
	console.log('Adding User');
}

function sendUserToken(user) {
	
}

function mintUserToken(user) {
	// mint the token

	// send to the user
	sendUserToken(user);
}

function revokeUserToken(user, token) {
	// revoke the token or make it invalid for auth

	// lock the user out
}

function AuthContent({ classes }) {
	return (
		<>
			<TabBar tabNames={tabNames} />
			<div className={classes.container}>
				<Paper className={classes.paper}>
					<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
						<Toolbar>
							<Grid container spacing={16} alignItems="center">
								<Grid item>
									<SearchIcon className={classes.block} color="inherit" />
								</Grid>
								<Grid item xs>
									<TextField
										fullWidth
										placeholder="Search by hash."
										InputProps={{
											disableUnderline: true,
											className: classes.searchInput,
										}}
									/>
								</Grid>
								<Grid item>
									<Button 
									variant="contained" 
									color="primary" 
									className={classes.addUser}
									onClick={addUser()}>
										Add user
									</Button>
									<Tooltip title="Reload">
										<IconButton>
											<RefreshIcon className={classes.block} color="inherit" />
										</IconButton>
									</Tooltip>
								</Grid>
							</Grid>
						</Toolbar>
					</AppBar>

					<div className={classes.contentWrapper}>
						<Typography color="textSecondary" align="center">
							No users for this project yet
						</Typography>
					</div>
				</Paper>
			</div>
		</>
	)
}

AuthContent.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AuthContent)
