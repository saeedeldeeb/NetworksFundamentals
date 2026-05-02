import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';
import { DelayedAckComponent } from '../animations/delayed-ack.component';

@Component({
  selector: 'app-section7-lesson4',
  imports: [RouterLink, CodeBlockComponent, DelayedAckComponent],
  templateUrl: './lesson4.html',
  styleUrl: '../section7.css',
})
export class Section7Lesson4 {
  quickackC = `// C — disable Delayed ACK (Linux only — TCP_QUICKACK is Linux-specific)
int flag = 1;
setsockopt(socket_fd, IPPROTO_TCP, TCP_QUICKACK, &flag, sizeof(flag));
// Note: TCP_QUICKACK resets after every recv() — must be set repeatedly if needed`;

  quickackNode = `// Node.js has no direct TCP_QUICKACK binding in the stdlib.
// Options:
//  1. Use TCP_NODELAY on the sender (most effective fix)
//  2. Use a native addon for raw setsockopt control
//  3. Restructure writes so partial segments don't exist

// Most practical fix: always set TCP_NODELAY on the sender side
socket.setNoDelay(true);   // prevents Nagle from buffering → deadlock can't form`;

  debugCmd = `# Detect the 200ms Delayed ACK delay with tcpdump
# Look for gaps of ~200ms between a segment arriving and its ACK leaving
sudo tcpdump -i eth0 -ttt 'tcp and host example.com' 2>&1 | \\
  awk '/[SF]./ { prev=$1; next } { diff=$1-prev; if(diff > 0.1) print diff, $0 }'

# Or use ss to inspect socket options
ss -tin dst example.com | grep -E 'ato|rto|rtt'
# ato: ACK timeout (Delayed ACK timer value in ms)`;
}
