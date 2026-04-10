import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';
import { CSyscallsComponent } from '../animations/c-syscalls.component';

@Component({
  selector: 'app-section5-lesson11',
  imports: [RouterLink, CodeBlockComponent, CSyscallsComponent],
  templateUrl: './lesson11.html',
  styleUrl: '../section5.css',
})
export class Section5Lesson11 {
  cServerCode = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8801

int main() {
    int socket_fd, new_socket;
    struct sockaddr_in server_addr, client_addr;
    socklen_t addr_len = sizeof(client_addr);
    char buffer[1024] = {0};

    // 1. Create socket (SOCK_STREAM = TCP)
    socket_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (socket_fd < 0) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }

    // 2. Configure server address
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(PORT);

    // 3. Bind socket to address
    if (bind(socket_fd, (struct sockaddr*)&server_addr, sizeof(server_addr)) < 0) {
        perror("Bind failed");
        exit(EXIT_FAILURE);
    }
    printf("Bound to port %d\\n", PORT);

    // 4. Listen for connections (backlog = 5)
    if (listen(socket_fd, 5) < 0) {
        perror("Listen failed");
        exit(EXIT_FAILURE);
    }
    printf("Listening for connections...\\n");

    // 5. Accept a connection (BLOCKS until client connects)
    new_socket = accept(socket_fd, (struct sockaddr*)&client_addr, &addr_len);
    if (new_socket < 0) {
        perror("Accept failed");
        exit(EXIT_FAILURE);
    }
    printf("Connection accepted from %s:%d\\n",
           inet_ntoa(client_addr.sin_addr),
           ntohs(client_addr.sin_port));

    // 6. Send data to client
    strcpy(buffer, "Hello from C server!");
    send(new_socket, buffer, strlen(buffer), 0);

    // 7. Close connections
    close(new_socket);
    close(socket_fd);

    return 0;
}`;

  compileCode = `gcc tcp_server.c -o tcp_server
./tcp_server`;

  serverOutput = `Bound to port 8801
Listening for connections...`;

  clientCode = `# In another terminal
nc 127.0.0.1 8801`;

  clientOutput = `Hello from C server!
# Connection closes immediately`;

  multiThreadCode = `while (1) {
    new_socket = accept(socket_fd, ...);

    // Option 1: Fork a process
    if (fork() == 0) {
        handle_client(new_socket);
        exit(0);
    }

    // Option 2: Create a thread
    pthread_create(&thread, NULL, handle_client, &new_socket);
}`;
}
