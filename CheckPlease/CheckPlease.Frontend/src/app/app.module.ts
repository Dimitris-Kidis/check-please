import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { TextEditControlComponent } from './common/controls/text-edit-control/text-edit-control.component';
import { NgOnDestroy } from './common/services/ng-on-destroy.service';
import { CarOptionComponent } from './components/car-option/car-option.component';
import { ClientOptionComponent } from './components/client-option/client-option.component';
import { DestroyBaseComponent } from './components/destroy-base/destroy-base.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NotificationModalModule } from './components/notification-modal/notification-modal.module';
import { RepairInfoComponent } from './components/repair-info/repair-info.component';
import { RepairRowsComponent } from './components/repair-rows/repair-rows.component';
import { RepairComponent } from './components/repair/repair.component';
import { RepairsComponent } from './components/repairs/repairs.component';
import { SearchDropdownComponent } from './components/search-dropdown/search-dropdown.component';
import { TRANSLATE_CONFIG } from './core/configs/translate.config';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';
import { SpinnerModule } from './directives/spinner/spinner.module';
import { IconsModule } from './icons/icons.module';
import { LayoutModule } from './layout/layout.module';
import { DefaultValuePipe } from './pipes/default-value.pipe';
import { SimpleTruncatePipe } from './pipes/simple-truncate.pipe';

library.add(faPlus);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // MenuComponent,
    RegisterComponent,
    // SearchComponent,
    // LoadingComponent,
    DestroyBaseComponent,
    SimpleTruncatePipe,
    // MileagePipe,
    // DateConvertPipe,
    SearchDropdownComponent,
    ClickOutsideDirective,
    RepairComponent,
    ClientOptionComponent,
    CarOptionComponent,
    RepairInfoComponent,
    RepairsComponent,
    RepairRowsComponent,
  ],
  exports: [SimpleTruncatePipe],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(),
    NgOnDestroy,
  ],
  bootstrap: [AppComponent],
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
    DragDropModule,
    MatAutocompleteModule,
    TranslateModule.forRoot(TRANSLATE_CONFIG),
    DefaultValuePipe,
    NotificationModalModule,
    TextEditControlComponent,
    SpinnerModule,
    LayoutModule,
    IconsModule,
    LoadingComponent,
  ],
})
export class AppModule {}
