using Pickup.Interfaces;
using Pickup.Models.DomainModels;
using Pickup.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Pickup.Controllers.Api
{
    [AllowAnonymous]
    [RoutePrefix("api/gallery")]
    public class GalleryController : ApiController
    {
        private IGalleryService _galleryService;

        public GalleryController(IGalleryService galleryService)
        {
            _galleryService = galleryService;
        }

        [HttpGet]
        [Route]
        public HttpResponseMessage GetAllImages()
        {
            try
            {
                ItemsResponse<GalleryDomainModel> resp = new ItemsResponse<GalleryDomainModel>();
                resp.Items = _galleryService.GetAllImages();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}