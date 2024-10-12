import { pool } from "./dbConect";
import { Item, ParticularData } from "./types";

export const getParticularData = async (table: string, data: Item) => {
  let query = `SELECT * FROM ${table}`;
  if (data.position) {
    query += ` WHERE position = '${data.position}'`;
  } else if (data.gender) {
    query += ` WHERE gender = '${data.gender}'`;
  }
  query += ` ORDER BY id ASC`;

  const client = await pool.connect();
  try {
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
};

// export const updateRecord = async (table: string, data: Item) => {
//   console.log("Update: ",data)
//   const columns = Object.keys(data).join(", ");
//   const values = Object.values(data)
//     .map((value) => (typeof value === "string" ? `'${value}'` : value))
//     .join(", ");
//   const query = `INSERT INTO ${table} (${columns}) VALUES (${values}) WHERE 'id' = ${data?.id} ORDER BY id ASC`;
//   let getAllList = `SELECT * FROM ${table} ORDER BY "id" ASC`;

//   const client = await pool.connect();
//   try {
//    await client.query(query);
//    const result = await client.query(getAllList);
//     return result.rows;
//   } finally {
//     client.release();
//   }
// };


// export const getAllData = () => {
//   let query = `SELECT * FROM employee`;
//   return { data: query };
// };

export const insertRecord = ({
  employeeName,
  position,
  gender,
  empId,
}: Item) => {
  let query = `INSERT INTO employee ("employeeName", "position", gender, "empId") VALUES ('${employeeName}', '${position}', '${gender}', '${empId}')`;
  return { data: query };
};

export const deleteRecord=async(table:string,id:number)=>{
    let query = `DELETE FROM ${table} WHERE id = ${id}`;
    let getAllList = `SELECT * FROM ${table} ORDER BY "id" ASC`;
    const client = await pool.connect();
    try {
        await client.query(query);
        const result = await client.query(getAllList);
       return result.rows;
    } finally {
      client.release();
    }
}