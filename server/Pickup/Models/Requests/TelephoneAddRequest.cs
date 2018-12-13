using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pickup.Models.Requests
{
    public class TelephoneAddRequest
    {
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
    }
}