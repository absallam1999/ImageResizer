import resizeImage from '../../router/utils/resize'

describe('Test Resize Image', () => {
  it('Should Get The Image in output Folder', async () => {
    expect(await resizeImage('fjord', 500, 500)).toBeTruthy()
  })
})
