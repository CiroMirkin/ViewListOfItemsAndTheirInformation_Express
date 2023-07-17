import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/element', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
}));

// Middleware para establecer la Política de Seguridad de Contenido
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/element/:name', (req: Request, res: Response) => {
  const { name } = req.params;
  console.log('the element is: ', name);
  res.sendFile(path.join(__dirname, 'public', 'element.html'));
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
