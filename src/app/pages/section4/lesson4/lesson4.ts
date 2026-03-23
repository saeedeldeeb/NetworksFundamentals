import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';

@Component({
  selector: 'app-section4-lesson4',
  imports: [RouterLink, CodeBlockComponent],
  templateUrl: './lesson4.html',
  styleUrl: '../section4.css',
})
export class Section4Lesson4 {
  jsServerCode = `import dgram from 'dgram';

// Create UDP socket (IPv4)
const socket = dgram.createSocket('udp4');

// Bind to specific address and port
socket.bind(5500, '127.0.0.1');

// Handle incoming messages
socket.on('message', (message, info) => {
    console.log(\`My server got a datagram: \${message}\`);
    console.log(\`From: \${info.address}:\${info.port}\`);
    console.log(\`Size: \${info.size} bytes\`);
});`;

  netcatCode = `# -u flag = UDP mode (default is TCP)
nc -u 127.0.0.1 5500
hi`;

  netcatOutput = `My server got a datagram: hi
From: 127.0.0.1:53618
Size: 3 bytes`;
}
