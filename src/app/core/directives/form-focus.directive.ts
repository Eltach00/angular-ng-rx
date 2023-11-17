import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[AutoInvalidFocus]' })
export class AutoInvalidFocusDirective {
  constructor(private el: ElementRef) {}

  @HostListener('submit')
  onSubmit() {
    this.el.nativeElement.querySelector('.ng-invalid').focus()
  }
}
