import { Tag as AntdTag, TagProps } from 'antd'
import { CSSProperties } from 'react'

const Tag = ({ children }: { children: any }) => {
	return <AntdTag style={{ fontFamily: 'Ubuntu' }}>{children}</AntdTag>
}

export { Tag }

// надо сделать теги: Typography.Title, Typography.text, Tag

export const mainStyles: CSSProperties = {
	fontFamily: 'Ubuntu'
}
