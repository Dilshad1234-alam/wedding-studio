const mongoose = require('mongoose');

async function check() {
  await mongoose.connect('mongodb+srv://dilshad:7A9idnbbbqpca7w0@cluster0.0e7evlz.mongodb.net/wedding-studio');
  const db = mongoose.connection;
  const SiteContent = db.collection('sitecontent');
  const data = await SiteContent.findOne({ sectionType: 'landing' });
  console.log(JSON.stringify(data, null, 2));
  mongoose.disconnect();
}
check();
