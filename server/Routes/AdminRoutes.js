import express from 'express';
import db from '../utils/db.js';
import bcrypt from 'bcrypt'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router=express.Router()
//POST
router.post('/msg',(req,res)=>{
    const val=[req.body.fname,req.body.lname,req.body.email,req.body.phone,req.body.msg];
    console.log(val)
    const q='INSERT INTO msg(Fname,Lname,Email,Phone,Message) VALUES(?)';
    db.query(q,[val],(err,data)=>{
        if(err) res.json({Status:false,Error:'Query error'})
        console.log(data)
        return res.json({Status:true,Result:data})
    })
})

router.post('/appointment',(req,res)=>{
    const dt= new Date();
    const date1= req.body.date.split('-');
    const [year1, month1, day1] = date1;
    const curDate1 = `${day1}-${month1}-${year1}`;
    const dateParts = req.body.dob.split('-');
    const [year, month, day] = dateParts;
    const curDate = `${day}-${month}-${year}`;
    const time = dt.toTimeString().split(' ')[0];
    const val=[req.body.firstName,req.body.lastName,req.body.email,req.body.phone,req.body.nic,
        curDate,req.body.gender,curDate1,time,req.body.dept,req.body.doctor,req.body.address,
        req.body.hasVisited]
    const q='INSERT INTO appointment(Patient_Fname,Patient_Lname,Email,Phone,NIC,DOB,Gender,Date,Time,Department,Doctor_Name,Address,Visited) VALUES(?)';
    db.query(q,[val],(err,data)=>{
        if(err) res.json({Status:false,Error:'Query error'})
        console.log(data)
        return res.json({Status:true,Result:data})
    })
})

router.post('/register',(req,res)=>{
    const q='INSERT INTO patient(Fname,Lname,Email,Phone,NIC,DOB,Gender,Password) VALUES(?)';
    bcrypt.hash(req.body.password, 10,(err,hash)=>{
        if(err) return res.json({Status:false,Error:"Hash Error"})
        const val=[req.body.firstName,req.body.lastName,req.body.email,req.body.phone,
            req.body.nic,req.body.dob,req.body.gender,hash];
        db.query(q,[val],(err,data)=>{
            if(err) return res.json({Status:false,Error:err})
            return res.json({Status:true,Result:data})
        })
    })
})

router.post('/add_admin',(req,res)=>{
    const q='INSERT INTO admin(Name,Email,Password) VALUES(?)';
    bcrypt.hash(req.body.password, 10,(err,hash)=>{
        if(err) return res.json({Status:false,Error:"Hash Error"})
        const val=[req.body.name,req.body.email,hash];
        db.query(q,[val],(err,data)=>{
            if(err) return res.json({Status:false,Error:err})
            return res.json({Status:true,Result:data})
        })
    })
})
//Image storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Public/Images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
})

router.post('/add_doctor',upload.single('image'),(req,res)=>{
    const date = req.body.dob.split('-');
    const [year, month, day] = date;
    const curDate = `${day}-${month}-${year}`;
    const val1=[]
    const q='INSERT INTO doctor(Name,Email,Phone,DOB,Gender,Department,Password,Image) VALUES(?)';
    const q1='INSERT INTO admin(Name,Email,Password) VALUES(?)';
    bcrypt.hash(req.body.password, 10,(err,hash)=>{
        if(err) return res.json({Status:false,Error:"Hash Error"})
        const val=[req.body.name,req.body.email,req.body.phone,
            curDate,req.body.gender,req.body.department,hash,req.file.filename];
        val1.push(req.body.name,req.body.email,hash);
        db.query(q,[val],(err,data)=>{
            if(err) return res.json({Status:false,Error:err})
            db.query(q1,[val1],(err,data)=>{
                if(err) return res.json({Status:false,Error:'Error: '+err})
                return res.json({Status:true,Result:data})
            })
        })
    })
})

