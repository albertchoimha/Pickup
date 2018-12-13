using Pickup.Models.DomainModels;
using System.Collections.Generic;

namespace Pickup.Interfaces
{
    public interface IGalleryService
    {
        List<GalleryDomainModel> GetAllImages();
    }
}