import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor() {}
  page = 0;
  awards = ['แข่งขันศิลปะหัตถกรรม ครั้งที่ 90', 'test2', 'test3'];
  ngOnInit(): void {
    document.querySelector('.containerNav')?.classList.add('sticky')
    const page = window.localStorage.getItem('page');
    if (page) {
      this.page = parseInt(page, 10);
    }
  }

  selectPage(page: number) {
    this.page = page;
    window.localStorage.setItem('page', page.toString());
  }

  addAward() {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.awards, event.previousIndex, event.currentIndex);
    console.log(this.awards);
  }
}
