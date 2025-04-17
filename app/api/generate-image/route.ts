import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"
import sharp from "sharp"

export async function POST(request: NextRequest) {
  try {
    console.log("API route called")

    const { prompt, style, aspectRatio } = await request.json()
    console.log("Request data:", { prompt, style, aspectRatio })

    // Enhance the prompt with style information
    const enhancedPrompt = `Generate an image of: ${prompt}. Style: ${style}. Aspect ratio: ${aspectRatio}.`
    console.log("Enhanced prompt:", enhancedPrompt)

    const apiKey = process.env.GEMINI_API_KEY
    console.log("API key exists:", !!apiKey)

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined")
      return NextResponse.json({ error: "API key is not configured" }, { status: 500 })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    console.log("GoogleGenerativeAI initialized")

    console.log("Getting generative model")
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
    })
    console.log("Model obtained")

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseModalities: ["image", "text"],
      responseMimeType: "text/plain",
    }
    console.log("Generation config:", generationConfig)

    console.log("Starting chat session")
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    })
    console.log("Chat session started")

    console.log("Sending message to Gemini API")
    const result = await chatSession.sendMessage(enhancedPrompt)
    console.log("Message sent, response received")

    // Process the response to find image data
    const candidates = result.response.candidates
    let imageData = null

    if (!candidates || candidates.length === 0) {
      console.error("No candidates in response")
      return NextResponse.json({ error: "No candidates in response" }, { status: 500 })
    }

    console.log(`Found ${candidates.length} candidates`)

    for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
      console.log(`Processing candidate ${candidate_index}`)

      if (!candidates[candidate_index].content || !candidates[candidate_index].content.parts) {
        console.log(`Candidate ${candidate_index} has no content or parts`)
        continue
      }

      console.log(`Candidate ${candidate_index} has ${candidates[candidate_index].content.parts.length} parts`)

      for (let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
        console.log(`Processing part ${part_index} of candidate ${candidate_index}`)

        const part = candidates[candidate_index].content.parts[part_index]
        console.log(`Part type:`, part.text ? "text" : part.inlineData ? "inlineData" : "unknown")

        if (part.inlineData) {
          console.log(`Found inlineData in candidate ${candidate_index}, part ${part_index}`)
          console.log(`MIME type: ${part.inlineData.mimeType}`)
          console.log(`Data length: ${part.inlineData.data.length} characters`)

          // Found image data
          const mimeType = part.inlineData.mimeType
          const base64Data = part.inlineData.data
          imageData = `data:${mimeType};base64,${base64Data}`
          break
        } else if (part.text) {
          console.log(`Text content in part ${part_index}:`, part.text.substring(0, 100) + "...")
        }
      }
      if (imageData) {
        console.log("Image data found, breaking out of candidate loop")
        break
      }
    }

    if (!imageData) {
      console.error("No image data found in response")

      // Try to get text response for debugging
      let textResponse = ""
      try {
        textResponse = result.response.text ? result.response.text() : "No text response"
        console.log("Text response:", textResponse)
      } catch (textError) {
        console.error("Error getting text response:", textError)
      }

      return NextResponse.json(
        {
          error: "Failed to generate image",
          details: "No image data found in response",
          textResponse,
        },
        { status: 500 },
      )
    }

    // Add text watermark to the image
    const imageBuffer = Buffer.from(imageData.split(",")[1], "base64")
    const watermarkText = "Generated with Walone AI"
    const watermarkedImageBuffer = await sharp(imageBuffer)
      .composite([
        {
          input: Buffer.from(`<svg><text x="10" y="20" font-size="20" fill="white">${watermarkText}</text></svg>`),
          gravity: "southeast",
        },
      ])
      .toBuffer()

    const watermarkedImageData = `data:image/png;base64,${watermarkedImageBuffer.toString("base64")}`

    console.log("Returning image data with watermark")
    return NextResponse.json({ imageUrl: watermarkedImageData })
  } catch (error) {
    console.error("Error in API route:", error)

    // Get more details about the error
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorStack = error instanceof Error ? error.stack : "No stack trace"

    return NextResponse.json(
      {
        error: "Failed to generate image",
        message: errorMessage,
        stack: errorStack,
      },
      { status: 500 },
    )
  }
}
