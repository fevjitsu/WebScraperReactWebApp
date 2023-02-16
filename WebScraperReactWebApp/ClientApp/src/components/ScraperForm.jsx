import React, { useState, useEffect} from 'react';

export default function ScraperForm() {
    //data collected
    const [urlToScrape, setUrlToScrape] = useState("https://canadapost-postescanada.ca/cpc/en/personal.page");
    const [keywordsToScrapeFor, setKeywordsToScrapeFor] = useState(["Mail", "Post", "Canada"]);
    const [showResult, setShowResult] = useState(false);
    const [dataResult, setDataResult] = useState(undefined);
    //functions block
    const scrapeData = async (urlToScrape, keywords) => {     
        //create route for accepting url and keywords.
        //const dto = { CreatedDate: 0, UrlToScrape: urlToScrape, Keywords: keywords };        

        //const response = await fetch('webscraper/PostDataToScrape', {
        //    method: 'post',
        //    headers: {
        //        'accept': 'application/json',
        //        'content-type': 'application/json'
        //    },
        //    body: JSON.stringify(dto)
        //});  
        
        //const data = await response.json();
        ////
        //if (data) {
        //    console.log(data);
        //    setDataResult(data);
        //}
    }
    const handleSubmit = (e) => {        
        e.preventDefault();        
        scrapeData(urlToScrape, keywordsToScrapeFor);        
    };    

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