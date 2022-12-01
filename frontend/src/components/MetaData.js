import React from "react";
import { Helmet } from 'react-helmet';


// Use to add custom titles to browser tab
export default function MetaData ({title}) {
    return (
        <Helmet>
            <title>{`${title} - Pelican`}</title>
        </Helmet>
    )
}