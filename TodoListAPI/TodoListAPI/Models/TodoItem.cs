using System;
using System.ComponentModel.DataAnnotations;

namespace TodoListAPI.Models
{
	public class TodoItem
	{
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string DueDate { get; set; }
    }
}

