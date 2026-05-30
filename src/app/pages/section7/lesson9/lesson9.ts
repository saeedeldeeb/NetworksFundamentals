import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProxyVsReverseComponent } from '../animations/proxy-vs-reverse.component';
import { ReverseProxyJobsComponent } from '../animations/reverse-proxy-jobs.component';

@Component({
  selector: 'app-section7-lesson9',
  imports: [RouterLink, ProxyVsReverseComponent, ReverseProxyJobsComponent],
  templateUrl: './lesson9.html',
  styleUrl: '../section7.css',
})
export class Section7Lesson9 {}
