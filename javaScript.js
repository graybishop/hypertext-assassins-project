


var movieTitle = "avengers";
// var movieIdLookupUrl = "http://www.omdbapi.com/?apikey=e3a5e648&t=" + movieTitle;
// var movieServicesLookupUrl = "https://api.themoviedb.org/3/movie/550?api_key=" + movieDBApiKey + "/movie/" + {movie_id} + "/watch/providers";
// var varifyId = "https://api.themoviedb.org/3/find/" + imdbId + "?api_key=" + movieDBApiKey + "&&external_source=imdb_id";
var movieDBApiKey = "42911e57fe3ba092d02b0df7293493b3";
var omdbApiKey = "e3a5e648";
var Id;
var entertainmentType;
var entertainmentType2;
var seasonNum;
var services = [];


function getMovieId(event) {
    event.preventDefault();
  var movieTitle = searchInput.value.trim();
  var movieIdLookupUrl =
    "http://www.omdbapi.com/?apikey=" + omdbApiKey + "&t=" + movieTitle;
  fetch(movieIdLookupUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.imdbID);
      Id = data.imdbID;
      varifyId(Id);
    });
}


function varifyId(idToVarify) {
  var findId =
    "https://api.themoviedb.org/3/find/" + idToVarify + "?api_key=" + movieDBApiKey + "&&external_source=imdb_id";
  fetch(findId)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //   console.log(data.tv_results[0].id);
      if (data.movie_results[0] != null) {
        entertainmentType = "movie";
        Id = data.movie_results[0].id;
        getStreamingServicesMovTv(Id, entertainmentType);
      } else if (data.tv_results[0] != null) {
        entertainmentType = "tv";
        Id = data.tv_results[0].id;
        getStreamingServicesMovTv(Id, entertainmentType);
      } else if (data.tv_season_results[0] != null) {
        entertainmentType = "tv";
        entertainmentType2 = "season";
        Id = data.tv_results[0].id;
        seasonNum = 1;
        getStreamingServicesTvSeason(
          Id,
          entertainmentType,
          entertainmentType2,
          seasonNum
        );
      }
    });
}


function getStreamingServicesMovTv(imdbId, entertainmentType) {
  var movieServicesLookupUrl =
    "https://api.themoviedb.org/3/" + entertainmentType + "/" + imdbId + "/watch/providers?api_key=42911e57fe3ba092d02b0df7293493b3";
  fetch(movieServicesLookupUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      if (data.results.US.flatrate != null) {
        for (var j = 0; j < data.results.US.flatrate.length; j++) {
          services[j] = data.results.US.flatrate[j].provider_name;
        }
        console.log(services);
      } else {
      console.log("No streaming services.");
      }
    });
}


function getStreamingServicesTvSeason(
  imdbId,
  entertainmentType,
  entertainmentType2,
  seasonNum
) {
  var movieServicesLookupUrl = "https://api.themoviedb.org/3/" + entertainmentType + "/" + imdbId + "/" + entertainmentType2 + "/" + seasonNum + "providers?api_key=42911e57fe3ba092d02b0df7293493b3";
  fetch(movieServicesLookupUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.results.US.flatrate != null) {
        for (var j = 0; j < data.results.US.flatrate.length; j++) {
          services[j] = data.results.US.flatrate[j].provider_name;
        }
        console.log(services);
      } else {
      console.log("No streaming services.");
      }
      console.log(data.results.US.flatrate[0].provider_name);
    });
}


var imbdTestObject = {
  "Title": "Lost",
  "Year": "2004–2010",
  "Rated": "TV-14",
  "Released": "22 Sep 2004",
  "Runtime": "44 min",
  "Genre": "Adventure, Drama, Fantasy",
  "Director": "N/A",
  "Writer": "J.J. Abrams, Jeffrey Lieber, Damon Lindelof",
  "Actors": "Jorge Garcia, Josh Holloway, Yunjin Kim",
  "Plot": "The survivors of a plane crash are forced to work together in order to survive on a seemingly deserted tropical island.",
  "Language": "English, Portuguese, Spanish, Arabic, French, Korean, German, Latin, Russian, Japanese",
  "Country": "United States",
  "Awards": "Won 10 Primetime Emmys. 113 wins & 397 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BNzhlY2E5NDUtYjJjYy00ODg3LWFkZWQtYTVmMzU4ZWZmOWJkXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
  "Ratings": [
      {
          "Source": "Internet Movie Database",
          "Value": "8.3/10"
      },
      {
          "Source": "Rotten Tomatoes",
          "Value": "80%"
      }
  ],
  "Metascore": "N/A",
  "imdbRating": "8.3",
  "imdbVotes": "517,637",
  "imdbID": "tt0411008",
  "Type": "series",
  "totalSeasons": "6",
  "Response": "True"
}


