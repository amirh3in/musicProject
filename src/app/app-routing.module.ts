import { PhotosComponent } from './pages/photos/photos.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '' , component : PlaylistsComponent},
  {path: 'photos' , component : PhotosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
