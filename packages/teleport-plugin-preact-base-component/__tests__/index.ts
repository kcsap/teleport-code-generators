import { createPlugin } from '../src/index'
import { component, elementNode } from '@teleporthq/teleport-shared/dist/cjs/builders/uidl-builders'
import { CHUNK_TYPE } from '@teleporthq/teleport-shared/dist/cjs/constants'

describe('plugin-preact-base-component', () => {
  const plugin = createPlugin({
    componentChunkName: 'component-chunk',
    exportChunkName: 'export-chunk',
  })

  it('outputs two AST chunks with the corresponding chunk names', async () => {
    const structure = {
      chunks: [],
      options: {},
      uidl: component('Test', elementNode('container')),
      dependencies: {},
    }
    const result = await plugin(structure)

    // no change to the input UIDL
    expect(JSON.stringify(result.uidl)).toBe(JSON.stringify(structure.uidl))

    // AST chunks created
    expect(result.chunks.length).toBe(2)
    expect(result.chunks[0].type).toBe(CHUNK_TYPE.AST)
    expect(result.chunks[0].content).toBeDefined()
    expect(result.chunks[0].name).toBe('component-chunk')
    expect(result.chunks[1].type).toBe(CHUNK_TYPE.AST)
    expect(result.chunks[1].content).toBeDefined()
    expect(result.chunks[1].name).toBe('export-chunk')
  })

  it('works with state definitions', async () => {
    const structure = {
      chunks: [],
      options: {},
      uidl: component(
        'Test',
        elementNode('container'),
        {},
        {
          isVisible: {
            type: 'boolean',
            defaultValue: false,
          },
        }
      ),
      dependencies: {},
    }
    const result = await plugin(structure)

    // AST chunks created
    expect(result.chunks.length).toBe(2)
    expect(result.chunks[0].type).toBe(CHUNK_TYPE.AST)
    expect(result.chunks[0].content).toBeDefined()
    expect(result.chunks[0].name).toBe('component-chunk')
    expect(result.chunks[1].type).toBe(CHUNK_TYPE.AST)
    expect(result.chunks[1].content).toBeDefined()
    expect(result.chunks[1].name).toBe('export-chunk')
  })
})