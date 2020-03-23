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
const tabNames = ['Files', 'Rules', 'Usage']
function StorageContent({ classes }) {
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
										placeholder="Search by filename, rule or usage id"
										InputProps={{
											disableUnderline: true,
											className: classes.searchInput,
										}}
									/>
								</Grid>
								<Grid item>
									<Button variant="contained" color="primary" className={classes.addUser}>
										Add File
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
						{/** @dev list the users here with a map function. */}
						
					</div>
				</Paper>
			</div>
		</>
	)
}

StorageContent.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StorageContent)
