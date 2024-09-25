import clientPromise from "./connect";

export async function watchMessages() {
    try {
        const client = await clientPromise;
        const pipeline = [
            {
                $match: {
                    operationType: { $in: ['insert', 'update'] }, // Watch for insertions or updates
                    "updateDescription.updatedFields.messages": { $exists: true } // Watch specifically for changes to 'messages'
                }
            }
        ];
        
        const collection = client.db("Momo-Data").collection("chats");
        const changeStream = collection.watch(pipeline);

        changeStream.on("change", (change) => {
            console.log('Change detected in messages:', change);
            
        });
    } catch (err) {
        console.error('Error occurred watching messages:', err);
    }
}
