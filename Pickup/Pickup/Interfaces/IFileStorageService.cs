using Pickup.Models.Requests;

namespace Pickup.Interfaces
{
    public interface IFileStorageService
    {
        int Insert(FileStorageAddRequest model);
        void Update(FileStorageUpdateRequest model);
    }
}