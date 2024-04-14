using Microsoft.EntityFrameworkCore;

namespace TodoListAPI.Models
{
    public class TodoContext : DbContext
    {
        private static readonly string[] TodoName = new[]
        {           
            "make sushi", "drink tea", "go running", "pack for vacation", "sleep"
        };

        private static readonly string[] TodoDueDate = new[]
        {
            "26.08.2023", "27.09.2023", "23.09.2023", "14.09.2023", "7.09.2023"
        };

        /*private static readonly bool[] TodoIsDone = new[]
        {
            false, false, false, false, false
        };

        private static readonly bool[] TodoIsUrgent = new[]
        {
            false, false, false, false, false
        };*/

        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        
        public DbSet<TodoItem> TodoItems { get; set; } //This property represents a collection of TodoItem
        //entities, and it will be used to interact with the TodoItem table in the database.

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            IEnumerable<TodoItem> toDoList = Enumerable.Range(0, 5).Select(index => new TodoItem
            {
                Id = Guid.NewGuid(),
                Name = TodoName[index],
                DueDate = TodoDueDate[index],
                //IsDone = TodoIsDone[index],
                //IsUrgent = TodoIsUrgent[index]
            });

            modelBuilder.Entity<TodoItem>().HasData(toDoList);
        }
    }
}

