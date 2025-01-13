const express=require('express');
const app=express();

const cors=require('cors')


const auth=require('./middleware/auth.middleware')
//app uses:
app.set('port',process.env.PORT||5000);
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-type,Authorization');
    next();
})
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
const purchaseRoutes=require('./routes/purchase.route');
const ordersUserRoutes=require('./routes/orders_user.route');
const authRoutes=require('./routes/login/auth.route')
//Use routes
app.use('/api/devolutions',auth,devolutionRoutes);
app.use('/api/users',auth,userRoutes);
app.use('/api/books',auth,bookRoutes);
app.use('/api/journals',auth,journalRoutes);
app.use('/api/admins',auth,adminRoutes);
app.use('/api/sections',auth,sectionRoutes);
app.use('/api/sanctions',auth,sancionRoutes);
app.use('/api/orders',auth,orderRoutes);
app.use('/api/reservations',auth,reservationRoutes);
app.use('/api/books_records',auth,bookRecordsRoutes);
app.use('/api/persons',auth,personRoutes);
app.use('/api/extensions',auth,extensionRoutes);
app.use('/api/purchases',auth,purchaseRoutes);
app.use('/api/orders-user',auth,ordersUserRoutes);
app.use(authRoutes);


//Handler Error:
const errorController=require('./controllers/error.controller')
app.use(errorController.get404);
app.use(errorController.get500);



//app starting...
app.listen(app.get('port'),()=>{
    console.log('Server is starting on PORT',app.get('port'))
})