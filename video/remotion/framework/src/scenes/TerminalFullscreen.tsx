import { Background, Terminal } from "../components";

const code = `import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('/api/*', cors());

// Routes
app.get('/', (c) => {
  return c.json({ message: 'Welcome to the API' });
});

app.get('/api/users', async (c) => {
  const users = await db.query('SELECT * FROM users');
  return c.json(users);
});

app.post('/api/users', async (c) => {
  const body = await c.req.json();
  const { name, email } = body;

  const user = await db.insert('users', { name, email });
  return c.json(user, 201);
});

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;`;

export const TerminalFullscreen: React.FC = () => {
  return (
    <Background mode="solid" color="#1a1a2e">
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <Terminal
          title="src/server.ts"
          code={code}
          language="typescript"
          theme="darker"
          width="100%"
          maxHeight="100%"
          lineNumbers={true}
          delay={10}
        />
      </div>
    </Background>
  );
};
