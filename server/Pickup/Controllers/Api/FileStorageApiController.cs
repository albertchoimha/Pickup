using Amazon.S3;
using Amazon.S3.Transfer;
using Pickup.Interfaces;
using Pickup.Models.Requests;
using Pickup.Responses;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Pickup.Controllers.Api
{
    [AllowAnonymous]
    [RoutePrefix("api/filestorage")]
    public class FileStorageApiController : ApiController
    {
        string serverFileName = string.Empty;
        string fqn = string.Empty;
        private IFileStorageService _fileStorageService;
        private IProfileDataService _profileDataService;

        public FileStorageApiController(IFileStorageService fileStorageService, IProfileDataService profileDataService)
        {
            _fileStorageService = fileStorageService;
            _profileDataService = profileDataService;
        }

        [HttpPost]
        [Route]
        public HttpResponseMessage Upload()
        {

            HttpPostedFile postedFile = HttpContext.Current.Request.Files[0];

            // Generate GUID for system file name
            serverFileName = string.Format("{0}_{1}.{2}",
                Path.GetFileNameWithoutExtension(postedFile.FileName),
                Guid.NewGuid().ToString(),
                "jpg");

            // Metadata object for saving to SQL database
            FileStorageAddRequest fileStorageAddRequest = new FileStorageAddRequest
            {
                UserFileName = postedFile.FileName,
                BasePath = "C61/pickup-profileimages",
                SystemFileName = serverFileName,
            };

            // PostedFile.contentType = type of media file
            string contentType = Request.Content.Headers.ContentType.MediaType;

            // Define required parameters for AWS
            string bucketName = "bucket name";
            string accessKey = "access key";
            string secretKey = "secret key";

            // Execute AWS upload & save metadata to SQL
            try
            {
                using (AmazonS3Client s3Client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.USWest2))
                {
                    using (TransferUtility fileTransferUtility = new TransferUtility(s3Client))
                    {
                        TransferUtilityUploadRequest request = new TransferUtilityUploadRequest
                        {
                            BucketName = bucketName,
                            Key = serverFileName,
                            InputStream = postedFile.InputStream
                        };
                        fileTransferUtility.Upload(request);

                        int Id = _fileStorageService.Insert(fileStorageAddRequest);
                        ItemResponse<int> resp = new ItemResponse<int>();
                        resp.Item = Id;
                        return Request.CreateResponse(HttpStatusCode.OK, resp);
                    }
                }
            }
            catch (AmazonS3Exception amznEx)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, amznEx);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public HttpResponseMessage Update(int id)
        {
            HttpPostedFile postedFile = HttpContext.Current.Request.Files[0];

            // Generate GUID for system file name
            serverFileName = string.Format("{0}_{1}.{2}",
                Path.GetFileNameWithoutExtension(postedFile.FileName),
                Guid.NewGuid().ToString(),
                "jpg");

            // Metadata object for saving to SQL database
            FileStorageUpdateRequest fileStorageUpdateRequest = new FileStorageUpdateRequest
            {
                Id = id,
                UserFileName = postedFile.FileName,
                BasePath = "C61/pickup-profileimages",
                SystemFileName = serverFileName,
            };

            // PostedFile.contentType = type of media file
            string contentType = Request.Content.Headers.ContentType.MediaType;

            // Define required parameters for AWS
            string bucketName = "bucket name";
            string accessKey = "access key";
            string secretKey = "secret key";

            // Execute AWS upload & save metadata to SQL
            try
            {
                using (AmazonS3Client s3Client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.USWest2))
                {
                    using (TransferUtility fileTransferUtility = new TransferUtility(s3Client))
                    {
                        TransferUtilityUploadRequest request = new TransferUtilityUploadRequest
                        {
                            BucketName = bucketName,
                            Key = serverFileName,
                            InputStream = postedFile.InputStream
                        };
                        fileTransferUtility.Upload(request);

                        _fileStorageService.Update(fileStorageUpdateRequest);
                        return Request.CreateResponse(HttpStatusCode.OK);
                    }
                }
            }
            catch (AmazonS3Exception amznEx)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, amznEx);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}