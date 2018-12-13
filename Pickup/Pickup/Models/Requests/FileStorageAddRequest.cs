namespace Pickup.Models.Requests
{
    public class FileStorageAddRequest
    {
        public string UserFileName { get; set; }
        public string BasePath { get; set; }
        public string SystemFileName { get; set; }
    }
}