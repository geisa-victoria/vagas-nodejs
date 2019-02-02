const admin = require('firebase-admin');

let serviceAccount = require('./firebaseKey.json');

//método responsável por instanciar o sdk
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

let db = admin.firestore();
db.settings({ timestampsInSnapshots: true })

module.exports = db;