import { Giscus } from '@giscus/react'
import { FC } from 'react'

type GiscusComponentProps = {
    theme : "light" | "dark"
}

const GiscusComponent: FC<GiscusComponentProps> = ({ theme }) => {
    return (
        <Giscus
            repo="MannyCooper/giscus-discussions"
            repoId="R_kgDOGtIyjw"
            category="Comments"
            categoryId="DIC_kwDOGtIyj84CAxTy"
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            theme={ theme }
        />
    )
}

export default GiscusComponent