import { use, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Translated = ({ path, as = 'span', ...props }) => {
    const { t } = useTranslation()
    //
    if (as === 'text')
        return t(path)
    return (
        <>
            {as === 'span' ? (
                <span {...props}>{t(path)}</span>
            ) : as === 'div' ? (
                <div {...props}>{t(path)}</div>
            ) : as === 'none' ? (
                <>{t(path)}</>
            ) : as === 'p' ? (
                <p {...props}>{t(path)}</p>
            ) : (
                <span {...props}>{t(path)}</span>
            )}
        </>
    )
}

export default Translated