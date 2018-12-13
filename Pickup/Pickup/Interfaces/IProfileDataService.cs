using Pickup.Models.Requests;
using Pickup.Models.ViewModels;

namespace Pickup.Interfaces
{
    public interface IProfileDataService
    {
        ProfileDataViewModel GetById(string Id);
        void UpdatePerson(ProfileDataPersonUpdateRequest model);
        void UpdateProfile(ProfileDataProfileUpdateRequest model);
        int InsertTelephone(TelephoneAddRequest model);
        void InsertPersonPhone(PersonPhoneAddRequest model);
        int InsertProfileImage(ProfileImageAddRequest model);
        void DeletePersonPhone(int Id);
    }
}