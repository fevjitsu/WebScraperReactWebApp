import React, { useState, useEffect} from 'react';

export default function ScraperForm() {
    //data collected
    const [urlToScrape, setUrlToScrape] = useState("");
    const [keywordsToScrapeFor, setKeywordsToScrapeFor] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [dataResult, setDataResult] = useState(undefined);
    //functions block
    const scrapeData = async (url, keywords) => {     
        //create route for accepting url and keywords.
        const webscraperDTO = { CreatedDate: undefined, UrlToScrape: url, Keywords: keywords };        
        const response = await fetch('webscraper/PostDataToScrape', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(webscraperDTO)
        });        
        const data = await response.json();
        if (data) {
            setDataResult(data);
        }
    }
    const handleSubmit = (e) => {        
        e.preventDefault();
        scrapeData(urlToScrape, keywordsToScrapeFor);        
    };
    useEffect(() => {
        console.log('loading....', urlToScrape, keywordsToScrapeFor);
        
    }, [urlToScrape, keywordsToScrapeFor]);

    useEffect(() => {
        console.log('loading....', dataResult);

    }, [dataResult]);

    const ShowForm = () => {
        return (
            <form id='scrapeForm' onSubmit={handleSubmit}>
                <input id='urlToScrape' type='text' name='urlToScrape' placeholder='Enter URL to scrape.' value={urlToScrape} onChange={(e) => setUrlToScrape(e.target.value)} />
                <br />
                <input id='keywordsToScrapeFor' type='text' name='keywordsToScrapeFor' placeholder='Seperate search terms with commas.' value={keywordsToScrapeFor} onChange={(e) => setKeywordsToScrapeFor(e.target.value)} />
                <br />
                <div>
                    <input id='scrapeFormSubmitBtn' type='submit' className='btn-primary' />
                </div>
            </form>
        )
    };
    return (<React.Fragment>
        <div>
            <h1>Scraper form</h1>
            <div>
                <div>
                    {showResult? <div>result</div>: ShowForm()}
                </div>
            </div>
        </div>
    </React.Fragment>);
}