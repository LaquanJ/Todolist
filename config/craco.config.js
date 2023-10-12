const path = require('path');
const webpack = require('webpack');

module.exports = {
  eslint: {
    enable: false
  },
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@utilities': path.resolve(__dirname, 'src/utilities')
    },
    plugins: [
      // Work around for Buffer is undefined:
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      })
    ],
    resolve: {
      fallback: {
        buffer: require.resolve('buffer')
      }
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@assets/(.+)': '<rootDir>/src/assets/$1',
        '^@components/(.+)': '<rootDir>/src/components/$1',
        '^@views/(.+)': '<rootDir>/src/views/$1',
        '^@utilities/(.+)': '<rootDir>/src/utilities/$1'
      },
      moduleFileExtensions: [
        'js'
      ],
      coverageDirectory: '/tmp',
      coverageReporters: [
        'text',
        [
          'cobertura',
          {
            file: 'unit.coverage.xml'
          }
        ]
      ],
      reporters: [
        'default',
        [
          'jest-junit',
          {
            outputDirectory: '/tmp'
          }
        ]
      ]
    }
  }
}