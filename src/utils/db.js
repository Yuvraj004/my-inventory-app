import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://yuvrajchat:jvs30vubqU00wuq3@cluster0.yjrktkq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  await client.connect();
  const database = client.db('inventory_management');
  return database;
}

export { connect };
