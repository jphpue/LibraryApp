import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  http: HttpClient;
  url: string;
  returnedValue: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl;
    this.http = http;
  }


  ngOnInit() {
  }
  existingBook = false;
  bookDataForm = new FormGroup({
    author: new FormControl(),
    title: new FormControl(),
    description: new FormControl()
  })



  saveNew(author: string, title: string, description: string) {
    this.existingBook = false;
    console.log("false");
    this.http.get<string>(this.url + 'Books/Create' +'?author=' + author + '&title=' + title + '&description='+description).subscribe(result => {

      console.log("result: "+result);
  
      

    }, error => {
        console.log(error);
    }); 
  }
  saveChanges() {
    this.existingBook = true;
    console.log("true");
  }
  onSubmit() {
    if (this.existingBook) {
     
      console.log('author:' + this.bookDataForm.get('author').value + 'title:' + this.bookDataForm.get('title').value + ' description:' + this.bookDataForm.get('description').value);
    }
    else {
      this.saveNew(this.bookDataForm.get('author').value, this.bookDataForm.get('title').value, this.bookDataForm.get('description').value)
      console.log('author:' + this.bookDataForm.get('author').value + 'title:' + this.bookDataForm.get('title').value + ' description:' + this.bookDataForm.get('description').value);
    }
    console.log(event);
  }

}
