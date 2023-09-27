import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { SearchComponent } from './components/search/search.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DestroyBaseComponent } from './components/destroy-base/destroy-base.component';
import { SimpleTruncatePipe } from './pipes/simple-truncate.pipe';
import { MileagePipe } from './pipes/mileage.pipe';
import { DateConvertPipe } from './pipes/date-convert.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { SearchDropdownComponent } from './components/search-dropdown/search-dropdown.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { RepairComponent } from './components/repair/repair.component';
import { ClientOptionComponent } from './components/client-option/client-option.component';
import { CarOptionComponent } from './components/car-option/car-option.component';
import { RepairInfoComponent } from './components/repair-info/repair-info.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';

library.add(faPlus)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    RegisterComponent,
    SearchComponent,
    LoadingComponent,
    DestroyBaseComponent,
    SimpleTruncatePipe,
    MileagePipe,
    DateConvertPipe,
    SearchDropdownComponent,
    ClickOutsideDirective,
    RepairComponent,
    ClientOptionComponent,
    CarOptionComponent,
    RepairInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    OverlayModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    SimpleTruncatePipe,
    MileagePipe,
    DateConvertPipe
  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
