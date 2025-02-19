import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
// import { states } from './states';

@NgModule({
  //   imports: [NgxsModule.forRoot(states)],
  imports: [NgxsModule.forRoot()],
})
export class StoreModule {}
