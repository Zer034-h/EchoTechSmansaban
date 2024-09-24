const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event, context) => {
  try {
    // 1. Periksa apakah FAUNADB_SECRET tersedia
    if (!process.env.FAUNADB_SECRET) {
      throw new Error('FAUNADB_SECRET environment variable is missing')
    }

    const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })
    const data = JSON.parse(event.body)
    const temperature = data.temperature

    // 3. (Opsional) Buat koleksi jika belum ada
    // Anda mungkin perlu menyesuaikan ini berdasarkan pengaturan FaunaDB Anda
    // try {
    //   await client.query(
    //     q.CreateCollection({ name: 'temperatures' })
    //   )
    //   console.log('Created "temperatures" collection')
    // } catch (error) {
    //   // Abaikan kesalahan jika koleksi sudah ada
    //   if (error.requestResult.statusCode !== 400) {
    //     throw error 
    //   }
    // }

    // Save data to FaunaDB
    const result = await client.query(
      q.Create(
        q.Collection('temperatures'),
        { data: { temperature, timestamp: new Date().toISOString() } }
      )
    )

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Atau batasi ke domain spesifik jika diperlukan
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ message: "Data saved successfully", id: result.ref.id })
    }
  } catch (error) {
    console.error("Error saving data to FaunaDB:", error); // Log error ke console Netlify
    return {
      statusCode: 500,
      // Tambahkan header CORS ke respons error juga
      headers: {
        'Access-Control-Allow-Origin': '*', // Atau batasi ke domain spesifik jika diperlukan
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: error.message || "Failed to save data" })
    }
  }
}
