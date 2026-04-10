import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';
import { NodejsLayersComponent } from '../animations/nodejs-layers.component';

@Component({
  selector: 'app-section5-lesson10',
  imports: [RouterLink, CodeBlockComponent, NodejsLayersComponent],
  templateUrl: './lesson10.html',
  styleUrl: '../section5.css',
})
export class Section5Lesson10 {
  jsServerCode = `import net from 'net';

const server = net.createServer((socket) => {
    // This callback only fires AFTER successful TCP handshake
    // SYN → SYN-ACK → ACK already completed

    console.log(
        \`TCP handshake successful with \${socket.remoteAddress}:\${socket.remotePort}\`
    );

    // Send data to client
    socket.write('Hello client!');

    // Handle incoming data
    socket.on('data', (data) => {
        console.log(\`Received: \${data.toString()}\`);
    });
});

// IMPORTANT: Always specify the IP address
server.listen(8800, '127.0.0.1');`;

  netcatCode = `# No -u flag = TCP mode (default)
nc 127.0.0.1 8800`;

  serverOutput = `TCP handshake successful with 127.0.0.1:64409`;

  multipleOutput = `TCP handshake successful with 127.0.0.1:64409
TCP handshake successful with 127.0.0.1:64428`;
}
