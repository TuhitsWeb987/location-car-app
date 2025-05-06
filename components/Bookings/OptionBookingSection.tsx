import { Checkbox } from "../ui/checkbox"

export const OptionBookingSection = ({name}: {name: string}) => {
    return(
        <div className="flex flex-col gap-4">
            <Checkbox checked={true} disabled={true} className="h-6 w-6">{name}</Checkbox>
        </div>
    )
}