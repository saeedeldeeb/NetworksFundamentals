import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KernelQueuesComponent } from '../animations/kernel-queues.component';
import { SynFloodComponent } from '../animations/syn-flood.component';
import { SocketArchComponent } from '../animations/socket-arch.component';
import { SocketShardingComponent } from '../animations/socket-sharding.component';

@Component({
  selector: 'app-section5-lesson9',
  imports: [RouterLink, KernelQueuesComponent, SynFloodComponent, SocketArchComponent, SocketShardingComponent],
  templateUrl: './lesson9.html',
  styleUrl: '../section5.css',
})
export class Section5Lesson9 {}
