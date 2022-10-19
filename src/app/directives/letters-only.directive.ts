import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[lettersOnly]'
})
export class LettersOnlyDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value=initalValue.replace(/[^A-Za-z\s]*/g, '');


    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}