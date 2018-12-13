namespace Pickup.Models.Requests
{
    public class ProfileImageAddRequest
    {
        public string UserId { get; set; }
        public int FileStorageId { get; set; }
    }
}