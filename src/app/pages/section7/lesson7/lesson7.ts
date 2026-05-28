import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';
import { InterfaceBindingComponent } from '../animations/interface-binding.component';
import { PortBindingComponent } from '../animations/port-binding.component';

@Component({
  selector: 'app-section7-lesson7',
  imports: [RouterLink, CodeBlockComponent, InterfaceBindingComponent, PortBindingComponent],
  templateUrl: './lesson7.html',
  styleUrl: '../section7.css',
})
export class Section7Lesson7 {
  nodeListenExample = `const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello!');
});

// Port 0 = let the OS pick a free port (great for tests)
// '127.0.0.1' = IPv4 loopback ONLY — nothing on the network can reach this
server.listen(0, '127.0.0.1');

server.on('listening', () => {
  const addr = server.address();
  console.log(\`Listening on \${addr.address}:\${addr.port}\`);
  console.log(\`Family: \${addr.family}\`);   // 'IPv4' or 'IPv6'
});

server.on('error', (err) => {
  // err.code === 'EADDRINUSE' when the (IP, port) pair is taken
  console.error('Server error:', err.message);
});`;

  bindExamples = `# Safe — admin tools, dev servers, anything internal
server.listen(8080, '127.0.0.1');     // IPv4 loopback
server.listen(8080, '::1');           // IPv6 loopback

# Specific interface — only reachable through THAT NIC
server.listen(8080, '192.168.1.10');  // LAN only

# Dangerous default — every interface, including any public one
server.listen(8080, '0.0.0.0');       // IPv4 all interfaces
server.listen(8080, '::');            // IPv6 all interfaces

# Don't trust the string "localhost" — it may resolve to IPv4 OR IPv6
# Be explicit: use 127.0.0.1 or ::1 directly`;
}
