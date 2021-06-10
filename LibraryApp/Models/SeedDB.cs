using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace LibraryApp.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new BookContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<BookContext>>()))
            {
                // Look for any movies.
                if (context.Books.Any())
                {
                    return;   // DB has been seeded
                }

                context.Books.AddRange(
                    new Book
                    {
                        author = "Otto Kyllönen",
                        title = ".NET kirja 1",
                        description ="Ensimmäinen neliosaisesta sarjasta"
                    },

                    new Book
                    {
                        author = "Otto Kyllönen",
                        title = ".NET kirja 2",
                        description = "Toinen neliosaisesta sarjasta"
                    },


                    new Book
                    {
                        author = "Otto Kyllönen",
                        title = ".NET kirja 3",
                        description = "Kolmas neliosaisesta sarjasta"
                    },


                    new Book
                    {
                        author = "Otto Kyllönen",
                        title = ".NET kirja 3",
                        description = "Neliosaisen sarjan viimeinen teos"
                    }

                );
                context.SaveChanges();
            }
        }
    }
}