namespace LocationAPI.Models
{
    public class ResponseDto
    {
        public object? Result { get; set; }
        public string Message { get; set; }
        public bool IsSucess { get; set; } = true;
    }
}
