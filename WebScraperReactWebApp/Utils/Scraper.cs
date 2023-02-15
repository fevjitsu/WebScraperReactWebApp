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
        }
        /**
         Constructor: url only
         */
        public Scraper(string url)
        {
            this.url = url;
            this.keywords = new List<string>();
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
            var words = this.keywords;          

            //array for nodes
            List<string> lines = new List<string>();
           
            //foreach (var cNode in childNodes) 
            //{
            //    if (cNode.NodeType == HtmlNodeType.Element)
            //    {
            //        //add nodes if kerywords found in node.               
            //        foreach (var w in words) 
            //        {
            //            bool found = cNode.OuterHtml.Contains(w);
            //            if (found) 
            //            {
            //                lines.Add(cNode.InnerHtml);
            //                Console.WriteLine(cNode.InnerHtml);
            //            }
            //        }
                    
            //    }
            //}

            if (lines.Count > 0) 
            {
                //Extensions.WriteToTextFile(lines.ToArray());
            }
            
            Console.WriteLine("Node Name: " + node.Name + "\n" + htmlBody.OuterHtml);                       
        }
    }
}
