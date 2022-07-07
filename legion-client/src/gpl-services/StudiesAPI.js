import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Multiselect from 'multiselect-react-dropdown';

const StudiesAPI = () => {

    const GET_STUDIES = gql`
    query Query {
        allStudies
     }
    `;

const { loading, error, data } = useQuery(GET_STUDIES);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error : {console.log(error)}</p>;
        let studyArray = [];
        Object.keys(data.allStudies).map(function(key) {
            studyArray.push({
                name: data.allStudies[key].value,
                value: key
            });
        });
        return <Multiselect
                    displayValue="name"
                    options={studyArray}
                />
    }
    
export default StudiesAPI;