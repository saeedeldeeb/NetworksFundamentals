import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';

@Component({
  selector: 'app-section4-lesson5',
  imports: [RouterLink, CodeBlockComponent],
  templateUrl: './lesson5.html',
  styleUrl: '../section4.css',
})
export class Section4Lesson5 {
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
}
