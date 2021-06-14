import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, NgForm, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  @Output() bookListingEvent = new EventEmitter();

  http: HttpClient;
  url: string;
  returnedValue: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl;
    this.http = http;
  }
  
  formbuilder: FormBuilder;

  //book data variables
  author: string;
  title: string;
  description: string;
  bookId: number;

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
  public Books: Book[] = [];
  public storage: Storage;
  
  ngOnInit() {
    this.listBooks();
    
  }

  refreshBooks() {
    this.Books = [];
    this.listBooks();
  }
  editBook(book: Book, id: number) {
    this.existingBook = true;
    this.author = book.author;
    this.title = book.title;
    this.description = book.description;
    this.bookId = book.id;
  }
 
  listBooks() {
    var books = this.Books;

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
    console.log(this.author)
     this.http.get<string>(this.url + 'Books/Create' +'?author=' + this.author + '&title=' + this.title + '&description='+this.description).subscribe(result => {

       this.bookDataForm.reset();
       this.refreshBooks();
 
     }, error => {
         console.log(error);
     }); 
  }
  saveChanges() {
    this.existingBook = true;
    this.http.get<string>(this.url + 'Books/Edit' + '?id=' + this.bookId + '&author=' + this.author + '&title=' + this.title + '&description='+this.description).subscribe(result => {

      this.bookDataForm.reset();
      this.refreshBooks();

    }, error => {
      console.log(error);
    }); 

  }

  delete() {
    this.http.get<string>(this.url + 'Books/Delete' + '?id=' + this.bookId).subscribe(result => {
      this.refreshBooks()

    }, error => {
      console.log(error);
    }); 
  }
  reset() {
    this.existingBook = false;
  }
  onSubmit(event, form: NgForm) {
    console.log(event.submitter.id);
    if (event.submitter.id == "save new") {
      console.log("save new");
      this.saveNew()
    }
    else if(event.submitter.id == "save changes") {
      console.log("save changes")
        this.saveChanges();
    }

    else if (event.submitter.id == "delete") {
      console.log("delete")
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
