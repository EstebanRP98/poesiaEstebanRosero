import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearpoesiaPage } from './crearpoesia.page';

const routes: Routes = [
  {
    path: '',
    component: CrearpoesiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearpoesiaPageRoutingModule {}
