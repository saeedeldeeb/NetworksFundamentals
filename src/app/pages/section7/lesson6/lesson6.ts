import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';
import { TfoCookieComponent } from '../animations/tfo-cookie.component';
import { TfoCompareComponent } from '../animations/tfo-compare.component';

@Component({
  selector: 'app-section7-lesson6',
  imports: [RouterLink, CodeBlockComponent, TfoCookieComponent, TfoCompareComponent],
  templateUrl: './lesson6.html',
  styleUrl: '../section7.css',
})
export class Section7Lesson6 {
  linuxFastopen = `# Linux — TCP Fast Open is enabled by default since kernel 3.13

# Check the current setting
cat /proc/sys/net/ipv4/tcp_fastopen

# Values (bitmask):
#   0 = disabled
#   1 = enabled for outgoing connections (client)
#   2 = enabled for incoming connections (server)
#   3 = enabled for both

# Enable for both client and server
echo 3 > /proc/sys/net/ipv4/tcp_fastopen

# Make it persist across reboots
echo 'net.ipv4.tcp_fastopen = 3' >> /etc/sysctl.conf
sysctl -p`;

  useTfo = `# curl — request TCP Fast Open for the connection
curl --tcp-fastopen https://example.com

# The first call does a normal handshake and stores the cookie.
# Every later call to the same host sends the request with the SYN.

# In code, the kernel does the work — you opt in per socket:
#   setsockopt(fd, IPPROTO_TCP, TCP_FASTOPEN, ...)   // server side
#   sendto(fd, data, len, MSG_FASTOPEN, ...)         // client side`;
}
