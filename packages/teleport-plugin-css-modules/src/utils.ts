import { UIDLStyleSetDefnition, ChunkType, FileType } from '@teleporthq/teleport-types'
import { StyleUtils, StyleBuilders } from '@teleporthq/teleport-plugin-common'

export const generateCSSModulesFileFromJSON = (
  styleSheet: Record<string, UIDLStyleSetDefnition>,
  fileName: string
) => {
  const cssMap: string[] = []
  if (!styleSheet) {
    return
  }
  Object.values(styleSheet).forEach((style) => {
    const { name, content } = style
    cssMap.push(
      StyleBuilders.createCSSClass(
        name,
        // @ts-ignore
        StyleUtils.getContentOfStyleObject(content)
      )
    )
  })
  return {
    name: `${fileName}.module`,
    type: ChunkType.STRING,
    fileType: FileType.CSS,
    content: cssMap.join('\n'),
  }
}
