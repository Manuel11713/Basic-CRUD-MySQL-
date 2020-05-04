const app = require('express')();

app.get('/customer/:id',(req,res)=>{
    const {id} = req.params;
    req.getConnection((err,connection)=>{
        if(err)return res.json({ok:false,err});
        connection.query(`SELECT * FROM customers WHERE id=${id}`,(err,result)=>{
            if(err) return res.json({ok:false,err});

            res.json({ok:true,result});
        });
    });
});

app.post('/customer',(req,res)=>{//Crear un usuario
    const {nombre,direccion,numero,email} = req.body;

    req.getConnection((err,connection)=>{
        if(err)return res.json({ok:false,err});
        
        connection.query(`INSERT INTO customers (name,address,phone,email) VALUES ('${nombre}', '${direccion}', '${numero}','${email}')`,(err,results)=>{
            if(err) return res.json({ok:false,message:'El correo ya esta registrado'});

            return res.json({ok:true});
        });

    });
    
});

app.put('/customer',(req,res)=>{
    const {id,nombre,direccion,numero,email} = req.body;
    req.getConnection((err,connection)=>{
        if(err)return res.json({ok:false,err});
        
        connection.query(`UPDATE customers SET name = '${nombre}', address = '${direccion}', phone = '${numero}', email = '${email}' WHERE id = ${id}`,(err,results)=>{
            console.log(err);
            if(err) return res.json({ok:false,err});

            return res.json({ok:true,results});
        });

    });
});

app.delete('/customer/:id',(req,res)=>{
    const {id} = req.params;
    req.getConnection((err,connection)=>{
        if(err)return res.json({ok:false,err});

        connection.query(`DELETE FROM customers WHERE id=${id}`,(err,result)=>{
            if(err) return res.json({ok:false,err});

            res.json({ok:true,result});
        });
    });
});


module.exports = app;