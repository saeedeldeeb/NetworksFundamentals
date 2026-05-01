import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';
import { MtuStackComponent } from '../animations/mtu-stack.component';
import { PmtudFlowComponent } from '../animations/pmtud-flow.component';

@Component({
  selector: 'app-section7-lesson2',
  imports: [RouterLink, CodeBlockComponent, MtuStackComponent, PmtudFlowComponent],
  templateUrl: './lesson2.html',
  styleUrl: '../section7.css',
})
export class Section7Lesson2 {
  mtuCmd = `# Check interface MTU — Linux
ip link show | grep -E '^[0-9]+:|mtu'
# 2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel ...

# Check interface MTU — macOS
ifconfig | grep mtu
# en0: flags=8863<...> mtu 1500

# Test path MTU manually — Linux (ping with DF flag + large payload)
# 1472 bytes payload + 28 bytes (IP+ICMP headers) = 1500 total
ping -M do -s 1472 8.8.8.8
# Success if path MTU ≥ 1500
# "Frag needed and DF set" if path MTU < 1500`;

  jumboCmd = `# Jumbo frames — only useful when both ends AND every hop support them
# Change MTU on Linux (temporary)
ip link set eth0 mtu 9000

# Verify the change
ip link show eth0
# eth0: ... mtu 9000 ...

# Note: jumbo frames only help on private networks where you control all hardware
# Never set this on Internet-facing interfaces — packets will be fragmented or dropped`;
}
