import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MomentModule} from 'angular2-moment';
import {FormsModule} from '@angular/forms';
import {CategoriesComponent} from './categories.component';
import {CategoriesRoutingModule} from './categories-routing.module';
import {ToasterModule} from 'angular2-toaster';
import {ModalModule, TooltipModule} from 'ng2-bootstrap';
import {ClickCopyDirective} from './click-copy.directive';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {LaddaModule} from 'angular2-ladda';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CategoriesRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    ToasterModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AngularMultiSelectModule,
    LaddaModule,
    HttpClientModule
  ],
  declarations: [
    CategoriesComponent,
    ClickCopyDirective
  ]
})
export class CategoriesModule {
}
