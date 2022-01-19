import { NotionText } from "./NotionTextBlock"
import { Colors } from "../../lib/colors"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle as InfoIcon, faExclamationTriangle as WarningIcon, faBell as ReminderIcon } from "@fortawesome/free-solid-svg-icons"


const NotionCallout = ({ value }: { value: any }) => {
    // read first bg color of text as callout background color
    let calloutColor = value.text[0].annotations.color

    calloutColor = calloutColor.endsWith('_background') ? calloutColor.replace('_background', '') : 'gray'

    const icon = value.icon.emoji
    function iconTransformer(icon: any){
        switch (icon) {
            case 'ℹ️':
                return <FontAwesomeIcon icon={InfoIcon} />                
                // return <Info size={20} />
            case '⚠️':
                return <FontAwesomeIcon icon={WarningIcon} />
            case '🔔':
                return <FontAwesomeIcon icon={ReminderIcon} />
                // return <AlertTriangle size={20} />
            default:
                return icon
        }
    }

    return (
        <p className={`flex p-5 my-4 space-x-3 rounded-2xl ${Colors[calloutColor].bg.light} ${Colors[calloutColor].text.msgLight}`}>
            <span className="flex items-center">
                {iconTransformer(icon)}
            </span>
            <span>
                <NotionText text={value.text} />
            </span>
        </p>
    )

}

export default NotionCallout