import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';
import { DnsResolutionComponent } from '../animations/dns-resolution.component';

@Component({
  selector: 'app-section6-lesson2',
  imports: [RouterLink, CodeBlockComponent, DnsResolutionComponent],
  templateUrl: './lesson2.html',
  styleUrl: '../section6.css',
})
export class Section6Lesson2 {
  nslookupCmd = `# Basic query (uses your router as resolver)
nslookup husseinassar.com
# Server:  192.168.1.1
# Non-authoritative answer: (from cache)
# Address: 76.76.21.21

# Query specific record types
nslookup -type=txt husseinassar.com
nslookup -type=mx husseinassar.com
nslookup -type=ns husseinassar.com

# Ask a specific resolver directly
nslookup husseinassar.com 8.8.8.8   # Google
nslookup husseinassar.com 1.1.1.1   # Cloudflare`;

  digCmd = `# Full query output
dig husseinassar.com

# Specific record types
dig husseinassar.com TXT
dig husseinassar.com MX

# Ask a specific resolver
dig @8.8.8.8 husseinassar.com

# Short output (IP only)
dig +short husseinassar.com`;
}
