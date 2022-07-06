import React from 'react';
import { useQuery, gql } from '@apollo/client';

const StudiesAPI = () => {

    const GET_STUDIES = gql`
    query Query {
        allStudies
     }
    `;

const { loading, error, data } = useQuery(GET_STUDIES);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error : {console.log(error)}</p>;
        console.log(data);

        return data.allStudies;
    }
    
export default StudiesAPI;