# Just Choose Frontend

## Contents

-   [Background](#background)
-   [Technologies](#technologies)
-   [Set-up for local use](#setup)
-   [Live version](#live)
    <a name=background></a>

## Background

This was a group project made with [William Yap](https://github.com/williamyap90), [Matthew Webb](https://github.com/JustMatty26) and [Ammar Hassan](https://github.com/mahassan/)

Deciding where to eat is difficult, Just Choose allows one person to provide a shortlist of restaurants, and provide the list for participants to vote on their choice.

Below we have provided a test username/password for demo purposes:

```
Username: test@just-choose.com
Password: Qwerty!
```

Feel free to create your own account if you prefer. Passwords are hashed with [Bcrypt](https://www.npmjs.com/package/bcrypt) before being stored in the database.

Just Choose is a React frontend web application that interacts with a MongoDb/Express backend, written in TypeScript.

Link to the hosted Just Choose here.

Just Choose - https://just-choose.netlify.app/

Backend repository - https://github.com/Sgavinmills/be-just-choose

<a name=technologies></a>

## Technologies

-   [TypeScript](https://www.typescriptlang.org/) v4.4.3
-   [ReactJS](https://reactjs.org/) v17.0.2

### Dependencies:

-   [Axios](https://axios-http.com/docs/intro) v0.21.1
-   [react-tinder-card](https://www.npmjs.com/package/react-tinder-card) v1.4.0
    <a name=setup></a>

## Setup

Follow these steps to download the project onto your own machine:

-   Clone the repo

```
git clone https://github.com/Sgavinmills/fe-just-choose.git
```

-   Navigate into the src directory
-   Install all dependencies

```
npm install
```

-   Load the site on localhost with react

```
npm start
```

<a name=live></a>

## Live Version

The live version of the application can be viewed [here](https://just-choose.netlify.app/).
