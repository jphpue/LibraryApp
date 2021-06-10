import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  existingBook = false;
  bookDataForm = new FormGroup({
    author: new FormControl(),
    title: new FormControl(),
    description: new FormControl()
  })



  saveNew() {
    this.existingBook = false;
  }
  saveChanges() {
    this.existingBook = true;
  }
  onSubmit(event: MouseEvent) {
    if (this.existingBook = true) {

    }
    else {

    }
    console.log(event);
  }

}
