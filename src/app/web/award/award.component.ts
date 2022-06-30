import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.scss'],
})
export class AwardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    document.querySelector('.containerNav')?.classList.add('sticky');
    document.getElementById('totop')!.style.display = 'block';
  }
}
