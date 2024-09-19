import clientPromise from "./connect";

export async function watchMessages() {
    try {
        const client = await clientPromise
        const pipeline = [
            {
                $match: {
                    "fullDocument.messages": { $exists: true }
                }
            }
        ]
        const collection = client.db("Momo-Data").collection("chats")
        const changeStream = collection.watch(pipeline)

        changeStream.on("change", (change)=> {
            console.log('Change found', change)
        })
    } catch (err) {
        console.error('Error occurred connecting to watch messages: ', err)
    }
    
}