const cron=require('node-cron');
const sequelize = require('../config/config');
cron.schedule('0 * * * *', async () => { 
    try {
       const query = 'DELETE FROM user_session WHERE expires_at < NOW();';
      //  const [results] = await sequelize.query(query);
       console.log(`Deleted expired sessions: ${results.affectedRows}`);
    } catch (error) {
       console.error('Error deleting expired sessions:', error);
    }
 });
 