import { MovieService } from '../../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as $ from 'jquery';
import cheerio from 'cheerio';

export interface MovieDetail {
  name: string,
  voice: string,
  showtime: Showtime[]
}

export interface Showtime {
  class: string
  time: string
  showtime: string
}
export interface Movie { 
  title: string, 
  type: string,
  duration: string, 
  src: string, 
  detail : MovieDetail[] 
}

import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { MatButton } from '@angular/material/button';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MovieComponent implements OnInit {
  constructor(private MovieService: MovieService) {}

  date = moment()
  movies: Movie[] = new Array();

  panelOpenState = false;

  ngOnInit(): void {
    this.update()
  }

  update() {
    let day = this.date.format("YYYY-M-D");
    
    this.movies = []

    // this.movies.push({
    //   title: "Test", 
    //   type: 'test',
    //   duration: 'test', 
    //   src: "https://cdn.majorcineplex.com/uploads/movie/3019/thumb_3019.jpg?1579061235", 
    //   detail : [{
    //     name: "01",
    //     voice: "TH/TH",
    //     showtime: ["00:00", "01:00", "02:00"]
    //   }]
    // })
    // return
    
    this.MovieService.getMovie(day).subscribe((d) => {
      const $doc = cheerio.load(d);
      $doc('div.bscbb-movie').each((i, element) => {
        // if (i != 0) return
        const $div = cheerio.load($doc(element).html() as string);
        const $detail = cheerio.load($div('div.bscbbm-theatre.bscbbm-movie').html() as string)

        let detail: MovieDetail[] = new Array();

        $detail('ul.bscbbmt-movie').each((i, el) => {
          const item = $detail(el).text().split('\n').map(s => s.trim()).filter(s => s.trim() !== '');
          let showtimes: Showtime[] = new Array()

          $detail('div.bscbbm-theatre-list-time').eq(i).each((j, time) => {
            const $a = cheerio.load($detail(time).html() as string)
            $a("a").each((k, a) => {
              showtimes.push({
                class: $a(a).attr("class") as string,
                showtime: $a(a).attr('data-showtime') as string,
                time: $a(a).text().split('\n').map(s => s.trim()).filter(s => s.trim() !== '').join(),
              })
            })
          })

          detail.push({
            name: item[0],
            voice: item[1],
            showtime: showtimes
          })
        })
        
        this.movies.push({
          title: $div('.bscbbm-cover-title').text().trim(),
          type: $div('.bscbbm-cover-cate').text().replace(/\s+/g, ''),
          duration: $div('.bscbbm-cover-time').text().trim(),
          src: $div('.bscbbm-cover-thumb > img').attr('src') as string,
          detail: detail as []
        })
      });
    });
  }

  setColor(event: MatButton) {
    let btn = $(event._elementRef.nativeElement)
    if (btn.hasClass("pasted")) {
      return ""
    } else if (btn.hasClass("nextst nowst")) {
      return "warn"
    } else {
      return "primary"
    }
  }

  book(showtime: Showtime) {
    let cinema = 1
    window.open(`https://www.majorcineplex.com/booking2/search_showtime/cinema=` + cinema + `#s` + showtime.showtime, "_blank");
  }
}

