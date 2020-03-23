import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
	secondaryBar: {
		zIndex: 0,
	},
})

function TabBar({ classes, tabNames = [] }) {
	return (
		<AppBar component="div" className={classes.secondaryBar} color="primary" position="static" elevation={0}>
			<Tabs value={0} textColor="inherit">
				{tabNames.map(tabName => (
					<Tab textColor="inherit" label={`${tabName}`} />
				))}
			</Tabs>
		</AppBar>
	)
}

TabBar.propTypes = {
	classes: PropTypes.object.isRequired,
	tabNames: PropTypes.array.isRequired,
}

export default withStyles(styles)(TabBar)
