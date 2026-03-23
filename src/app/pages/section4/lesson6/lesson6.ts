import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';

@Component({
  selector: 'app-section4-lesson6',
  imports: [RouterLink, CodeBlockComponent],
  templateUrl: './lesson6.html',
  styleUrl: '../section4.css',
})
export class Section4Lesson6 {
  tcpdumpCmd = `sudo tcpdump -n -vv -i en0 host 8.8.8.8`;

  nslookupCmd = `nslookup example.com 8.8.8.8`;

  tcpdumpRequest = `12:34:56.789 IP (tos 0x0, ttl 64, id 12345,
    proto UDP (17), length 63)
    192.168.1.144.58635 > 8.8.8.8.53:
    12345+ A? example.com. (35)`;

  tcpdumpResponse = `12:34:56.812 IP (tos 0x0, ttl 120,
    proto UDP (17), length 127)
    8.8.8.8.53 > 192.168.1.144.58635:
    12345 4/0/0 A 93.184.216.34, A 93.184.216.35 (99)`;
}
