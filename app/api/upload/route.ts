import { Pinecone } from '@pinecone-database/pinecone';

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,    // ! is a non-null assertion operator which makes sure our env variable is not null 
  });


export async function POST (req: Request ){
    try {

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file provided", { status: 400 });
    }

    //Generate a document id
    const documentId = crypto.randomUUID();

    //convert file to blob
    const blob = new Blob([await file.arrayBuffer()], { type: file.type });

    // Load and parse PDF
    const loader = new PDFLoader(blob);
    const docs = await loader.load();

    // Split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

    const splitDocs = await textSplitter.splitDocuments(docs);


    //add document id to each chunk 


    //generate summary -- openai api key requirement



    //
        
    } catch (error) {
        
    }
}