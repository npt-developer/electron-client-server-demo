import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AbstractControl, FormArray, FormGroup, FormControl } from '@angular/forms';
import { AppBreadcrumb } from 'src/app/common/breadcrumb/app-breadcrumb';
import { IPageInfo } from 'src/app/common/page/page-info.interface';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { IAppRouterData } from 'src/app/common/router/app-router-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  routerEndData$: BehaviorSubject<IAppRouterData<any>> = new BehaviorSubject(null);
  breadcrumb$: BehaviorSubject<AppBreadcrumb[]> = new BehaviorSubject(null);
  collapsedSideNav$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  isPrinter$: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(
    private _title: Title,
    private _router: Router,
    private _activedRoute: ActivatedRoute,
  ) { 
    this.initRouterEnd();
  }

  onAppClose() {
    
  }

  updatePrinter(print: boolean) {
    this.isPrinter$.next(print);
  }

  print() {
    this.isPrinter$.next(true);
    // call update view before call print
    setTimeout(() => {
      window.print();
    }, 0);
  }
  

  toggleCollapsedSideNav() {
    this.collapsedSideNav$.next(!this.collapsedSideNav$.value);
  }

  showSideNav() {
    this.collapsedSideNav$.next(false);
  }
  
  hideSideNav() {
    this.collapsedSideNav$.next(true);
  }

  public initPageInfo(pageInfo: IPageInfo) {
    if (pageInfo.breadcrumbs) {
      this.breadcrumb$.next(pageInfo.breadcrumbs);
    }
    if (pageInfo.title !== undefined) {
      this._title.setTitle(pageInfo.title);
    }
  }

  private initRouterEnd() {
    this._router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this._activedRoute),
      map(activedRoute => {
        let route: ActivatedRoute = activedRoute.firstChild;
        let child: ActivatedRoute = route;

        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
            route = child;
          } else {
            child = null;
          }
        }

        return route;
      }),
      switchMap(activedRoute => activedRoute.data),
    ).subscribe((data: IAppRouterData<any>) => {
      this.routerEndData$.next(data);
    });
  }

  ngZorroValidate(form: AbstractControl): boolean {
    if (form.invalid) {
      if (form instanceof FormArray) {
        form.controls.forEach((controls) => {
          if (controls instanceof FormGroup) {
            Object.keys(controls.controls).forEach(field => {
              const control: AbstractControl = controls.controls[field];
              if (!control.dirty) {
                control.markAsDirty();
              }
              control.updateValueAndValidity();
            })
          }
        });
      } else if (form instanceof FormGroup) {
        Object.keys(form.controls).forEach(field => {
          if  (form.controls[field] instanceof FormArray) {
            this.ngZorroValidate(form.controls[field])
          } else {
            const control: AbstractControl = form.controls[field];
            if (!control.dirty) {
              control.markAsDirty();
            }
            control.updateValueAndValidity();
          }
        })
      } else if (form instanceof FormControl) {
        form.markAsTouched({ onlySelf: true });
        if (!form.dirty) {
          form.markAsDirty();
        }
        form.updateValueAndValidity();
      }
      return false;
    }
    return true;
  }

  scrollToView(el: ElementRef<HTMLElement>): void {
    el.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
