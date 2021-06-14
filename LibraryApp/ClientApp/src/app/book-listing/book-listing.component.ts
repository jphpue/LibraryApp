import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.css']
})
export class BookListingComponent implements OnInit {

  public Books: Book[] = [];
  url: string;
  http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl;
    this.http = http;
    
  }
  author: string;
  description: string;
  title: string;

  ngOnInit() {
    this.listBooks();
  } 
  refreshBooks() {
    this.Books = [];
    this.listBooks();
  }
  editBook(book: Book,id:number) {
    
  }

  listBooks() {
    var books = this.Books;
   
    this.http.get<Book[]>(this.url + 'Books/Index').subscribe(result => {

      result.forEach(function (value) {
        console.log("book added to list: " + value.author)
        books.push(value);
      });

      books.forEach(function (value) {
        console.log("books: ")
        console.log(value.author);
      });

    }, error => {
      console.log(error);
    });

}
}
class Book {
  id: number;
  author: string;
  title: string;
  description: string;
}

