import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MomentModule} from 'angular2-moment';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {TrackingComponent} from './tracking.component';
import {TrackingRoutingModule} from './tracking-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {SelectModule} from 'ng2-select';
import {AccordionModule} from 'ng2-bootstrap';
import {DirectionsDirective} from './directions.directive';
import {AngularDateTimePickerModule} from 'vk-custom-angular2-datetimepicker';

@NgModule({
  imports: [
    TrackingRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    HttpClientModule,
    SelectModule,
    AccordionModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4Zt99xt7aUd4Sg8RUwlMGwRkRIBWC7aE'
    }),
    AngularDateTimePickerModule
  ],
  providers: [
    GoogleMapsAPIWrapper
  ],
  declarations: [TrackingComponent, DirectionsDirective]
})
export class TrackingModule {
}