router.post('/deptlogin',(req,res)=>{
    const q='SELECT * FROM admin WHERE Name=?';
    db.query(q,[req.body.name],(err,data)=>{
        if(err) return res.json({Status:false,Error:"Error in Query"});
        if(data.length > 0){
            const user=data[0].Password;
            bcrypt.compare(req.body.password,user,(err,isMatch)=>{
                if(err){
                    return res.json({Status:false,Error:"Error in Match"});
                }
                if(isMatch){
                    return res.json({Status:true,Result:data});
                }
                else{
                    return res.json({Status:false,Error:"Invalid"});
                }
            })
        }else{
           return res.json({Status:false,Error:"Wrong email or password"});
        }
    })
})

router.post('/adminlogin',(req,res)=>{
    const q='SELECT * FROM admin WHERE Email=?';
    db.query(q,[req.body.email],(err,data)=>{
        if(err) return res.json({Status:false,Error:"Error in Query"});
        if(req.body.password === data[0].Password){
            return res.json({Status:true,Result:data});
        }
        else{
            return res.json({Status:false,Error:err})
        }
    })
})

router.post("/login",(req,res)=>{
    const q="SELECT * FROM patient WHERE Email=?";
    db.query(q,[req.body.email],(err,result)=>{
        if(err) return res.json({loginStatus:false,Error:"Error in Query"});
        if(result.length > 0){
            const user=result[0].Password;
            bcrypt.compare(req.body.password,user,(err,isMatch)=>{
                if(err){
                    return res.json({loginStatus:false,Error:"Error in Match"});
                }
                if(isMatch){
                    return res.json({loginStatus:true,Result:result});
                }
                else{
                    return res.json({loginStatus:false,Error:"Invalid"});
                }
            })
        }else{
           return res.json({loginStatus:false,Error:"Wrong email or password"});
        }
    })
})

router.post('/add_department',(req,res)=>{
    const q='INSERT INTO Department(Name) VALUES(?)';
    const q1='INSERT INTO admin(Name,Password) VALUES(?)';
    bcrypt.hash(req.body.password, 10,(err,hash)=>{
        if(err) return res.json({Status:false,Error:"Hash Error"})
        const val=[req.body.dept,hash];
        db.query(q,[req.body.dept],(err,data)=>{
            if(err) return res.json({Status:false,Error:err})
            db.query(q1,[val],(err,data)=>{
                if(err) return res.json({Status:false,Error:'Error: '+err})
                return res.json({Status:true,Result:data})
            })
        })
    })
})

//GET
router.get('/admin',(req,res)=>{
    const q='SELECT * FROM admin'
    db.query(q,(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error'})
        return res.json({Status:true,Result:data})
    })
})

router.get('/dept_department',(req,res)=>{
    const q='SELECT * FROM Department WHERE Name=?'
    db.query(q,[req.query.staffname],(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error'})
        console.log(data)
        return res.json({Status:true,Result:data})
    })
})

router.get('/patient',(req,res)=>{
    const q='SELECT * FROM patient'
    db.query(q,(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error'})
        return res.json({Status:true,Result:data})
    })
})

router.get('/doctors',(req,res)=>{
    const q='SELECT * FROM doctor'
    db.query(q,(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error'})
        return res.json({Status:true,Result:data})
    })
})

router.get('/doctor/:id',(req,res)=>{
    const q='SELECT * FROM doctor WHERE Id=?'
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error'})
        return res.json({Status:true,Result:data})
    })
})

router.get('/doctor_profile',(req,res)=>{
    const q='SELECT * FROM doctor WHERE Name=?'
    console.log(req.query.staffname+' Hi')
    db.query(q,[req.query.staffname],(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error'})
        return res.json({Status:true,Result:data})
    })
})

router.get('/doctors_profile',(req,res)=>{
    const q='SELECT * FROM doctor WHERE Department=?'
    console.log(req.query.staffname+' Hello')
    db.query(q,[req.query.staffname],(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error'})
        return res.json({Status:true,Result:data})
    })
})

router.get('/messages',(req,res)=>{
    const q='SELECT * FROM msg';
    db.query(q,(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error'})
        return res.json({Status:true,Result:data})
    })
})

router.get('/appointment',(req,res)=>{
    const q='SELECT * FROM appointment';
    db.query(q,(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error'})
        return res.json({Status:true,Result:data})
    })
})

