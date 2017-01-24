import {Component, Input, Output, EventEmitter, HostListener} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @Input() options: any[];
  @Input() elementID: string;
  @Input() defaultValue: any;
  @Input() placeholder: string;
  @Output() select = new EventEmitter<string>();
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();
  private isOpen: boolean = false;

  @HostListener("window:mouseup", ['$event']) mouseClickHandler(event) {
    let element = event.target;

    switch (element.id) {
      case this.elementID:
        this.focus.emit();
        this.isOpen = !this.isOpen;
        break;
      case this.elementID + '-option':
        this.defaultValue = element.innerText;
        this.isOpen = false;
        this.select.emit(element.innerText);
        break;
      default:
        if (this.isOpen) {
          this.blur.emit();
          this.isOpen = false;
        }
    }
  }
}
