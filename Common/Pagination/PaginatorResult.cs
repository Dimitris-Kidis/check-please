namespace Common.Pagination
{
    public class PaginatorResult<T>
    {
        public List<T> Items { get; set; } = [];
        public bool HasMore { get; set; }
        public int Total { get; set; }
    }
}
