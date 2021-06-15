using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using LibraryApp.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace LibraryApp.Controllers
{
    public class BooksController : Controller
    {
        //private readonly BookContext _context;
        private readonly BookContext _context = new BookContext();

        public BooksController(BookContext context)
        {
            _context = context;
        }

        // GET: Books
        public Book[] Index()
        {
            Book[] Books = _context.Books.ToArray();
            return Books;
        }

        // GET: Books/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var book = await _context.Books
                .FirstOrDefaultAsync(m => m.id == id);
            if (book == null)
            {
                return NotFound();
            }

            return View(book);
        }

        // GET: Books/Create
       
        public void Create(string author, string title, string description)
        {
            Book book = new Book
            {
                author = author,
                title = title,
                description = description
            };
             _context.Add(book);
            _context.SaveChanges();
           
        }

        // POST: Books/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id,author,title,description")] Book book)
        {
            if (ModelState.IsValid)
            {
                _context.Add(book);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(book);
        }

        // GET: Books/Edit/5
        public async Task<IActionResult> Edit(int id, [Bind("id,author,title,description")] Book book)
        {            
            if (id != book.id)
            {
                return NotFound();
            }
            else
            {
                if (ModelState.IsValid)
                {
                    try
                    {
                        _context.Update(book);
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!BookExists(book.id))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                }
            }
                return Json("Book with id " + id + " was edited");
        }

   

        // GET: Books/Delete/5
        public async Task<IActionResult>Delete(int? id) 
        {
       
            if (id == null)
            {
                return NotFound();
            }

            var book = await _context.Books
                .FirstOrDefaultAsync(m => m.id == id);
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            if (book == null)
            {
                return NotFound();
            }
            
            return Json("Book with id "+id +" was deleted");
        }


        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.id == id);
        }
    }
}
