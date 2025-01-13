import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { BookModel } from 'src/app/modules/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  id!:Number;
  Book$!:Observable<BookModel[]>;

  constructor(private bookService:BookService,private router:Router, private accessId:ActivatedRoute) { }

  ngOnInit(): void {
    let id=Number(this.accessId.snapshot.paramMap.get('id'));
    this.Book$=this.bookService.getBook(id)
    this.id=id;

  }

  NavigateTo(id:Number):void{
    this.router.navigate([`books/update-book/${id}`])
  }
  DeleteBook(id:Number):void{
    this.bookService.deleteBook(id).subscribe(data=>{
      this.router.navigate([`books/books-list`])
    })
    
  }
}
