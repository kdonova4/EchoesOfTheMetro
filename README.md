An immersive journal platform where users write and read entries tied to Metro stations, featuring an interactive map, audio effects, and mini-events between metro stations. All set within the Metro universe. 

# Overview
Echoes of the Metro is a full stack web application where plalyers can write journal entries (short stories) that are set within the world of the Metro franchise. These stories are then tied to the location written at, so that others can find them and echo (like) them. Users will stumble upon events between stations and can find rare events that will reward them with a badge for thier profile. This project uses a Spring Boot backend, a postgresql databse and a React frontend.

# Tech Stack
| Layer | Technology |
|-------|-------------|
| **Frontend** | React, TypeScript, MUI |
| **Backend** | Spring Boot |
| **Database** | PostgreSQL |
| **Build Tools / Tooling** | Vite, Maven |
| **Deployment** | Microsoft Azure (Backend), Netlify (Frontend) |
| **Version Control** | Git + GitHub |

## How It Works

1. Navigate the Metro map to find stations.
2. Write a journal entry tied to a specific station.
3. Explore events between stations — find rare events to earn badges.
4. Browse other users' journal entries and echo (like) them.

## Live Website

- **Frontend:** [https://echoesofthemetro.com](https://echoesofthemetro.com)  
- **Backend:** Hosted on Microsoft Azure

# What I Built
- Implemented a REST API with 20+ tested endpoints.
- Deployed the web application backend through Microsoft Azure.
- Deployed the frontend to Netlify.
- Leveraged Typescripts strong typing and interfaces to reduce runtime errors and improve maintainability.

# What I could do better
- I could have better design and styling for mobile devices, I started design of the frontend thinking about desktop first. I would switch that next time.
- Better Planning for DTO's, knowing what exactly I might need and might not to send the least amount of data as possible for a request, I had to go in the backend and improve a few DTOs during the development process.
- Building an admin portal so that Any moderation and/or content modification/expansion could be done onsite.
- Improved UI to be more dynamic as well as immersive.

# Possible Future Improvements
- Expand Travel Map with more stations and surface exploration events.
- Add the selling of resources gathered as a sort of profile score.
- Improve styling, mobile specifically
- implements journal views counter

## Credits & Attributions
Sound effects and assets were sourced from the *Metro* game files and are the property of **4A Games**. They are used here **for educational and non-commercial purposes only.** 
The ‘Echo’ and ‘Un-Echo’ guitar notes were performed and recorded by me for this project.