using HtmlAgilityPack;
using Pickup.Interfaces;
using Pickup.Models.DomainModels;
using System.Collections.Generic;
using System.Linq;

namespace Pickup.Services
{
    public class GalleryService : IGalleryService
    {
        public List<GalleryDomainModel> GetAllImages()
        {
            List<GalleryDomainModel> myList = new List<GalleryDomainModel>();
            var url = "https://www.usatoday.com/media/cinematic/gallery/1818756002/nba-shoes-best-kicks-of-the-2018-19-season/";
            var web = new HtmlWeb();
            var htmlDoc = web.Load(url);
            var links = htmlDoc.DocumentNode.SelectNodes("//*[@id='media-view']/div[1]/article/div/div[1]/div/div/img");

            foreach (var node in links.Zip(links, (l,a) => new GalleryDomainModel
            { Link = l.GetAttributeValue("data-large-src", ""), Alt = a.GetAttributeValue("alt", "") }))
            {
                myList.Add(node);
            }
            return myList;
        }
    }
}