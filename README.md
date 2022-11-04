# Project Name

<br>



## Description

Search platform for restaurants, create a favorite list of restaurants. See other users favorite restaurants, rate/comment them and add them to your favorites. You can see the location and the route to get there. Main page with all the restaurants and users, where the users can filter by location, type, user and rating.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - Landing page with information about the website and and links for login and signup.
- **sign up** - As a user I want to sign up on the web page so that I can add favorite restaurants to my list.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorite restaurants, create new ones, edit and delete them.
- **edit user** - As a user I want to be able to edit my profile.
- **restaurant listing** - As a user I want to see more details of the restaurant, add to the favorites, rate and review the restaurant and check the location with the prefilled route to get there.
- **all restaurants** - As a user I want to be able to filter by type of restaurant, location, users, rating. 



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }                                    |
| `GET`      | `/private/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `PUT`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/username/favorites`               | User favorites route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/username/favorites/`              | User favorites route. Adds a new favorite for the current user, edit and delete current favorites. Other users can see the favorites but can't edit.     | { name, type, country, city, map(with route from current location), rating }                                 |
| `GET`      | `/restaurants`                     | Renders `restaurant-list` view with possibility to sort by user, rating, location and type.                              |                                                          |
| `GET`      | `/restaurants/details/:id`         | Renders `restaurant-details` view for the particular restaurant. |                                                            |
| `POST`      | `/restaurants/details/:id`         | Users can comment, rate and add to their favorites. |                                                          |







## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  favorites: [FavoriteId],
}

```



Restaurants model

```javascript
{
  placeId: String,
  country: String,
  city: String,
  type: String,
  user: [UserId],
  rating: Number
}

```



<br>

## API's

Google Maps


<br>


## Packages



<br>



## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors
André Antunes - [`Andre-AntunesPT`](https://github.com/Andre-AntunesPT) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person1-username)

Raiza Garcia - [`raizagarcia`](https://github.com/raizagarcia) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person2-username)