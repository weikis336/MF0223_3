(async () => {
  const fs = require('fs/promises')

  const json = await fs.readFile('alojamientos.json')
  const data = JSON.parse(json)
  
  let dataId = []
  let values = []

  for (const field of data.fields) {
    dataId.push(field.id)
  }

  for (const record of data.records) {
    let recordObject = {}
    for (let i = 0; i < dataId.length; i++) {
      recordObject[dataId[i]] = record[i]
    }
    values.push(recordObject)
  }

  const municipalityCount = values.reduce((acc, record) => {
    const municipality = record.Municipi
    const subgrup = ("alojamientos")
    if (!acc[municipality]) {
      acc[municipality] = {}
    }  
    if (!acc[municipality][subgrup]) {
      acc[municipality][subgrup] = { Count: 0 }
    }
    acc[municipality][subgrup].Count += 1
    return acc

  }, {})

  await fs.writeFile('alojamientoscount.json', JSON.stringify(municipalityCount, null, 2))

})()
