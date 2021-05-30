import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

import { Helmet } from 'react-helmet';

import LinksList from './LinksList';
import ErrorPage from './errorpage.component';


const PoemCollection = () => {
    const { collection_id } = useParams();
    const [ collection_not_found, setCollectionNotFound ] = useState(false);
    const [ collection_data, setCollectionData ] = useState();


    // Fetch collection data from server
    useEffect(() => {
        const getCollectionData = async () => {
            const res = await fetch(`http://localhost:5000/poems/collection/${collection_id}`);

            if (!res.ok) { res.json().then( data => { console.error(`${data.errorMessage}: ${collection_id}`); setCollectionNotFound(true); } ) }
            else { await res.json().then( data => setCollectionData(data)); }

        };
        getCollectionData();
    }, [collection_id]);


    // DEBUG : Print out collection data
    useEffect(() => {
        console.log(collection_data);
    }, [collection_data]);


    return (
        <>
        { collection_data &&
            <div>
                <Helmet>
                    <title>{collection_data.collection_name} | Emily Writes Poems</title>
                </Helmet>

                <div className='container font-2'>
                    <h3 className='color-accent-1 my-4'>
                        <Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{collection_data.collection_name}</Markdown>
                    </h3>
                </div>

                <div className='container font-3 mt-5'>
                    <h5 className="font-2 color-accent-1">about this poem collection.</h5>
                    <h6><Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{collection_data.collection_summary ? collection_data.collection_summary : 'Summary to come!'}</Markdown></h6>
                </div>

                <div className='container mt-5'>
                    <h5 className='font-2 color-accent-1'>poems in collection.</h5>
                    <LinksList link_path={'poem'} link_IDs={collection_data.poem_ids} link_titles={collection_data.poem_titles} />
                </div>

            </div>
        }
        { collection_not_found && ( <ErrorPage notFound='Collection' /> ) }
        </>
    );
}

export default PoemCollection;
