import React from 'react';
import PropTypes from 'prop-types';
import Layout from "components/Layout";
import BrowserContent from 'components/BrowserContent';

function BrowserPage({location}) {
    const pageTitle = location ? location.pathname.replace(/\//g, '') : '';

    return (
        <Layout location={location} title={pageTitle}>
            <BrowserContent />
        </Layout>
    )
}

BrowserPage.PropTypes = {
    location: PropTypes.object,
}

export default BrowserPage;