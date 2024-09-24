const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event, context) => {
  const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })
  
  try {
    const data = JSON.parse(event.body)
    const temperature = data.temperature
    
    // Save data to FaunaDB
    const result = await client.query(
      q.Create(
        q.Collection('temperatures'),
        { data: { temperature, timestamp: new Date().toISOString() } }
      )
    )
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data saved successfully", id: result.ref.id })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save data" })
    }
  }
}