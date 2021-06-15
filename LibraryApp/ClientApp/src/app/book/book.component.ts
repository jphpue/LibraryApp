import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, NgForm, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Output() bookListingEvent = new EventEmitter();

  http: HttpClient;
  url: string;
  returnedValue: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl;
    this.http = http;
  }
  
  //book data variables
  author: string;
  title: string;
  description: string;
  bookId: number;

  //for label to tell user if they are modifying existing or creating a new entry
  existingBook = false;


  bookDataForm = new FormGroup({
     bookId: new FormControl(),
     author: new FormControl('', [
       Validators.required
     ]),
     title: new FormControl('', [
       Validators.required,
     ]),
     description: new FormControl()
  });

  //list for books to show on result screen
  public Books: Book[] = [];
  
  ngOnInit() {
    this.listBooks();  
  }

  //to refresh list of books after adding or modifying an entry
  refreshBooks() {
    this.Books = [];
    this.listBooks();
  }
  //edit existing book
  editBook(book: Book, id: number) {
    this.existingBook = true;
    this.author = book.author;
    this.title = book.title;
    this.description = book.description;
    this.bookId = book.id;
  }

  //get books from backend
  listBooks() {
    var books = this.Books;
    //Controllers/BooksController.cs function: index
    this.http.get<Book[]>(this.url + 'Books/Index').subscribe(result => {

      result.forEach(function (value) {
        books.push(value);
      });

    }, error => {
      console.log(error);
    });

  }

  saveNew() {
    this.existingBook = false;
    //Controllers/BooksController.cs function: Create
     this.http.get<string>(this.url + 'Books/Create' +'?author=' + this.author + '&title=' + this.title + '&description='+this.description).subscribe(result => {

       this.bookDataForm.reset();
       this.refreshBooks();
 
     }, error => {
         console.log(error);
     }); 
  }
  saveChanges() {
    this.existingBook = true;
    //Controllers/BooksController.cs function: Edit
    this.http.get<string>(this.url + 'Books/Edit' + '?id=' + this.bookId + '&author=' + this.author + '&title=' + this.title + '&description=' + this.description).subscribe(result => {

      this.bookDataForm.reset();
      this.refreshBooks();

    }, error => {
      console.log(error);
    }); 

  }

  delete() {
    //Controllers/BooksController.cs function: Delete
    this.http.get<string>(this.url + 'Books/Delete' + '?id=' + this.bookId).subscribe(result => {
      this.refreshBooks()

    }, error => {
      console.log(error);
    }); 
  }
  reset() {
    this.existingBook = false;
  }

  //on submitting the form check for the button id, then determine right course of action
  onSubmit(event) {
 
    if (event.submitter.id == "save new") {
     
      this.saveNew()
    }
    else if(event.submitter.id == "save changes") {
   
        this.saveChanges();
    }

    else if (event.submitter.id == "delete") {
   
      this.delete();
    }
    this.existingBook = false;
    this.bookDataForm.reset();
  }

}

class Book {
  id: number;
  author: string;
  title: string;
  description: string;
}
