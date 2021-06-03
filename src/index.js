const express=require('express');
const app=express();
const validateToken=require('./config/Authentification/AuthToken')
const cors=require('cors')


//app uses:
app.set('port',process.env.PORT||5000);
//middlewares
//app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

//routes
app.get('/',(req,res)=>{
    res.send('Hola Mundo')
})

//import routes
const bookRoutes=require('./routes/book.route');
const journalRoutes=require('./routes/journal.route');
const userRoutes=require('./routes/user.route');
const devolutionRoutes=require('./routes/devolution.route');
const adminRoutes=require('./routes/admin.route');
const sectionRoutes=require('./routes/section.route');
const sancionRoutes=require('./routes/sanction.routes');
const orderRoutes=require('./routes/order.route');
const reservationRoutes=require('./routes/reservation.route');
const bookRecordsRoutes=require('./routes/book_records.route');
const personRoutes=require('./routes/person.route');
const extensionRoutes=require('./routes/extension.route');
const purcharseRoutes=require('./routes/purcharse.route');
const authRoutes=require('./routes/login/auth.route')
//Use routes
app.use('/api/devolutions',validateToken,devolutionRoutes);
app.use('/api/users',validateToken,userRoutes);
app.use('/api/books',validateToken,bookRoutes);
app.use('/api/journals',validateToken,journalRoutes);
app.use('/api/admins',validateToken,adminRoutes);
app.use('/api/sections',validateToken,sectionRoutes);
app.use('/api/sanctions',validateToken,sancionRoutes);
app.use('/api/orders',validateToken,orderRoutes);
app.use('/api/reservations',validateToken,reservationRoutes);
app.use('/api/books_records',validateToken,bookRecordsRoutes);
app.use('/api/persons',validateToken,personRoutes);
app.use('/api/extensions',validateToken,extensionRoutes);
app.use('/api/purchases',validateToken,purcharseRoutes);
app.use(authRoutes);

//app starting...
app.listen(app.get('port'),()=>{
    console.log('Server is starting on PORT',app.get('port'))
})