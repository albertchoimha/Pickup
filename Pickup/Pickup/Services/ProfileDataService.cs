using Pickup.Extensions;
using Pickup.Interfaces;
using Pickup.Models.DomainModels;
using Pickup.Models.Requests;
using Pickup.Models.ViewModels;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Pickup.Services
{
    public class ProfileDataService : IProfileDataService
    {
        private IDataProvider _dataProvider;

        public ProfileDataService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public ProfileTelephoneModel MapPDViewModel(IDataReader reader, int index)
        {
            ProfileTelephoneModel model = new ProfileTelephoneModel
            {
                Id = reader.GetSafeString(index++),
                FirstName = reader.GetSafeString(index++),
                LastName = reader.GetSafeString(index++),
                Gender = reader.GetSafeString(index++),
                Bio = reader.GetSafeString(index++),
                PlayerComparison = reader.GetSafeString(index++),
                ShootingHand = reader.GetSafeString(index++),
                BasePath = reader.GetSafeString(index++),
                SystemFileName = reader.GetSafeString(index++),
                PhoneId = reader.GetSafeInt32(index++),
                PhoneNumber = reader.GetSafeString(index++),
                BaseUrl = "https://sabio-training.s3.us-west-2.amazonaws.com",
                ImageId = reader.GetSafeInt32(index++)
            };
            return model;
        }

        public ProfileDataViewModel GetById(string Id)
        {
            ProfileTelephoneModel model = new ProfileTelephoneModel();
            List<ProfileTelephoneModel> myList = new List<ProfileTelephoneModel>();
            _dataProvider.ExecuteCmd(
                "ProfileData_GetById",
                inputParamMapper: delegate (SqlParameterCollection parmList)
                {
                    parmList.AddWithValue("@Id", Id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    model = MapPDViewModel(reader, index);
                    myList.Add(model);
                });

            ProfileDataViewModel profile = new ProfileDataViewModel();
            foreach (var ptm in myList)
            {
                profile.Id = ptm.Id;
                profile.FirstName = ptm.FirstName;
                profile.LastName = ptm.LastName;
                profile.Gender = ptm.Gender;
                profile.Bio = ptm.Bio;
                profile.PlayerComparison = ptm.PlayerComparison;
                profile.ShootingHand = ptm.ShootingHand;
                profile.BasePath = ptm.BasePath;
                profile.SystemFileName = ptm.SystemFileName;
                profile.BaseUrl = "https://sabio-training.s3.us-west-2.amazonaws.com";
                profile.ImageId = ptm.ImageId;

                TelephoneDomainModel telephone = new TelephoneDomainModel();
                telephone.Id = ptm.PhoneId;
                telephone.PhoneNumber = ptm.PhoneNumber;
                profile.Telephones.Add(telephone);
            }
            return profile;
        }

        public void UpdatePerson(ProfileDataPersonUpdateRequest model)
        {
            _dataProvider.ExecuteNonQuery(
                "ProfileDataPerson_Upsert",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@Id", model.Id);
                    paramList.AddWithValue("@FirstName", model.FirstName);
                    paramList.AddWithValue("@LastName", model.LastName);
                    paramList.AddWithValue("@Gender", model.Gender);
                });
        }

        public void UpdateProfile(ProfileDataProfileUpdateRequest model)
        {
            _dataProvider.ExecuteNonQuery(
                "ProfileDataProfile_Upsert",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@Id", model.Id);
                    paramList.AddWithValue("@Bio", model.Bio);
                    paramList.AddWithValue("@PlayerComparison", model.PlayerComparison);
                    paramList.AddWithValue("@ShootingHand", model.ShootingHand);
                });
        }

        public int InsertTelephone(TelephoneAddRequest model)
        {
            int Id = 0;
            _dataProvider.ExecuteNonQuery(
                "Telephone_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    SqlParameter parm = new SqlParameter
                    {
                        ParameterName = "@Id",
                        SqlDbType = SqlDbType.Int,
                        Direction = ParameterDirection.Output
                    };
                    paramList.Add(parm);
                    paramList.AddWithValue("@PhoneNumber", model.PhoneNumber);
                },
                returnParameters: delegate (SqlParameterCollection paramList)
                {
                    Id = (int)paramList["@Id"].Value;
                });
            return Id;
        }

        public void InsertPersonPhone(PersonPhoneAddRequest model)
        {
            _dataProvider.ExecuteNonQuery(
                "PersonPhone_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@UserId", model.UserId);
                    paramList.AddWithValue("@PhoneId", model.PhoneId);
                });
        }

        public int InsertProfileImage(ProfileImageAddRequest model)
        {
            int FileStorageId = 0;
            _dataProvider.ExecuteNonQuery(
                "ProfileImage_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@UserId", model.UserId);
                    paramList.AddWithValue("@FileStorageId", model.FileStorageId);
                },
                returnParameters: delegate (SqlParameterCollection paramList)
                {
                    FileStorageId = (int)paramList["@FileStorageId"].Value;
                });
            return FileStorageId;
        }

        public void DeletePersonPhone(int Id)
        {
            _dataProvider.ExecuteNonQuery(
                "PersonPhone_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@PhoneId", Id);
                });
        }
    }
}