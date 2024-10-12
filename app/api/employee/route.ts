import { Pool } from "pg";
import { NextResponse } from "next/server";
import { pool } from "@/src/db/dbConect";
import { deleteRecord, getParticularData } from "@/src/db/dbUtils";

export const GET = async (req: any, res: any) => {
  try {
    const position = req.nextUrl.searchParams.get("position");
    const gender = req.nextUrl.searchParams.get("gender");
    const payload = {
      position: position,
      gender: gender,
    };
    const data = await getParticularData("employee", payload);
    return NextResponse.json({ list: data });
  } catch (err) {
    console.error("Error executing query", err);
    return NextResponse.json({ error: "Internal Server Error" });
  }
};

export const POST = async (req: any, res: any) => {
  try {
    const requestBody = await req.json();
    const { employeeName, position, gender, empId } = requestBody;
    const client = await pool.connect();
    let query = `INSERT INTO employee ("employeeName", "position", gender, "empId") VALUES ('${employeeName}', '${position}', '${gender}', '${empId}')`;

    await client.query(query);
    let getAllList = `SELECT * FROM employee ORDER BY "id" ASC`;
    const dataList = await client.query(getAllList);
    const data = dataList.rows;
    client.release();
    return NextResponse.json({ list: data });
  } catch (err) {
    console.error("Error executing query", err);
    return NextResponse.json({ error: "Internal Server Error" });
  }
};

export const DELETE = async (req: any, res: any) => {
  try {
    const requestBody = await req.json();
    const { id } = requestBody;
    const data = await deleteRecord("employee", id);
    return NextResponse.json({ list: data });
  } catch (err) {
    console.error("Error executing query", err);
    return NextResponse.json({ error: "Internal Server Error" });
  }
};

export const PUT = async (req: any, res: any) => {
  try {
    const requestBody = await req.json();
    const { id, employeeName, position, empId, gender } = requestBody;
    const client = await pool.connect();
    let query = `UPDATE employee SET "employeeName" = '${employeeName}', "position" = '${position}', gender = '${gender}', "empId" = '${empId}' WHERE id = ${id}`;

    await client.query(query);
    let getAllList = `SELECT * FROM employee ORDER BY "id" ASC`;
    const dataList = await client.query(getAllList);
    const data = dataList.rows;
    client.release();
    return NextResponse.json({ list: data });
  } catch (err) {
    console.error("Error executing query", err);
    return NextResponse.json({ error: "Internal Server Error" });
  }
};

// export const PUT = async (req: any, res: any) => {
//   try {
//     const requestBody = await req.json();
//     const payload={
//       employeeName:requestBody.employeeName,
//       position:requestBody.position,
//       gender:requestBody.gender,
//       empId:requestBody.empId,
//       id:requestBody.id
//     }
//     // const { id, employeeName, position, empId, gender } = requestBody;
//     // const client = await pool.connect();
//     // let query = `UPDATE employee SET "employeeName" = '${employeeName}', "position" = '${position}', gender = '${gender}', "empId" = '${empId}' WHERE id = ${id}`;

//     // await client.query(query);
//     // let getAllList = `SELECT * FROM employee ORDER BY "id" ASC`;
//     // const dataList = await client.query(getAllList);
//     // const data = dataList.rows;
//     // client.release();
//     // return NextResponse.json({ list: data });
//     const data = await updateRecord("employee", payload);
//     return NextResponse.json({ list: data });
//   } catch (err) {
//     console.error("Error executing query", err);
//     return NextResponse.json({ error: "Internal Server Error" });
//   }
// };