(async () => {
  const fs = require('fs/promises')

  const response = await fetch('https://intranet.caib.es/opendatacataleg/datastore/dump/4f171e87-38b3-4790-8c77-79d5c5def589?format=json')
  const data = await response.json()

  const json = JSON.stringify(data, null, 2)
  await fs.writeFile('alojamientos.json', json, 'utf-8')
})()