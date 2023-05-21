const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.createToken = functions.https.onCall(async (data, context) => {
  const uid = data.uid;
  
  console.log("UID received: ", uid);

  try {
    const token = await admin.auth().createCustomToken(uid);
    console.log("Token generated: ", token);
    return token;
  } catch (error) {
    console.error("Error creating custom token: ", error);
    throw new functions.https.HttpsError('internal', 'Failed to create custom token', error);
  }
});
