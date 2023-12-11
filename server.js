const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8005,() => {
    console.log('Run on this port 8005')
});

app.get('/',(req,res) => {
    res.json('node');
});

//----------- database connectivity ------------------

const db=mysql.createConnection({
    'host':'localhost',
    'user':'root',
    'password':'',
    'database':'ohsm_db'
});
db.connect(function(err){
    if(err){
        console.log('error');
    }else{
        console.log('Connection Successful');
    }
})

//--------------------------------------------------------------------------------------------------------------

// ------- Post a Data to the Datebase through API ------------------

app.post('/savedata',(req,res) => {
    
    const first_name=req.body.first_name;
    const last_name=req.body.last_name;
    const phone=req.body.phone;
    const email=req.body.email;
    const password=req.body.password;
    
    const values=[first_name,last_name,phone,email,password];
    const sql="INSERT INTO `profile` (`first_name`, `last_name`, `phone`, `email`, `password`) VALUES (?)";

    db.query(sql,[values],(err,data) => {
        if(err){
            res.json(err);
        }else{
            res.json('record insert successful!!');
        }
    });
});

// -----  get the data -------------


app.get('/showdata',(req,res) => {
    const sql='select * from profile where `status`=1';

    db.query(sql,function(err,data){
        if(err){
            res.json(err);
        }else{
            res.json(data)
        }
    });
});




//-------------------------------------------------------------------------------------------------------------
// ------- Post Property Data to the Datebase through API ------------------

app.post('/savepropertydata',(req,res) => {

    const property_type=req.body.property_type;
    const property_name=req.body.property_name;
    const phone=req.body.phone;
    const email=req.body.email;
    const address=req.body.address;
    const state=req.body.state;
    const city=req.body.city;
    const pin_code=req.body.pin_code;
    
    const values=[property_type,property_name,phone,email,address,state,city,pin_code];
    const sql="INSERT INTO `property` (`property_type`, `property_name`, `phone`, `email`, `address`,`state`, `city`, `pin_code`) VALUES (?)";

    db.query(sql,[values],(err,data) => {
        if(err){
            res.json(err);
        }else{
            res.json('record insert successful!!');
        }
    });
});

// -----  get the data -------------


app.get('/showpropertydata',(req,res) => {
    const sql='select * from property where `status`=1';

    db.query(sql,function(err,data){
        if(err){
            res.json(err);
        }else{
            res.json(data)
        }
    });
});


//--------------------------------------------------------------------------------------------------------------
// ------- Post Invetory Data to the Datebase through API ------------------

app.post('/saveinventorydata',(req,res) => {

    const property_space_name=req.body.property_space_name;
    const property_inventory_type=req.body.property_inventory_type;
    const other_prop_invt_type=req.body.other_prop_invt_type;
    const capacity=req.body.capacity;
    const amenities=req.body.amenities;
    const available_status=req.body.available_status;
    const note=req.body.note;
    
    const values=[property_space_name,property_inventory_type,other_prop_invt_type,capacity,amenities,available_status,note];
    const sql="INSERT INTO `inventory` (`property_space_name`, `property_inventory_type`, `other_prop_invt_type`, `capacity`, `amenities`,`available_status`, `note`) VALUES (?)";

    db.query(sql,[values],(err,data) => {
        if(err){
            res.json(err);
        }else{
            res.json('record insert successful!!');
        }
    });
});

// -----  get the data -------------


app.get('/showinventorydata',(req,res) => {
    const sql='select * from inventory where `status`=1';

    db.query(sql,function(err,data){
        if(err){
            res.json(err);
        }else{
            res.json(data)
        }
    });
});