import {
  Directive,
  ElementRef,
  Renderer2,
  OnChanges,
  Input,
  AfterContentInit,
  HostListener
} from '@angular/core';

@Directive({selector: '[appResize]'})
export class ResizeDirective implements OnChanges, AfterContentInit {
  @Input() public appResize: any;
  @Input() public ngModel: any;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  public ngAfterContentInit(): void {
    this.setHeight();
  }

  @HostListener('keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    event.preventDefault();
  }

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.preventDefault();
  }

  ngOnChanges(): void {
    setTimeout(() => this.setHeight());
  }

  setHeight() {
    this.renderer.setStyle(this.el.nativeElement, 'height', 0);
    const height = this.el.nativeElement.scrollHeight;
    this.renderer.setStyle(this.el.nativeElement, 'height', height + 'px');
  }
}
