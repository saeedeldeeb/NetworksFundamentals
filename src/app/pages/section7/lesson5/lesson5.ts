import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/code-block.component';
import { HandshakeCostComponent } from '../animations/handshake-cost.component';
import { ConnectionPoolComponent } from '../animations/connection-pool.component';

@Component({
  selector: 'app-section7-lesson5',
  imports: [RouterLink, CodeBlockComponent, HandshakeCostComponent, ConnectionPoolComponent],
  templateUrl: './lesson5.html',
  styleUrl: '../section7.css',
})
export class Section7Lesson5 {
  antiPattern = `// ANTI-PATTERN — a brand-new connection on every request
import { Client } from 'pg';

app.get('/users/:id', async (req, res) => {
  const client = new Client({ host: 'db.internal' });
  await client.connect();   // full TCP handshake — pays 1.5 RTT every time
  const { rows } = await client.query('SELECT * FROM users WHERE id = $1', [
    req.params.id,
  ]);
  await client.end();       // teardown — then do it ALL again next request
  res.json(rows);
});`;

  poolCode = `// Connection pool — handshake paid once, reused forever
import { Pool } from 'pg';

const pool = new Pool({
  host: 'db.internal',
  max: 20,                      // up to 20 warm connections
  min: 5,                       // keep 5 always open (eager warm-up)
  idleTimeoutMillis: 30_000,    // reclaim idle connections after 30s
  connectionTimeoutMillis: 2_000,
});

// Pre-warm the pool at startup, so the first real
// request never pays the cold-start handshake cost.
await Promise.all(
  Array.from({ length: 5 }, () => pool.connect().then((c) => c.release())),
);

app.get('/users/:id', async (req, res) => {
  // Borrows a WARM connection — no handshake, no slow start.
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
    req.params.id,
  ]);
  res.json(rows);             // connection returns to the pool, stays open
});`;
}
