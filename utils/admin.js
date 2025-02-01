const kafka = require('../config/kafka');
const admin=kafka.admin();
const createTopicIfNotExists = async (topic,partition) => {
    try {
      await admin.connect();
      const topics = await admin.listTopics();
      if (!topics.includes(topic)) {
        await admin.createTopics({
          topics: [{ topic ,numPartitions: partition || 1}],
        });
        console.log(`✅ Topic "${topic}" created successfully.`);
      } else {
        console.log(`🔔 Topic "${topic}" already exists.`);
      }
    } catch (error) {
      console.error("❌ Error creating topic:", error);
    } finally {
      await admin.disconnect();
    }
  };
  
  module.exports = { createTopicIfNotExists };