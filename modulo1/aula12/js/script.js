window.addEventListener("load", () => {
  doSpread();
  doRest();
  doDestructuring();
});

function doSpread() {
  const marriedMan = people.results.filter(
    (person) => person.name.title === "Mr"
  );
  const marriedWomen = people.results.filter(
    (person) => person.name.title === "Ms"
  );

  const married = [...marriedMan, ...marriedWomen];
  console.log(married);
}

function doRest() {
  console.log(infiniteSum(1, 2));
}

function doDestructuring() {
  const first = people.results[0];

  // const username = first.login.username;
  // const password = first.login.password;
  // usando destructuring

  const { username, password } = first.login;
}

function infiniteSum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
