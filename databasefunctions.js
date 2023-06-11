import mysql from "mysql2/promise";
import "dotenv/config";
const connection = mysql.createPool(process.env.DATABASE_API_KEY);

const getdata = async (data) => {
  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM untitled_table  WHERE Userid =?",
      [data.userid]
    );
    return { res: rows };
  } catch (error) {
    console.log(error);
    return { res: "error", errmsg: "error in |getdata| function" };
  }
};

const addnewuser = async (data) => {
  try {
    const res = await connection.execute(
      "INSERT INTO untitled_table (Userid, Username, Time, Online,Socketid,Connectid)" +
        "VALUES (?,?,?,?,?,?)",
      [data.userid, data.name, "100", "true", data.socketid, data.peerjsID]
    );

    console.log("this is user id    " + data.userid);
    return { res: "success" };
  } catch (error) {
    console.log(error);
    return { res: "error", errmsg: "error in |addnewuser| function" };
  }
};

const updateuser = async (data) => {
  try {
    const res = await connection.execute(
      "UPDATE untitled_table SET  Username = ?, Online =?, Socketid=? ,Connectid=? WHERE Userid =?",
      [data.name, "true", data.socketid, data.peerjsID, data.userid]
    );
    console.log(res);
    return { res: "success" };
  } catch (error) {
    console.log(error);
    return { res: "error", errmsg: "error in |updateuser| function" };
  }
};

const getallonlineusers = async (data) => {
  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM untitled_table  WHERE Online =? AND Userid != ? ",
      ["true", data.userid]
    );
    return { res: rows };
  } catch (error) {
    console.log(error);
    return { res: "error", errmsg: "error in |getallonlineusers| function" };
  }
};

const userdisconnected = async (socketid) => {
  try {
    const res = await connection.execute(
      "UPDATE untitled_table SET  Username = ?, Online =?, Socketid=? ,Connectid=? WHERE Socketid =?",
      ["", "false", "", "", socketid]
    );
    console.log(res);
    return { res: "success" };
  } catch (error) {
    console.log(error);
    return { res: "error", errmsg: "error in |userdisconnected| function" };
  }
};

const getallonlineusersforall = async () => {
  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM untitled_table  WHERE Online =? ",
      ["true"]
    );
    return { res: rows };
  } catch (error) {
    console.log(error);
    return {
      res: "error",
      errmsg: "error in |getallonlineusersforall| function",
    };
  }
};

//============================== exported functions===========================================

export const startuser = async (data) => {
  const userdata = await getdata(data);

  if (userdata.res === "error") return userdata;

  const repsonce =
    userdata.res.length > 0 ? await updateuser(data) : await addnewuser(data);

  if (repsonce.res === "error") return repsonce;
  const onlinearr = await getallonlineusers(data);

  return onlinearr;
};

export const disconnectuser = async (socketid) => {
  const disconnectrepsonce = await userdisconnected(socketid);

  if (disconnectrepsonce.res === "error") return disconnectrepsonce;

  const onlinearr = await getallonlineusersforall();
  return onlinearr;
};

export const userconnected = async () => {
  const onlinearr = await getallonlineusersforall();
  return onlinearr;
};
