import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import DatabaseContent from 'components/DatabaseContent'

function DatabasePage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			<DatabaseContent />
		</Layout>
	)
}
DatabasePage.propTypes = {
	location: PropTypes.object,
}
export default DatabasePage
