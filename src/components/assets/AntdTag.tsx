import { Tag as AntdTag, TagProps } from 'antd'

const Tag = ({ children }: { children: any }) => {
	return <AntdTag style={{ fontFamily: 'Ubuntu' }}>{children}</AntdTag>
}

export { Tag }
