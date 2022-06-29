import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { Directive, ElementRef, ViewContainerRef } from '@angular/core';
import { fromEvent, race, timer, zip } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

@Directive({
  selector: '[appShowLoading]',
})
export class ShowLoadingDirective {
  get imageEl() {
    return this.el.nativeElement;
  }

  constructor(private el: ElementRef<HTMLImageElement>, vc: ViewContainerRef) {
    const componentRef = vc.createComponent(LoadingSpinnerComponent);

    this.imageEl.hidden = true;
    const load$ = fromEvent(this.imageEl, 'load').pipe(map(() => true));
    const error$ = fromEvent(this.imageEl, 'error').pipe(map(() => false));

    const loaded$ = race(load$, error$);
    const delay$ = timer(500);

    zip(loaded$, delay$)
      .pipe(
        first(),
        tap(([isSuccess]) => {
          console.log(isSuccess);
          if (isSuccess) {
            this.imageEl.hidden = false;
            componentRef.destroy();
          } else {
            this.imageEl.hidden = false;
            componentRef.destroy();
          }
        })
      )
      .subscribe();
  }
}