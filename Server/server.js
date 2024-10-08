import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/db.js';
import passport from './config/passport.js';
import errorHandler from './middleware/errorMiddleware.js';
import NotFoundMiddleware from './middleware/nofFoundMiddleware.js';
import courseRoutes from './routes/courseRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import userRoutes from './routes/userRoutes.js';
// import swaggerDocument from './swagger-output.json' assert { type: 'json' };
import session from 'express-session';
import YAML from 'yamljs';

connectDB();

const app = express();
const port = process.env.PORT;

const swaggerDocument = YAML.load('./swagger.yaml');

const corsOptions = {
    origin: process.env.NODE_ENV === 'development' ? '*' : ['https://mentoria.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/uploads', uploadRoutes);

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

app.all('*', NotFoundMiddleware)

// global error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
