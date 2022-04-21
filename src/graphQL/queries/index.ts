import { gql } from '@apollo/client';

const volcanoQuery = gql`
query MyQuery {
    fetchVolcanoes {
      FIT_ID
      code
      drumLink
      gnsID
      index
      location
      mountain
      name
      relatedVolcanoes
      s3Link
      volcanicAlerts {
        acc
        activity
        hazards
        level
        msg
        volcanoID
      }
    }
}`

const lightningQuery = gql`
query MyQuery {
    fetchLightning {
      formattedResponse {
        severity
        msg
      }
      strikes {
        features {
          geometry {
            coordinates
            type
          }
          properties {
            alertLevel
            hundredKStrikes
            name
            region
            twentyKStrikes
            type
          }
          type
        }
        type
      }
      timestamp
    }
}`

const emissionsQuery = gql`
query MyQuery {
    fetchEmissions {
      NA {
        CO2 {
          error
          measurement
          time
        }
        H2S {
          error
          measurement
          time
        }
        SO2 {
          error
          measurement
          time
        }
      }
      WI {
        SO2 {
          error
          measurement
          time
        }
        H2S {
          error
          measurement
          time
        }
        CO2 {
          error
          measurement
          time
        }
      }
      RU {
        CO2 {
          error
          measurement
          time
        }
        H2S {
          error
          measurement
          time
        }
        SO2 {
          error
          time
          measurement
        }
      }
    }
}`

export { volcanoQuery, lightningQuery, emissionsQuery };
