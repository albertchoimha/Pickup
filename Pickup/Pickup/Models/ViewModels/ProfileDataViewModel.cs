using Pickup.Models.DomainModels;
using System.Collections.Generic;

namespace Pickup.Models.ViewModels
{
    public class ProfileDataViewModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Bio { get; set; }
        public string PlayerComparison { get; set; }
        public string ShootingHand { get; set; }
        public string BasePath { get; set; }
        public string SystemFileName { get; set; }
        public List<TelephoneDomainModel> Telephones = new List<TelephoneDomainModel>();
        public string BaseUrl { get; set; }
        public int ImageId { get; set; }
        public string FQUrl
        {
            get
            {
                if (SystemFileName != null)
                {
                    return string.Format("{0}/{1}/{2}", BaseUrl, BasePath, SystemFileName);
                }
                else
                {
                    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ8NDQ0NDQ0NDQ0NDQ8NDQ0NFhEWFxYRFRUYHSggGBolHhUVITEtJSkrLi4uFx81ODMsNygtLi0BCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAJYAlgMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQUGBAMC/8QAMxABAAIBAQQFCwQDAAAAAAAAAAECAwUEESExEiJBUWEGEzJCcXKBkbHB0SNSoeFTkvH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A3oAAAAAAAAAAAAAAAAAAAAAAAAAAPbZ9lyZZ6lZnvnlEfEHiLfFodp9O8R4VjpPWdCr/AJLf6wCjFrm0TJHoWrfw9GVblxWpO69ZrPdIPgAAAAAAAAAAAAHXpmy+eyRE+jXrW9ncDp0vTPObsmTfFOyvKbf0vqVisRFYiIjlEcITEbt0RwiOEQkAAB5bRgpkr0bxEx/MeMPUBl9R2G2C3fSfRt9p8XG1+0Ya5KTS3KY+U97KZ8U472pbnWd39g8wAAAAAAAAAGh0HFuxTftvaflHD8s81OlR+hj9k/WQdYAAAAACh8oMW69L/urMT7Y/6vlT5RR1Mfvz9AUIAAAAAAAAADSaJk6WCI/ZNqz89/3ZtZaHtPQyTSfRycI8LdgNCAAACRAApfKLJxx0960/SPuurTERMzwiOMz3Qym37R53La/Zyr7scgc4AAAAAAAAAAANDpWoxkiKXndkjhEz68flZsxsem5cu6d3Qr+632hotnxTSsVtebzHrW3bweoACEuTUNlvlrurkmnfXd1be3tBWavqMX34sc9X1rR63hHgqXvtWyZMU7r13R2WjjWfi8AAAAAAAAAAATWJmYiImZnhERzmV9p2kxTdfLEWvzivOtfzL60jT/NxGS8deY4RPqx+VmCEiASIASISD5vSLRMWiJiecTG+FDqWlTTffHvmnOa85r+YaBAMYLTWNP8ANz5ykdSZ60R6s/hVgAAAAAALLRdj85fp2jq0+U2V0RvavYcHmsdadsRvt427QdAAAAAAAAAAPnJSLRNbRviY3THgym27POLJak8udZ769ktaq9d2fpY4yRzpPH3ZBnwAAAAAdmkYennp3V68/Dl/O5p1L5O4+OS/u1j6z9l2CBICBICBICEgCBIA+MlItW1Z5WiYn4vsBjb0mszWedZmJ+D5dmr4+jnv4zFvnDjAAAABoPJ+P0rT35J+kLQAAAAAAAAAAAAAZ7X4/WrPfjj6yrAAAB//2Q==";
                }
            }
        }
    }
}