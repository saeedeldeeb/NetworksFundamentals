import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';
import { DbDefenseInDepthComponent } from '../animations/db-defense-in-depth.component';
import { CidrMatchComponent } from '../animations/cidr-match.component';

@Component({
  selector: 'app-section7-lesson11',
  imports: [RouterLink, CodeBlockComponent, DbDefenseInDepthComponent, CidrMatchComponent],
  templateUrl: './lesson11.html',
  styleUrl: '../section7.css',
})
export class Section7Lesson11 {
  pgHbaExample = `# TYPE   DATABASE   USER   ADDRESS              METHOD
local    all        all                         trust         # unix socket — same machine
host     all        all    127.0.0.1/32         scram-sha-256 # IPv4 loopback
host     all        all    ::1/128              scram-sha-256 # IPv6 loopback
host     all        all    10.0.0.0/24          scram-sha-256 # app servers in this subnet
host     all        all    10.0.0.100/32        reject        # known-bad host on that subnet
# Implicit final rule: anything not matched above is rejected.`;

  listenAddressesExample = `# postgresql.conf — what NICs Postgres binds to

# Safest default: loopback only — DB unreachable from the network at all
listen_addresses = 'localhost'

# Specific NIC: reachable only via this interface (e.g. the private VPC IP)
listen_addresses = '10.0.0.10'

# Multiple, comma-separated
listen_addresses = 'localhost,10.0.0.10'

# DANGEROUS — every interface, including any public one
listen_addresses = '*'        # equivalent to 0.0.0.0
`;

  otherDbExample = `# MySQL  — my.cnf
[mysqld]
bind-address = 127.0.0.1               # listen address
# user-level allowlist:
CREATE USER 'app'@'10.0.0.%' IDENTIFIED BY '...';

# MongoDB — mongod.conf
net:
  bindIp: 127.0.0.1,10.0.0.10          # comma-separated list of IPs to bind
  # net.bindIpAll: true                # equivalent of 0.0.0.0 — avoid

# Redis — redis.conf
bind 127.0.0.1 ::1
protected-mode yes                     # refuses external conns w/ no auth

# Elasticsearch — elasticsearch.yml
network.host: _site_                   # bind to the site-local interface
xpack.security.enabled: true`;
}
