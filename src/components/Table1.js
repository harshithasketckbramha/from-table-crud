import React from "react";

function Tables({ data, handleDelete, handleEdit }) {
  return (
    <div>
      <table border="2">
        <thead>
          <tr>
            <td><b>Sr.No</b></td>
            <td><b>UserName</b></td>
            <td><b>Password</b></td>
            <td><b>email</b></td>
            <td><b>date</b></td>
            <td><b>phone</b></td>
            <td><b>Edit</b></td>
            <td><b>Delete</b></td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td >{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td>{item.email}</td>
                <td>{item.date}</td>
                <td>{item.phone}</td>
                <td ><button onClick={() => {handleEdit(index) }}> Edit</button>
                </td>
                <td ><button onClick={() => handleDelete(index)}>Delete</button></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tables;