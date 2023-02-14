namespace WebScraperWebAppReact.Models
{
    public class WebScraperDTO
    {
        //when the object was made.
        public DateTime CreatedDate { get; set; }
        //the url obtained from a source to scrape.
        public string? UrlToScrape { get; set; }

        public List<string>? Keywords { get; set; }
    }
}