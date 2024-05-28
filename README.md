# Electric Vehicle Route Planner - Full Stack Project

## Overview

This project is a full-stack application designed to provide custom routes for electric vehicle (EV) drivers. It helps users plan their trips by identifying charging stations along the way and allows them to enhance their routes with nearby leisure activities. Users can save favorite locations such as "Home" and "Work" and manage their vehicles within the application.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Usage](#usage)
5. [Screenshots](#screenshots)
6. [Database Schema](#database-schema)
7. [Algorithm Details](#algorithm-details)
8. [Contact Information](#contact-information)

## Features

- **Custom Route Planning:** Users can input a starting point and destination to get a route with necessary charging stations.
- **Leisure Activity Integration:** Users can upgrade their route to include leisure activities near charging stations, such as malls.
- **Favorite Locations:** Users can save and manage favorite locations.
- **Vehicle Management:** Users can add and manage their electric vehicles.
- **User Authentication:** Secure login and signup functionalities.

## Technologies Used

- **Backend:** C# .NET Core, Entity Framework, SQL
- **Frontend:** React, Redux
- **API Integration:** Google Maps API

## Setup Instructions

### Backend Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-repository.git
    cd your-repository/backend
    ```

2. **Set up the database:**
    - Create a new SQL database.
    - Update the connection string in `appsettings.json` with your database details.

3. **Run the backend server:**
    ```bash
    dotnet restore
    dotnet build
    dotnet run
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the frontend server:**
    ```bash
    npm start
    ```

## Usage

1. **Access the Application:**
   Open your browser and go to `http://localhost:3000`.

2. **Login or Signup:**
   Create a new account or log in with existing credentials.

3. **Plan Your Route:**
   - Input your starting point and destination.
   - Get a route with suggested charging stations.
   - Upgrade your route by selecting desired leisure activities.

4. **Manage Your Profile:**
   - Save favorite locations.
   - Add and manage your vehicles.

## Screenshots

### Login Page
![./images/צילום מסך 2024-05-28 221644.png](https://github.com/ruthiedel/Electric-Vehicle-RoutePlanner/blob/master/images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202024-05-28%20221644.png)

### Signup Page
![Signup Page](https://github.com/ruthiedel/Electric-Vehicle-RoutePlanner/blob/master/images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202024-05-28%20221658.png)

### Selfzone - Favorite
![Favorite Locations](https://github.com/ruthiedel/Electric-Vehicle-RoutePlanner/blob/master/images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202024-05-28%20221621.png)

### Selfzone - Cars
![Manage Cars](https://github.com/ruthiedel/Electric-Vehicle-RoutePlanner/blob/master/images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202024-05-28%20221606.png)

### Main Route Planning Page
![Route Planning](https://github.com/ruthiedel/Electric-Vehicle-RoutePlanner/blob/master/images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202024-05-28%20221257.png)
![Route Planning](https://github.com/ruthiedel/Electric-Vehicle-RoutePlanner/blob/master/images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202024-05-28%20221410.png)
![Route Planning](https://github.com/ruthiedel/Electric-Vehicle-RoutePlanner/blob/master/images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202024-05-28%20221458.png)

## Database Schema

![Database Schema](https://github.com/ruthiedel/Electric-Vehicle-RoutePlanner/blob/master/images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202024-05-29%20010041.png)

## Algorithm Details

### Route Planning Algorithm

1. **Initial Route Calculation:**
   - Use Google Maps API to get the route from the starting point to the destination.

2. **Segmenting the Route:**
   - Divide the route into segments based on the vehicle's range.

3. **Selecting Charging Points:**
   - For each segment, identify a point close to the vehicle's maximum range but with enough buffer to reach a charging station.
   - Find the nearest charging station for each selected point.

4. **Returning the Route:**
   - Compile the route with all the necessary charging points.

### Route Upgrade Algorithm

1. **Collect Leisure Activities:**
   - For each charging station, search for nearby leisure activities as per user preferences and store them.

2. **Optimize Route:**
   - Use a recursive BackTracking approach to find the combination of leisure activities that meets the most user preferences while extending the route minimally.
## Presentation

You can view the algorithm presentation [here](https://github.com/ruthiedel/Electric-Vehicle-RoutePlanner/blame/master/%D7%90%D7%9C%D7%92%D7%95%D7%A8%D7%99%D7%AA%D7%9D.pptx).

## Contact Information

For any questions or support, please contact:

- **Name:** Ruthi Edel
- **Email:** r0504126468@gmail.com

Feel free to contribute to the project by opening issues or submitting pull requests. Please ensure to give appropriate credit when using or contributing to this project.

---

Thank you for using the Electric Vehicle Route Planner!
