import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MuxDemuxComponent } from './animations/mux-demux.component';
import { UdpCommComponent } from './animations/udp-comm.component';
import { UdpHeaderComponent } from './animations/udp-header.component';
import { UdpEncapComponent } from './animations/udp-encap.component';
import { DnsAmplificationComponent } from './animations/dns-amplification.component';
import { UdpFloodComponent } from './animations/udp-flood.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-section4',
  imports: [
    RouterLink,
    MuxDemuxComponent,
    UdpCommComponent,
    UdpHeaderComponent,
    UdpEncapComponent,
    DnsAmplificationComponent,
    UdpFloodComponent,
    CodeBlockComponent,
  ],
  templateUrl: './section4.html',
  styleUrl: './section4.css',
})
export class Section4 {
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

  cServerCode = `#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

int main() {
    int port = 5501;
    int sockfd;
    struct sockaddr_in myaddr;
    struct sockaddr_in remoteaddr;
    char buffer[1024];
    socklen_t addr_len;

    // Create socket: IPv4, UDP
    sockfd = socket(AF_INET, SOCK_DGRAM, 0);

    // Set up address structure
    memset(&myaddr, 0, sizeof(myaddr));
    myaddr.sin_family = AF_INET;
    myaddr.sin_port = htons(port);
    inet_pton(AF_INET, "127.0.0.1", &myaddr.sin_addr);

    // Bind socket to address
    bind(sockfd, (struct sockaddr *)&myaddr,
         sizeof(myaddr));

    // Receive data
    addr_len = sizeof(remoteaddr);
    recvfrom(sockfd, buffer, sizeof(buffer), 0,
             (struct sockaddr *)&remoteaddr, &addr_len);

    printf("%s\\n", buffer);
    return 0;
}`;

  cLoopCode = `while (1) {
    recvfrom(sockfd, buffer, sizeof(buffer), 0,
             (struct sockaddr *)&remoteaddr, &addr_len);
    printf("%s\\n", buffer);
}`;

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