var typeTest = {
  "movie_results": [],
  "person_results": [],
  "tv_results": [
      {
          "name": "Lost",
          "backdrop_path": "/nqzBAMnuMI0xuwtdlEcxcQafyXY.jpg",
          "original_name": "Lost",
          "origin_country": [
              "US"
          ],
          "original_language": "en",
          "vote_count": 2489,
          "poster_path": "/og6S0aTZU6YUJAbqxeKjCa3kY1E.jpg",
          "vote_average": 7.9,
          "genre_ids": [
              10759,
              9648
          ],
          "first_air_date": "2004-09-22",
          "id": 4607,
          "overview": "Stripped of everything, the survivors of a horrific plane crash  must work together to stay alive. But the island holds many secrets.",
          "popularity": 168.563
      }
  ],
  "tv_episode_results": [],
  "tv_season_results": []
}



var servicesTest = {
  "id": 4607,
  "results": {
      "AR": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=AR",
          "flatrate": [
              {
                  "display_priority": 6,
                  "logo_path": "/db6NofOblrtYcwH9qXuzyMf68Ao.jpg",
                  "provider_id": 619,
                  "provider_name": "Star Plus"
              }
          ]
      },
      "AT": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=AT",
          "buy": [
              {
                  "display_priority": 19,
                  "logo_path": "/wuViyDkbFp4r7VqI0efPW5hFfQj.jpg",
                  "provider_id": 35,
                  "provider_name": "Rakuten TV"
              }
          ],
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              },
              {
                  "display_priority": 7,
                  "logo_path": "/4cmSPgiqSEYjEepLj7fB7PJRE4D.jpg",
                  "provider_id": 30,
                  "provider_name": "Sky Ticket"
              },
              {
                  "display_priority": 7,
                  "logo_path": "/iWEiQXKaRtHqelZKtgUjyrYoWa6.jpg",
                  "provider_id": 29,
                  "provider_name": "Sky Go"
              },
              {
                  "display_priority": 24,
                  "logo_path": "/eUSKzXMIbCdupq7wZbemFExQ7JI.jpg",
                  "provider_id": 321,
                  "provider_name": "Sky X"
              }
          ]
      },
      "AU": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=AU",
          "flatrate": [
              {
                  "display_priority": 8,
                  "logo_path": "/yyJuFDErO2IF65m8wgowkEzT7aS.jpg",
                  "provider_id": 21,
                  "provider_name": "Stan"
              }
          ],
          "buy": [
              {
                  "display_priority": 2,
                  "logo_path": "/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg",
                  "provider_id": 2,
                  "provider_name": "Apple iTunes"
              },
              {
                  "display_priority": 3,
                  "logo_path": "/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg",
                  "provider_id": 3,
                  "provider_name": "Google Play Movies"
              },
              {
                  "display_priority": 42,
                  "logo_path": "/paq2o2dIfQnxcERsVoq7Ys8KYz8.jpg",
                  "provider_id": 68,
                  "provider_name": "Microsoft Store"
              }
          ]
      },
      "BE": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=BE",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              }
          ]
      },
      "BO": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=BO",
          "flatrate": [
              {
                  "display_priority": 6,
                  "logo_path": "/db6NofOblrtYcwH9qXuzyMf68Ao.jpg",
                  "provider_id": 619,
                  "provider_name": "Star Plus"
              }
          ]
      },
      "BR": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=BR",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/68MNrwlkpF7WnmNPXLah69CR5cb.jpg",
                  "provider_id": 119,
                  "provider_name": "Amazon Prime Video"
              },
              {
                  "display_priority": 1,
                  "logo_path": "/68MNrwlkpF7WnmNPXLah69CR5cb.jpg",
                  "provider_id": 9,
                  "provider_name": "Amazon Prime Video"
              },
              {
                  "display_priority": 6,
                  "logo_path": "/db6NofOblrtYcwH9qXuzyMf68Ao.jpg",
                  "provider_id": 619,
                  "provider_name": "Star Plus"
              },
              {
                  "display_priority": 11,
                  "logo_path": "/3JXBhduFj3Q3YSqTSNmOdgzNf1I.jpg",
                  "provider_id": 307,
                  "provider_name": "Globo Play"
              },
              {
                  "display_priority": 35,
                  "logo_path": "/rqRXc3mKVY3sMAwRRUs3JzDFioZ.jpg",
                  "provider_id": 499,
                  "provider_name": "Oldflix"
              }
          ]
      },
      "CA": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=CA",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/68MNrwlkpF7WnmNPXLah69CR5cb.jpg",
                  "provider_id": 119,
                  "provider_name": "Amazon Prime Video"
              },
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              }
          ],
          "buy": [
              {
                  "display_priority": 2,
                  "logo_path": "/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg",
                  "provider_id": 2,
                  "provider_name": "Apple iTunes"
              },
              {
                  "display_priority": 3,
                  "logo_path": "/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg",
                  "provider_id": 3,
                  "provider_name": "Google Play Movies"
              },
              {
                  "display_priority": 42,
                  "logo_path": "/paq2o2dIfQnxcERsVoq7Ys8KYz8.jpg",
                  "provider_id": 68,
                  "provider_name": "Microsoft Store"
              }
          ]
      },
      "CH": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=CH",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              },
              {
                  "display_priority": 3,
                  "logo_path": "/dSBzj4T9P7PMUr015gnV7meT2LR.jpg",
                  "provider_id": 150,
                  "provider_name": "SwissCom"
              },
              {
                  "display_priority": 7,
                  "logo_path": "/valHOIkEnVZKlYvKC9eZVpjoYXs.jpg",
                  "provider_id": 210,
                  "provider_name": "Sky"
              }
          ]
      },
      "CL": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=CL",
          "flatrate": [
              {
                  "display_priority": 6,
                  "logo_path": "/db6NofOblrtYcwH9qXuzyMf68Ao.jpg",
                  "provider_id": 619,
                  "provider_name": "Star Plus"
              }
          ]
      },
      "CO": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=CO",
          "flatrate": [
              {
                  "display_priority": 6,
                  "logo_path": "/db6NofOblrtYcwH9qXuzyMf68Ao.jpg",
                  "provider_id": 619,
                  "provider_name": "Star Plus"
              }
          ]
      },
      "CR": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=CR",
          "flatrate": [
              {
                  "display_priority": 6,
                  "logo_path": "/db6NofOblrtYcwH9qXuzyMf68Ao.jpg",
                  "provider_id": 619,
                  "provider_name": "Star Plus"
              }
          ]
      },
      "DE": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=DE",
          "buy": [
              {
                  "display_priority": 2,
                  "logo_path": "/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg",
                  "provider_id": 2,
                  "provider_name": "Apple iTunes"
              },
              {
                  "display_priority": 3,
                  "logo_path": "/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg",
                  "provider_id": 3,
                  "provider_name": "Google Play Movies"
              },
              {
                  "display_priority": 19,
                  "logo_path": "/wuViyDkbFp4r7VqI0efPW5hFfQj.jpg",
                  "provider_id": 35,
                  "provider_name": "Rakuten TV"
              }
          ],
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              },
              {
                  "display_priority": 1,
                  "logo_path": "/68MNrwlkpF7WnmNPXLah69CR5cb.jpg",
                  "provider_id": 9,
                  "provider_name": "Amazon Prime Video"
              },
              {
                  "display_priority": 7,
                  "logo_path": "/iWEiQXKaRtHqelZKtgUjyrYoWa6.jpg",
                  "provider_id": 29,
                  "provider_name": "Sky Go"
              },
              {
                  "display_priority": 7,
                  "logo_path": "/4cmSPgiqSEYjEepLj7fB7PJRE4D.jpg",
                  "provider_id": 30,
                  "provider_name": "Sky Ticket"
              },
              {
                  "display_priority": 13,
                  "logo_path": "/x5VTCWJrwXXLSGUwCZQq3oOUTNW.jpg",
                  "provider_id": 298,
                  "provider_name": "TV Now"
              },
              {
                  "display_priority": 51,
                  "logo_path": "/pJ2UwprmjXjlsCG4Y8oiYU8wbma.jpg",
                  "provider_id": 421,
                  "provider_name": "Joyn Plus"
              }
          ]
      },
      "DK": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=DK",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              }
          ]
      },
      "EC": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=EC",
          "flatrate": [
              {
                  "display_priority": 6,
                  "logo_path": "/db6NofOblrtYcwH9qXuzyMf68Ao.jpg",
                  "provider_id": 619,
                  "provider_name": "Star Plus"
              }
          ]
      },
      "ES": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=ES",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/68MNrwlkpF7WnmNPXLah69CR5cb.jpg",
                  "provider_id": 119,
                  "provider_name": "Amazon Prime Video"
              },
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              }
          ]
      },
      "FI": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=FI",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              }
          ]
      },
      "FR": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=FR",
          "buy": [
              {
                  "display_priority": 2,
                  "logo_path": "/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg",
                  "provider_id": 2,
                  "provider_name": "Apple iTunes"
              },
              {
                  "display_priority": 3,
                  "logo_path": "/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg",
                  "provider_id": 3,
                  "provider_name": "Google Play Movies"
              },
              {
                  "display_priority": 19,
                  "logo_path": "/wuViyDkbFp4r7VqI0efPW5hFfQj.jpg",
                  "provider_id": 35,
                  "provider_name": "Rakuten TV"
              }
          ],
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              },
              {
                  "display_priority": 11,
                  "logo_path": "/sVBEF7q7LqjHAWSnKwDbzmr2EMY.jpg",
                  "provider_id": 10,
                  "provider_name": "Amazon Video"
              }
          ]
      },
      "GB": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=GB",
          "buy": [
              {
                  "display_priority": 2,
                  "logo_path": "/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg",
                  "provider_id": 2,
                  "provider_name": "Apple iTunes"
              },
              {
                  "display_priority": 3,
                  "logo_path": "/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg",
                  "provider_id": 3,
                  "provider_name": "Google Play Movies"
              },
              {
                  "display_priority": 8,
                  "logo_path": "/pZgeSWpfvD59x6sY6stT5c6uc2h.jpg",
                  "provider_id": 130,
                  "provider_name": "Sky Store"
              },
              {
                  "display_priority": 11,
                  "logo_path": "/sVBEF7q7LqjHAWSnKwDbzmr2EMY.jpg",
                  "provider_id": 10,
                  "provider_name": "Amazon Video"
              },
              {
                  "display_priority": 19,
                  "logo_path": "/wuViyDkbFp4r7VqI0efPW5hFfQj.jpg",
                  "provider_id": 35,
                  "provider_name": "Rakuten TV"
              }
          ],
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/68MNrwlkpF7WnmNPXLah69CR5cb.jpg",
                  "provider_id": 9,
                  "provider_name": "Amazon Prime Video"
              },
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              },
              {
                  "display_priority": 63,
                  "logo_path": "/2OTvHZ5EjTd55bC0LF8KzQlkzgJ.jpg",
                  "provider_id": 594,
                  "provider_name": "Virgin TV Go"
              }
          ]
      },
      "GT": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=GT",
          "flatrate": [
              {
                  "display_priority": 6,
                  "logo_path": "/db6NofOblrtYcwH9qXuzyMf68Ao.jpg",
                  "provider_id": 619,
                  "provider_name": "Star Plus"
              }
          ]
      },
      "HN": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=HN",
          "flatrate": [
              {
                  "display_priority": 6,
                  "logo_path": "/db6NofOblrtYcwH9qXuzyMf68Ao.jpg",
                  "provider_id": 619,
                  "provider_name": "Star Plus"
              }
          ]
      },
      "HU": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=HU",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/49zBTsyFqE0u2hO8NxlyVmjFZDH.jpg",
                  "provider_id": 250,
                  "provider_name": "Horizon"
              }
          ]
      },
      "ID": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=ID",
          "flatrate": [
              {
                  "display_priority": 0,
                  "logo_path": "/eApzJtzOngfBlEC3lCjuAtzsOTf.jpg",
                  "provider_id": 122,
                  "provider_name": "Hotstar"
              }
          ]
      },
      "IE": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=IE",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              },
              {
                  "display_priority": 1,
                  "logo_path": "/68MNrwlkpF7WnmNPXLah69CR5cb.jpg",
                  "provider_id": 119,
                  "provider_name": "Amazon Prime Video"
              }
          ],
          "buy": [
              {
                  "display_priority": 8,
                  "logo_path": "/pZgeSWpfvD59x6sY6stT5c6uc2h.jpg",
                  "provider_id": 130,
                  "provider_name": "Sky Store"
              }
          ]
      },
      "IT": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=IT",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              }
          ]
      },
      "JP": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=JP",
          "buy": [
              {
                  "display_priority": 11,
                  "logo_path": "/sVBEF7q7LqjHAWSnKwDbzmr2EMY.jpg",
                  "provider_id": 10,
                  "provider_name": "Amazon Video"
              }
          ],
          "flatrate": [
              {
                  "display_priority": 6,
                  "logo_path": "/giwM8XX4V2AQb9vsoN7yti82tKK.jpg",
                  "provider_id": 15,
                  "provider_name": "Hulu"
              }
          ],
          "rent": [
              {
                  "display_priority": 11,
                  "logo_path": "/sVBEF7q7LqjHAWSnKwDbzmr2EMY.jpg",
                  "provider_id": 10,
                  "provider_name": "Amazon Video"
              }
          ]
      },
      "KR": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=KR",
          "buy": [
              {
                  "display_priority": 4,
                  "logo_path": "/gvykO994iHcqL1Cgpii4RJCtDud.jpg",
                  "provider_id": 96,
                  "provider_name": "Naver Store"
              }
          ],
          "rent": [
              {
                  "display_priority": 4,
                  "logo_path": "/gvykO994iHcqL1Cgpii4RJCtDud.jpg",
                  "provider_id": 96,
                  "provider_name": "Naver Store"
              }
          ]
      },
      "MX": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=MX",
          "flatrate": [
              {
                  "display_priority": 6,
                  "logo_path": "/db6NofOblrtYcwH9qXuzyMf68Ao.jpg",
                  "provider_id": 619,
                  "provider_name": "Star Plus"
              }
          ]
      },
      "MY": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=MY",
          "flatrate": [
              {
                  "display_priority": 0,
                  "logo_path": "/eApzJtzOngfBlEC3lCjuAtzsOTf.jpg",
                  "provider_id": 122,
                  "provider_name": "Hotstar"
              }
          ]
      },
      "NL": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=NL",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              },
              {
                  "display_priority": 5,
                  "logo_path": "/tEILg8I5fsDtVIWv8n6Flf4XO3N.jpg",
                  "provider_id": 72,
                  "provider_name": "Videoland"
              },
              {
                  "display_priority": 34,
                  "logo_path": "/9sOKDL0W3HeUFAY8kCJGz9kadhC.jpg",
                  "provider_id": 563,
                  "provider_name": "KPN"
              }
          ]
      },
      "NO": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=NO",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              }
          ]
      },
      "NZ": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=NZ",
          "buy": [
              {
                  "display_priority": 42,
                  "logo_path": "/paq2o2dIfQnxcERsVoq7Ys8KYz8.jpg",
                  "provider_id": 68,
                  "provider_name": "Microsoft Store"
              }
          ]
      },
      "PE": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=PE",
          "flatrate": [
              {
                  "display_priority": 6,
                  "logo_path": "/db6NofOblrtYcwH9qXuzyMf68Ao.jpg",
                  "provider_id": 619,
                  "provider_name": "Star Plus"
              }
          ]
      },
      "PT": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=PT",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              }
          ]
      },
      "PY": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=PY",
          "flatrate": [
              {
                  "display_priority": 6,
                  "logo_path": "/db6NofOblrtYcwH9qXuzyMf68Ao.jpg",
                  "provider_id": 619,
                  "provider_name": "Star Plus"
              }
          ]
      },
      "RU": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=RU",
          "ads": [
              {
                  "display_priority": 4,
                  "logo_path": "/2DpMZHxP9jzu3v70bph1UD3LLv3.jpg",
                  "provider_id": 113,
                  "provider_name": "Ivi"
              }
          ],
          "rent": [
              {
                  "display_priority": 4,
                  "logo_path": "/2DpMZHxP9jzu3v70bph1UD3LLv3.jpg",
                  "provider_id": 113,
                  "provider_name": "Ivi"
              }
          ],
          "buy": [
              {
                  "display_priority": 30,
                  "logo_path": "/hH99ng4jQdmt6qFzoie8SyoUiR8.jpg",
                  "provider_id": 117,
                  "provider_name": "Kinopoisk"
              }
          ],
          "flatrate": [
              {
                  "display_priority": 3,
                  "logo_path": "/As8vTHasikgyhZPkSOI9QzAst4L.jpg",
                  "provider_id": 115,
                  "provider_name": "Okko"
              },
              {
                  "display_priority": 4,
                  "logo_path": "/2DpMZHxP9jzu3v70bph1UD3LLv3.jpg",
                  "provider_id": 113,
                  "provider_name": "Ivi"
              },
              {
                  "display_priority": 30,
                  "logo_path": "/hH99ng4jQdmt6qFzoie8SyoUiR8.jpg",
                  "provider_id": 117,
                  "provider_name": "Kinopoisk"
              }
          ]
      },
      "SE": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=SE",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              },
              {
                  "display_priority": 27,
                  "logo_path": "/wmuCrsSBQ3iLK9LRqp5PlpyCQyu.jpg",
                  "provider_id": 497,
                  "provider_name": "Comhem Play"
              }
          ]
      },
      "SG": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=SG",
          "flatrate": [
              {
                  "display_priority": 1,
                  "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
                  "provider_id": 337,
                  "provider_name": "Disney Plus"
              }
          ]
      },
      "TH": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=TH",
          "flatrate": [
              {
                  "display_priority": 0,
                  "logo_path": "/eApzJtzOngfBlEC3lCjuAtzsOTf.jpg",
                  "provider_id": 122,
                  "provider_name": "Hotstar"
              }
          ]
      },
      "US": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=US",
          "flatrate": [
              {
                  "display_priority": 5,
                  "logo_path": "/2wPRZit7b8u79GsqTdygmGL6kBW.jpg",
                  "provider_id": 257,
                  "provider_name": "fuboTV"
              },
              {
                  "display_priority": 6,
                  "logo_path": "/giwM8XX4V2AQb9vsoN7yti82tKK.jpg",
                  "provider_id": 15,
                  "provider_name": "Hulu"
              },
              {
                  "display_priority": 189,
                  "logo_path": "/nd4NLxYeSv2TQ3HFzsecbAuSq1C.jpg",
                  "provider_id": 613,
                  "provider_name": "IMDB TV Amazon Channel"
              }
          ],
          "buy": [
              {
                  "display_priority": 2,
                  "logo_path": "/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg",
                  "provider_id": 2,
                  "provider_name": "Apple iTunes"
              },
              {
                  "display_priority": 3,
                  "logo_path": "/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg",
                  "provider_id": 3,
                  "provider_name": "Google Play Movies"
              },
              {
                  "display_priority": 11,
                  "logo_path": "/sVBEF7q7LqjHAWSnKwDbzmr2EMY.jpg",
                  "provider_id": 10,
                  "provider_name": "Amazon Video"
              },
              {
                  "display_priority": 31,
                  "logo_path": "/hBdCQamqj7J2VPZNbqf0wiLBous.jpg",
                  "provider_id": 7,
                  "provider_name": "Vudu"
              },
              {
                  "display_priority": 42,
                  "logo_path": "/paq2o2dIfQnxcERsVoq7Ys8KYz8.jpg",
                  "provider_id": 68,
                  "provider_name": "Microsoft Store"
              }
          ],
          "ads": [
              {
                  "display_priority": 39,
                  "logo_path": "/pvfEypkvOYheMjVz1H0rCJQSOC6.jpg",
                  "provider_id": 73,
                  "provider_name": "Tubi TV"
              },
              {
                  "display_priority": 189,
                  "logo_path": "/nd4NLxYeSv2TQ3HFzsecbAuSq1C.jpg",
                  "provider_id": 613,
                  "provider_name": "IMDB TV Amazon Channel"
              }
          ]
      },
      "VE": {
          "link": "https://www.themoviedb.org/tv/4607-lost/watch?locale=VE",
          "flatrate": [
              {
                  "display_priority": 6,
                  "logo_path": "/db6NofOblrtYcwH9qXuzyMf68Ao.jpg",
                  "provider_id": 619,
                  "provider_name": "Star Plus"
              }
          ]
      }
  }
}


searchForm.addEventListener("submit", getMovieId);