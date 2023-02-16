using HtmlAgilityPack;

namespace WebScraperWebAppReact.Utils
{
    public class Scraper
    {
        private string url;
        private List<string> keywords;
        //constructor
        public Scraper() 
        {
            this.url = "https://canadapost-postescanada.ca/cpc/en/personal.page";
            this.keywords = new List<string>(){"Mail","Post","Canada"};
        }        
        /**
         Constructor: url and keywords
         */
        public Scraper(string url, List<string> keywords)
        {
            this.url = url;
            this.keywords = keywords;
        }
        /**
         Scrape url after details are gathered.
         */
        public void ScrapeUrl() 
        {
            var html = this.url;

            HtmlWeb web = new HtmlWeb();

            var htmlDoc = web.Load(html);

            var node = htmlDoc.DocumentNode.SelectSingleNode("//head/title");
            var htmlBody = htmlDoc.DocumentNode.SelectSingleNode("//body");
            HtmlNodeCollection childNodes = htmlBody.ChildNodes;

            foreach (var cn in childNodes) {
                string content = cn.InnerText;
                Console.WriteLine("Node Name: " + cn.Name + "\n" + cn.OuterHtml + "\n" + cn.InnerText + "\n" + cn.InnerHtml);
            }
            
            //Console.WriteLine("Node Name: " + node.Name + "\n" + htmlBody.OuterHtml);                       
        }

        private void WriteResultsToTextFile() 
        {
            //writes the html output to a text file.
            List<string> lines = this.keywords;
            if (lines.Count > 0)
            {
                Extensions.WriteToTextFile(lines.ToArray());
            }            

        }
    }
}
