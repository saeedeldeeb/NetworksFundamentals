import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';
import { CertChainComponent } from '../animations/cert-chain.component';
import { MitmCaComponent } from '../animations/mitm-ca.component';

@Component({
  selector: 'app-section6-lesson4',
  imports: [RouterLink, CodeBlockComponent, CertChainComponent, MitmCaComponent],
  templateUrl: './lesson4.html',
  styleUrl: '../section6.css',
})
export class Section6Lesson4 {
  opensslKey = `# 1. Generate a private key (4096-bit RSA)
openssl genrsa -out private-key.pem 4096
# Never share this file!

# 2. Create a self-signed certificate (dev/internal only)
openssl req -x509 -new \\
    -key private-key.pem \\
    -out certificate.pem \\
    -days 365
# You'll be prompted: Country, State, CN (must match your domain)`;

  httpsServer = `import https from 'https';
import fs from 'fs';

const server = https.createServer({
  key:  fs.readFileSync('private-key.pem'),   // your private key
  cert: fs.readFileSync('certificate.pem'),   // your certificate (public key + metadata)
}, (req, res) => {
  res.writeHead(200);
  res.end('Hello HTTPS!');
});

server.listen(8443, '127.0.0.1');
// All TLS decryption happens before your handler is called`;

  curlTest = `# Self-signed cert will fail verification
curl https://localhost:8443
# curl: (60) SSL certificate problem: self signed certificate

# Bypass certificate verification (DEV ONLY — never production)
curl --insecure https://localhost:8443   # or: curl -k

# Inspect the certificate chain
curl -v https://example.com 2>&1 | grep -A 20 "Server certificate"`;
}
