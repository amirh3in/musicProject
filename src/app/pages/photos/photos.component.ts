import { ApiService } from './../../api.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  constructor(private api: ApiService) { }

  posts: any = [];
  ispost: boolean = true;
  loading: boolean = false;
  count: number | any = 0;
  showData: [] | any = [];

  ngOnInit(): void {
    

    // ============== get all posts
    this.api.getPhotos().subscribe({
      next: (res) => {
        this.posts = res;
        this.getData(this.posts, this.showData);
      }, error: (err) => {
        console.log(err);
      }
    })
  }
    
    
  getData(data: [], showD: []) {

    this.loading = true;
    timer(3000).subscribe(() => {
      this.loading = false;

      let b = data.slice(this.count, this.count + 15)
      for (let i = 0; i <= 14; i++) {
        if (b[i] != undefined) {
          showD.push(b[i]);
        } else {
          this.ispost = false;
        }
      }
      this.count = this.count + 15;
    })

  }

  // ================ listen for scroll  down
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos == max) {
      
      if (this.ispost) {
        this.getData(this.posts, this.showData);
      }
    }
  }
  
}



