import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer$: Subject<string> = new Subject<string>();
  private subDebouncer$!: Subscription;
  @Input() placeholder: string = '';
  @Input() initialValue: string = '';
  @Output() onValue: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.subDebouncer$ = this.debouncer$
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.subDebouncer$.unsubscribe();
  }

  emitValue(value: string) {
    this.onValue.emit(value);
  }

  onKeyPress(termino: string) {
    this.debouncer$.next(termino);
  }
}
