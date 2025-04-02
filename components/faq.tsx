import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  return (
    <section className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Frequently Asked Questions</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Find answers to common questions about our AI image generator
        </p>
      </div>
      <div className="mx-auto max-w-3xl py-12">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does the AI image generator work?</AccordionTrigger>
            <AccordionContent>
              We are using Google Gemini Flash 2.0 (Experimental)
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is there a limit to how many images I can generate?</AccordionTrigger>
            <AccordionContent>
              Free accounts can generate up to 3 images per day. Premium plans start at $9.99/month for 100 images and $19.99/month for unlimited generations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Who owns the copyright to generated images?</AccordionTrigger>
            <AccordionContent>
              The legal landscape around AI-generated images is evolving. While we don't claim ownership of generated images, the copyright status is still being determined by legal authorities in many jurisdictions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I edit the images after they're generated?</AccordionTrigger>
            <AccordionContent>
              Currently, we only provide basic image downloads. We recommend using external software like Photoshop or GIMP for editing. We plan to add built-in editing features in the future.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>What image formats are supported?</AccordionTrigger>
            <AccordionContent>
              All images are available for download in PNG format. We're working on adding more format options in future updates.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}

