export const avocadoMock = {
  sys: {
    space: {
      sys: {
        type: 'Link',
        linkType: 'Space',
        id: 'process.env.CONTENTFUL_SPACE_ID',
      },
    },
  },
  fields: {
    slug: '1',
    title: 'Hass Avocado',
    description:
      'The Hass avocado is a large, pear-shaped fruit with dark green skin and a single large seed. It is one of the most popular avocado varieties in the United States, and is also known as the California avocado.',
    titleDescription: 'Hass Avocado',
    featuredImage: {
      fields: {
        file: {
          url: 'http://localhost',
        },
      },
    },
    attributes: {
      price: {
        symbol: '$',
        value: 1.99,
      },
      caracteristic: [
        {
          name: 'Color',
          value: 'Green',
        },
        {
          name: 'Shape',
          value: 'Pear',
        },
        {
          name: 'Taste',
          value: 'Sweet',
        },
      ],
    },
  },
}

export const avocadosMock = [avocadoMock]
