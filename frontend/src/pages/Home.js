import React from 'react';
// import { useState } from 'react'
// import { FaStar } from 'react-icons/fa';
import Banner from '../components/Banner';
import MetaData from '../components/MetaData';
import '../pages/Home.css';


export default function Home () {   

    const data = {
        title: "Pelican",
        content: "Affordable accessories for modern gentleman",
        destination: "/products",
        label: "See our products"
    }

    return (
        <>
            <MetaData title={'Bang for your buck accessories online'}/>
            <Banner bannerProp={data}/>
        </>
    )
}