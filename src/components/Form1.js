import React, { useEffect, useState } from "react";
import Tables from "./Table1";

function Forms() {
    const [obj, setObj] = useState({
        name:"",
        password:"",
        email:"",
        date:"",
        phone:""
    });
    const [tableData, setTableData] = useState([]);
    //to toggle the button
    const [toggle, settoggle] = useState(false);
    //for edit particular id
    const [tableId, setTableId] = useState(-1);
    const [table,setTable]=useState(false)
    const[userError,setError]=useState(false)
    const [validation,setValidation] = useState({
        name:"",
        password:"",
        email:"",
        date:"",
        phone:""
    })


    
    const handleChange = (e) => {
        setObj({
            ...obj,
            [e.target.name]:e.target.value
        });
        // console.log(obj);
    };

   
    const handleSubmit = (e) => {
        settoggle(false);
        e.preventDefault();
       
        if (tableId > -1) {
            let temp = tableData;
            temp.splice(tableId, 1, obj);
            setTableData(temp);
            setTableId(-1);

            //to save new data
        } 
        else if (obj.username && obj.password && obj.email &&
            obj.date && obj.phone) {
                setTable(true)
            setTableData([...tableData, obj]);
        } 
        // else if(Validate) {
        //               setTable(true)
        //     setTableData([...tableData, obj])
        else{
            alert("please fill all data properly")
        }
        setObj({
            username: "",
            password: "",
            email:"",
            date:"",
            phone:""
        });
        e.preventDefault();
    };

    const Validate=()=>{
        let errors=validation;

        //username validation 
        const username=obj.username
        const regex = "/^[a-z0-9_.]+$/"
        if(!username){
            errors.username="username is required"
        }else if(!username.match(regex)){
            errors.username="username should not have numbers"
        }else if(username.length <=3){
         errors.username="username length must be minimum of 5"
        }else if(username.length >=15){
            errors.username="username should not exceed the length of 10"
        }
        else{
            errors.username=""
        }

        //password validation 
        const password=obj.password
        //Minimum eight characters, at least one letter and one number:
        let passreg="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
       if(!password){
           errors.password="password is required"
       }else if(password.length <7){
            errors.password="password must be minimum of 8 character"
       }
       else{
           errors.password=""
       }
        

       //email validation
       const email=obj.email
       const emailreg=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;;   //must have @ . com
       if(!email){
           errors.email="email cant be empty"
       }else if (!email.match(emailreg)){
           errors.email="enter correct"
       }else{
           errors.email=""
       }


       //date validation 
       const date=obj.date
       const currentDate= new Date()
       const today=currentDate.getDate()+"/"+(currentDate.getMonth()+1)+"/"+currentDate.getFullYear()
    //    console.log(today);

       if(!date){
           errors.date="date cant be empty"
       } 
       else if(!date==today){
           console.log(date);
           console.log(today);
            errors.date="you can select only current date"
       }else{
           errors.date=" "
       }
       //phone Validation
       const phone=obj.phone
       
       if(phone===""){
           errors.phone="phone number cant be empty"
       }else if(phone.length < 9){
           errors.phone="Phone number should have 10digits"
       }else{
           errors.phone=""
       }
        setValidation(errors)
    }

    useEffect(()=>{
        Validate()
    },[obj])
    const handleDelete = (id) => {
     
        if (id > -1) {
            const updateddata = tableData.filter((val, index) => {
                return index !== id;
            });
            setTableData(updateddata);
        }
    };

    //to catch the value to edit from table component
    const handleEdit = (id) => {
        settoggle(true);
        setObj(tableData[id]);
        setTableId(id);
      
    };

    return (
        <>
            <div>
                <pre>{JSON.stringify(obj,undefined)}</pre>
                <h2>Form</h2>
                <div>
                    <label>UserName</label>
                  
                    <input
                        type="text"
                        name="username"
                        value={obj.username}
                        onChange={(e) => handleChange(e)}

                       
                    />
                </div>
                {validation.username && <p>{validation.username}</p>}
           
                <div>
                    <label>Password</label>
                  
                    <input
                        type="password"
                        name="password"
                        value={obj.password}
                        onChange={(e) => handleChange(e)}
                    /> </div>
                    {validation.password && <p>{validation.password}</p>}
                     <div>
               <label>E-mail</label>
               <input type="email"
               name="email" value={obj.email}
               onChange={handleChange}></input>
               </div>
               {validation.email && <p>{validation.email}</p>}

               <div>
               <label>Date</label>
               <input type="date"
               name="date" value={obj.date}
               onChange={handleChange}></input>
               </div>
               {validation.date && <p>{validation.date}</p>}

               <div>
               <label>Phone</label>
               <input type="number"
               name="phone" value={obj.phone}
               onChange={handleChange}></input>
               </div>
               {validation.phone && <p>{validation.phone}</p>}
               
                {toggle ? (
                    <div>
                        <button onClick={(e) => (handleSubmit(e))}>
                            Update
                        </button>
                    </div>
                ) : (
                    <div>
                        <button onClick={(e) => handleSubmit(e)}>Submit</button>
                    </div>
                )}

            </div>
            <br />
            <center>
               {table &&  <Tables
                    data={tableData}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />}
            </center>
        </>
    );
}

export default Forms;