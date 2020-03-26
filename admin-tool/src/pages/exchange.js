import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Content from 'components/Content'
import Exchange from 'components/Exchange'

function ExchangePage({ data, location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			

            <Exchange />

		</Layout>
	)
}
ExchangePage.propTypes = {
	data: PropTypes.object.isRequired,
	location: PropTypes.object,
}
export default ExchangePage;