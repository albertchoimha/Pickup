using Pickup.Interfaces;

namespace Pickup.Models.DomainModels
{
    public class UserBase : IUserAuthData
    {
        public string Id
        {
            get; set;
        }
    }
}