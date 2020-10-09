import { promises as fs } from "fs";

async function init() {
  try {
    let states = JSON.parse(await fs.readFile("Estados.json"));
    let cities = JSON.parse(await fs.readFile("Cidades.json"));
    // createJsonStates(states, cities);

    const mappedStates = await mapStatesAndCities(states, cities);
    // imprime os 5 estados com mais cidades e os 5 estados com menos cidades
    await statesWithNumberOfCities(mappedStates);

    // imprime as cidades com maior nome de cada estado
    console.log("Cidades com maior nome de cada estado:");
    statesWithBigNameCities(mappedStates);

    // imprime as cidades com menor nome de cada estado
    console.log("Cidades com menor nome de cada estado:");
    const citiesWithSmallNames = statesWithSmallNameCities(mappedStates);
    console.log(citiesWithSmallNames);

    // imprime a cidade com maior nome entre todas as cidades
    console.log("Cidade com maior nome entre todas as cidades:");
    biggestNameCity(mappedStates);

    // imprime a cidade com menor nome entre todas as cidades
    console.log("Cidade com menor nome entre todas as cidades:");
    smallestNameCity(mappedStates);
  } catch (error) {
    console.log(error);
  }
}

async function mapStatesAndCities(states, cities) {
  states = states.map((state) => {
    const citysOfState = cities.filter((city) => {
      if (state.ID === city.Estado) return city;
    });
    return {
      UF: state.Sigla,
      cidades: citysOfState,
    };
  });
  return states;
}

async function createJsonStates(states, cities) {
  try {
    states = states.map((state) => {
      const citysOfState = cities.filter((city) => {
        if (state.ID === city.Estado) {
          return city;
        }
      });
      return {
        UF: state.Sigla,
        cidades: citysOfState,
      };
    });

    states.forEach(async (state) => {
      fs.writeFile(`src/${state.UF}.json`, JSON.stringify(state));
    });
  } catch (error) {
    console.log(error);
  }
}

async function enumerateCitiesOfState(uf) {
  const stateData = JSON.parse(await fs.readFile(`src/${uf}.json`));
  const numberOfCities = stateData.cidades.length;

  return numberOfCities;
}

async function statesWithNumberOfCities(mappedStates) {
  // console.log(JSON.stringify(mappedStates));
  let states = mappedStates;
  let arrayNumberOfCitiesOfStates = [];

  for (const state of states) {
    const numberOfCities = await enumerateCitiesOfState(state.UF);

    arrayNumberOfCitiesOfStates.push(`${state.UF} - ${numberOfCities}`);
  }
  arrayNumberOfCitiesOfStates = arrayNumberOfCitiesOfStates.sort(sortStates);

  console.log("Estados com mais cidades: ");
  statesWithMoreCities(arrayNumberOfCitiesOfStates);
  console.log("\nEstados com menos cidades: ");
  statesWithFewerCities(arrayNumberOfCitiesOfStates);
}

function sortStates(a, b) {
  let newA = a.split(" - ");
  let newB = b.split(" - ");

  return parseInt(newA[1]) > parseInt(newB[1]) ? -1 : 1;
}

function statesWithMoreCities(arrayNumberOfCitiesOfStates) {
  for (let i = 0; i < 5; i++) {
    console.log(arrayNumberOfCitiesOfStates[i]);
  }
}

function statesWithFewerCities(arrayNumberOfCitiesOfStates) {
  const arrayLength = arrayNumberOfCitiesOfStates.length;
  for (let i = arrayLength - 1; i > arrayLength - 6; i--) {
    console.log(arrayNumberOfCitiesOfStates[i]);
  }
}

function statesWithBigNameCities(mappedStates) {
  let states = mappedStates;
  let arrayStatesAndCitiesNames = [];

  for (const state of states) {
    let cityOfState;
    const cities = state.cidades;
    let citieNameLength = 0;

    for (const city of cities) {
      const cityLength = city.Nome.length;
      if (cityLength > citieNameLength) {
        citieNameLength = cityLength;
        cityOfState = `${city.Nome} - ${state.UF}`;
      }
    }
    arrayStatesAndCitiesNames.push(cityOfState);
  }

  console.log(arrayStatesAndCitiesNames);
}

function statesWithSmallNameCities(mappedStates) {
  let states = mappedStates;
  let arrayStatesAndCitiesNames = [];

  for (const state of states) {
    let cityOfState;
    const cities = state.cidades;
    let citieNameLength = 1000;

    for (const city of cities) {
      const cityLength = city.Nome.length;
      if (cityLength < citieNameLength) {
        citieNameLength = cityLength;
        cityOfState = `${city.Nome} - ${state.UF}`;
      }
    }
    arrayStatesAndCitiesNames.push(cityOfState);
  }

  // console.log(arrayStatesAndCitiesNames);
  return arrayStatesAndCitiesNames;
}

function biggestNameCity(mappedStates) {
  let states = mappedStates;
  let arrayStatesAndCitiesNames = [];
  let cityOfState;
  let citieNameLength = 0;

  for (const state of states) {
    const cities = state.cidades;

    for (const city of cities) {
      const cityLength = city.Nome.length;
      if (cityLength > citieNameLength) {
        citieNameLength = cityLength;
        cityOfState = `${city.Nome} - ${state.UF}`;
      }
    }
  }
  arrayStatesAndCitiesNames.push(cityOfState);

  console.log(arrayStatesAndCitiesNames);
}

function smallestNameCity(mappedStates) {
  let cities = statesWithSmallNameCities(mappedStates);
  cities = cities.sort();
  let smallestLength = 1000;
  let smallestLengthName = [];

  for (let city of cities) {
    city = city.split(" - ");
    if (city[0].length < smallestLength) {
      smallestLength = city[0].length;
      smallestLengthName[0] = `${city[0]} - ${city[1]}`;
    }
  }
  console.log(smallestLengthName);
}

init();
