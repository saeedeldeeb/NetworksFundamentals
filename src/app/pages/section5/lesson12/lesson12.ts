import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';
import { PacketTimelineComponent } from '../animations/packet-timeline.component';

@Component({
  selector: 'app-section5-lesson12',
  imports: [RouterLink, CodeBlockComponent, PacketTimelineComponent],
  templateUrl: './lesson12.html',
  styleUrl: '../section5.css',
})
export class Section5Lesson12 {
  tcpdumpCmd = `# Find the server's IP first
ping example.com
# Returns: 93.184.216.34

# Capture TCP traffic to/from example.com on port 80
sudo tcpdump -n -i en0 \\
    '(src 93.184.216.34 or dst 93.184.216.34) and port 80'
# -n  → show IPs/ports, no DNS lookup
# -i  → listen on specific interface (find yours with ifconfig)`;

  synPacket = `IP (tos 0x0, ttl 64, id 0, flags [DF], proto TCP (6), length 64)
    192.168.254.144.51502 > 93.184.216.34.80:
    Flags [S], seq 123456789,
    win 65535, options [mss 1460, wscale 6, sackOK], length 0`;

  synAckPacket = `IP (tos 0x0, ttl 52, id 0, flags [none], proto TCP (6), length 60)
    93.184.216.34.80 > 192.168.254.144.51502:
    Flags [S.], seq 987654321, ack 123456790,
    win 65535, options [mss 1460, wscale 9, sackOK], length 0`;

  dataPacket = `IP (flags [DF], proto TCP (6), length 412)
    192.168.254.144.51502 > 93.184.216.34.80:
    Flags [P.], seq 1:361, ack 1, win 65535, length 360: HTTP: GET / HTTP/1.1`;

  responsePacket = `IP (proto TCP (6), length 1074)
    93.184.216.34.80 > 192.168.254.144.51502:
    Flags [P.], seq 1:1023, ack 361, win 133, length 1022: HTTP: HTTP/1.1 200 OK`;

  teardownPackets = `# Client closes (30s idle)
    192.168.254.144.51502 > 93.184.216.34.80: Flags [F.], seq 361, length 0
# Server replies
    93.184.216.34.80 > 192.168.254.144.51502: Flags [F.], seq 1023, ack 362, length 0
# Client confirms
    192.168.254.144.51502 > 93.184.216.34.80: Flags [.], ack 1024, length 0`;

  saveCmd = `# Save to file
sudo tcpdump -n -i en0 -w capture.pcap 'port 80'

# Read back
tcpdump -r capture.pcap

# Open in Wireshark for GUI analysis
wireshark capture.pcap`;
}
