const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");
const data = require("./data.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

async function run(){
  console.log("Carregando dados...");
  for(const c of data.cities){ await db.collection("cities").doc(c.id).set(c); }
  for(const s of data.stores){ await db.collection("stores").doc(s.id).set(s); }
  for(const p of data.products){ await db.collection("products").doc(p.id).set(p); }
  console.log("Dados carregados!");
  process.exit();
}
run();