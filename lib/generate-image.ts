
// This function calls our API endpoint to generate an image using Gemini
export async function generateImage(prompt: string, style: string, aspectRatio: string): Promise<string> {
  try {
    console.log("Calling generate-image API with:", { prompt, style, aspectRatio })

    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        style,
        aspectRatio,
      }),
    })

    console.log("API response status:", response.status)

    const responseText = await response.text()
    console.log("Raw response text:", responseText)

    let data
    try {
      data = JSON.parse(responseText)
      console.log("Parsed response data:", data)
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError)
      throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`)
    }

    if (!response.ok) {
      console.error("API error details:", data)
      throw new Error(`API error: ${response.status} - ${data.error || "Unknown error"}`)
    }

    if (data.error) {
      console.error("Error in response data:", data)
      throw new Error(data.error)
    }

    if (!data.imageUrl) {
      console.error("No imageUrl in response:", data)
      throw new Error("No image URL returned from API")
    }

    console.log("Successfully received image URL")
    return data.imageUrl
  } catch (error) {
    console.error("Error generating image:", error)
    // Return a placeholder image in case of error
    return `/placeholder.svg?height=800&width=800&text=Error+generating+image: ${error instanceof Error ? error.message : "Unknown error"}`
  }
}

