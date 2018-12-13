using Pickup.Interfaces;
using Pickup.Models.Requests;
using Pickup.Models.ViewModels;
using Pickup.Responses;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Pickup.Controllers.Api
{
    [AllowAnonymous]
    [RoutePrefix("api/profiledata")]
    public class ProfileDataApiController : ApiController
    {
        private IProfileDataService _profileDataService;

        public ProfileDataApiController(IProfileDataService profileDataService)
        {
            _profileDataService = profileDataService;
        }

        [HttpGet]
        [Route("{Id}")]
        public HttpResponseMessage GetById(string Id)
        {
            try
            {
                ItemResponse<ProfileDataViewModel> resp = new ItemResponse<ProfileDataViewModel>();
                resp.Item = _profileDataService.GetById(Id);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        [Route("personupdate/{Id}")]
        public HttpResponseMessage UpdatePerson(ProfileDataPersonUpdateRequest model)
        {
            try
            {
                _profileDataService.UpdatePerson(model);
                SuccessResponse resp = new SuccessResponse();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        [Route("profileupdate/{Id}")]
        public HttpResponseMessage UpdateProfile(ProfileDataProfileUpdateRequest model)
        {
            try
            {
                _profileDataService.UpdateProfile(model);
                SuccessResponse resp = new SuccessResponse();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        [Route("telephone")]
        public HttpResponseMessage TelephoneInsert(TelephoneAddRequest model)
        {
            try
            {
                int Id = _profileDataService.InsertTelephone(model);
                ItemResponse<int> resp = new ItemResponse<int>();
                resp.Item = Id;
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        [Route("personphone")]
        public HttpResponseMessage PersonPhoneInsert(PersonPhoneAddRequest model)
        {
            try
            {
                _profileDataService.InsertPersonPhone(model);
                SuccessResponse resp = new SuccessResponse();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpDelete]
        [Route("deletepersonphone/{id:int}")]
        public HttpResponseMessage DeletePersonPhone(int Id)
        {
            try
            {
                _profileDataService.DeletePersonPhone(Id);
                SuccessResponse resp = new SuccessResponse();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        [Route("profileimage")]
        public HttpResponseMessage ProfileImageInsert(ProfileImageAddRequest model)
        {
            try
            {
                int Id = _profileDataService.InsertProfileImage(model);
                ItemResponse<int> resp = new ItemResponse<int>();
                resp.Item = Id;
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}