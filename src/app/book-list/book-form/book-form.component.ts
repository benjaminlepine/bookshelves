import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {Book} from "../../models/Book.model";
import * as firebase from 'firebase';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading: boolean =  false;
  fileUrl: string;
  filePath: string;
  fileUploaded: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private router: Router ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        author: ['', Validators.required]
      }
    );
  }

  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    // const synopsis = this.bookForm.get('synopsis').value;
    const newBook = new Book(title, author);
    // newBook.synopsis = synopsis;
    if (this.fileUrl && this.fileUrl !== '') {
      console.log('this.fileUrl = ', this.fileUrl);
      newBook.photo = this.fileUrl;
    }
    newBook.path = this.filePath;
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (path: string) => {
        firebase
          .storage()
          .ref()
          .child(path)
          .getDownloadURL()
          .then(function(url) {
            console.log('url = ', url);
            this.fileUrl = url;
            this.filePath = path;
            this.fileIsUploading = false;
            this.fileUploaded = true;
          }.bind(this));
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
