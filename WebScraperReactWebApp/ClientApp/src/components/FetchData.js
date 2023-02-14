import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;
    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }
    componentDidMount() {
        this.populateWeatherData();
    }
    async populateWeatherData() {
        const url = "https://canadapost-postescanada.ca/cpc/en/personal.page";
        const keywords = ['canada', 'mail'];
        const webscraperDTO = { CreatedDate: undefined, UrlToScrape: url, Keywords: keywords };
        const responseUrl = await fetch('webscraper/GetUrlToScrape/' + encodeURIComponent(url)); 
        const responseKeywords = await fetch('webscraper/PostKeywordsToScrape', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(webscraperDTO)
        });        
        const dataUrl = await responseUrl.json();
        const dataKeywords = await responseKeywords.json();        
        this.setState({ forecasts: [dataKeywords, dataUrl], loading: false });
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {/*{forecasts.map(forecast =>*/}
                    {/*    <tr key={forecast.CreatedDate}>*/}
                    {/*        <td>{forecast.CreatedDate}</td> */}
                    {/*        <td>{forecast.UrlToScraper}</td>                           */}
                    {/*    </tr>*/}
                    {/*)}*/}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }


}
