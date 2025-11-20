const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.onPriceCreated = functions.firestore
  .document("prices/{priceId}")
  .onCreate(async (snap, context) => {
    const priceData = snap.data();
    const { productId, cityId, price } = priceData || {};

    const recentSnap = await db.collection("prices")
      .where("productId","==",productId)
      .where("cityId","==",cityId)
      .orderBy("createdAt","desc")
      .limit(10)
      .get();

    const values=[];
    recentSnap.forEach(d=>{
      const p=d.data().price;
      if(typeof p==="number") values.push(p);
    });

    const avg = values.length ? values.reduce((a,b)=>a+b,0)/values.length : price;
    const diff = Math.abs(price-avg);

    let status="verified";
    if(values.length>=3 && avg>0 && (diff/avg)>0.4){
      status="flagged";
    }

    try { await snap.ref.update({status}); } catch(e){ console.error(e); }
    return null;
});