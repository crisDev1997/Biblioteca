import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbook'
})
export class FilterBook implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    if(value){
    for(const book of value){
        let booklower=this.removeAccents(book.titulo.toLowerCase())
        let argg=this.removeAccents(arg.toLowerCase())
      if(booklower.indexOf(argg) > -1){
         resultPosts.push(book);
      };
    };
  }
    return resultPosts;
  }
  removeAccents = (str:String) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 
}