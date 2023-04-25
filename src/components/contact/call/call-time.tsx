import { Badge } from "@/components/ui/badge"
import { useLocalizedMoment } from "@/lib/utils"
import { useMemo } from "react"

export const CallTimeComponent = (props: { call_time: string }) => {

  const s = useLocalizedMoment()

  const callTime = useMemo(() => {
    return s(props.call_time)
  }, [props.call_time])

  const currentDate = useMemo(() => {
    return s()
  }, [])

  if (!callTime.isValid()) {
    return (
      <Badge variant="destructive">Invalid</Badge>
    )
  }

  // i want to get different colors for different time periods

    return (
      <Badge>{callTime.format("DD/MM/YYYY HH:mm")}</Badge>
    )





}