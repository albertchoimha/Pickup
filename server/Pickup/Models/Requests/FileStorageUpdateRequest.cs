namespace Pickup.Models.Requests
{
    public class FileStorageUpdateRequest
    {
        public int Id { get; set; }
        public string UserFileName { get; set; }
        public string BasePath { get; set; }
        public string SystemFileName { get; set; }
    }
}