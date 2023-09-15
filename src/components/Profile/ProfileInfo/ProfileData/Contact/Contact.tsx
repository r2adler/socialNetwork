import {FC} from 'react';


type Props = {
    title: string
    value: string
}

export const Contact: FC<Props> = ({title, value}) => {
    return (
        <div>
            {title}: {value}
        </div>
    )
}