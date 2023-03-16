import axios from "axios";


export const loadAllCosmetic = () => {
  return axios
    .get('https://fortnite-api.com/v2/cosmetics/br')
    .then(response =>  response.data)
}

export const searchCosmeticByName = (name) => {
  return axios
    .get('https://fortnite-api.com/v2/cosmetics/br/search/all', {params: {name, matchMethod: 'starts'}})
    .then(response =>  response.data)
}

export const loadCosmeticItem = (id) => {
  return axios
    .get(`https://fortnite-api.com/v2/cosmetics/br/${id}`)
    .then(response =>  response.data)
}
