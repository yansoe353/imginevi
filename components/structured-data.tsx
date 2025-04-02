import { JsonLd } from "react-schemaorg"

interface StructuredDataProps {
  data: any
}

export function StructuredData({ data }: StructuredDataProps) {
  return <JsonLd item={data} />
}

