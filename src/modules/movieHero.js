const movieHero = () => {
  const title = document.getElementById("title");

  const checkboxInput = document.querySelectorAll('input[type="checkbox"]');

  const listSpecies = document.querySelector(".sidebar .list-species");
  const listGender = document.querySelector(".sidebar .list-gender");
  const listStatus = document.querySelector(".sidebar .list-status");
  const listActors = document.querySelector(".sidebar .list-actors");
  const listMovies = document.querySelector(".sidebar .list-movies");
  const listHeroes = document.querySelector(".sidebar .list-heroes");

  const startBtn = document.querySelector(".start-btn");
  const resetBtn = document.querySelector(".reset-btn");

  const heroName = document.getElementById("name");
  const realName = document.getElementById("real-name");
  const species = document.getElementById("species");
  const gender = document.getElementById("gender");
  const birthDay = document.getElementById("birth-day");
  const deathDay = document.getElementById("death-day");
  const status = document.getElementById("status");
  const actors = document.getElementById("actors");
  const movies = document.getElementById("movies");
  const mainPhoto = document.querySelector(".main-photo");

  let hero = {}; //текущий герой - используется в finalСhoiceРeroСard(), start() и в show()

  const getData = (file) => {
    return fetch(file).then((response) => response.json());
  };

  //Вывод на экран
  const show = () => {
    heroName.textContent = hero.name ? hero.name : "-";
    realName.textContent = hero.realName ? hero.realName : hero.name;
    species.textContent = hero.species ? hero.species : "-";
    gender.textContent = hero.gender ? hero.gender : "-";
    birthDay.textContent = hero.birthDay ? hero.birthDay : "-";
    deathDay.textContent = hero.deathDay ? hero.deathDay : "-";
    status.textContent = hero.status ? hero.status : "-";
    actors.textContent = hero.actors ? hero.actors : "-";
    movies.innerHTML = ` `;
    if (hero.movies.length != 0) {
      hero.movies.forEach((movie) => {
        let li = document.createElement("li");

        li.textContent = movie;
        movies.append(li);
      });
    } else {
      movies.innerHTML = `<li>-</li>`;
    }

    mainPhoto.innerHTML = `<img src="${hero.photo}" alt="">`;
  };

  const filling = (text, select) => {
    if (select.className != "list-movies") {
      let coincidence = false;
      let option = document.createElement("option");

      option.textContent = text;

      for (let i = 0; i < select.length; i++) {
        if (select[i].textContent == text || text.trim() == "") {
          coincidence = true;
        }
      }

      if (!coincidence) {
        select.append(option);
      }
    } else {
      if (text) {
        text.forEach((movie) => {
          let coincidence = false;
          let option = document.createElement("option");

          option.textContent = movie;
          for (let i = 0; i < select.length; i++) {
            if (select[i].textContent == movie || movie.trim() == "") {
              coincidence = true;
            }
          }
          if (!coincidence) {
            select.append(option);
          }
        });
      }
    }
  };

  //Заполнение страницы контентом
  const start = () => {
    document.title = title.textContent;

    if (localStorage.getItem("Heroes") !== null) {
      hero = JSON.parse(localStorage.getItem("Heroes"));
      show();
    } else {
      hero = {
        name: "ghost",
        species: "ghost",
        status: "deceased",
        actors: "ghost",
        photo: "dbimage/ghost.png",
        movies: ["Ghostbusters"],
      };
      show();
    }

    // заполнение выпадающих списков
    getData("dbHeroes.json")
      .then((arrHeroes) => {
        arrHeroes.forEach((item) => {
          filling(item.species, listSpecies);
          filling(item.gender, listGender);
          filling(item.status, listStatus);
          filling(item.actors, listActors);
          filling(item.movies, listMovies);
        });
      })
      .catch((error) => console.log(error));

    listSpecies.addEventListener("change", () => {
      listHeroes.style.display = "none";
    });
    listGender.addEventListener("change", () => {
      listHeroes.style.display = "none";
    });
    listStatus.addEventListener("change", () => {
      listHeroes.style.display = "none";
    });
    listActors.addEventListener("change", () => {
      listHeroes.style.display = "none";
    });
    listMovies.addEventListener("change", () => {
      listHeroes.style.display = "none";
    });

    //Сброс фильтров - кнопка
    resetBtn.addEventListener("click", () => {
      listHeroes.style.display = "none";

      listSpecies.selectedIndex = 0;
      listSpecies.style.display = "none";
      listGender.selectedIndex = 0;
      listGender.style.display = "none";
      listStatus.selectedIndex = 0;
      listStatus.style.display = "none";
      listActors.selectedIndex = 0;
      listActors.style.display = "none";
      listMovies.selectedIndex = 0;
      listMovies.style.display = "none";

      checkboxInput.forEach((check) => {
        check.checked = false;
      });

      resetBtn.style.display = "none";
    });
  };

  //Выбор фильтров
  const checkoutClick = checkboxInput.forEach((check) => {
    check.addEventListener("change", (e) => {
      switch (e.target.id) {
        case "speciesCheckbox": {
          listHeroes.style.display = "none";
          listSpecies.selectedIndex = 0;
          e.target.checked
            ? (listSpecies.style.display = "block")
            : (listSpecies.style.display = "none");
          break;
        }
        case "genderСheckbox": {
          listHeroes.style.display = "none";
          listGender.selectedIndex = 0;
          e.target.checked
            ? (listGender.style.display = "block")
            : (listGender.style.display = "none");
          break;
        }
        case "statusСheckbox": {
          listHeroes.style.display = "none";
          listStatus.selectedIndex = 0;
          e.target.checked
            ? (listStatus.style.display = "block")
            : (listStatus.style.display = "none");
          break;
        }
        case "actorsСheckbox": {
          listHeroes.style.display = "none";
          listActors.selectedIndex = 0;
          e.target.checked
            ? (listActors.style.display = "block")
            : (listActors.style.display = "none");
          break;
        }
        case "moviesСheckbox": {
          listHeroes.style.display = "none";
          listMovies.selectedIndex = 0;
          e.target.checked
            ? (listMovies.style.display = "block")
            : (listMovies.style.display = "none");
          break;
        }
      }
    });
  });

  //Формирование списка для выбора героя - кнопка
  const formationFinalList = startBtn.addEventListener("click", () => {
    let filter = {};
    let filterArray = [];
    // let option;

    listHeroes.innerHTML = `<option value="" selected>Сделайте свой выбор</option>`;

    filter.species = listSpecies[listSpecies.selectedIndex].textContent;
    filter.gender = listGender[listGender.selectedIndex].textContent;
    filter.status = listStatus[listStatus.selectedIndex].textContent;
    filter.actors = listActors[listActors.selectedIndex].textContent;
    filter.movies = listMovies[listMovies.selectedIndex].textContent;

    getData("dbHeroes.json")
      .then((arrHeroes) => {
        arrHeroes.forEach((item) => {
          let movieTrue = false;
          if (item.movies) {
            item.movies.forEach((movie) => {
              if (movie == filter.movies) {
                movieTrue = true;
              }
            });
          }

          if (
            (item.species == filter.species ||
              listSpecies.selectedIndex == 0) &&
            (item.gender == filter.gender || listGender.selectedIndex == 0) &&
            (item.status == filter.status || listStatus.selectedIndex == 0) &&
            (item.actors == filter.actors || listActors.selectedIndex == 0) &&
            (movieTrue || listMovies.selectedIndex == 0)
          ) {
            filterArray.push(item);
          }
        });

        if (filterArray.length != 0) {
          filterArray.forEach((item) => {
            let option = document.createElement("option");
            option.textContent = item.name;
            listHeroes.append(option);
          });
        } else {
          listHeroes.innerHTML = `<option value="" selected>Список пуст</option>`;
        }

        listHeroes.style.display = "block";
        if (
          listSpecies.selectedIndex != 0 ||
          listGender.selectedIndex != 0 ||
          listStatus.selectedIndex != 0 ||
          listActors.selectedIndex != 0 ||
          listMovies.selectedIndex != 0
        ) {
          resetBtn.style.display = "block";
        }
      })
      .catch((error) => console.log(error));
  });

  //Итоговый выбор карточки героя
  const finalСhoiceРeroСard = listHeroes.addEventListener("change", (e) => {
    if (e.target.selectedIndex != 0) {
      getData("dbHeroes.json")
        .then((arrHeroes) => {
          arrHeroes.forEach((item) => {
            if (
              item.name.trim() ==
              e.target.options[e.target.selectedIndex].textContent.trim()
            ) {
              hero = item;
              localStorage.setItem("Heroes", JSON.stringify(hero));
              show();
            }
          });
        })
        .catch((error) => console.log(error));
    } else {
      hero = {
        name: "ghost",
        species: "ghost",
        status: "deceased",
        actors: "ghost",
        photo: "dbimage/ghost.png",
        movies: ["Ghostbusters"],
      };
      localStorage.setItem("Heroes", JSON.stringify(hero));
      show();
    }
  });

  const init = () => {
    start(); //Заполнение страницы контентом
    checkoutClick; //Выбор фильтров
    formationFinalList; //Формирование списка - кнопка
    finalСhoiceРeroСard; //Итоговый выбор карточки героя
  };

  init();
};

export default movieHero;
