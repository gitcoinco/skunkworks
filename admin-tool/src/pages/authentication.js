import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import AuthContent from 'components/AuthContent'

function AuthenticationPage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			<AuthContent />
		</Layout>
	)
}
AuthenticationPage.propTypes = {
	location: PropTypes.object,
}
export default AuthenticationPage
