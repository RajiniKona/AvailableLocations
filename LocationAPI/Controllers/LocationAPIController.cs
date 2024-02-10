using AvailableLocations.Data;
using AvailableLocations.Models;
using LocationAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvailableLocations.Controllers
{
    [Route("api/location")]
    [ApiController]
    public class LocationAPIController : ControllerBase
    {
        private AppDbContext _context;
        private ResponseDto _response;
        public LocationAPIController(AppDbContext context)
        {
            _context = context;
            _response = new ResponseDto();
        }

        [HttpGet]
        public IActionResult GetLocation(string startTime, string endTime)
        {
            try
            {
                List<Location> locationList = _context.Locations.Where(x => x.StartTime >= TimeOnly.Parse(startTime) &&
                x.EndTime >= TimeOnly.Parse(endTime)).ToList();


                if (locationList.Count == 0)
                    _response.Result = Results.NoContent();
                else
                {
                    List<LocationVM> vmList = new List<LocationVM>();
                    foreach (var location in locationList)
                    {
                        LocationVM locationVM = new()
                        {
                            Id = location.Id,
                            StartTime = location.StartTime.ToString("hh:mm tt"),
                            EndTime = location.EndTime.ToString("hh:mm tt"),
                            LocationName = location.LocationName
                        };
                        vmList.Add(locationVM);
                    }
                    _response.Result = vmList;
                }

                return new JsonResult(new { success = true, Response = _response });
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message;
                _response.IsSucess = false;
                _response.Result = Results.BadRequest();
                return new JsonResult(new { success = false, Response = _response });
            }
        }

        [HttpPost]
        public IActionResult SaveLocation(string startTime, string endTime, string location)
        {
            try {
                Location locationObj= new()
                {
                    StartTime = TimeOnly.Parse(startTime),
                    EndTime = TimeOnly.Parse(endTime),
                    LocationName = location
                };
                _context.Locations.Add(locationObj);
                _context.SaveChanges();

                return new JsonResult(new { success = true, Response = _response });
            }
            catch (Exception ex)
            {
                _response.Message = ex.Message;
                _response.IsSucess = false;
                _response.Result = Results.BadRequest();
                return new JsonResult(new { success = false, Response = _response });
            }
        }
    }
}