router.get('/department',(req,res)=>{
    const q='SELECT * FROM Department'
    db.query(q,(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error'})
        return res.json({Status:true,Result:data})
    })
})

//PUT
router.put('/status-in',(req,res)=>{
    const {id,stat}=req.body
    const q=`UPDATE patient SET Status=? WHERE Id=${id}`
    db.query(q,[stat],(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error'})
        return res.json({Status:true,Result:data})
    })
})

router.put('/status-out/:id',(req,res)=>{
    const {stat}=req.body
    const id=req.params.id
    console.log(stat,id)
    const q='UPDATE patient SET Status=? WHERE Id=?'
    db.query(q,[stat,id],(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error: '+err})
        return res.json({Status:true,Result:data})
    })
})

router.put('/appointment/:id',(req,res)=>{
    const q='UPDATE appointment SET Status=? WHERE Id=?';
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rajageorge6789@gmail.com',
            pass: 'kaom omqi ebak zpia',
        },
    });
    db.query(q,[req.body.status,req.params.id],(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error'})
        const mailOptions = {
            from: 'rajageorge6789@gmail.com',
            to: req.body.email,
            subject: 'Your Appointment Status',
            text: `Your Appointment for GM Hospitals on ${req.body.date} is ${req.body.status}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending mail:', error);
                return res.json({ Status: false, Error: 'Failed to send confirmation mail. Please try again later.' });
            }
            res.json({ Status: true });
        });
        return res.json({Status:true,Result:data})
    })
})

router.put('/patient/:id',(req,res)=>{
    const {id}=req.params;
    const visit='Yes'
    const dt=new Date();
    const time = dt.toTimeString().split(' ')[0];
    const q1='SELECT * FROM appointment WHERE Id=?';
    const q2='SELECT * FROM onlinepatients WHERE NIC=? AND Department=? AND Doctor_Name=?';
    const q3='UPDATE onlinepatients SET Date=?,Time=?,Visited=? WHERE NIC=?';
    const q4='INSERT INTO onlinepatients (Patient_Id, NIC, Date, Time, Department, Doctor_Name, Address, Visited) VALUES(?,?,?,?,?,?,?,?)';
    const q='UPDATE appointment SET Attend=? WHERE Id=?';
    db.query(q,[visit,id],(err,data)=>{
        if(err) return res.json({Status:false,Error:'Update Query Error1: '+err})
        db.query(q1,[id],(err,data)=>{
            if(err) return res.json({Status:false,Error:'Select Query Error1'+err})
            const nic=data[0].NIC;
            const dept=data[0].Department;
            const doc=data[0].Doctor_Name;
            const add=data[0].Address;
            const date=data[0].Date;
            const pat_id=data[0].Patient_Id;
            db.query(q2,[nic,dept,doc],(err,data)=>{
                if(err) return res.json({Status:false,Error:'Select Query Error2'+err})
                if(data.length >0){
                    db.query(q3,[date,time,visit],(err,data)=>{
                        if(err) return res.json({Status:false,Error:'Select Query Error3'+err})
                    })
                }else{
                    db.query(q4,[pat_id,nic,date,time,dept,doc,add,visit],(err,data)=>{
                        if(err) return res.json({Status:false,Error:'Insert Query Error1'+err})
                        return res.json({Status:true})  
                    })
                }
            })
        })
    })
})


//DELETE
router.delete('/delete_doctor/:id',(req,res)=>{
    const q='SELECT Image FROM doctor WHERE Id=?';
    const q1='DELETE FROM doctor WHERE Id=?';
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json({Status:false,Error:'Query Error'})
        const imagePath = path.join(__dirname, 'Public/Images',data[0].Image);
        fs.unlink(imagePath, (err) => {
            if (err) console.error('Failed to delete old image:', err);
            else console.log('Old image deleted successfully');
        });
        db.query(q1,[req.params.id],(err,data)=>{
            if(err) return res.json({Status:false,Error:'Query Error'})
            return res.json({Status:true})
        })
    })
})

export {router as adminRouter};