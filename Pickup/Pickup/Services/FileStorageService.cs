using Pickup.Interfaces;
using Pickup.Models.Requests;
using System.Data;
using System.Data.SqlClient;

namespace Pickup.Services
{
    public class FileStorageService : IFileStorageService
    {
        private IDataProvider _dataProvider;

        public FileStorageService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Insert(FileStorageAddRequest model)
        {
            int Id = 0;
            _dataProvider.ExecuteNonQuery(
                "FileStorage_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    SqlParameter parm = new SqlParameter
                    {
                        ParameterName = "@Id",
                        SqlDbType = SqlDbType.Int,
                        Direction = ParameterDirection.Output
                    };
                    paramList.Add(parm);
                    paramList.AddWithValue("@UserFileName", model.UserFileName);
                    paramList.AddWithValue("@BasePath", model.BasePath);
                    paramList.AddWithValue("@SystemFileName", model.SystemFileName);
                },
                returnParameters: delegate (SqlParameterCollection paramList)
                {
                    Id = (int)paramList["@Id"].Value;
                });
            return Id;
        }

        public void Update(FileStorageUpdateRequest model)
        {
            _dataProvider.ExecuteNonQuery(
                "FileStorage_Update",
                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    paramList.AddWithValue("@Id", model.Id);
                    paramList.AddWithValue("@UserFileName", model.UserFileName);
                    paramList.AddWithValue("@BasePath", model.BasePath);
                    paramList.AddWithValue("@SystemFileName", model.SystemFileName);
                });
        }
    }
}