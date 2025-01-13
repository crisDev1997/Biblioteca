import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { BookService } from 'src/app/services/book.service';
import { BookSection } from 'src/app/modules/Book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  filterbooks='';
  check!:string;
  booksAll$!:Observable <BookSection[]>;
  booksAvaible$!:Observable <BookSection[]>;
  booksNotAvaible$!:Observable <BookSection[]>;
  constructor(private bookService:BookService,private router:Router) { }

  ngOnInit(): void {
    this.check="all";
    this.booksAll$=this.bookService.getAllBooks();
    this.booksAvaible$=this.bookService.getBookAvaibles();
    this.booksNotAvaible$=this.bookService.getBookNotAvaible();
  }
  Filter(filter:string){
    this.check=filter
  }
  navigateViewBook(id:Number){
    this.router.navigate([`books/view-book/${id}`])
  }
  navigateViewPdf(link:String){
    let url_ref=link.valueOf()
    window.open(url_ref,'_blank')
  }
  naviga(){
    this.router.navigate([`books/update-book/56`])
  }

}
