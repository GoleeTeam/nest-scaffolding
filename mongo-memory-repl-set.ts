import { MongoMemoryReplSet } from 'mongodb-memory-server';

(async () => {
    // eslint-disable-next-line no-console
    console.log('Starting mongodb-memory-server replica set...');
    const mongodb = await MongoMemoryReplSet.create({
        replSet: {
            count: 1,
            dbName: 'test',
            storageEngine: 'wiredTiger',
        },
        instanceOpts: [{ port: 27017 }],
    });

    await mongodb.waitUntilRunning();
    // eslint-disable-next-line no-console
    console.log('mongodb is running on', mongodb.getUri());
    // eslint-disable-next-line no-console
    console.log('\nCTRL+C to stop the server');
})();
