import axios from "axios";

// Configura tus credenciales de GeoNames
const geoNamesUsername = "minpesca1";  // Usuario GeoNames
const geoNamesBaseUrl = "https://api.geonames.org";  // URL base de GeoNames

// 1. Función para listar los estados (que serían las "regiones" en GeoNames)
export const listEstados = async () => {
  try {
    const response = await axios.get(`${geoNamesBaseUrl}/childrenJSON`, {
      params: {
        geonameId: 3625428,  // GeonameId de Venezuela
        username: geoNamesUsername,
      },
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

// 2. Función para listar los municipios
export const listMunicipios = async (estadoGeonameId: number) => {
  try {
    const response = await axios.get(`${geoNamesBaseUrl}/childrenJSON`, {
      params: {
        geonameId: estadoGeonameId,  // ID de la región (estado)
        username: geoNamesUsername
      },
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

// // 3. Función para listar las parroquias
// export const listParroquias = async (municipioGeonameId: number) => {
//   try {
//     const response = await axios.get(`${geoNamesBaseUrl}/childrenJSON`, {
//       params: {
//         geonameId: municipioGeonameId,  // ID del municipio
//         username: geoNamesUsername
//       },
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//       },
//     });
//     return response.data;
//   } catch (e) {
//     return e;
//   }
// };
