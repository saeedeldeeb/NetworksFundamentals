import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';
import { NagleCompareComponent } from '../animations/nagle-compare.component';

@Component({
  selector: 'app-section7-lesson3',
  imports: [RouterLink, CodeBlockComponent, NagleCompareComponent],
  templateUrl: './lesson3.html',
  styleUrl: '../section7.css',
})
export class Section7Lesson3 {
  nodeNoDelay = `// Node.js — disable Nagle's algorithm on a TCP socket
const net = require('net');

const server = net.createServer((socket) => {
  socket.setNoDelay(true);   // TCP_NODELAY = 1 — send immediately, don't buffer
  // Now every write() exits the kernel immediately
});`;

  codeC = `// C — disable Nagle's algorithm
int flag = 1;
setsockopt(socket_fd, IPPROTO_TCP, TCP_NODELAY, &flag, sizeof(flag));

// Check current state
int val;
socklen_t len = sizeof(val);
getsockopt(socket_fd, IPPROTO_TCP, TCP_NODELAY, &val, &len);
// val == 1 → Nagle disabled, val == 0 → Nagle enabled`;

  codePython = `# Python — disable Nagle's algorithm
import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)`;

  curlStory = `# curl disabled Nagle's algorithm by default in 2016
# Before that, TLS handshakes on some connections stalled by 200ms+
# because small handshake packets were held in Nagle's buffer.
#
# Daniel Stenberg (curl author) in the commit message:
# "After a few wasted hours hunting down the reason of slowness during
#  a TLS handshake that turns out to be because of TCP_NODELAY not
#  being set, I think we have enough motivation to toggle the default."
#
# Check curl's behavior:
curl -v --trace-time https://example.com 2>&1 | grep -E "TLS|TCP|ms"`;
}
