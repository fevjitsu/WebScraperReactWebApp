using System;
using System.Diagnostics.Eventing.Reader;
using System.Text.Json;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using WebScraperWebAppReact.Models;
using WebScraperWebAppReact.Utils;

namespace WebScraperWebAppReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WebScraperController : ControllerBase
    {
        private readonly ILogger<WebScraperController> _logger;
        private WebScraperDTO webScraperDTO = new WebScraperDTO() { CreatedDate = DateTime.Now };
        private Scraper scraper;
        //constructor
        public WebScraperController(ILogger<WebScraperController> logger)
        {
            this._logger = logger;
        }

        //Get URL to scrape from source
        [HttpGet("[action]/{url}")]
        public ActionResult GetUrlToScrape(string url)
        {
            if (string.IsNullOrEmpty(url))
            {
                return BadRequest("URL is empty.");
            }

            //decode url
            url = Extensions.UrlDecode(url);

            //Collect details for scrape
            webScraperDTO.UrlToScrape = url;
            //scrape url 
            //this.CallScrapeUrl();
            return Ok(webScraperDTO);
        }


        //Get keywords for scraping
        [HttpPost("[action]")]
        public ActionResult PostKeywordsToScrape(WebScraperDTO dto)
        {
            if (string.IsNullOrEmpty(dto.UrlToScrape) || dto.Keywords == null) 
            {
                return BadRequest("url or keywords cannot be empty.");
            }
            //Collect keywords for scrape
            webScraperDTO.CreatedDate = DateTime.Now;
            webScraperDTO.UrlToScrape = dto.UrlToScrape;
            webScraperDTO.Keywords = dto.Keywords;
            //scrape url 
            this.CallScrapeUrl();
            return Ok(webScraperDTO);
        }

        public void CallScrapeUrl()
        {            
            //after gathering details from source scrape url
            if ((!string.IsNullOrEmpty(webScraperDTO.UrlToScrape)) && (webScraperDTO.Keywords != null))
            {                
                    scraper = new Scraper(webScraperDTO.UrlToScrape,webScraperDTO.Keywords);
                    scraper.ScrapeUrl();
            }
        }
    }
}