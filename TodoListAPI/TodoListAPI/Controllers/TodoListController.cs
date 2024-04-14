using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoListAPI.Models;

namespace TodoListAPI.Controllers;

[ApiController]
[Route("api/todos")]
public class TodoController : ControllerBase
{
    private readonly ILogger<TodoController> _logger; //used for logging
    private readonly TodoContext _context; //used for database access

    public TodoController(ILogger<TodoController> logger, TodoContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet(Name = "GetTodos")] // specifies route as api/todos
    public IEnumerable<TodoItem> Get()
    {
        var result = _context.TodoItems.ToList(); //retrieves list of todoitems from database
        // data is sent to client trough https response
        return result;
    }

    /*[HttpGet(Name = "done-todos")]
    public IEnumerable<TodoItem> GetDoneTodoItems()
    {
        var doneTodos = _context.TodoItems.Where(item => item.IsDone).ToList();
        return doneTodos;
    }

    [HttpGet(Name = "urgent-todos")]
    public IEnumerable<TodoItem> GetUrgentTodoItems()
    {
        var urgentTodos = _context.TodoItems.Where(item => item.IsUrgent).ToList();
        return urgentTodos;
    }*/

    [HttpPost(Name = "CreateTodoItem")]
    public async Task<ActionResult<TodoItem>> CreateTodoItem(TodoItem todoItem)
    {
        _context.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(CreateTodoItem), new { id = todoItem.Id }, todoItem);
    }

    [HttpDelete(Name = "DeleteTodoItem")]
    public async Task<IActionResult> DeleteTodoItem(Guid id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);

        if(todoItem == null)
        {
            return NotFound(); // return 404 for unsuccessful deletion
        }

        _context.TodoItems.Remove(todoItem);
        await _context.SaveChangesAsync();

        return NoContent(); // return 204 for successful deletion
    }

}

public class InsertTodoModel
{
    public string Name { get; set; }
    public string DueDate { get; set; }
    //public bool IsDone { get; set; }
    //public bool IsUrgent { get; set; }
}